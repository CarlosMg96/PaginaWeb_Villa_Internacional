import React, { useState } from "react";
import SociosDataService from "../../services/sociosServices";
import { Alert } from "react-bootstrap";
import NavbarCom from "../../components/logged/NavbarCom";

function CreateAds({ id, setSociosId }) {
  const [noMenbresia, setNoMenbresia] = useState(0);
  const [apelativo, setApelativo] = useState("");
  const [titular, setTitular] = useState("");
  const [tipo, setTipo] = useState("");
  const [tipoPago, setTipoPago] = useState("");
  const [email, setEmail] = useState("");
  const [telCelular, setTelcelular] = useState("");
  const [telCasa, setTelCasa] = useState("");
  const [casilleros, setCasilleros] = useState("");
  const [activo, setActivo] = useState("Activo");
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
  const [hijo, setHijo] = useState("");
  const [importe, setImporte] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  //Faltaria agregar el auth para ligar todo ya que llaves foraneas
  // se ven muy complicadas

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (
      apelativo === "" ||
      titular === "" ||
      tipo === "" ||
      tipoPago === "" ||
      email === "" ||
      telCelular === "" ||
      telCasa === "" ||
      casilleros === "" ||
      activo === "" ||
      fNacimiento === "" ||
      fIngreso === "" ||
      colonia === "" ||
      direccion === "" ||
      ciudad === "" ||
      cp === "" ||
      pais === ""
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
      importe,
      createdAt: new Date(),
    };
    console.log(newSocio);

    try {
      if (id !== undefined && id !== "") {
        await SociosDataService.updateSocio(id, newSocio);
        setSociosId("");
        setMessage({ error: false, msg: "Actualización exitosa!" });
      } else {
        await SociosDataService.sociosAdd(newSocio);
        setMessage({ error: false, msg: "Nueva aviso añadido!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setApelativo("");
    setFIngreso("");
    setTitular("");
    setMesAdeudo("");
    setTipo("");
    setDireccion("");
    setTipoPago("");
    setColonia("");
    setEmail("");
    setCiudad("");
    setTelcelular("");
    setCp("");
    setTelCasa("");
    setPais("");
    setCasilleros("");
    setObservaciones("");
    setActivo("");
    setFotoTitular("");
    setFNacimiento("");
    setHijo("");
    setImporte("");
  };

  function changeApelativo(e) {
    setActivo(e.target.value);
  }

  function changeTipo(e) {
    setTipo(e.target.value);
    setTipoPago(e.target.value);
  }

  return (
    <div>
      <NavbarCom />
      <h1 className="text-center">Nuevo Socio</h1>
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
        <div className="container">
          <div class="row text-center">
            <form onSubmit={handleSubmit}>
              <div className="form-row text-center">
                
                  <div className="form-group col-sm-12 col-md-4 col-lg-2mt-2 text-center">
                    <label for="nombre">Titular*</label>
                    <input
                      className="form-control"
                      type="text"
                      name="titular"
                      id="itular"
                      placeholder="nombre del titular"
                      value={titular}
                      onChange={(e) => setTitular(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-12 col-md-4 col-lg-2 mt-2 text-center">
                    <label for="formGroupExampleInput2">Apelativo*</label>
                    <p>
                      <select
                        className="form-group"
                        value={apelativo}
                        onChange={changeApelativo}
                      >
                        <option>Sra.</option>
                        <option>Sr.</option>
                        <option>Lic.</option>
                        <option>Ing.</option>
                        <option>Mtro.</option>
                        <option>Mtra.</option>
                        <option>Dr.</option>
                        <option>Dra.</option>
                      </select>
                    </p>
                    <p>Apelativo seleccionado: {apelativo}</p>
                  </div>
                  <div class="form-group col-sm-12 col-md-4 col-lg-2 mt-2 text-center">
                    <label for="formGroupExampleInput">Tipo* </label>
                    <p>
                      <select value={tipo} onChange={changeTipo}>
                        <option>Matrimonial</option>
                        <option>Individual</option>
                        <option>Juvenil</option>
                        <option>Gimnasio</option>
                        <option>Otros</option>
                      </select>
                    </p>
                    <p>Tipo seleccionado: {tipo}</p>
                  </div>
                  <div class="form-group col-sm-12 col-md-4 col-lg-2 text-center">
                    <label for="formGroupExampleInput">Tipo* </label>
                    <p>
                      <select value={tipoPago} onChange={changeTipo}>
                        <option>Anual</option>
                        <option>Mensual</option>
                      </select>
                    </p>
                    <p>Pago seleccionado: {tipoPago}</p>
                  </div>
              
                {/* bloque 2 */}

                  <div className="form-group col-sm-12 col-md-4 col-lg-2mt-2 text-center">
                    <label for="nombre">Email del titular*</label>
                    <input 
                      className="form-control"
                      type="email"
                      name="emailTitular"
                      id="emailTitular"
                      placeholder="email del titular"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group col-sm-12 col-md-4 col-lg-2mt-2 text-center">
                    <label for="nombre">Teléfono celular*</label>
                    <input 
                      className="form-control"
                      type="text"
                      name="telCel"
                      id="telCel"
                      placeholder="5277701800"
                      value={telCelular}
                      onChange={(e) => setTelcelular(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-12 col-md-4 col-lg-2mt-2 text-center">
                    <label for="nombre">direccion*</label>
                    <input 
                      className="form-control"
                      type="text"
                      name="direccion"
                      id="direccion"
                      placeholder="Calle benito juarez o Calzada de Guadalupe"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-12 col-md-4 col-lg-2mt-2 text-center">
                    <label for="nombre">Colonia*</label>
                    <input 
                      className="form-control"
                      type="text"
                      name="colonia"
                      id="colonia"
                      placeholder="Los Presidentes"
                      value={colonia}
                      onChange={(e) => setColonia(e.target.value)}
                    />
                  </div>

                  <div className="form-group col-sm-12 col-md-4 col-lg-2mt-2 text-center">
                    <label for="nombre">Ciudad*</label>
                    <input 
                      className="form-control"
                      type="text"
                      name="ciudad"
                      id="ciudad"
                      placeholder="Cuernavaca, Morelos"
                      value={ciudad}
                      onChange={(e) => setCiudad(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-12 col-md-4 col-lg-2mt-2 text-center">
                    <label for="nombre">Codigo Postal*</label>
                    <input 
                      className="form-control"
                      type="text"
                      name="cp"
                      id="cp"
                      placeholder="62589"
                      value={cp}
                      onChange={(e) => setCp(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-12 col-md-4 col-lg-2mt-2 text-center">
                    <label for="nombre">País*</label>
                    <input 
                      className="form-control"
                      type="text"
                      name="pais"
                      id="pais"
                      placeholder="México"
                      value={pais}
                      onChange={(e) => setPais(e.target.value)}
                    />
                  </div>

                  {/* bloque 3 */}
                  {/* Al momento de registrat una persona se registra para nuevo usuario
                  se registrará con todo eseptp 
                  */}

<div className="form-group col-sm-12 col-md-4 col-lg-2mt-2 text-center">
                    <label for="nombre">Importe*</label>
                    <input 
                      className="form-control"
                      type="text"
                      name="importe"
                      id="importe"
                      placeholder="1666"
                      value={importe}
                      onChange={(e) => setImporte(e.target.value)}
                    />
                  </div>

                  <div className="form-group col-sm-12 col-md-4 col-lg-2mt-2 text-center">
                    <label for="nombre">Fecha de Nacimiento*</label>
                    <input 
                      className="form-control"
                      type="date"
                      name="nac"
                      id="nac"
                      placeholder="fecha"
                      value={fNacimiento}
                      onChange={(e) => setFNacimiento(e.target.value)}
                    />
                  </div>

                  <div className="form-group col-sm-12 col-md-4 col-lg-2mt-2 text-center">
                    <label for="nombre">Fecha de Ingreso*</label>
                    <input 
                      className="form-control"
                      type="date"
                      name="ing"
                      id="ing"
                      placeholder="fecha"
                      value={fNacimiento}
                      onChange={(e) => setFIngreso(e.target.value)}
                    />
                  </div>

                  <div className="form-group col-sm-12 col-md-4 col-lg-2mt-2 text-center">
                    <label for="nombre">Observaciones*</label>
                    <input 
                      className="form-control"
                      type="text"
                      name="observaciones"
                      id="observaciones"
                      placeholder="ninguna por el momento"
                      value={observaciones}
                      onChange={(e) => setObservaciones(e.target.value)}
                    />
                  </div>


{/* Este es para el botón summit */}

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
      </div>
    </div>
  );
}

export default CreateAds;
