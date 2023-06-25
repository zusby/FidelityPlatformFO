import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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

const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export{auth};
