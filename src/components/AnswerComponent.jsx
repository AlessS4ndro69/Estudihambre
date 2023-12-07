// FloatingMessage.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../database/firebase';

const Answer = ({ message, onClose, idAnswer }) => {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [uri, setUri] = useState("");
    const [loading, setLoading] = useState(true);
    const [isFinish, setFinish] = useState(false);

    const get_dimensions = (imageUrl)=> {
        
        Image.getSize(imageUrl, (width, height) => {
            // Aquí puedes utilizar las dimensiones (width y height) de la imagen
            // para establecer el estilo de tu componente Image o realizar otras acciones.
            //console.log(`Ancho: ${width}, Alto: ${height}`);
            //console.log("id:",data[questionNumber].id);
            setWidth(width);
            setHeight(height);
            setFinish(true);
          }, error => {
            // Manejo de errores en caso de que no se pueda obtener el tamaño de la imagen.
            console.error(`Error al obtener el tamaño de la imagen: ${error}`);
          });
    };

    useEffect(()=>{
        const get_answer = async ()=> {
            const id = idAnswer;
            const docRef  = doc(db,"evaluation_answer",id);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                console.log(docSnap.data().uri);
                setUri(docSnap.data().uri);
                get_dimensions(docSnap.data().uri);
                setLoading(false);
            }
        };
        get_answer();
        
    },[]);

  return (
    <View style={styles.floatingContainer}>
      <View style={styles.floatingContent}>
        <Text>{message}</Text>
        
        {isFinish && <ScrollView>
                    <Image 
                      style={{ 
                      width:width, 
                      height:height,
                      borderRadius: 10, // Ajusta el radio para redondear las esquinas
                      borderWidth: 2, // Ancho del borde
                      borderColor: 'blue', // Color del borde
                      }}
                      source={{uri: uri}}
                    />
                </ScrollView>}

        {loading && <ActivityIndicator size="large" />}
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeButton}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: 'transparent', // Fondo transparente
  },
  floatingContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    color: 'blue',
  },
});

export default Answer;
