
import  { React,useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Load from "../../images/load.png"


const Loading = ({path="login"}) => {

     //state;..........
     const[count,setCount]=useState(3)

     //hooks
     const navigate=useNavigate()
     const location=useLocation()


     useEffect(()=>{
          const interval=setInterval(()=>{
               setCount((currentCount)=> --currentCount)
          },1000)

          count === 0 && navigate(`/${path}`,{
               state:location.pathname
          }) 
          return ()=>clearInterval(interval)
         },[count])
         
         return(
          <div className="d-flex justify-content-center align-items-center" style={{height:"90vh"}}>

          <img src={Load} alt="Loading" style={{width:"400px"}} />      
               
          </div>
         )

}

export default Loading
