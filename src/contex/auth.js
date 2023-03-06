import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContex=createContext()

const AuthProvider=({children})=>{
     
     const[auth,setAuth]=useState({
          User:null,
          token: ""
     })


     //axios config.......

     axios.defaults.baseURL=process.env.REACT_APP_API
    axios.defaults.headers.common["Authorization"]=auth?.token



    useEffect(()=>{
     const data=localStorage.getItem("auth")
     if(data){
          const parsed=JSON.parse(data)
          setAuth({...auth,User:parsed.User,token:parsed.token})
     }
},[])

return(
     <AuthContex.Provider value={[auth,setAuth]}>
          {children}
     </AuthContex.Provider>
)
}

const useAuth=()=>useContext(AuthContex)

export{useAuth,AuthProvider}