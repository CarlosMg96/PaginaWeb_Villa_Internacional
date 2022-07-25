import React, { useState } from "react";
import SociosDataService from "../../services/sociosServices";
import {Alert} from 'react-bootstrap';
import NavbarCom from "../../components/logged/NavbarCom";

function CreateAds({ id, setsociosId }) {
  const [noMenbresia, setNoMenbresia] = useState("");
  const [apelativo, setApelativo] = useState("");
  const [titular, setTitular] = useState("");
  const [tipo, setTipo] = useState("");
  const [tipoPago, setTipoPago] = useState("");
  const [email, setEmail] = useState("");
  const [telCelular, setTelcelular] = useState("");
  const [telCasa, setTelCasa] = useState("");
  const [casilleros, setCasilleros] = useState("");
  const [activo, setActivo] = useState("");
  const [fNacimiento, setFNacimiento] = useState("");
  const [fIngreso, setFIngreso] = useState("");
  const [mesAdeudo, setMesAdeudo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [colonia, setColonia] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [cp, setCp] = useState("");
  const [pais, setPais] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [fotoTitular, setFotoTitular] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async(e) => {
    e.preventDefault();
    setMessage("");
    if ( apelativo === "" || titular ==="" || tipo === "" || tipoPago ===""
    || email === "" || telCelular ==="" || telCasa === "" || casilleros ==="" || activo === "" || fNacimiento ===""
    || fIngreso === "" || colonia ==="" || direccion === "" || ciudad ==="" || cp === "" || pais ===""
    ) {
      setMessage({ error: true, msg: "¡Todos los campos son obligatorios!" });
      return;
    }
    const newSocio = {
      noMenbresia,
      apelativo,
      titular,
      tipo,
      tipoPago,
      email,
      telCelular,
      telCasa,
      casilleros,
      activo,
      fNacimiento,
      fIngreso,
      mesAdeudo,
      direccion,
      colonia,
      ciudad,
      cp,
      pais,
      observaciones,
      fotoTitular,
      createdAt:new Date(),
    };
    console.log(newSocio);

    try {
      if (id !== undefined && id !== "") {
        await SociosDataService.updateAd(id, newAd);
        setAdsId("");
        setMessage({ error: false, msg: "Actualización exitosa!" });
      } else {
        await SociosDataService.addAd(newAd);
        setMessage({ error: false, msg: "Nueva aviso añadido!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setApelativo(""),
    setTitular(""),
  };

  return (
    <div>
      <NavbarCom/>
      <h1 className="text-center">Nuevo Aviso</h1>
      <div class="container-fluid">
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}
        </div>
       <div className="container-fluid">
       <div class="row text-center">

<form onSubmit={handleSubmit}>
  <div className="form-row text-center">
  <div className="form-group col-sm-12 col-md-8 mt-2 text-center">
    <label for="nombre">Titulo</label>
    <input
      className="form-control"
      type="text"
      name="titulo"
      id="titulo"
      placeholder="Aviso"
      value={titulo}
      onChange={(e) => setTitulo(e.target.value)}
    />
  </div>
  <div className="form-group col-sm-12 col-md-8 mt-2 text-center">
    <label for="formGroupExampleInput2">Descripcion</label>
    <input
    className="form-control"
      type="text"
      name="descripcion"
      id="descripcion"
      placeholder="Ven y disfuta"
      value={descripcion}
      onChange={(e) => setDescripcion(e.target.value)}
    />
  </div>
  <div class="form-group col-sm-12 col-md-8 mt-2 text-center">
    <label for="formGroupExampleInput">Categoria</label>
    <input
    className="form-control"
      type="text"
      name="categoria"
      id="categoria"
      placeholder="Yoga"
      value={categoria}
      onChange={(e) => setCategoria(e.target.value)}
    />
  </div>
 
  <div class="form-group col-sm-12 col-md-8 mt-2 text-center">
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
    Crear
  </button>
  </div>
  </div>
</form>
</div>
       </div>
        </div></div>
   
  );
}

export default CreateAds;
