import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/nav/Navbar'
import { Toaster } from "react-hot-toast";
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import PrivetRoute from './components/routes/PrivetRoute'
import UserOrders from './pages/user/Order'
import AdminRoute from './components/routes/AdminRoute'
import AdminCategory from './pages/admin/Category'
import AdminProduct from './pages/admin/CreateProduct'
import Products from './pages/admin/Product';
import UpdateProduct from './pages/admin/UpdateProduct';
import ReadProduct from './pages/ReadProduct';

import SearchValue from './pages/SearchValue';
import CartPage from './pages/Cartpage';
import UpdateProfile from './pages/UpdateProfile';
import UserProfileUpdate from './pages/user/Profile';
import AdminOrder from './pages/admin/AdminOrder';


const PageNotFound = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <h1 className='text-danger'>404 Page Not Found</h1>
      
    </div>
  )
}





const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Toaster/>
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/product/:id' element={<ReadProduct/>}/>
     <Route path="/search" element={<SearchValue/>} />
     <Route path='/cart' element={<CartPage/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/register' element={<Register/>}/>

     
     <Route path="/dashboard" element={<PrivetRoute/>}>
        
        <Route path="User" element={<UserProfileUpdate/>}/>
        <Route path="User/update" element={<UserProfileUpdate/>}/>
        <Route path="User/orders" element={<UserOrders/>}/>
     </Route>

    <Route path="/dashboard" element={<AdminRoute/>}>
      <Route path="admin" element={<UpdateProfile/>}/>
      <Route path="admin/update" element={<UpdateProfile/>}/>
      <Route path="admin/category" element={<AdminCategory/>}/>
      <Route path="admin/product" element={<AdminProduct/>}/>
      <Route path="admin/productiteam" element={<Products/>}/>
      <Route path="admin/allOrder" element={<AdminOrder/>}/>
      <Route path="admin/updateProduct/:id" element={<UpdateProduct/>}/>

     </Route> 


    <Route path='*' element={<PageNotFound/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
