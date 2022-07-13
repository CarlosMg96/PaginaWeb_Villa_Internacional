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

  const avisosCollectionRef = collection(db, "avisos");
  
  class AdDataService {
        addAd = (newAd)=>{
            return addDoc(avisosCollectionRef, newAd);
        }
        
        updateAd = (id, updatedAd)=>{
            const adDoc = doc(db, "avisos", id);
            return updateDoc(adDoc, updatedAd);
        }

        deleteAd = (id)=>{
            const adDoc = doc(db, "avisos", id);
            return deleteDoc(adDoc);
        }
        getAllAds = () =>{
            return getDocs(avisosCollectionRef);
        }

        getAd = id =>{
            const adDoc = doc(db, "avisos", id);
            return getDoc(adDoc);
        }
  }


  export default new AdDataService();

