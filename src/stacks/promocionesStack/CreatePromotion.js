import React, { useState } from "react";
import PromotionsDataService from "../../services/promotion.services"
import {Alert} from 'react-bootstrap';
import NavbarCom from "../../components/logged/NavbarCom";
import { uploadImagePromotion} from "../../utils/firebase"

function CreatePromotions({ id, setPromotionId }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [Lugar, setLugar] = useState("");
  const [descuento, setDescuento] = useState("");
  const [file, setFile] = useState(null);
  const [vigencia, setVigencia] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  //const response = imagen

  const handleSubmit = async(e) => {
    e.preventDefault();
    setMessage("");
    if (nombre === "" || descripcion === "" || Lugar ==="" ||  vigencia === "" ) {
      setMessage({ error: true, msg: "¡Todos los campos son obligatorios!" });
      return;
    }

    

    try {
 
      
      
         const result = await uploadImagePromotion(file)
          console.log("result: "+ result);
          
          const newPromotion = {
            nombre,
            descripcion,
            Lugar,
            descuento,
            vigencia,
            createdAt:new Date(),
            file: result
          };
      
          console.log(newPromotion);

        if (id !== undefined && id !== "") {
          await PromotionsDataService.updatePromotion(id, newPromotion);
          setPromotionId("");
          setMessage({ error: false, msg: "Actualización exitosa!" });
        } else {
          await PromotionsDataService.addPromotion(newPromotion);
          setMessage({ error: false, msg: "Nueva promoción añadida!" });
        }
   //   })
   
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setNombre("");
    setDescripcion("");
    setLugar("");
    setDescuento("");
    setVigencia("");
    setFile("");
  };


 

  // const saveImage = async(file) => {
  //   const id = v4()
  //   const storageRef = ref(storage, `photosPromotion/${id}`);
  //   uploadBytes(storageRef, file).then(snapshot => {
  //     console.log(snapshot)
  //   });
  // };
 
 

  return (
    <div>
      <NavbarCom/>
      <h1 className="text-center">Crear Promoción</h1>
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
      onChange={(e) => setDescripcion(e.target.value) }
    />
  </div>
  <div class="form-group col-sm-12 col-md-8 mt-2 text-center">
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
  </div>
  <div class="form-group col-sm-12 col-md-8 mt-2 text-center">
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
  </div>

  <div class="form-group col-sm-12 col-md-8 mt-2 text-center">
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
  </div>

  <div class="form-group col-sm-12 col-md-8 mt-2 text-center">
    <label for="formGroupExampleInput2">Imagen</label>
    <input
    className="form-control"
      type="file"
      name="file"
      id="file"
      placeholder="Cargar imagen..."
      //value={imagen}
      onChange={e => setFile(e.target.files[0])}
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
    Añadir
  </button>
  </div>
  </div>
</form>
</div>
       </div>
        </div></div>
   
  );
}

export default CreatePromotions;
