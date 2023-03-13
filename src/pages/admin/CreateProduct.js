import React, { useState, useEffect } from "react";
import AdminMenu from "./../../components/nav/AdminMenu"
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get all category
  const getAllCategory = async () => {

    try {

      
      const { data } = await axios.get("/categories");
      
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("shipping", shipping);
      productData.append("category", category);

      
      const data = axios.post("/product", productData);
      
      if (data?.error) {
        toast.error(data.error);

      } else {
        toast.success(`"products is created`);

        setTimeout(doSomething, 1000);
        function doSomething() {
          navigate("/dashboard/admin/productiteam");
        }
        
      }
    }

    catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <div className="BDY container-fluid dashboard">
        <div className="row">

          <div className="col-2">
            <AdminMenu />
          </div>
          <div className="col-10 row">
            <h1>Create Product</h1>

            <div>
            <div className="mb-2 col-4 p-2">
                {photo && (
                  <div className="text-center">
                    <img 
                     
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"100px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="row">
            <div className="col-4 p-2">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              </div>
              <div className="col-4 p-2">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

             
              
              <div className="mb-2 col-4 p-2">
                <label className="btn btn-outline-secondary col-md-6">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                   type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>



              <div className="mb-2 col-4 p-2">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-2 col-4 p-2">
                <input
                  type="number"
                  value={price}
                  min="1"
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-2 col-4 p-2">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-2 col-4 p-2">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-2 col-12 p-2">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>

            
            </div>
          </div>
        </div>
      
    </>
  );
};

export default CreateProduct;