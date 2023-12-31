
import { initializeApp } from 'firebase/app';
import {getFirestore, initializeFirestore } from 'firebase/firestore';
import {FIREBASE_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID} from "@env";


const firebaseConfig = {
    apiKey: FIREBASE_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};


const firebase = initializeApp(firebaseConfig);
/*
let db;

if (Device.isDevice){
    db = getFirestore(firebase);
    console.log("Estamos en device");
}else{
    db = initializeFirestore(firebase,{
        experimentalForceLongPolling: true
    })    
}*/

const db =  getFirestore(firebase);

export {db};
export default firebase;