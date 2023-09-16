import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [validation, setValidation] = useState([]);

  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = new useNavigate();

  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((res) => {
        setName(res.data.data.name);
        setPrice(res.data.data.price);
        setStock(res.data.data.stock);
        setDescription(res.data.data.description);
      })
      .catch((err) => {
        setValidation(err.response.data);
      });
  };

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("picture", picture);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    await axios
      .post(`http://localhost:8000/api/product/${id}`, formData)
      .then(() => {
        navigate("/product");
      })
      .catch((err) => {
        setValidation(err.response.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-10">
          <div className="card">
            <div className="card-header">Edit</div>
            <div className="card-body">
              <form onSubmit={updateProduct}>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
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
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
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
                        value={stock}
                        onChange={(e) => {
                          setStock(e.target.value);
                        }}
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
                    value={description}
                    onChange={(e) => {
                      e.target.value;
                    }}
                  ></textarea>
                  {validation.description && (
                    <small className="text-danger">
                      {validation.description[0]}
                    </small>
                  )}
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-dark">Edit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
