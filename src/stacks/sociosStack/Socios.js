import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import {Alert, Table, Button} from 'react-bootstrap';
import NavbarCom from '../../components/logged/NavbarCom';
import SociosDataService from "../../services/sociosServices"

const SociosList = ({ getSocioId}) => {
    const [socios, setSocios] = useState([]);

    useEffect(() => {
        getSocios();
    },[]);

    const getSocios = async () =>{
        const data = await SociosDataService.getAllSocios();
        console.log(data.docs);
        setSocios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    }

    const deleteHandler = async (id) =>{
        await SociosDataService.deleteSocio(id);
        getSocios();
    };

    return(
        <>
        <div className="container-fluid">
        <NavbarCom/>
        <div className="mb-2">
            <Button variant="dark edit" onClick={getSocios}>Actualizar</Button>
        </div>
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Foto titular</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Tipo de pago</th>
            <th>Espos@ del titular</th>
          </tr>
        </thead>
        <tbody>
          {socios.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td><img src={doc.file} width="50 px" height="50 px" alt="imagenTitular"/> </td>
                <td>{doc.titular}</td>
                <td>{doc.email}</td>
                <td>{doc.tipoPago}</td>
                <td>{doc.fileM? <img src={doc.fileM} width="50 px" height="50 px" alt="imagenEs"/> : null}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getSocioId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      </div>
        </>
    )
}

export default SociosList;