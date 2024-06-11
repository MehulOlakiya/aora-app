import { useState,useContext,useEffect,createContext } from "react";
import { getCurrentUser } from "../lib/appwrite";

  const GlobalContext = createContext()

  export const useGlobalContext = () => useContext(GlobalContext)

  const GlobalProvider = ({children}) =>{
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [user,setUser] = useState(null)
    const [isLoadig,setIsLoading] = useState(true)

    useEffect(()=>{
        getCurrentUser().then((res)=>{
            if(res){
                setIsLoggedIn(true)
                setUser(res)
            }else{
                setIsLoggedIn(false)
                setUser(null)
            }
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>{
            setIsLoading(false)
        })
    },[])

    return (


        <GlobalContext.Provider value={{
            setIsLoading,
            isLoadig,
            user,
            setUser,
            isLoggedIn,
        }}>{children}</GlobalContext.Provider>
    )
  }

  export default GlobalProvider