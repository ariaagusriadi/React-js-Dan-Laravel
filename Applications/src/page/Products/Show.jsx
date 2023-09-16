import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowProduct = () => {
  const [product, setProduct] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const { id } = useParams();

  const getDataProduct = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.get(`http://localhost:8000/api/product/${id}`).then((res) => {
      setProduct(res.data.data);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getDataProduct();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="card-header">Detail Product</div>
            <div className="card-body">
              {isLoading ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              ) : null}
              <div className="row">
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8000/${product.picture}`}
                    width={300}
                    alt=""
                  />
                </div>
                <div className="col-md-8">
                  <h5>{product.name}</h5>
                  <p>Rp. {product.price}</p>
                  <p>{product.stock}</p>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
