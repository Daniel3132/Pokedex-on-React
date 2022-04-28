// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Fi frrebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm7rKriDZcr1NxA97Dy2fRNTQI49PpU5I",
  authDomain: "prueba7-4.firebaseapp.com",
  projectId: "prueba7-4",
  storageBucket: "prueba7-4.appspot.com",
  messagingSenderId: "546959230642",
  appId: "1:546959230642:web:e88349510be07908dcabab",
  measurementId: "G-LWLMP5KL5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const google = new GoogleAuthProvider()
const facebook = new FacebookAuthProvider()
const baseDatos = getFirestore()

export {
    app,
    google,
    baseDatos,
    facebook
}