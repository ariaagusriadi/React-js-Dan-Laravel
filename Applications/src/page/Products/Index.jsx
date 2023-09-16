import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.get("http://localhost:8000/api/products").then((res) => {
      setProducts(res.data.data);
      setIsLoading(false);
    });
  };

  const deleteProducts = async (id) => {
    if (window.confirm("are you sure delete data?")) {
      await axios.delete(`http://localhost:8000/api/product/${id}`).then(
        () => {
          fetchData();
        }
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="card-header">
              <Link to={"/product/create"} className="btn btn-dark float-end">
                Add New Product
              </Link>
              {isLoading ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              ) : null}
            </div>
            <div className="card-body">
              <table className="table bordered">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Action</th>
                    <th>Name</th>
                    <th>Stock</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <Link
                            to={`/product/${product.id}`}
                            className="btn btn-info"
                          >
                            Detail
                          </Link>
                          <Link
                            className="btn btn-warning"
                            to={`/product/edit/${product.id}`}
                          >
                            {" "}
                            Edit
                          </Link>
                          <button
                            onClick={() => {
                              deleteProducts(product.id);
                            }}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                        <td>{product.name}</td>
                        <td>{product.stock}</td>
                        <td>
                          <img
                            src={`http://localhost:8000/${product.picture}`}
                            width={200}
                            alt=""
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>Field empty</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexProduct;
