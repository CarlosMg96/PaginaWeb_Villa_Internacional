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

  const promoCollectionRef = collection(db, "promociones");
  
  class PromotionsDataService {
        addPromotion = (newPromotion)=>{
            return addDoc(promoCollectionRef, newPromotion);
        }
        
        updatePromotion = (id, updatedPromotion)=>{
            const promotionDoc = doc(db, "promociones", id);
            return updateDoc(promotionDoc, updatedPromotion);
        }

        deletePromotion = (id)=>{
            const promotionDoc = doc(db, "promociones", id);
            return deleteDoc(promotionDoc);
        }
        getAllPromotions = () =>{
            return getDocs(promoCollectionRef);
        }

        getPromotion = id =>{
            const promotionDoc = doc(db, "promociones", id);
            return getDoc(promotionDoc);
        }
  }


  export default new PromotionsDataService();

