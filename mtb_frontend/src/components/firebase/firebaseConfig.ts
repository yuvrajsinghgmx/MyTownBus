import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyDxotVHQpfFvrNKtmSu_f0G7AKrsTnTksY",
    authDomain: "mytownbus-72904.firebaseapp.com",
    projectId: "mytownbus-72904",
    storageBucket: "mytownbus-72904.appspot.com",
    messagingSenderId: "70208552141",
    appId: "1:70208552141:android:7396daffe34b96e1a13d84",
  };  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db =  getFirestore(app);