import React from "react";
import { useNavigate } from "react-router-dom";

import {useSearch} from "../contex/search";

const SearchValue = () => {


     const BaseUrl = "http://localhost:8000/api/v1/photo/"

     const navigate=useNavigate()
const [values, setValues] = useSearch();
 

return (
    
    
    <>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={BaseUrl+`${p._id}`}
                  className="card-img-top PIMG"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-primary ms-1"
                  onClick={() =>navigate(`/product/${p._id}`)}
                  
                  >More Details</button>
               
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchValue;