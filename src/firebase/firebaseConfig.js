// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Fi frrebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKKUbKT2NFWEn5jJDndspd4qxJ-RTbN8o",
    authDomain: "as-cfc5b.firebaseapp.com",
    projectId: "as-cfc5b",
    storageBucket: "as-cfc5b.appspot.com",
    messagingSenderId: "1005389161638",
    appId: "1:1005389161638:web:c0620c6028a15f98068067"
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