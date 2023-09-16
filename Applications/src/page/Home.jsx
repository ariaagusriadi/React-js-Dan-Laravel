import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.get("http://localhost:8000/api/me").then((response) => {
      setUser(response.data.user);
    });
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    fetchData();
  }, []);

  const logoutHandler = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.post("http://localhost:8000/api/logout").then(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center" style={{ height: "100vh" }}>
        <div style={{ width: "100%" }}>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">Welcome</div>
                <div className="card-body">
                  <h5>Hello,{user.name}</h5>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Voluptas hic saepe nulla aut nesciunt, voluptate iusto
                    reprehenderit vero quasi, rem officiis vitae sunt totam
                    dicta tempore delectus, dolorum labore laborum?
                  </p>
                  <button className="btn btn-danger mx-2"  onClick={logoutHandler}>
                    Logout
                  </button> 
                  <Link to={'/product'} className="btn btn-dark">Product</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
