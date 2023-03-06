import React from 'react'
import Hero from '../../components/cards/Hero'
import AdminMenu from '../../components/nav/AdminMenu'
import { useAuth } from '../../contex/auth'

const AdminDashboard = () => {

     //contex....
     const[auth,setAuth]=useAuth()

  return (
    <div>
      

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu/>

          </div>
          <div className="col-md-10">
            <div className="p-3 mt-2 mb-2 h4 bg-light">
              Admin Information

            </div>
            <ul className="list-group">
              <li className="list-group-item">{auth?.User?.name}

              </li>
              <li className="list-group-item">{auth?.User?.email}

              </li>
              <li className="list-group-item">Admin</li>

            </ul>

          </div>

        </div>

      </div>
    </div>
  )
}

export default AdminDashboard
