import React, { Component } from "react";
import firebase from "firebase";

class FileUpload extends Component {
    constructor(){
        super();
        this.state = {
            uploadValues: 0
        };
    }
    handleOnChange (e) {
        const file = event.target.files[0]
        const storageRef = firebase.storage().ref(`photosPromotion/${file.name}`)
        const task = storageRef.put(file)
    
        task.on('state_changed', (snapshot) => {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          this.setState({
            uploadValue: percentage
          })
        }, (error) => {
          console.error(error.message)
        }, () => {
          // Upload complete
          this.setState({
            picture: task.snapshot.downloadURL
          })
        })
      }
    
      render () {
        return (
          <div>
            <progress value={this.state.uploadValue} max='100'>
              {this.state.uploadValues} %
            </progress>
            <br />
            <input type='file' onChange={this.handleOnChange.bind(this)}/>
            <br />
            <img width='90' src={this.state.picture} />
          </div>
        )
      }
    }
    

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
    const [hijo, setHijo] = useState("");
    const [message, setMessage] = useState({ error: false, msg: "" });
  

export default FileUpload;
