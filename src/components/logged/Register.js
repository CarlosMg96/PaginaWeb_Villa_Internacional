import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/LOGO.png";
import NavbarCom from "./NavbarCom";
export function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState();
  const { signup } = useAuth();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSummit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
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
          <select id="role">
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </select>
        </label>

        <button>Register</button>
      </form>
    </div>
    </div>
  );
}
export default Register;
