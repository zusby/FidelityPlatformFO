import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
//TODO put into .env file
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_APIKEY,
  authDomain:import.meta.env.FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.FIREBASE_PROJECTID,
  storageBucket: import.meta.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.FIREBASE_APPID,
  measurementId: import.meta.env.FIREBASE_MEASUREMENTID
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export{auth};
