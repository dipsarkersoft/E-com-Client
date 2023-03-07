import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import{useCart} from ".././contex/cart"
import { useNavigate, useParams } from 'react-router-dom';

const ReadProduct = () => {

     const BaseUrl = "http://localhost:8000/api/v1/photo/"
     const params = useParams();
     const navigate = useNavigate();
     const [cart, setCart] = useCart();
     const [product, setProduct] = useState({});
     const [relatedProducts, setRelatedProducts] = useState([]);
   
     //initalp details
     useEffect(() => {
     getProduct();
       
     }, []);
     //getProduct
     const getProduct = async () => {
       try {
         const { data } = await axios.get(
           `readproduct/${params.id}`
         );
         
         setProduct(data.data);
         getSimilarProduct(data?.data._id, data?.data.category._id);
       } catch (error) {
         console.log(error);
       }
     };
     //get similar product
     const getSimilarProduct = async (productId,categoryId) => {
       try {
         
         const { data } = await axios.get(
           `/relatedProducts/${productId}/${categoryId}`
         );
     
         setRelatedProducts(data?.data);
       } catch (error) {
         console.log(error);
       }
     };

     return (
          


         
          <div className='container-fluid BDY'>
         <div className="row container ">
           <div className="col-md-6">
             <img
               src={BaseUrl+`${product._id}`}
               className="card-img-top"
               alt={product.name}
               height="300"
               width={"350px"}
             />
           </div>
           <div className="col-md-6 ">
             <h1 className="text-center">Product Details</h1>
             <hr />
             <h6>Name :{product.name}</h6>
             <h6>Description :{product.description}</h6>
             <h6>
               Price :
               {product?.price?.toLocaleString("bn-tk", {
                 style: "currency",
                 currency: "BDT",
               })}
             </h6>
             <h6>Category : {product?.category?.name}</h6>
             <button class="btn btn-secondary ms-1"
                onClick={() => {
                    setCart([...cart, product]);
                      localStorage.setItem("cart", JSON.stringify([...cart, product]));
                       toast.success("Added to cart");
                                 }}
             >ADD TO CART
             </button>
           </div>
         </div>
         <hr />
         <div className="row container ">
           <h4>Similar Products ➡️</h4>
           {relatedProducts.length < 1 && (
             <p className="text-center">No Similar Products found</p>
           )}
           <div className="d-flex flex-wrap">
             {relatedProducts?.map((p) => (
               <div className="card m-2" key={p._id}>
                 <img
                   src={BaseUrl+`${product._id}`}
                   className="card-img-top PIMG"
                   alt={p.name}
                 />
                 <div className="card-body">
                   <div className="card-name-price">
                     <h5 className="card-title">{p.name}</h5>
                     <h5 className="card-title card-price">
                       {p.price.toLocaleString("bn-TK", {
                         style: "currency",
                         currency: "BDT",
                       })}
                     </h5>
                   </div>
                   <p className="card-text ">
                     {p.description.substring(0, 60)}...
                   </p>
                   <div className="card-name-price">
                     <button
                       className="btn btn-info ms-1"
                       onClick={(e) => 
                         {
                         navigate(`/product/${p._id}`)
                         window.location.reload()}
                    }
                                             
                     >
                       More Details
                     </button>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>
         </div>
     );



}

export default ReadProduct
