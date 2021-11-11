
import 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { GoogleAuthProvider } from '@firebase/auth';

// Configuración del Firebase de mi web app
const firebaseConfig = {
    apiKey: "AIzaSyCgufVpn4fH07JrsfEssQO9rDLxFePJrLU",
    authDomain: "react-app-udemy-d1498.firebaseapp.com",
    projectId: "react-app-udemy-d1498",
    storageBucket: "react-app-udemy-d1498.appspot.com",
    messagingSenderId: "481527769609",
    appId: "1:481527769609:web:0d934fd833f43c92ab26d8"
};

// Inicialización de Firebase
const firebase = initializeApp(firebaseConfig);

const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider(); // Autenticación de Google

export {
    db,
    firebase,
    googleAuthProvider,
}