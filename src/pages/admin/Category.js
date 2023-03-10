import { Modal } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import CategoryForm from '../../components/forms/CategoryForm'
import AdminMenu from '../../components/nav/AdminMenu'
import { useAuth } from '../../contex/auth'

const AdminCategory = () => {


     //contex..
     const[auth,setAuth]=useAuth()
// state
const [name, setName] = useState("");
const [categories, setCategories] = useState([]);
const [visible, setVisible] = useState(false);
const [selected, setSelected] = useState(null);
const [updatingName, setUpdatingName] = useState("");

useEffect(() => {
  loadCategories();
}, []);

const loadCategories = async () => {
  try {
    const { data } = await axios.get("/categories");
    setCategories(data);
  } catch (err) {
    console.log(err);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post("/category", { name });
    if (data?.error) {
      toast.error(data.error);
    } else {
      loadCategories();
      setName("");
      toast.success(`"${data.name}" is created`);
    }
  } catch (err) {
    console.log(err);
    toast.error("Create category failed. Try again.");
  }
};

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.put(`/category/${selected._id}`, {
      name: updatingName,
    });
    if (data?.error) {
      toast.error(data.error);
    } else {
      toast.success(`"${data.name}" is updated`);
      setSelected(null);
      setUpdatingName("");
      loadCategories();
      setVisible(false);
    }
  } catch (err) {
    console.log(err);
    toast.error("Category may already exist. Try again.");
  }
};
const handleDelete = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.delete(`/category/${selected._id}`);
    if (data?.error) {
      toast.error(data.error);
    } else {
      toast.success(`"${data.name}" is deleted`);
      setSelected(null);
      loadCategories();
      setVisible(false);
    }
  } catch (err) {
    console.log(err);
    toast.error("Category may already exist. Try again.");
  }
};

return (
  <>

    <div className="container-fluid BDY">
      <div className="row">
        <div className="col-md-2">
          <AdminMenu />
        </div>

        <div className="col-md-10">
          <div className="p-3 mt-2 mb-2 h4 bg-light">Manage Categories</div>

          <CategoryForm 
            value={name}
            setValue={setName}
            handleSubmit={handleSubmit}
          />

          <hr />

          <div className="col-md-10">
            {categories?.map((c) => (
              <button
                key={c._id}
                className="btn btn-outline-danger m-3"
                onClick={() => {
                  setVisible(true);
                  setSelected(c);
                  setUpdatingName(c.name);
                }}
              >
                {c.name}
              </button>
            ))}
          </div>

          <Modal
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            footer={null}
          >
            <CategoryForm
              value={updatingName}
              setValue={setUpdatingName}
              handleSubmit={handleUpdate}
              buttonText="Update"
              handleDelete={handleDelete}
            />
          </Modal>
        </div>

      </div>
    </div>
  </>
);
   
}

export default AdminCategory
