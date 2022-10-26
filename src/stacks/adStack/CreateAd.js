import React, { useState } from "react";
import AdsDataService from "../../services/ads.service"
import {Alert} from 'react-bootstrap';
import NavbarCom from "../../components/logged/NavbarCom";
import { uploadFilesForAds, uploadImageAds } from "../../utils/firebase";

function CreateAds({ id, setAdsId }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("General");
  const [file, setFile] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async(e) => {
    e.preventDefault();
    setMessage("");
    if (titulo === "" || descripcion === "" || categoria ==="" ) {
      setMessage({ error: true, msg: "¡Todos los campos son obligatorios!" });
      return;
    }
    

    try {

      const result = await uploadFilesForAds(file)
      console.log("result: "+ result);

      const resultImage = await uploadImageAds(imagen)

      const newAd = {
        titulo,
        descripcion,
        categoria,
        createdAt:new Date(),
        file: result,
        imagen: resultImage,
      };
      console.log(newAd);


      if (id !== undefined && id !== "") {
        await AdsDataService.updateAd(id, newAd);
        setAdsId("");
        setMessage({ error: false, msg: "Actualización exitosa!" });
      } else {
        await AdsDataService.addAd(newAd);
        setMessage({ error: false, msg: "Nueva aviso añadido!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitulo("");
    setDescripcion("");
    setCategoria("");
    setFile("");
    setImagen("");
  };

    function changeCategoria(e){
      setCategoria(e.target.value);
    }

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
    <p><select value={categoria} onChange={changeCategoria}>
      <option>General</option>
      <option>Yoga</option>
      <option>Hotel</option>
      <option>Restaurant</option>
      </select></p>
      <p>Categoria seleccionada: {categoria}</p>
  </div>

  <div class="form-group col-sm-12 col-md-8 mt-2 text-center">
    <label for="formGroupExampleInput2">Archivo</label>
    <input
    className="form-control"
      type="file"
      name="file"
      id="file"
      placeholder="Subir documento..."
      //value={imagen}
      onChange={e => setFile(e.target.files[0])}
    />
  </div>

  <div class="form-group col-sm-12 col-md-8 mt-2 text-center">
    <label for="formGroupExampleInput2">Imagen</label>
    <input
    className="form-control"
      type="file"
      name="Imagen"
      id="Imagen"
      placeholder="Subir imagen..."
      //value={imagen}
      onChange={e => setImagen(e.target.files[0])}
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
