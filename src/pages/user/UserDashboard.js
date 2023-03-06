import React from 'react'
import Hero from '../../components/cards/Hero'
import UserMenu from '../../components/nav/UserMenu'
import { useAuth } from '../../contex/auth'


const UserDashboard = () => {

  //state
const [auth,setAuth]= useAuth()

  return (
    <div>
      <Hero 
      
      title={`Hi ${auth?.User?.name}`}
      subTitle={"Dashboard"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>

          </div>
          <div className="col-md-9">
           <div className="p-3 mt-2 mb-2 h4 bg-light">
            User Information

           </div>
           <ul className="list-group">
            <li className="list-group-item">{auth?.User?.name}</li>
            <li className="list-group-item">{auth?.User?.email}</li>
           </ul>
          </div>

        </div>

      </div>
    </div>
  )
}

export default UserDashboard
