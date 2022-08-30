import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import NavbarCom from "./NavbarCom";
export function Register() {
  const [user, setUser] = useState(false);

  const navigate = useNavigate();
  const [error, setError] = useState();
  const { signup } = useAuth();

  //En caso de no funcionar corregir aquí
  const handleChange = () => {
    console.log("Hola admin")
  };

  const handleSummit = async (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const role = e.target.elements.role.value

    console.log(email, password, role);
    setError("");
    try {
      signup(email, password, role);
      navigate("/");
    } catch (error) {
      console.log(error.code);
    }
  };

  const { logout,  loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };



  return (
    <div class="container-fluid">
    <NavbarCom/>

      <div>
      {error && <p>{error}</p>}

      <form onSubmit={handleSummit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="youremail@comany.com"
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="*******"
          onChange={handleChange}
        />

        <label>
          Rol:
          <select name="role" id="role"  onChange={handleChange}>
            <option name="user" value="user">Socio</option>
            <option name="admin" value="admin">Administrador</option>
          </select>
        </label>

        <button>Register</button>
      </form>
    </div>
    </div>
  );
}
export default Register;
