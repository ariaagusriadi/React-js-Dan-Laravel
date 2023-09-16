import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="container">
      <div className="d-flex align-items-center" style={{ height: "100vh" }}>
        <div style={{ width: "100%" }}>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">Welcome</div>
                <div className="card-body">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsum magni adipisci quam tenetur provident placeat! Placeat
                    itaque repellendus tempora aliquam ab pariatur, possimus
                    ullam suscipit, temporibus ipsam mollitia, eaque vitae.
                  </p>
                  <Link to={"/login"} className="btn btn-warning me-3">
                    Login
                  </Link>
                  <Link to={"/register"} className="btn btn-dark">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
