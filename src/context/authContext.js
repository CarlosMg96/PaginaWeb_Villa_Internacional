import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     onAuthStateChanged,
     signOut
     } from 'firebase/auth'
import {auth} from "../utils/firebase"

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
    const signup = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password  )
      }

        //Iniciar sesión con correo y contraseña
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
      };

      //Para conocer el estado de la sesión
      useEffect(() => {
        const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
          // console.log({ currentUser });
          // console.log(currentUser.uid);
           setUser(currentUser);
           setLoading(false);
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