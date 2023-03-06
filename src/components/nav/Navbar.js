
import { Badge } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contex/auth'
import {useCart} from "../../contex/cart"
import Search from '../forms/Search'


const Navbar = () => {


  const navigate = useNavigate()
  //hooks
  const [cart] = useCart();
  const [auth, setAuth] = useAuth()
  const [categories, setCategories] = useState([]);
  

  const logout = () => {
    setAuth({ ...auth, User: null, token: "" })
    localStorage.removeItem("auth")
    navigate("/login")
  }


  const getAllCategory = async () => {
    try {
      const {data} = await axios.get("/categories");
      //console.log(data)

      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (

    <div>

   <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🛒 DARAZ PRO
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <Search/>
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
        

              {!auth?.User ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.User?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.User?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={logout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>




    </div>
  )
}

export default Navbar
