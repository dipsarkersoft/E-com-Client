import React from 'react'
import Hero from '../../components/cards/Hero'
import UserMenu from '../../components/nav/UserMenu'
import { useAuth } from '../../contex/auth'

const UserOrders = () => {
 

     //contex
     const[auth,setAuth]=useAuth()
 
     return (
    <div>
     
      <div className="container-fluid">
          <div className="row">
               <div className="col-md-3">
                    <UserMenu/>

               </div>
               <div className="col-md-9">
                    <div className="p-3 mt-2 mb-2 h4 bg-light">
                         Orders
                          </div>
                        <p> User order history</p>  


               </div>

          </div>

      </div>
    </div>
  )
}

export default UserOrders
