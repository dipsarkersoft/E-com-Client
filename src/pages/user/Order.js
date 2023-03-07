import React, { useEffect, useState } from 'react'
import UserMenu from '../../components/nav/UserMenu'
import { useAuth } from '../../contex/auth'
import axios from 'axios';
import moment from 'moment/moment';


const UserOrders = () => {
 
     const BaseUrl="http://localhost:8000/api/v1/photo/"

     const[auth,setAuth]=useAuth()
     const [orders, setOrders] = useState([]);
 
     const getOrders = async () => {
          try {
            const { data } = await axios.get("/orders");
            setOrders(data);
          } catch (error) {
            console.log(error);
          }
        };

        useEffect(() => {
          if (auth?.token) getOrders();
        }, [auth?.token]);

     return (
    <div>
     
      <div className="container-fluid">
          <div className="row">
               <div className="col-md-2">
                    <UserMenu/>

               </div>
               <div className="col-md-10">
                    <div className="p-3 mt-2 mb-2 h4 bg-light">
                         All ORders
                          </div>
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Status</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                    
                   
                     {orders?.map((o, i) => (

                         
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                   
               
                    ))} 
                    </tbody>
                  </table>
                </div>
          
          
               </div>

          </div>

      </div>
    </div>
  )
}

export default UserOrders
