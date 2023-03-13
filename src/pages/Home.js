
import { Checkbox, Radio } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import{useCart} from ".././contex/cart"
import Hero from '../components/cards/Hero'
import { Prices } from '../components/Prices';
import { TfiReload } from "react-icons/tfi";


const Home = () => {

  const BaseUrl = "http://localhost:8000/api/v1/photo/"

   const navigate = useNavigate();
   const [cart, setCart] = useCart();
   const [products, setProducts] = useState([]);
   const [categories, setCategories] = useState([]);
   const [checked, setChecked] = useState([]);
   const [radio, setRadio] = useState([]);
   const [total, setTotal] = useState(0);
   const [page, setPage] = useState(1);
   const [loading, setLoading] = useState(false);

  const getAllCategory = async () => {
    try {
      const {data} = await axios.get("/categories");
      console.log(data)

      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
    }

  };
  useEffect(() => {
    getAllCategory();
    
    getTotal()
    
  }, []);

  const getAllProducts = async () => {
    try {
  
      const { data } = await axios.get(`/listProducts/${page}`);
      setProducts(data.data);
    } catch (error) {
  
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/totalproduct");
      //console.log(data.data)
      setTotal(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
 

  const loadMore = async () => {
    try {
      const { data } = await axios.get(`listProducts/${page}`);

      setProducts([...products, ...data.data]);
    } catch (error) {
      console.log(error);
      
    }
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/filteredProducts", {
        checked,
        radio
      });
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);


  return (
    <>
      <Hero/>

      <div className="container-fluid row">
        <div className='row'>
        <div className="col-md-3">

       <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>    ))}
          </div>

          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn w-50 mt-3 btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
          
          </div>

        <div className='col-md-9'>
        <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  className="card-img-top PIMG "
                  src={BaseUrl+`${p._id}`}
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("bn-tk", {
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
                      onClick={() => navigate(`/product/${p._id}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 text-center p-3">

          {products && products.length < total && (
          <button
            className=" btn col-md-6"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          >
            {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <TfiReload/>
                  </>
                )}
          </button>
        )}      

          </div>
        </div>

        </div>
          </div>
          
      </>
  )
}

export default Home
