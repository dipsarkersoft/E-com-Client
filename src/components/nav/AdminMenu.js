
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    


  return (
     <div>
    <div className='p-3 mt-2 mb-3 h4 bg-light'>
     Admin      
    </div>

    <ul className='list-group list-unstyled'>
     <li>
          <NavLink className="list-group-item" to="/dashboard/admin/category">
               Create category

          </NavLink>
     </li>

     <li>
          <NavLink className="list-group-item" to="/dashboard/admin/product">
               Create product
          </NavLink>
     </li>

     <li>
          <NavLink className="list-group-item" to="/dashboard/admin/productiteam">
              Product list

          </NavLink>
     </li>
     <li>
          <NavLink className="list-group-item" to="/dashboard/admin/update">
              Product list

          </NavLink>
     </li>
     <li>
          <NavLink className="list-group-item" to="/dashboard/admin/allOrder">
              Allorder

          </NavLink>
     </li>
    </ul>



    </div>

  )
}

export default AdminMenu
