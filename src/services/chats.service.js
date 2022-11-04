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

  const chatsCollectionRef = collection(db, "chats");
  
  class ChatDataService {
        addchat = (newChat)=>{
            return addDoc(chatsCollectionRef, newChat);
        }
        
        updateChat = (id, updatedChat)=>{
            const chatDoc = doc(db, "chats", id);
            return updateDoc(chatDoc, updatedChat);
        }

        deleteChat = (id)=>{
            const promotionDoc = doc(db, "chats", id);
            return deleteDoc(promotionDoc);
        }
        getAllChats = () =>{
            return getDocs(chatsCollectionRef);
        }

        getPromotion = id =>{
            const chatDoc = doc(db, "chats", id);
            return getDoc(chatDoc);
        }
  }


  export default new ChatDataService();

