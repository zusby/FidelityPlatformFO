import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyA-di4SIrRpAZmEaboJu5IavidbikAf4Zw",

  authDomain: "ids-fidelityprogram-kya.firebaseapp.com",

  projectId: "ids-fidelityprogram-kya",

  storageBucket: "ids-fidelityprogram-kya.appspot.com",

  messagingSenderId: "825561615429",

  appId: "1:825561615429:web:84f50ef8ba2ec8ce39272c",

  measurementId: "G-9XTS9KE82C"

};


// Initialize Firebase

const App = initializeApp(firebaseConfig);
  
const Auth = getAuth(App);

export {Auth, App};