import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAP0nOxEYBV-iYfyokQf6L_M7qr-cP25GM",
  authDomain: "tenisadmin-94077.firebaseapp.com",
  projectId: "tenisadmin-94077",
  storageBucket: "tenisadmin-94077.appspot.com",
  messagingSenderId: "73198701646",
  appId: "1:73198701646:web:2bf432068395d00d3a071f"
};

// Initialize Firebase
export const appAdmin = initializeApp(firebaseConfig);
export const authAdmin = getAuth(appAdmin);
export const dbAdmin = getFirestore(appAdmin);