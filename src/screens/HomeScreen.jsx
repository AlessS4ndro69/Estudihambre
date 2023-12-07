import { use, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {StyleSheet, Text, View, SafeAreaView, ScrollView, Image,} from "react-native";
import * as Updates from 'expo-updates';
import firebase from "../../database/firebase";
import tw from 'twrnc';

import { getAuth, signInAnonymously,  initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const navigation = useNavigation();
    const app = firebase;
    const auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
    

    const checkForUpdates = async () => {
        try {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
          }
        } catch (error) {
          console.log('Error checking for updates:', error);
        }
    };

    const authAnonymously = () => {
        signInAnonymously(auth)
        .then(() => {
            console.log("logeado anonimamente");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    };

    useEffect(()=>{
        authAnonymously();
        checkForUpdates();
        navigation.navigate("EvaluatorScreen");
    },[]);

    return(
        <SafeAreaView style = {tw`bg-white h-full`}>   
            {/*<HeaderComponent/>
                <ScrollView>    
                
                <PubComponent/>
                <NewsComponent/>
                <CategoriesComponent/>
                <ShareAppButton/>
            
                </ScrollView>
            <FooterComponent onSlider = {false}/>*/}
            
        </SafeAreaView>
        
    );
}

export default HomeScreen;

const styles = StyleSheet.create({});