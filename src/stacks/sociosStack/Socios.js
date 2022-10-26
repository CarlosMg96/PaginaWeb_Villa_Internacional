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

const SociosList = ({ getSocioId }) => {
  const [socios, setSocios] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [open, setOpen] = useState(false);
  const [socioSelected, setSocioSelected] = useState(null);
  const [idSocio, setIdSocio] = useState("");

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
    await SociosDataService.deleteSocio(id);
    getSocios();
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

  const editHandler = async (id) =>{
    console.log(id);
    setOpen(true);
  }

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
      <Button variant="dark edit" onClick={getSocios}>Actualizar</Button>     
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
      preConfirm: async() => {
         let updatedSocio;
        socios.estado === "Activo"
          ? (updatedSocio = {
              ...socios,
              estado: "Inactivo" ,
            })
          : (updatedSocio = {
              ...socios,
              estado: "Activo" ,
            });
        // let updatedSocio;
        // if (socios.estado === "Actvo"){
        //   updatedSocio={
        //     estado: "Inactivo"
        //   }
        // }else{
        //   updatedSocio={
        //     estado: "Activo"
        //   }
        // }

        return await SociosDataService.updateSocio(socios.id, updatedSocio)
          .then((response) => {
            console.log(response);
            if (!response.error) {
              setSocios((asociados) => [
                updatedSocio,
                ...asociados.filter((it) => it.id !== socios.id),
              ]);
              Alert.fire({
                title: titleExito,
                text: msjExito,
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "",
              });
            }
            return response;
          })
          .catch((error) => {
            Alert.fire({
              title: titleError,
              text: msjError,
              icon: "warning",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "",
            });
          });
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
          {row.direccion}, código postal: {row.cp}, col. {row.ciudad}, pais{" "}
          {row.pais}{" "}
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
              setIdSocio(row.id)
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
    editFormik.resetForm();
    
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
    },});

  const editFormik = useFormik({
    initialValues: {
      telCasa: "",
      telCelular: "7777777777",
      email: "",
      casilleros: "",
      pais: "",
      colonia: "",
      cp: "",
      direccion: "",
      mesAdeudo: "",
      observaciones: "",
    },
  // validationSchema:  yup.object().shape({
  //   telCasa: yup
  //     .string()
  //     .required("Campo obligatorio")
  //     .min(10, "Minimo 8 digitos"),
  //   telCelular: yup 
  //   .string()
  //   .required("Campo obligatorio")
  //   .min(10, "Minimo 10 digitos"),
  //   email: yup
  //   .string()
  //     .required("Campo obligatorio")
  //     .min(6, "Minimo 6 caracteres"),
  //   pais: yup
  //   .string()
  //   .required("Campo obligatorio")
  //   .min(3, "Minimo 3 caracteres"),
  //   colonia: yup
  //   .string()
  //   .required("Campo obligatorio")
  //   .min(3, "Minimo 3 caracteres"),
  //   cp: yup
  //   .string()
  //   .required("Campo obligatorio")
  //   .min(5, "Minimo 5 caracteres"),
  //   direccion: yup
  //   .string()
  //   .required("Campo obligatorio")
  //   .min(3, "Minimo 3 caracteres"),
  // }),
  onSubmit: (values) => {
    Alert.fire({
      title: titleConfirmacion,
      text: msjConfirmacion,
      icon: "warning",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "",
      showCancelButton: true,
      reverseButtons: true,
      showLoaderOnConfirm: true,
      backdrop: true,
      allowOutsideClick: !Alert.isLoading,
      preConfirm: () => {
        let contacto =socios.filter(socios2=> socios2.id === idSocio)[0]
        let contactsEdited = {...contacto,
          telCasa:editFormik.values.telCasa,
           telCelular:editFormik.values.telCelular,
           email:editFormik.values.email,
           pais:editFormik.values.pais,
           colonia:editFormik.values.colonia,
           cp:editFormik.values.cp,
           direccion:editFormik.values.direccion,
           mesAdeudo:editFormik.values.mesAdeudo,
           observaciones:editFormik.values.observaciones,
           id:idSocio};
        console.log(editFormik.values);
        console.log("Estamos en el formik" + idSocio);
        // if (
        //   editFormik.values.telCasa === "" ||
        //   editFormik.values.telCelular === "" ||
        //   editFormik.values.email === "" ||
        //   editFormik.values.pais === "" ||
        //   editFormik.values.colonia === "" ||
        //   editFormik.values.cp === "" ||
        //   editFormik.values.direccion === "" ||
        //   editFormik.values.mesAdeudo === "" ||
        //   editFormik.values.observaciones === "" 
        // ) {
        //   console.log("Campos vacios");
        // } else {
         
          console.log("Carlitos", contactsEdited);
          console.log(contacto)
        return SociosDataService.updateSocio(idSocio, contactsEdited)
          .then((response) => {
            if (!response.error) {
              setSocios((contactos) => [
                contactsEdited,
                ...contactos.filter((it) => it.id != contactsEdited.id),
              ]);
              Alert.fire({
                title: titleExito,
                text: msjExito,
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleClose();
                }
              });
            }
            return response;
          })
          .catch((error) => {
            Alert.fire({
              title: titleError,
              text: msjError,
              icon: "warning",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "",
            }).then((result) => {
              if (result.isConfirmed) {
                handleClose();
              }
            });
          });
        // }

        
      },
    });
  },

  

}
)

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
          <Modal.Header closeButton style={{backgroundColor:"#A0BC32" ,color:"#FFFF"}}>
            <Modal.Title>Editar Socio</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form onSubmit={editFormik.handleSubmit}>

              <Form.Group className="mb-4">
                <Form.Label>Teléfono de Casa </Form.Label>
                <Form.Control
                  name="telCasa"
                  value={editFormik.values.telCasa}
                  onChange={editFormik.handleChange}
                />
                {editFormik.errors.name ? (
                  <span className="error-text">{editFormik.errors.telCasa}</span>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Teléfono Celular</Form.Label>
                <Form.Control
                  name="telCelular"
                  value={editFormik.values.telCelular}
                  onChange={editFormik.handleChange}
                />
                {editFormik.errors.lastname ? (
                  <span className="error-text">
                    {editFormik.errors.telCelular}
                  </span>
                ) : null}
              </Form.Group>
              <Row>
                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    value={editFormik.values.email}
                    onChange={editFormik.handleChange}
                  />
                  {editFormik.errors.email ? (
                    <span className="error-text">
                      {editFormik.errors.email}
                    </span>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-4">
                <Form.Label>Casilleros </Form.Label>
                <Form.Control
                  name="casilleros"
                  value={editFormik.values.casilleros}
                  onChange={editFormik.handleChange}
                />
                {editFormik.errors.name ? (
                  <span className="error-text">{editFormik.errors.casilleros}</span>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>País </Form.Label>
                <Form.Control
                  name="pais"
                  value={editFormik.values.pais}
                  onChange={editFormik.handleChange}
                />
                {editFormik.errors.name ? (
                  <span className="error-text">{editFormik.errors.pais}</span>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Colonia </Form.Label>
                <Form.Control
                  name="colonia"
                  value={editFormik.values.colonia}
                  onChange={editFormik.handleChange}
                />
                {editFormik.errors.name ? (
                  <span className="error-text">{editFormik.errors.colonia}</span>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Código postal </Form.Label>
                <Form.Control
                  name="cp"
                  value={editFormik.values.cp}
                  onChange={editFormik.handleChange}
                />
                {editFormik.errors.name ? (
                  <span className="error-text">{editFormik.errors.cp}</span>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Dirección </Form.Label>
                <Form.Control
                  name="direccion"
                  value={editFormik.values.direccion}
                  onChange={editFormik.handleChange}
                />
                {editFormik.errors.name ? (
                  <span className="error-text">{editFormik.errors.direccion}</span>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Mes de adeudo </Form.Label>
                <Form.Control
                  name="mesAdeudo"
                  value={editFormik.values.mesAdeudo}
                  onChange={editFormik.handleChange}
                />
                {editFormik.errors.name ? (
                  <span className="error-text">{editFormik.errors.mesAdeudo}</span>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Observaciones </Form.Label>
                <Form.Control
                  name="observaciones"
                  value={editFormik.values.observaciones}
                  onChange={editFormik.handleChange}
                />
                {editFormik.errors.name ? (
                  <span className="error-text">{editFormik.errors.observaciones}</span>
                ) : null}
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
