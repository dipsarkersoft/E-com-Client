import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../contex/auth'
import Loading from './Loading'
import axios from 'axios'


const AdminRoute = () => {


     //contex..
     const[auth,setAuth]=useAuth()


     //STATE
     const[ok,setOk]=useState(false)

     useEffect(()=>{

          const adminCheak=async()=>{
               const{data}=await axios.get(`/admin-check`)
    
               if(data.ok){

                    setOk(true)
               }
               else{
                    setOk(false)
               }

          }
          if(auth?.token)adminCheak()
     },[auth?.token])


  return  ok? <Outlet/> :<Loading path=""/>
}

export default AdminRoute
