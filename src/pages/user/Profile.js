import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../contex/auth";
import UserMenu from "../../components/nav/UserMenu";



const UserProfileUpdate = () => {


  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
     if (auth?.User) {
       const { name, email, address,number } = auth.User;
       setName(name);
       setEmail(email);
       setAddress(address);
       setNumber(number);
     }
   }, [auth?.User]);
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const { data } = await axios.put("/updateProfile",
        {
          name,
          number,
         address
       });

       if (data?.error) {
         toast.error("update failed");
       } else { 

         setAuth({ ...auth, User:data });
         let setData = localStorage.getItem("auth");
         setData = JSON.parse(setData);
         setData.User = data;
         localStorage.setItem("auth", JSON.stringify(setData));
         toast.success("Profile updated");
       }
     } catch (err) {
       console.log(err);
     }
   }
  return (

    <>
    <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserMenu/>
          </div>
          <div className="col-md-10">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Profile</div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control m-2 p-2"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus={true}
              />

              <input
                type="email"
                className="form-control m-2 p-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={true}
              />

              <input
                type="phone"
                className="form-control m-2 p-2"
                placeholder="Enter your Phone Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />

              <textarea
                className="form-control m-2 p-2"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <button className="btn btn-primary m-2 p-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default UserProfileUpdate