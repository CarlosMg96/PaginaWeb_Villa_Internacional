import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Form,
  Button,
  Modal,
  Table,
  Container,
  Image,
} from "react-bootstrap";
import NavbarCom from "../../components/logged/NavbarCom";
import AdDataService from "../../services/ads.service";
import { ButtonCircle } from "../../extras/ButtonCircle";
import { uploadImageAds, uploadFilesForAds } from "../../utils/firebase";
import Alert, {
  msjConfirmacion,
  titleConfirmacion,
  msjExito,
  titleExito,
  msjError,
  titleError,
} from "../../pluggins/alert";

const AdsList = ({ getAdsId }) => {
  const [ads, setAds] = useState([]);
  const [open, setOpen] = useState(false);
  const [idAds, setIdAds] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [file, setFile] = useState(null);
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    getAds();
  }, []);

  const getAds = async () => {
    const data = await AdDataService.getAllAds();
    console.log(data.docs);
    setAds(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
          await AdDataService.deleteAd(id);
          getAds();
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

  const EditAds = async (id) => {
    console.log(id);
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (file === "") {
    //   return <Alert>La imagen es obligatoria</Alert>
    // }

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
          let resultImage;

          if (file) {
            result = await uploadFilesForAds(file);
            console.log("result: " + result);
          } else {
            result = null;
          }

          if (imagen) {
            resultImage = await uploadImageAds(imagen);
          } else {
            resultImage = null;
          }

          const newAd = {
            titulo,
            descripcion,
            categoria,
            createdAt: new Date(),
            file: result,
            imagen: resultImage,
            id: idAds,
          };

          console.log(newAd);

          if (idAds !== undefined && idAds !== "") {
            await AdDataService.updateAd(idAds, newAd);
            console.log("Aviso actualizado");
            Alert.fire({
              title: titleExito,
              text: msjExito,
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "",
            });
          } else {
            await AdDataService.addAd(newAd);
            console.log("Aviso añadido");
            Alert.fire({
              title: titleExito,
              text: msjExito,
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "",
            });
          }
          //   })
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

        setTitulo("");
        setDescripcion("");
        setCategoria("");
        setFile("");
        setImagen("");
      },
    });
  };

  function changeCategoria(e) {
    setCategoria(e.target.value);
  }

  return (
    <>
      <div className="container-fluid">
        <NavbarCom />
        <div className="mb-2">
          <Button variant="dark edit" onClick={getAds}>
            Actualizar
          </Button>
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Descripcion</th>
              <th>Categoria</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((doc, index) => {
              return (
                <tr key={doc.id}>
                  <td>{index + 1}</td>
                  <td>{doc.titulo}</td>
                  <td>{doc.descripcion}</td>
                  <td>{doc.categoria}</td>
                  <td>
                    <ButtonCircle
                      type={"btn btn-warning btn-circle"}
                      icon="edit"
                      size={16}
                      onClickFunct={() => {
                        EditAds(doc.id);
                        setIdAds(doc.id);
                        setDescripcion(doc.descripcion);
                        setTitulo(doc.titulo);
                        setCategoria(doc.categoria);
                      }}
                    />
                    <ButtonCircle
                      type={"btn btn-circle btn-info me-1"}
                      icon="trash"
                      onClickFunct={() => deleteHandler(doc.id)}
                      size={16}
                    ></ButtonCircle>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <>
        <Modal show={open} onHide={() => setOpen(false)}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#A0BC32", color: "#FFFF" }}
          >
            <Modal.Title>Editar Promoción</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <form onSubmit={handleSubmit}>
                <div className="form-row text-center">
                  <Row>
                    <Col>
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
                    </Col>
                  </Row>
                  <Row>
                    <Col>
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
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label for="formGroupExampleInput">Categoria</label>
                      <p>
                        <select value={categoria} onChange={changeCategoria}>
                          <option>General</option>
                          <option>Yoga</option>
                          <option>Hotel</option>
                          <option>Restaurant</option>
                        </select>
                      </p>
                      <p>Categoria seleccionada: {categoria}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label for="formGroupExampleInput2">Archivo</label>
                      <input
                        className="form-control"
                        type="file"
                        name="file"
                        id="file"
                        placeholder="Subir documento..."
                        //value={imagen}
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label for="formGroupExampleInput2">Imagen</label>
                      <input
                        className="form-control"
                        type="file"
                        name="Imagen"
                        id="Imagen"
                        placeholder="Subir imagen..."
                        //value={imagen}
                        onChange={(e) => setImagen(e.target.files[0])}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
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
                    </Col>
                  </Row>
                </div>
              </form>
            </Container>
          </Modal.Body>
        </Modal>
      </>
    </>
  );
};

export default AdsList;
