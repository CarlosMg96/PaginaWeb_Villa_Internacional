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
        
        updateAd = (id, updatedAd)=>{
            const adDoc = doc(db, "socios", id);
            return updateDoc(adDoc, updatedAd);
        }

        deleteAd = (id)=>{
            const adDoc = doc(db, "socios", id);
            return deleteDoc(adDoc);
        }
        getAllAds = () =>{
            return getDocs(sociosCollectionRef);
        }

        getAd = id =>{
            const adDoc = doc(db, "avisos", id);
            return getDoc(adDoc);
        }
  }


  export default new SocioDataService();

