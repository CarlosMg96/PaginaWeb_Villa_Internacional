import FeatherIcon from "feather-icons-react";
import React, { useEffect, useState, useMemo } from "react";
import { Badge, Card, Col, Row, Form, Button, Modal } from "react-bootstrap";
import NavbarCom from "../../components/logged/NavbarCom";
import SociosDataService from "../../services/sociosServices";
import { FilterComponent } from "../../extras/FilteredItem";
import { CustomLoader } from "../../extras/CustomLoader";
import { ButtonCircle } from "../../extras/ButtonCircle";
import DataTable from "react-data-table-component";
import * as yup from "yup";
import { useFormik } from "formik";
import Alert, {
  msjConfirmacion,
  titleConfirmacion,
  msjExito,
  titleExito,
  msjError,
  titleError,
} from "../../pluggins/alert";
import Logo from "../../assets/admin.png";
import { uploadPhotoMatrimonio, uploadPhotoSocio } from "../../utils/firebase";
import { set } from "lodash";
import { sendSignInLinkToEmail } from "firebase/auth";

const SociosList = ({ getSocioId }) => {
  const [socios, setSocios] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [open, setOpen] = useState(false);
  const [socioSelected, setSocioSelected] = useState(null);
  const [idSocio, setIdSocio] = useState("");
  const [telCelular, setTelcelular] = useState("");
  const [telCasa, setTelCasa] = useState("");
  const [casilleros, setCasilleros] = useState("0");
  const [mesAdeudo, setMesAdeudo] = useState("0");
  const [direccion, setDireccion] = useState("");
  const [colonia, setColonia] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [cp, setCp] = useState("");
  const [pais, setPais] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [hijos, setHijos] = useState("");
  const [file, setFile] = useState(null);
  const [fileM, setFileM] = useState(null);
  const [tipo, setTipo] = useState("");
  const [tipoPago, setTipoPago] = useState("");
  const [titular, setTitular] = useState("");
  const [fileSelect, setFileSelect] = useState(null);
  const [fileMSelect, setFileMSelect] = useState(null);

  // Ya actualiza todos los campos de la tabla pero se muestra un mensaje de error
  // Ver esta parte en el siguiente actualización
  // Prioridad Alta

  useEffect(() => {
    setLoading(true);
    getSocios();
  }, []);

  const getSocios = async () => {
    const data = await SociosDataService.getAllSocios();
    setSocios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    Alert.fire({
      title: titleConfirmacion,
      text: msjConfirmacion,
      icon: "warning",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "",
      reverseButtons: true,
      backdrop: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: !Alert.isLoading,
      preConfirm: async () => {
        try {
          await SociosDataService.deleteSocio(id);
          getSocios();
          Alert.fire({
            title: titleExito,
            text: msjExito,
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "",
          });
        } catch (err) {
          console.log(err);
          Alert.fire({
            title: titleError,
            text: msjError,
            icon: "warning",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "",
          });
        }
      },
    });
  };

  const filteredItems = socios.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  // const editHandler = (createSocio, id) => {
  //   console.log(id);
  //   console.log(createSocio);
  //   setIdSocio(createSocio.id);
  //   console.log("llego aqui ");
  //   setSocioSelected(new Object(createSocio));
  //   setOpen(true);
  //   console.log(createSocio);
  // };

  const editHandler = async (id) => {
    console.log(id);
    setOpen(true);
  };

  const headerComponent = useMemo(() => {
    const clearText = () => {
      if (filterText) {
        setFilterText("");
      }
      console.log("filterText");
      console.log(filterText);
    };
    return (
      <Row>
        <Col>
          <Button variant="dark edit" onClick={getSocios}>
            Actualizar
          </Button>
        </Col>
        <Col>
          <FilterComponent
            filterText={filterText}
            onClear={clearText}
            onFilter={(e) => setFilterText(e.target.value)}
          />
        </Col>
      </Row>
    );
  }, [filterText]);

  const statusChange = (socios) => {
    console.log(socios);
    Alert.fire({
      title: titleConfirmacion,
      text: msjConfirmacion,
      icon: "warning",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "",
      reverseButtons: true,
      backdrop: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: !Alert.isLoading,
      preConfirm: async () => {
        // console.log(updatedSocio);
        // return await SociosDataService.updateSocio(socios.id, updatedSocio)
        // .then((response) => {
        //   console.log(response); // Aquí no llega nada
        //   if (!response.error) {
        //     setSocios((asociados) => [
        //       updatedSocio,
        //       ...asociados.filter((it) => it.id !== socios.id),
        //     ]);
        //         getSocios();
        //         Alert.fire({
        //           title: titleExito,
        //           text: msjExito,
        //           icon: "success",
        //           confirmButtonText: "Aceptar",
        //           confirmButtonColor: "",
        //         });
        //       }
        //       // return response;
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //       getSocios();
        //       Alert.fire({
        //         title: titleError,
        //         text: msjError,
        //         icon: "warning",
        //         confirmButtonText: "Aceptar",
        //         confirmButtonColor: "",
        //       });
        //     });
        try {
          let updatedSocio;
          socios.estado === "Activo"
            ? (updatedSocio = {
                ...socios,
                estado: "Inactivo",
              })
            : (updatedSocio = {
                ...socios,
                estado: "Activo",
              });
          await SociosDataService.updateSocio(socios.id, updatedSocio);
          getSocios();
          Alert.fire({
            title: titleExito,
            text: msjExito,
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "",
          });
        } catch (error) {
          Alert.fire({
            title: titleError,
            text: msjError,
            icon: "warning",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "",
          });
        }
      },
    });
  };

  const columns = [
    {
      name: "#",
      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: "No. Membresía",
      cell: (row) => <div>{row.noMembresia}</div>,
    },
    {
      name: "Foto Titular",
      cell: (row) => (
        <div>
          {row.file ? (
            <img
              src={row.file}
              width="50 px"
              height="50 px"
              alt="imagenTitular"
            />
          ) : null}
        </div>
      ),
    },
    {
      name: "Nombre de Titular",
      cell: (row) => <div>{row.titular}</div>,
    },
    {
      name: "Correo",
      cell: (row) => <div>{row.email}</div>,
    },
    {
      name: "Tipo de Pago",
      cell: (row) => (
        <div>
          {row.tipoPago} {row.tipo}
        </div>
      ),
    },
    {
      name: "Números de contacto",
      cell: (row) => (
        <div>
          Celular: {row.telCelular} tel. {row.telCasa}
        </div>
      ),
    },
    {
      name: "Dirección",
      cell: (row) => (
        <div>
          {row.direccion}, código postal: {row.cp}, col. {row.colonia},{" "}
          {row.ciudad} país {row.pais}{" "}
        </div>
      ),
    },
    {
      name: "Nombre de espos@",
      cell: (row) => <div>{row.nombreEs}</div>,
    },
    {
      name: "Foto de espos@",
      cell: (row) => (
        <div>
          {row.fileM ? (
            <img
              src={row.fileM}
              width="50 px"
              height="50 px"
              alt="imagenEsTitular"
            />
          ) : null}
        </div>
      ),
    },
    {
      name: "Observaciones",
      cell: (row) => <div>{row.observaciones}</div>,
    },
    {
      name: "Estado",
      cell: (row) =>
        row.estado === "Activo" ? (
          <Badge pill bg="success">
            {row.estado}
          </Badge>
        ) : (
          <Badge pill bg="danger">
            {row.estado}
          </Badge>
        ),
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <ButtonCircle
            type={"btn btn-circle btn-info me-1"}
            icon="trash"
            onClickFunct={() => deleteHandler(row.id)}
            size={16}
          ></ButtonCircle>

          <ButtonCircle
            type={"btn btn-warning btn-circle"}
            icon="edit"
            size={16}
            onClickFunct={() => {
              editHandler(row.id);
              console.log("este es el row", row.id);
              setIdSocio(row.id);
              setMesAdeudo(row.mesAdeudo);
              setCasilleros(row.casilleros);
              setCiudad(row.ciudad);
              setColonia(row.colonia);
              setCp(row.cp);
              setDireccion(row.direccion);
              setFileM(row.fileM);
              setFileM(row.file);
              setTelCasa(row.telCasa);
              setTelcelular(row.telCelular);
              setHijos(row.hijos);
              setObservaciones(row.observaciones);
              setTitular(row.titular);
              setPais(row.pais);
              setTipo(row.tipo);
              setTipoPago(row.tipoPago);
            }}
          />
          {row.estado === "Activo" ? (
            <ButtonCircle
              type={"btn btn-success btn-circle"}
              icon="check-circle"
              size={16}
              onClickFunct={() => statusChange(row)}
            />
          ) : (
            <ButtonCircle
              type={"btn btn-danger btn-circle "}
              icon="x-circle"
              size={16}
              onClickFunct={() => statusChange(row)}
            />
          )}
        </>
      ),
    },
  ];
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por pagina",
    rangeSeparatorText: "de",
  };

  const handleClose = () => {
    setAbierto(false);
    setOpen(false);
    //Resetear el formulario
    // editFormik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      telCasa: "",
      telCelular: "",
      email: "",
      casilleros: "",
      pais: "",
      colonia: "",
      cp: "",
      direccion: "",
      mesAdeudo: "",
      observaciones: "",
    },
  });

  // const editFormik = useFormik({
  //   initialValues: {
  //     telCasa: "",
  //     telCelular: "7777777777",
  //     email: "",
  //     casilleros: "",
  //     pais: "",
  //     colonia: "",
  //     cp: "",
  //     direccion: "",
  //     mesAdeudo: "",
  //     observaciones: "",
  //   },
  //   // validationSchema:  yup.object().shape({
  //   //   telCasa: yup
  //   //     .string()
  //   //     .required("Campo obligatorio")
  //   //     .min(10, "Minimo 8 digitos"),
  //   //   telCelular: yup
  //   //   .string()
  //   //   .required("Campo obligatorio")
  //   //   .min(10, "Minimo 10 digitos"),
  //   //   email: yup
  //   //   .string()
  //   //     .required("Campo obligatorio")
  //   //     .min(6, "Minimo 6 caracteres"),
  //   //   pais: yup
  //   //   .string()
  //   //   .required("Campo obligatorio")
  //   //   .min(3, "Minimo 3 caracteres"),
  //   //   colonia: yup
  //   //   .string()
  //   //   .required("Campo obligatorio")
  //   //   .min(3, "Minimo 3 caracteres"),
  //   //   cp: yup
  //   //   .string()
  //   //   .required("Campo obligatorio")
  //   //   .min(5, "Minimo 5 caracteres"),
  //   //   direccion: yup
  //   //   .string()
  //   //   .required("Campo obligatorio")
  //   //   .min(3, "Minimo 3 caracteres"),
  //   // }),
  //   onSubmit: (values) => {
  //     console.log(socios);
  //     Alert.fire({
  //       title: titleConfirmacion,
  //       text: msjConfirmacion,
  //       icon: "warning",
  //       confirmButtonText: "Aceptar",
  //       confirmButtonColor: "",
  //       cancelButtonText: "Cancelar",
  //       cancelButtonColor: "",
  //       showCancelButton: true,
  //       reverseButtons: true,
  //       showLoaderOnConfirm: true,
  //       backdrop: true,
  //       allowOutsideClick: !Alert.isLoading,
  //       preConfirm: () => {
  //         let contacto = socios.filter((socios2) => socios2.id === idSocio)[0];
  //         let contactsEdited = {
  //           ...contacto,
  //           telCasa: editFormik.values.telCasa,
  //           telCelular: editFormik.values.telCelular,
  //           email: editFormik.values.email,
  //           pais: editFormik.values.pais,
  //           colonia: editFormik.values.colonia,
  //           cp: editFormik.values.cp,
  //           direccion: editFormik.values.direccion,
  //           mesAdeudo: editFormik.values.mesAdeudo,
  //           observaciones: editFormik.values.observaciones,
  //           id: idSocio,
  //         };
  //         console.log(editFormik.values);
  //         console.log("Estamos en el formik" + idSocio);
  //         // if (
  //         //   editFormik.values.telCasa === "" ||
  //         //   editFormik.values.telCelular === "" ||
  //         //   editFormik.values.email === "" ||
  //         //   editFormik.values.pais === "" ||
  //         //   editFormik.values.colonia === "" ||
  //         //   editFormik.values.cp === "" ||
  //         //   editFormik.values.direccion === "" ||
  //         //   editFormik.values.mesAdeudo === "" ||
  //         //   editFormik.values.observaciones === ""
  //         // ) {
  //         //   console.log("Campos vacios");
  //         // } else {

  //         console.log("Carlitos", contactsEdited);
  //         console.log(contacto);
  //         return SociosDataService.updateSocio(idSocio, contactsEdited)
  //           .then((response) => {
  //             if (!response.error) {
  //               setSocios((contactos) => [
  //                 contactsEdited,
  //                 ...contactos.filter((it) => it.id != contactsEdited.id),
  //               ]);
  //               Alert.fire({
  //                 title: titleExito,
  //                 text: msjExito,
  //                 icon: "success",
  //                 confirmButtonText: "Aceptar",
  //                 confirmButtonColor: "",
  //               }).then((result) => {
  //                 if (result.isConfirmed) {
  //                   handleClose();
  //                 }
  //               });
  //             }
  //             return response;
  //           })
  //           .catch((error) => {
  //             Alert.fire({
  //               title: titleError,
  //               text: msjError,
  //               icon: "warning",
  //               confirmButtonText: "Aceptar",
  //               confirmButtonColor: "",
  //             }).then((result) => {
  //               if (result.isConfirmed) {
  //                 handleClose();
  //               }
  //             });
  //           });
  //         // }
  //       },
  //     });
  //   },
  // });

  const handleSummit = async (e) => {
    e.preventDefault();
    Alert.fire({
      title: titleConfirmacion,
      text: msjConfirmacion,
      icon: "warning",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "",
      reverseButtons: true,
      backdrop: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: !Alert.isLoading,
      preConfirm: async () => {
        try {
          let result;
          let resultM;

          console.log(file);
          if (fileSelect) {
            result = await uploadPhotoSocio(fileSelect, titular);
            console.log("result: " + result);
          } else {
            result = file;
          }

          if (fileMSelect) {
            resultM = await uploadPhotoMatrimonio(fileMSelect, titular);
            console.log("resultM: " + resultM);
          } else {
            resultM = fileM;
          }

          const updateSocioX = {
            telCasa,
            telCelular,
            casilleros,
            pais,
            colonia,
            cp,
            direccion,
            ciudad,
            mesAdeudo,
            observaciones,
            hijos,
            tipo,
            tipoPago,
            file: result,
            fileM: resultM,
          };
          if (idSocio !== null && idSocio !== undefined) {
            await SociosDataService.updateSocio(idSocio, updateSocioX);
            console.log("Socio actualizado");
            Alert.fire({
              title: titleExito,
              text: msjExito,
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "",
            });
          } else {
            console.log("Error en los datos del socio solicitado");
          }
        } catch (er) {
          Alert.fire({
            title: titleError,
            text: msjError,
            icon: "warning",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "",
          });
        }
        setPais("");
        setTelCasa("");
        setTelcelular("");
        setCp("");
        setDireccion("");
        setMesAdeudo("");
        setColonia("");
        setHijos("");
        setObservaciones("");
        setCiudad("");
        setTipo("");
        setTipoPago("");
        setFile(null);
        setFileM(null);
        setFileMSelect(null);
        setFileSelect(null);
        getSocios();
        
      },
    });
  };
  function changeMesAdeudo(e) {
    setMesAdeudo(e.target.value);
  }
  function changeTipo(e) {
    setTipo(e.target.value);
  }
  function changeTipoPago(e) {
    setTipoPago(e.target.value);
  }
  function changeHijos(e) {
    setHijos(e.target.value);
  }

  return (
    <>
      <>
        <div className="container-fluid">
          <NavbarCom />
          <Card className="mt-5">
            <Card.Header>
              <Row>
                <Col>
                  <div>
                    <h2 style={{ color: "#A0BC32", textAlign: "center" }}>
                      Socios
                    </h2>
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                noDataComponent={"No hay registros"}
                // progressPending={isLoading}
                // progressComponent={<CustomLoader />}
                subHeader
                subHeaderComponent={headerComponent}
                striped={true}
                highlightOnHover={true}
              />
            </Card.Body>
          </Card>

          <>
            <Modal show={open} onHide={() => setOpen(false)}>
              <Modal.Header
                closeButton
                style={{ backgroundColor: "#A0BC32", color: "#FFFF" }}
              >
                <Modal.Title>Editar Socio</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSummit}>
                  <Row>
                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Label>Teléfono de Casa </Form.Label>
                        <Form.Control
                          name="telCasa"
                          value={telCasa}
                          onChange={(e) => setTelCasa(e.target.value)}
                        />
                        {/* {editFormik.errors.name ? (
                      <span className="error-text">
                        {editFormik.errors.telCasa}
                      </span>
                    ) : null} */}
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Label>Teléfono Celular</Form.Label>
                        <Form.Control
                          name="telCelular"
                          value={telCelular}
                          onChange={(e) => setTelcelular(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Label>Meses con Adeudo</Form.Label>
                        {/* <Form.Control
                        name="email"
                        value={socios.email}
                        onChange={(e) => setEmail(e.target.value)}
                      /> */}
                        <p>
                          <select value={mesAdeudo} onChange={changeMesAdeudo}>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>más</option>
                          </select>
                        </p>
                        <p>meses con adeudo {mesAdeudo}</p>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Label>Tipo</Form.Label>
                        {/* <Form.Control
                        name="email"
                        value={socios.email}
                        onChange={(e) => setEmail(e.target.value)}
                      /> */}
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
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Label>Tiempo de pago</Form.Label>
                        <p>
                          <select value={tipoPago} onChange={changeTipoPago}>
                            <option>Anual</option>
                            <option>Mensual</option>
                          </select>
                        </p>
                        <p>Pago seleccionado: {tipoPago}</p>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Label>Cantidad de hijos</Form.Label>
                        <p>
                          <select value={hijos} onChange={changeHijos}>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>más</option>
                          </select>
                        </p>
                        <p>Tipo seleccionado: {hijos}</p>
                      </Form.Group>
                    </Col>

                    <Row>
                      <Col>
                        <Form.Group className="mb-4">
                          <Form.Label>Casilleros </Form.Label>
                          <Form.Control
                            name="casilleros"
                            value={casilleros}
                            onChange={(e) => setCasilleros(e.target.value)}
                          />
                          {/* {editFormik.errors.name ? (
                        <span className="error-text">
                          {editFormik.errors.casilleros}
                        </span>
                      ) : null} */}
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-4">
                          <Form.Label>Calle y número </Form.Label>
                          <Form.Control
                            name="direccion"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                          />
                        </Form.Group>

                        {/* <Form.Group className="mb-4">
                      <Form.Label>Mes de adeudo </Form.Label>
                      <Form.Control
                        name="mesAdeudo"
                        value={editFormik.values.mesAdeudo}
                        onChange={editFormik.handleChange}
                      />
                     
                    </Form.Group> */}
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Form.Group className="mb-4">
                          <Form.Label>Colonia </Form.Label>
                          <Form.Control
                            name="colonia"
                            value={colonia}
                            onChange={(e) => setColonia(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-4">
                          <Form.Label>Código postal </Form.Label>
                          <Form.Control
                            name="cp"
                            value={cp}
                            onChange={(e) => setCp(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Form.Group className="mb-4">
                          <Form.Label>Estado </Form.Label>
                          <Form.Control
                            name="ciudad"
                            value={ciudad}
                            onChange={(e) => setCiudad(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-4">
                          <Form.Label>País </Form.Label>
                          <Form.Control
                            name="pais"
                            value={pais}
                            onChange={(e) => setPais(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <Form.Group className="mb-4">
                      <Form.Label>foto del titular </Form.Label>
                      <Form.Control
                        name="observaciones"
                        type="file"
                        placeholder="Subir imagen del titular"
                        onChange={(e) => setFileSelect(e.target.files[0])}
                      />
                    </Form.Group>
                      </Col>
                      {tipo === "Matrimonial"? (
                           <Col>
                           <Form.Group className="mb-4">
                           <Form.Label>foto del 2do Titular </Form.Label>
                           <Form.Control
                             name="esposa"
                             type="file"
                             placeholder="Subir imagen del titular"
                             onChange={(e) => setFileMSelect(e.target.files[0])}
                           />
                         </Form.Group>
                           </Col>
                      ): (null)}
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label>Observaciones </Form.Label>
                      <Form.Control
                        name="observaciones"
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                      />
                    </Form.Group>

                    <Col className="text-end">
                      <Button
                        variant="danger"
                        onClick={handleClose}
                        className="me-3"
                      >
                        <FeatherIcon icon={"x"} />
                        &nbsp; Cerrar
                      </Button>
                      <Button variant="primary" type="submit">
                        <FeatherIcon icon={"check"} />
                        &nbsp; Editar
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
            </Modal>
          </>
        </div>
      </>
    </>
  );
};

export default SociosList;
