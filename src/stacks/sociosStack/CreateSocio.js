import React, { useState, useEffect } from "react";
import SociosDataService from "../../services/sociosServices";
import { Alert, Container, Stack, Col, Row } from "react-bootstrap";
import NavbarCom from "../../components/logged/NavbarCom";
import { uploadPhotoMatrimonio, uploadPhotoSocio } from "../../utils/firebase";
import user from "../../assets/user.png"

function CreateSocio({ id, setSociosId }) {
  const [noMenbresia, setNoMenbresia] = useState(0);
  const [apelativo, setApelativo] = useState("");
  const [titular, setTitular] = useState("");
  const [tipo, setTipo] = useState("");
  const [tipoPago, setTipoPago] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telCelular, setTelcelular] = useState("");
  const [telCasa, setTelCasa] = useState("");
  const [casilleros, setCasilleros] = useState("0");
  const [estado, setEstado] = useState("Activo");
  const [fNacimiento, setFNacimiento] = useState("");
  const [fIngreso, setFIngreso] = useState("");
  const [mesAdeudo, setMesAdeudo] = useState("0");
  const [direccion, setDireccion] = useState("");
  const [colonia, setColonia] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [nombreEs, setNombreEs] = useState("");
  const [cp, setCp] = useState("");
  const [pais, setPais] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [hijo, setHijo] = useState("0");
  const [importe, setImporte] = useState("");
  const [file, setFile] = useState(user);
  const [fileM, setFileM] = useState(user);
  const [message, setMessage] = useState({ error: false, msg: "" });


  // useEffect(() => {
  //   setNoMenbresia =  + 1;
  // },[])

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
      fNacimiento === "" ||
      fIngreso === "" ||
      colonia === "" ||
      direccion === "" ||
      ciudad === "" ||
      cp === "" ||
      pais === "" ||
      password === ""
    ) {
      setMessage({ error: true, msg: "¡Todos los campos son obligatorios!" });
      return;
    }

    try {
      console.log(file);
      const result = await uploadPhotoSocio(file, titular);
      console.log("result: " + result);

      const resultM = await uploadPhotoMatrimonio(fileM, titular);
      console.log("resultM: " + resultM);

      console.log(estado);

      const socio = {
        noMenbresia,
        apelativo,
        titular,
        file: result,
        tipo,
        tipoPago,
        email,
        telCelular,
        telCasa,
        casilleros,
        estado: "Activo",
        fNacimiento,
        fIngreso,
        mesAdeudo,
        direccion,
        colonia,
        ciudad,
        cp,
        pais,
        observaciones,
        importe,
        password,
        nombreEs, 
        fileM: resultM,
        createdAt: new Date(),
      };
      console.log(socio);

      if (id !== undefined && id !== "") {
        await SociosDataService.updateSocio(id, socio);
        setSociosId("");
        setMessage({ error: false, msg: "Actualización exitosa!" });
      } else {
         SociosDataService.addDocSocio(socio);
        setMessage({ error: false, msg: "Nuevo socio añadido!" });
        setNoMenbresia(noMenbresia + 1);
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
    setEstado("");
    setFNacimiento("");
    setHijo("");
    setImporte("");
    setPassword("");
    setFile("");
    setNombreEs("");
    setFileM("");
  };

  function changeApelativo(e) {
    setApelativo(e.target.value);
  }
  function changeTipo(e) {
    setTipo(e.target.value);
  }
  function changeTipoPago(e) {
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
            <div>

              <Container>
              <form onSubmit={handleSubmit}>
                {/* Bloque 1 */}
                <Row>
                  <Col>
                  <div className="form-group mt-2 text-center">
                  <label for="nombre">Nombre del titular*</label>
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
                  </Col>

                  <Col>
                  
                <div className="form-group mt-2 text-center">
                  <label for="formGroupExampleInput2">Apelativo*</label>
                  <p>
                    <select
                      className="form-group"
                      value={apelativo}
                      onChange={changeApelativo}
                    >
                      <option>Sra.</option>
                      <option>Sr.</option>
                      <option>Srita.</option>
                      <option>Lic.</option>
                      <option>Ing.</option>
                      <option>Mtro.</option>
                      <option>Mtra.</option>
                      <option>Dr.</option>
                      <option>Dra.</option>
                      <option>Arq.</option>
                      <option>Joven.</option>
                    </select>
                  </p>
                  <p>Apelativo seleccionado: {apelativo}</p>
                </div>
                  </Col>

                  <Col>
                  <div class="form-group  mt-2 text-center">
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
                  </Col>
                  <Col>
                  <div class="form-group mt-2 text-center">
                  <label for="formGroupExampleInput">Tipo* </label>
                  <p>
                    <select value={tipoPago} onChange={changeTipoPago}>
                      <option>Anual</option>
                      <option>Mensual</option>
                    </select>
                  </p>
                  <p>Pago seleccionado: {tipoPago}</p>
                </div>

                  </Col>
                </Row>


                <Row>
                  <Col>
                  <div className="form-group mt-2 text-center">
                  {tipo === "Matrimonial" ? <label for="nombre">Foto del segundo titular</label> : null}
                {tipo === "Matrimonial" ? 
                  <input
                    className="form-control"
                    type="file"
                    name="fileM"
                    id="fileM"
                    placeholder="Subir imagen del espos@"
                    //value={imagen}
                    onChange={(e) => setFileM(e.target.files[0])}
                  /> : null}
                </div>
                  </Col>

                  <Col>
                  <div className="form-group mt-2 text-center">
                  {tipo === "Matrimonial" ? <label for="nombre">Nombre del Espos@</label> : null}
                {tipo === "Matrimonial" ? 
                  <input
                    className="form-control"
                    type="text"
                    name="nombreEs"
                    id="nombreEs"
                    placeholder="Nombre del espos@"
                    value={nombreEs}
                    onChange={(e) => setNombreEs(e.target.value)}
                  /> : null}
                </div>
                  </Col>

                </Row>


                <Row>

                  <Col>
                  <div className="form-group mt-2 text-center">
                <label for="nombre">Foto</label>
                  <input
                    className="form-control"
                    type="file"
                    name="file"
                    id="file"
                    placeholder="Subir imagen del titular"
                    //value={imagen}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                  </Col>

                  <Col>
                  <div className="form-group mt-2 text-center">
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
                  </Col>

                  <Col>
                  <div className="form-group mt-2 text-center">
                  <label for="nombre">Teléfono de casa*</label>
                  <input
                    className="form-control"
                    type="text"
                    name="telCa"
                    id="telCa"
                    placeholder="5277701800"
                    value={telCasa}
                    onChange={(e) => setTelCasa(e.target.value)}
                  />
                </div>
                  </Col>

                </Row>

                

                <Row>
                  
                  <Col>
                  <div className="form-group mt-2 text-center">
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
                  </Col>

                  <Col>
                  <div className="form-group mt-2 text-center">
                  <label for="nombre">Fecha de Ingreso*</label>
                  <input
                    className="form-control"
                    type="date"
                    name="ing"
                    id="ing"
                    placeholder="fecha"
                    value={fIngreso}
                    onChange={(e) => setFIngreso(e.target.value)}
                  />
                </div>
                  </Col>
                  
                  <Col>
                  <div className="form-group mt-2 text-center">
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
                  </Col>
                </Row>

                <Row>
                  <Col>
                  <div className="form-group mt-2 text-center">
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
                  </Col>

                  <Col>
                  <div className="form-group mt-2 text-center">
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
                  </Col>

                  <Col>
                  <div className="form-group mt-2 text-center">
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
                  </Col>

                </Row>

                <Row>
                  <Col>
                  <div className="form-group mt-2 text-center">
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
                  </Col>

                  <Col>
                  <div className="form-group mt-2 text-center">
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
                  </Col>

                  <Col>
                  <div className="form-group mt-2 text-center">
                  <label for="nombre">Observaciones</label>
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
                  </Col>

                </Row>

                <Row>

                <Col>
                

                  </Col>

                  <Col>
                   <div className="form-group mt-2 text-center">
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
                  </Col>

                  <Col>
                  <div className="form-group mt-2 text-center">
                  <label for="nombre">Contraseña*</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                  </Col>
                </Row>

                  <Row>
                  <div class="form-group mt-2 text-center">
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: "#A0BC32",
                      BorderBottomColors: "ffffff",
                      color: "#FFFFFF",
                      borderRadius: "80",
                      width: "50%",
                      // marginTop: "30px",
                      margin: "auto",
                    }}
                  >
                    Crear
                  </button>
                </div>
                  </Row>
                  </form>
              </Container>
            </div>
      </div>
    </div>
  );
}

export default CreateSocio;
