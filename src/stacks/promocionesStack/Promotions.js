import React, { useEffect, useState } from "react";
import NavbarCom from "../../components/logged/NavbarCom";
import PromotionsDataService from "../../services/promotion.services";
import {
  Badge,
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
import { ButtonCircle } from "../../extras/ButtonCircle";
import { uploadImagePromotion } from "../../utils/firebase";
import Alert, {
  msjConfirmacion,
  titleConfirmacion,
  msjExito,
  titleExito,
  msjError,
  titleError,
} from "../../pluggins/alert";

const PromotionsList = ({ getPromotionId }) => {
  const [promotions, setPromotions] = useState([]);
  const [open, setOpen] = useState(false);
  const [idPromo, setIdPromo] = useState("");
  const [Lugar, setLugar] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [descuento, setDescuento] = useState("");
  const [file, setFile] = useState("");
  const [nombre, setNombre] = useState("");
  const [vigencia, setVigencia] = useState("");

  useEffect(() => {
    getPromotions();
  }, []);

  const getPromotions = async () => {
    const data = await PromotionsDataService.getAllPromotions();
    console.log(data.docs);
    setPromotions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await PromotionsDataService.deletePromotion(id);
    getPromotions();
  };

  const EditPromo = async (id) => {
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

          if (file) {
            result = await uploadImagePromotion(file);
            console.log("result: " + result);
          } else {
            result = null;
          }

          const newPromotion = {
            nombre,
            descripcion,
            Lugar,
            descuento,
            vigencia,
            createdAt: new Date(),
            file: result,
            id: idPromo,
          };

          console.log(newPromotion);

          if (idPromo !== undefined && idPromo !== "") {
            await PromotionsDataService.updatePromotion(idPromo, newPromotion);
            console.log("Promoción actualizada");
            Alert.fire({
              title: titleExito,
              text: msjExito,
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "",
            });
          } else {
            await PromotionsDataService.addPromotion(newPromotion);
            console.log("promoción añadida");
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

        setNombre("");
        setDescripcion("");
        setLugar("");
        setDescuento("");
        setVigencia("");
        setFile("");
      },
    });
  };

  return (
    <>
      <div className="container-fluid">
        <NavbarCom />
        <div className="mb-2">
          <Button variant="dark edit" onClick={getPromotions}>
            Actualizar
          </Button>
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>File</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Lugar</th>
              <th>Descuento</th>
              <th>Vigencia</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((doc, index) => {
              return (
                <tr key={doc.id}>
                  <td>{index + 1}</td>
                  <td>
                    {doc.file ? <Image src={doc.file} width="80px" /> : null}
                  </td>
                  <td>{doc.nombre}</td>
                  <td>{doc.descripcion}</td>
                  <td>{doc.Lugar}</td>
                  <td>{doc.descuento}</td>
                  <td>{doc.vigencia}</td>
                  <td>
                    <ButtonCircle
                      type={"btn btn-warning btn-circle"}
                      icon="edit"
                      size={16}
                      onClickFunct={() => {
                        EditPromo(doc.id);
                        setLugar(doc.Lugar);
                        setDescripcion(doc.descripcion);
                        setDescuento(doc.descuento);
                        // setFile(doc.file);
                        setNombre(doc.nombre);
                        setIdPromo(doc.id);
                        setVigencia(doc.vigencia);
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
                      <label for="nombre">Nombre</label>
                      <input
                        className="form-control"
                        type="text"
                        name="nombre"
                        id="nombre"
                        placeholder="Nombre de la promoción"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
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
                      <label for="formGroupExampleInput">Lugar</label>
                      <input
                        className="form-control"
                        type="text"
                        name="Lugar"
                        id="Lugar"
                        placeholder="Spa"
                        value={Lugar}
                        onChange={(e) => setLugar(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label for="formGroupExampleInput2">Descuento</label>
                      <input
                        className="form-control"
                        type="text"
                        name="descuento"
                        id="descuento"
                        placeholder="20%"
                        value={descuento}
                        onChange={(e) => setDescuento(e.target.value)}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <label for="formGroupExampleInput2">Vigencia</label>
                      <input
                        className="form-control"
                        type="date"
                        name="vigencia"
                        id="vigencia"
                        placeholder="30/07/2022"
                        value={vigencia}
                        onChange={(e) => setVigencia(e.target.value)}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <label for="formGroupExampleInput2">Imagen*</label>
                      <input
                        className="form-control"
                        type="file"
                        name="file"
                        id="file"
                        placeholder="Cargar imagen..."
                        // value={file}
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      {"\n"}
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {"\n"}
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
                        Añadir
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

export default PromotionsList;
