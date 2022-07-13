import React from "react";
import { useAuth } from "../../context/authContext";
import logo from "../../assets/LOGO.png";
import admin_F from "../../assets/admin_F.png";
import NavbarCom from "./NavbarCom"

export function Home() {


  return (
  <div className="container-fluid">
    <NavbarCom/>
    <div class="text-center mt-5">
        <img
          class="img-responsive"
          src={admin_F}
          alt="logo"
          width="300"
          opacity={0.4}
          padding="60px"
        />
      </div>

  </div>
  );
}

export default Home;
