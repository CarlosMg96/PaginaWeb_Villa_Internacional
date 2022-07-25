import { db } from "../utils/firebase";

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";

  const sociosCollectionRef = collection(db, "socios");
  
  class SocioDataService {
        sociosAdd = (newAd)=>{
            return addDoc(sociosCollectionRef, newAd);
        }
        
        updateSocio = (id, updatedAd)=>{
            const adDoc = doc(db, "socios", id);
            return updateDoc(adDoc, updatedAd);
        }

        deleteSocio = (id)=>{
            const adDoc = doc(db, "socios", id);
            return deleteDoc(adDoc);
        }
        getAllSocios = () =>{
            return getDocs(sociosCollectionRef);
        }

        getSocio = id =>{
            const adDoc = doc(db, "avisos", id);
            return getDoc(adDoc);
        }
  }


  export default new SocioDataService();

