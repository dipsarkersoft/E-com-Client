import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";
import { DeleteFilled } from "@ant-design/icons/lib/icons";
import { DeleteProduct } from "../../components/Helper/Helper";


const Products = () => {

     const navigate=useNavigate()
     const BaseUrl="http://localhost:8000/api/v1/photo/"
     const [Product, setProducts] = useState([]);
      
        const DeletePostItem=(id)=>{
          DeleteProduct(id).then((res)=>{
               if(res.status===200){
                    getAllProducts()
                    toast.success("Product Delete Sucess")
               }
               else{
                    toast.error("Product Delete failed")
               }
          })
        }

     //getall products
     const getAllProducts = async () => {

          try {
               const { data } = await axios.get("/readAllProducts");
               setProducts(data.data);
          } catch (error) {
               console.log(error);
               toast.error("Someething Went Wrong");
          }
     };

     useEffect(() => {
          getAllProducts();
     }, []);

return(
     <div>
      <div className="container-fluid">
          <div className="row">
               <div className="col-2">
               <AdminMenu />


               </div>
               <div className="col-10">
               <table className="table table-hover ">
          <thead className="table_header">
            <tr>
             
              
              <th> Product Image</th>
              <th>Product Title</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>

          { Product.map((item,i)=>{
            return(
              <tr className="table_document">
              <td><img className="list-img" alt="Photo." src={BaseUrl+`${item._id}`} /></td>
            
              <td ><h6>{item.name}</h6></td>
              
              <td>
               <Link to={`/dashboard/admin/updateProduct/${item._id}`} className=" m-2 btn bg-success text-light" ><EditFilled/></Link> 
                <button onClick={DeletePostItem.bind(this,item._id)} className="btn bg-danger text-light"><DeleteFilled/></button>
              </td>

            </tr>

            )

          })}
          </tbody>
        </table>


               </div>


          </div>
        

      </div>


    </div>
)

};

export default Products;