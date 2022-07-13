import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import {Alert, Table, Button} from 'react-bootstrap';
import NavbarCom from '../../components/logged/NavbarCom';
import AdDataService from "../../services/ads.service"

const AdsList = ({ getAdsId}) => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        getAds();
    },[]);

    const getAds = async () =>{
        const data = await AdDataService.getAllAds();
        console.log(data.docs);
        setAds(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    }

    const deleteHandler = async (id) =>{
        await AdDataService.deleteAd(id);
        getAds();
    };

    return(
        <>
        <div className="container-fluid">
        <NavbarCom/>
        <div className="mb-2">
            <Button variant="dark edit" onClick={getAds}>Actualizar</Button>
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
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getAdsId(doc.id)}
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

export default AdsList;