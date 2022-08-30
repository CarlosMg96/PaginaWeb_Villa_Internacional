import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";
import logo from "../assets/LOGO.png";

export function LoginForm({user}) {
  const [usuario, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState();
  const { login } = useAuth();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...usuario, [name]: value });
  };

  const handleSummit = async (e) => {
    e.preventDefault();
    setError("");
    try {

      await login(usuario.email, usuario.password);
      // if (user.role === 'admin') {
        console.log("usuar: "+ user);
         navigate("/");
      // }
    } catch (error) {
      console.log("No entra");
      console.log(error.code);
    }
  };

  return (
    <div class="container-fluid">
      <div>

        <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-3 text-center" style={{backgroundColor: '#A0BC32', marginTop: '10px', padding: '15px'}}>
        <img src={logo} alt="logo" width="230"/>
      </div>
        <div class="col-sm-12 col-md-6 col-lg-9">
        {error?.code && (
        <Alert variant={"danger"} dismissible onClose={() => setError("")}>
          {error?.code}
        </Alert>
      )}
      <div style={{ witch: "90%",
       margin: "0 auto",
        marginTop: "10px" }}>
        <div className="text-center"
          style={{
            witch: "70%",
            background: "#dddddd",
            margin: "0 auto",
            marginTop: "10px",
            padding: "10px",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <h1>Bienvenido a Villa Internacional</h1>

          <form onSubmit={handleSummit}>
            <div className="form-row text-center">
              <div className="form-group col-sm-12">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="youremail@comany.com"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 ">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*******"
                  onChange={handleChange}
                />
              </div>
            </div>
<br/>
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: "#A0BC32",
                BorderBottomColors: "ffffff",
                color: "#FFFFFF",
                borderRadius: "60",
                width: "50%",
                // marginTop: "30px",
                margin: "auto",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
        </div>
     
    
        </div>
      </div>
      <div>
        <footer
          style={{ color: "#9A9A9E", padding: "3px", textAlign: "center" }}
        >
          <p>VILLLA INTERNACIONAL|AppWEB</p>
          <p>
            Copyright © 2022 VILLA INTERNACIONAL, Todos los derechos reservados
          </p>
        </footer>
      </div>
    </div>
  );
}
export default LoginForm;
