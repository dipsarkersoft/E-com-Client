import axios from 'axios'
import React, { useState } from 'react'
import { useAuth } from '../../contex/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const Register = () => {
  //state.......
  const [name,setName]=useState("")
  const[email,setEmail]=useState('')
  const[number,setNumber]=useState('')
  const[password,setPassword]=useState('')
  
  //hooks
 const [auth,setAuth]=useAuth()
  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{

      const {data}=await axios.post(`/register`,{name,email,number,password})
       
      if(data?.error){
        toast.error("Register Failed")
      }
      else{

        localStorage.setItem("auth",JSON.stringify(data))
       setAuth({...auth,token:data.token,User:data.User})
       navigate('/dashboard/User')
       toast.success("Register successful")
  }
    }
    catch(error){
      console.log(error);
    }
  }


  return (
    <div>
     
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            
            <form onSubmit={handleSubmit} className="LOGINFORM">
            <h3 className='p-2 mb-4 '>REGISTER NOW</h3>

              <label>Enter your name</label>
              <input
              type="text"
              className="form-control mb-4 p-2" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              />

              <label>Enter your email</label>
             <input
                type="email"
                className="form-control mb-4 p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />


                <label>Enter your number</label>
              <input
                type="phone"
                className="form-control mb-4 p-2"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />


                
                <label>Enter your password</label>
              <input
                type="password"
                className="form-control mb-4 p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

               <button className="btn btn-primary" type="submit">Submit</button>
           
            </form>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Register
