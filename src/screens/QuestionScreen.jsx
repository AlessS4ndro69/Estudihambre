import React from "react";
import Question from "../components/QuestionComponent";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import BottomBar from "../components/NavComponent";
import tw from "twrnc";

const QuestionScreen = ()=>{
    const route = useRoute();
    const courseCode = route.params.courseCode;
    const numberQuestions = route.params.numberQuestions;
    console.log("props en questionScreen: ",route.params);
    

    return(
        <SafeAreaView style = {tw`bg-white pt-5 justify-center h-full`}>
            <BottomBar/>
            <Question courseCode = {courseCode} numberQuestions = {numberQuestions}/>            
            
        </SafeAreaView>
    );

};


export default QuestionScreen;