// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHI4GgNLM8hgNzDKIdTMGmwfLF8xLbFFs",
  authDomain: "tenis-9f8a7.firebaseapp.com",
  projectId: "tenis-9f8a7",
  storageBucket: "tenis-9f8a7.appspot.com",
  messagingSenderId: "1063379985891",
  appId: "1:1063379985891:web:561ceca5b91759229cacd6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
