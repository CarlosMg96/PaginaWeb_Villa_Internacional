import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/logged/Home";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "./context/authContext";
import Register from "./components/logged/Register";
import Promotions from "./stacks/promocionesStack/Promotions"
import CreateAds from "./stacks/adStack/CreateAd";
import Ad from "./stacks/adStack/Ad";
import { ProtectectRouter } from "./components/ProtectecRouter";
import CreatePromotions from "./stacks/promocionesStack/CreatePromotion";
import CreateSocio from "./stacks/sociosStack/CreateSocio";
import Socios from "./stacks/sociosStack/Socios"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route
          path="/Register"
          element={
            <ProtectectRouter>
              <Register />
            </ProtectectRouter>
          }
        />
        <Route
          path="/Ad"
          element={
            <ProtectectRouter>
              <Ad />
            </ProtectectRouter>
          }
        />
         <Route
          path="/CreateAd"
          element={
            <ProtectectRouter>
              <CreateAds />
            </ProtectectRouter>
          }
        />
        <Route
          path="/Promotions"
          element={
            <ProtectectRouter>
              <Promotions />
            </ProtectectRouter>
          }
        />
        <Route
          path="/CreatePromotions"
          element={
            <ProtectectRouter>
              <CreatePromotions />
            </ProtectectRouter>
          }
        />
        <Route
          path="/SocioNuevo"
          element={
            <ProtectectRouter>
              <CreateSocio />
            </ProtectectRouter>
          }
        />
        <Route
          path="/Socios"
          element={
            <ProtectectRouter>
              <Socios />
            </ProtectectRouter>
          }
        />

        <Route
          path="/"
          element={
            <ProtectectRouter>
              <Home />
            </ProtectectRouter>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
