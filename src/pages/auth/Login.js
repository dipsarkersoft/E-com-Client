import axios from 'axios'
import React, { useState } from 'react'
import { useAuth } from '../../contex/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import Hero from '../../components/cards/Hero'
import { toast } from 'react-hot-toast'


const Login = () => {

  //state.........

  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')

//jooks
const[auth,setAuth]=useAuth()
const navigate=useNavigate()
const location=useLocation()

const handleSubmit=async(e)=>{
  e.preventDefault()
  try{
    const{data}=await axios.post(`/login`,
    {email,password})

    if(data?.error){
      toast.error(data.error)

    }
    else{
    localStorage.setItem("auth", JSON.stringify(data));
    setAuth({...auth,token:data.token,User:data.User})
    toast.success("Login successful")
    navigate( location.state||`/dashboard/${data?.User?.role ===1 ? "admin" :"user"}`)
    
    }
  }
  catch(error){
    console.log(error);
  }
}

  return (
    <div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 ">
            <form className='LOGINFORM' onSubmit={handleSubmit}>

            <h3 className='p-2 mb-4 '>LOG IN NOW</h3>
            <label>Enter your email</label>          
              <input
              type="email"
              className="form-control mb-4 p-2"
              value={email}
              autoFocus
              onChange={(e)=>setEmail(e.target.value)}/>

              <label>Enter your password</label>
              <input 
              type="password"
              className="form-control mb-4 p-2"
                value={password}
              onChange={(e)=>setPassword(e.target.value)}
              />
              
              <button className="btn btn-primary" type='submit'>Submit</button>
            </form>

          </div>

        </div>

      </div>


    </div>
  )
}

export default Login
