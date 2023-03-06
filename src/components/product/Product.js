import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'



const Product = () => {

 
//      const navigate = useNavigate();
//      const [products, setProducts] = useState([]);
//      const [category, setCategory] = useState([]);


     

//      useEffect(()=>{
//           loadProducts()
//          },[])
     
     
     
//          const loadProducts=async(slug)=>{
//           try{
//                const{data}=await axios.get("/listProducts/"+page)

//                setProduct(data)
//           }
//           catch(error){
//                console.log(error)
//           }
//          }
     


//   return (
//     <>
    
//     <div className="container mt-3 category">
//         <h4 className="text-center">Category - {category?.name}</h4>
//         <h6 className="text-center">{product?.length} result found </h6>
//         <div className="row">
//           <div className="col-md-9 offset-1">
//             <div className="d-flex flex-wrap">
//               {product?.map((p) => (
//                 <div className="card m-2" key={p._id}>
//                   <img
//                     src={`/api/v1/product/product-photo/${p._id}`}
//                     className="card-img-top"
//                     alt={p.name}
//                   />
//                   <div className="card-body">
//                     <div className="card-name-price">
//                       <h5 className="card-title">{p.name}</h5>
//                       <h5 className="card-title card-price">
//                         {p.price.toLocaleString("en-US", {
//                           style: "currency",
//                           currency: "USD",
//                         })}
//                       </h5>
//                     </div>
//                     <p className="card-text ">
//                       {p.description.substring(0, 60)}...
//                     </p>
//                     <div className="card-name-price">
//                       <button
//                         className="btn btn-info ms-1"
//                         onClick={() => navigate(`/product/${p.slug}`)}
//                       >
//                         More Details
//                       </button>
                    
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//           </div>
//         </div>
//       </div>
//     </>
//   )
}

export default Product
