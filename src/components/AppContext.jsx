import { createContext, useState } from "react";


export const AppContext = createContext()

export const AppProvider = ({children})=>{

   
    
    const [loading, setLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const logIn = (token)=>{
        localStorage.setItem('token', token)
    }


    return (
        <AppContext.Provider value={{loading, setLoading, isLoggedIn, setIsLoggedIn}}>
            {children}
        </AppContext.Provider>
    )
    
}