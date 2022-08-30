import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     onAuthStateChanged,
     signOut
     } from 'firebase/auth'
import {auth} from "../utils/firebase"
import { db } from "../utils/firebase";
import { doc, setDoc, getDoc} from "firebase/firestore"

export const authContext = createContext()

export const useAuth = () =>{
  const context = useContext(authContext)
  if (!context)  throw new Error("No auth context available")
  return context
}

export  function AuthProvider({children}){

    //Cargar el estado
    const [loading, setLoading] = useState(true);

    // Para guardar
    const [user, setUser] = useState(null);

   // Este es para crear con correo y contraseña
   //Si se coloca aquí el await eliminar el de register 
    const signup = async (email, password, role) => {
   const infoUsuario = await createUserWithEmailAndPassword(auth, email, password).then((usuarioFirebase) =>  {
      return usuarioFirebase;
     })
     const docuReF = doc(db, `usuarios/${infoUsuario.user.uid}`);
     setDoc(docuReF, {email: email, role: role});
      }

        //Iniciar sesión con correo y contraseña
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
      };

      //Para traer el rol del usuario
      async function getRol(uid) {
        const docuRef = doc(db, `usuarios/${uid}`);
        const docuCifrada = await getDoc(docuRef);
        const infoFinal = docuCifrada.data().role;
        return infoFinal;
      }


      // No para iniciciar sesión con usuario y contraseña
      function setUserWithFirebaseAndRol(usuarioFirebase) {
        getRol(usuarioFirebase.uid).then((role) => {
         const userData = {
            uid: usuarioFirebase.uid,
            email: usuarioFirebase.email,
            role: role,
          };
          setUser(userData);
        });
      }

      //Para conocer el estado de la sesión
      useEffect(() => {
        const unsubuscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
          //  setUser(usuarioFirebase);
          //  setLoading(false);
          if (usuarioFirebase) {
            //funcion final
            setUser(usuarioFirebase);
            setLoading(false);
            if (!user) {
              setUserWithFirebaseAndRol(usuarioFirebase);
              setLoading(false);
            }
          } else {
            setUser(null);
            setLoading(false);
          }
        });
        return () => unsubuscribe();
      }, []);

      //Cerrar sesión
      const logout = () => signOut(auth);



    return (
        <authContext.Provider value={{signup,
         login,
         logout,
         user,
         loading,

         }}>
            {children}
        </authContext.Provider>
    )
}