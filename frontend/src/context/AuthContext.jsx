
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const AuthContext=createContext()
const AuthContextProvider=({children})=>{
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn,setIsLoggedIn]=useState(false)

    const checkLoggedIn=async()=>{
        try {
            const res=await axios.get(backendUrl+'/api/users/checkLogin',{withCredentials:true})
            setIsLoggedIn(res.data.loggedIn)
        } catch (error) {
            setIsLoggedIn(false)
        }
    }
    useEffect(()=>{
        checkLoggedIn()
    },[])

    const value={backendUrl,isLoggedIn,setIsLoggedIn}

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider