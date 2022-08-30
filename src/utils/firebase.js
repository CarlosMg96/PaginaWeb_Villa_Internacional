// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

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
export const storage = getStorage(app);

export async function uploadImagePromotion(file){
  const id = v4()
  const storageRef = ref(storage, `photosPromotion/${id}`);
  await uploadBytes(storageRef, file)
  const url = getDownloadURL(storageRef)
  return url
};

export async function uploadFilesForAds(file){
  const id = v4()
  const storageRef = ref(storage, `filesForAds/${id}`);
  await uploadBytes(storageRef, file)
  const url = getDownloadURL(storageRef)
  return url
};

export async function uploadPhotoSocio(file, titular){
  const id = v4()
  const storageRef = ref(storage, `Socio/${titular}${id}`);
  await uploadBytes(storageRef, file)
  const url = getDownloadURL(storageRef)
  return url
};

export async function uploadPhotoMatrimonio(file, titular){
  const id = v4()
  const storageRef = ref(storage, `Socio/Espos@_de_${titular}${id}`);
  await uploadBytes(storageRef, file)
  const url = getDownloadURL(storageRef)
  return url
};