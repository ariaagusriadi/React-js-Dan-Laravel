import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");

  const [validation, setValidation] = useState([]);

  const navigate = new useNavigate();
  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const storeProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("picture", picture);
    formData.append("description", description);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .post("http://localhost:8000/api/product", formData)
      .then(() => {
        navigate("/product");
      })
      .catch((err) => {
        setValidation(err.response.data);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="card-header">Create Product</div>
            <div className="card-body">
              <form onSubmit={storeProduct}>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                  {validation.name && (
                    <small className="text-danger">{validation.name[0]}</small>
                  )}
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      {validation.price && (
                        <small className="text-danger">
                          {validation.price[0]}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Stock
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={(e) => setStock(e.target.value)}
                      />
                      {validation.stock && (
                        <small className="text-danger">
                          {validation.stock[0]}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Picture
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleFileChange}
                  />
                  {validation.picture && (
                    <small className="text-danger">
                      {validation.picture[0]}
                    </small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Description
                  </label>
                  <textarea
                    cols="30"
                    rows="10"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  {validation.description && (
                    <small className="text-danger">
                      {validation.description[0]}
                    </small>
                  )}
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-dark">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
