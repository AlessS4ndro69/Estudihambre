import { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import tw from "twrnc";

const Alternatives = ({ evaluator, disabled, correctAlternative }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [alternatives, setAlternatives] = useState([{'A':0},{'B':0},{'C':0},{'D':0},{'E':0}])
  ////////// 1 incorrecta deseleccionada    2 correcta deseleccionada   3 incorrecta seleccionada  4 correcta sleccionada
  const verify = (value) => {
    console.log("Presionaste la alternativa ", value);
    evaluator(value);
    setSelectedOption(value); // Establece la opción seleccionada
    
    setAlternatives((prevAlternatives) => {
      return prevAlternatives.map((alternative) => {
        const letter = Object.keys(alternative)[0];
        const val = letter === value ? value === correctAlternative? 4 : 3 : alternative[letter];
    
        return { [letter]: val };
      });
    });
      
    
    
  };

  useEffect(() => {
    if(!disabled){
      setSelectedOption(null); // Reiniciar el estado cuando cambia la pregunta
    }

  }, [disabled]);

  return (
    <View style={tw`flex-row h-14 items-center justify-between`}>
      {alternatives.map((alternative, index) => {
        const letter = Object.keys(alternative)[0]; // Obtenemos la letra de la alternativa (A, B, C, ...)
        const value = alternative[letter]; // Obtenemos el valor asociado
        return (
        <TouchableOpacity
          key={index}
          style={[
            styles.buttonContainer,
            //selectedOption === option ? selectedOption === correctAlternative? styles.selectedCorrect: styles.selectedIncorrect : null,
            value === 4? styles.selectedCorrect: null,
            value === 3? styles.selectedIncorrect: null,
          ]}
          onPress={() => {
            verify(letter);
          }}
          disabled = {disabled}
        >
          <View style={styles.circle}>
            {/*selectedOption === option ? selectedOption === correctAlternative? <Text style={styles.check}>✓</Text>: <Text style={styles.check}>✗</Text>  : <Text style={styles.buttonText}>{option}</Text>*/}
            
            {value === 4? <Text style={styles.check}>✓</Text>: value === 3? <Text style={styles.check}>✗</Text>  : <Text style={styles.buttonText}>{letter}</Text>   }
            
          </View>
        </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Alternatives;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "16%",
    height: 35,
    backgroundColor: "#87CEEB",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    margin:4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  selectedCorrect: {
    backgroundColor: "green", // Cambia el color al seleccionar
  },
  selectedIncorrect:{
    backgroundColor: "red",
  },

  circle: {
    width: 23,
    height: 23,
    backgroundColor: "transparent",
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  check: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18, // Ajusta el tamaño del check
  },
});
