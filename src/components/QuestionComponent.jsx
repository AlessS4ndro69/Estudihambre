import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from "react-native";
import MyButton  from "./MyButtonComponent";
import LogoComponent from "./LogoComponent";
import Alternatives from "./AlternativesComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import { where, getDocs,updateDoc, getDoc, getFirestore, collection, doc, query, onSnapshot, initializeFirestore } from "firebase/firestore";
import StatementNavigation from "./StatementsNavigationComponent";
import tw from "twrnc";
import { db } from "../../database/firebase";



const initialData = {
    question: "https://ichef.bbci.co.uk/news/640/cpsprodpb/FE1D/production/_100635056_ecuacion.jpg",
    answer: "rpt3",
    alternatives: ["rpt1","rpt2","rpt3","rpt4","rpt5"],
    solution: "https://firebasestorage.googleapis.com/v0/b/repository-exercises.appspot.com/o/0616f0d7-241c-4662-905c-f9321d3d88b1.jpeg?alt=media&token=51c27268-7a6e-486c-b906-f9e4d5c405a0&_gl=1*wpzijw*_ga*MTI0NDA0MTg1MS4xNjk3MTczMTI4*_ga_CW55HF8NVT*MTY5NzQwNDc5Mi44LjEuMTY5NzQwNDgwNC40OC4wLjA.",
    topic: "Productos notables",
    course: "Álgebra", 
    codeCourse: 15,
    correctAlternative: "B",
};



const Question = ()=> {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [data, setData] = useState([]);
    const [isFinish, setFinish] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [loadingData, setLoadingData] = useState(true);
    const [disabledAlternatives, setDisabledAlternatives] = useState(false);
    const [goResult, setGoResult] = useState(false);
    const [goHelp, setGoHelp] = useState(false);

    const route = useRoute();
    const navigation = useNavigation();

    const courseCode = route.params.courseCode.toString();
    const numberQuestions = route.params.numberQuestions;


    const handleResult = (value) => {
        console.log("evaluando con intento: ", value, "y", data[questionNumber].correctAlternative);
        if(data[questionNumber].correctAlternative == value){
            setCorrectAnswers(correctAnswers + 1);
            console.log("respuesta correcta tienes: ", correctAnswers + 1) ;
        }else{
            console.log("respuesta incorrecta");
        }
        setDisabledAlternatives(true);
    };

    const handleHelp = () => {
        setGoHelp(true);
        console.log("activando la ayuda");
    }
    const pagination = (direction) => {
        /*if(questionNumber +1 < data.length){ //questinoNumber empieza en 0
            setQuestionNumber(questionNumber+1);
            setFinish(false);
            setDisabledAlternatives(false);
        }else{
            Alert.alert("Has llegado a la última pregunta 😎😋");
            setGoResult(true);
        }*/
        
        const nextPage = direction === "next" ? questionNumber+ 1 : questionNumber - 1;
        console.log("topage: ",nextPage);
        if (nextPage >=0 && nextPage < data.length) {
            setQuestionNumber(nextPage);
            setFinish(false);
            setDisabledAlternatives(false);
        }
          
        
    };

    const get_dimensions = ()=> {
        const imageUrl = data[questionNumber].question;
        if(imageUrl){
            Image.getSize(imageUrl, (width, height) => {
                // Aquí puedes utilizar las dimensiones (width y height) de la imagen
                // para establecer el estilo de tu componente Image o realizar otras acciones.
                //console.log(`Ancho: ${width}, Alto: ${height}`);
                console.log("id:",data[questionNumber].id);
                setWidth(width);
                setHeight(height);
                setFinish(true);
              }, error => {
                // Manejo de errores en caso de que no se pueda obtener el tamaño de la imagen.
                console.error(`Error al obtener el tamaño de la imagen: ${error}`);
              });
        }else{
            pagination();
        }
        
    };
    useEffect(()=> {
        if(data.length > 0){
            get_dimensions();
        }
    },[questionNumber, data]);

    useEffect(()=>{
        console.log("fetch data con courseCode: ",courseCode);
        const ref = collection(db, 'evaluation_question');
        const q = query(ref, where('courseCode', '==', courseCode));
        const fetchRandomData = async () => {  
            const querySnapshot = await getDocs(q);
            const allData = [];
          
            querySnapshot.forEach((doc) => {
              const {
                answer,
                uri,
                topic,
                topicCode,
                course,
                courseCode,
                correctAlternative,
              } = doc.data();
          
              allData.push({
                id: doc.id,
                question: uri,
                answer: answer,
                topic: topic,
                topicCode: topicCode,
                course: course,
                codeCourse: courseCode,
                correctAlternative: correctAlternative,
              });
            });
          
            // Shuffle the array to get a random order
            const shuffledData = shuffleArray(allData);
          
            // Get the first 20 elements as random data
            const randomData = shuffledData.slice(0, numberQuestions);
          
            setData(randomData);
            console.log(randomData);
            setLoadingData(false);
        };
        fetchRandomData();
    },[]);
    
    if(data.length > 0){
        return (
            
            <ScrollView>
            <View style = {tw `items-center p-5`}>
                
                <View style = {tw`p-2 items-start`}>
                    <LogoComponent/>
                <Text style = {tw` text-2xl italic  font-bold`}>Curso: {data[questionNumber].course}</Text>
                <Text style = {tw` text-2xl italic  font-bold`}>Tema: {data[questionNumber].topic}</Text>
                </View>
                <View style = {tw`p-2 mb-2 bg-blue-500 rounded`}>
                    <Text style = {tw` text-2xl italic text-white font-bold`}>Pregunta {questionNumber+1}</Text>
                </View>
                {isFinish && (
                        <Image
                            style={{
                            width: width * 1.2,
                            aspectRatio: width / height,
                            borderRadius: 10, // Ajusta el radio para redondear las esquinas
                            borderWidth: 2, // Ancho del borde
                            borderColor: 'blue', // Color del borde
                            }}
                            source={{ uri: data[questionNumber].question }}
                        />
                )}
                {!isFinish && <ActivityIndicator size="large" color="blue"/>}
                
                {isFinish && <Alternatives evaluator={handleResult} disabled={disabledAlternatives} correctAlternative={data[questionNumber].correctAlternative}/>}
                {/*!goResult && <MyButton text = "Siguiente pregunta" onClick = {pagination}/>*/}
                <StatementNavigation statements={data} navigateTo={pagination} currentPage={questionNumber} handleHelp={handleHelp} />
                {<MyButton text = "Finalizar" onClick={()=>{
                    console.log("Puntaje Final: ",correctAnswers );
                    navigation.navigate("EvaluatorResultScreen",{
                        data: data,
                        correctAnswers: correctAnswers,
                    })
                }}/>}
                {<Image style={{ width: 80, height: 80, resizeMode: "contain"}}
                    source={{uri: "https://cdn-icons-png.flaticon.com/128/4138/4138783.png"}}/>}
            </View>
            </ScrollView>
            
        );
    }else{
        if(loadingData){
            return(
                <View>
                <ActivityIndicator size="large" />
                </View>
            );
        }
        else{   // dejo de cargar
            Alert.alert("No se encontraron ejercicios de este tema😣😥");
            navigation.goBack();
        }
        
    }
    

    
};
const shuffleArray = (array) => {
    // Implement a Fisher-Yates (Knuth) shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
export default Question;

