import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useAuth } from "../../contex/auth";

import moment from "moment";
import { Select } from "antd";
import AdminMenu from "../../components/nav/AdminMenu";
const { Option } = Select;

const AdminOrder = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid BDY">
      <div className="row dashboard">
        <div className="col-md-2">
          <AdminMenu />
        </div>
        <div className="col-md-10">
          <h1 className="text-center">All Orders</h1>
     
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
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      
                      <td>{moment(o?.createAt).format("MMM Do YY")}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                 ) )}
                  </tbody>
                </table>
              </div>
            
        </div>
      </div>
      </div>
  );
};

export default AdminOrder