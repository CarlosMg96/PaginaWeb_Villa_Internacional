import { db } from "../utils/firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from "../utils/firebase"

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    setDoc,
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
            const adDoc = doc(db, "socios", id);
            return getDoc(adDoc);
        }

        //Coregir aquí llegarían los parametros como newSocio.email
        addDocSocio = async (socio) => {
            
            const email = socio.email;
            const password = socio.password;
            const infoUsuario = await createUserWithEmailAndPassword(auth, email, password).then((usuarioFirebase) =>  {
               return usuarioFirebase;
              })
              console.log(infoUsuario);
              const docuReF = doc(db, `socios/${infoUsuario.user.uid}`);
              setDoc(docuReF, {
                titular: socio.titular,
                apelativo: socio.apelativo,
                file: socio.file,
                tipo: socio.tipo,
                tipoPago: socio.tipoPago,
                email: socio.email,
                noMembresia: socio.noMenbresia,
                telCelular: socio.telCelular,
                telCasa: socio.telCasa,
                casilleros: socio.casilleros,
                estado: socio.estado,
                fNacimiento: socio.fNacimiento,
                fIngreso: socio.fIngreso,
                mesAdeudo: socio.mesAdeudo,
                direccion: socio.direccion,
                colonia: socio.colonia,
                cp: socio.cp,
                pais: socio.pais,
                observaciones: socio.observaciones,
                importe: socio.importe,
                fileM: socio.fileM,
                nombreEs: socio.nombreEs, 
                
            });
               }

        //Si no funciona pasar la funcion en CreateSocio 
         
  }


  export default new SocioDataService();

