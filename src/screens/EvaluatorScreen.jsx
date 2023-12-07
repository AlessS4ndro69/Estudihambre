
import React, {useState} from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image } from "react-native";
import AreaList from "../components/AreaListComponent";
import BottomBar from "../components/NavComponent";

import MyModal from "../components/MyModalComponent";
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import { data } from "../../AreaList.json";

import tw from "twrnc"

const numeroEjercicios = 100;

const EvaluatorScreen = () => {
    const [showInfo, setShowInfo] = useState(true);
    const closeModal = () => {
        setShowInfo(false);
    };

    const render = ({item}) => {
        return (
        <View style= {tw`flex-row p-2 pb-2 bg-gray-200 m-1 w-full justify-between`}> 
            <View style = {tw`items-center flex-row pl-6 ml-2`}>
                <Image
                    style = {{width: 30, height: 30, resizeMode: "contain"}}
                    source = {{uri : item.image}}
                />
                    {<Text style= {tw` text-lg font-semibold`}>{item.title}: {numeroEjercicios} ejercicios </Text>}
            </View>
        </View>
        
    )};
    const InfoList = ()=>{
        return (
          <FlatList
          data = {data}
          keyExtractor={(item) => item.courseCode}
          renderItem={render}
          >  
          </FlatList>  
        );
    }

    /// inicialmente se muestra información de los cursos.
    return (
        <SafeAreaView style = {tw`bg-white pt-5 `}>
            {/*<Question/>*/}
            <BottomBar/>
            <AreaList />
            {showInfo && <MyModal message={"Información de cursos"} onClose={closeModal} MyComponent={InfoList}/>}
            
        </SafeAreaView>
    );
};


export default EvaluatorScreen;