import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import {Alert, Table, Button} from 'react-bootstrap';
import NavbarCom from '../../components/logged/NavbarCom';
import PromotionsDataService from "../../services/promotion.services"

const PromotionsList = ({ getPromotionId}) => {
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        getPromotions();
    },[]);

    const getPromotions = async () =>{
        const data = await PromotionsDataService.getAllPromotions();
        console.log(data.docs);
        setPromotions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    }

    const deleteHandler = async (id) =>{
        await PromotionsDataService.deletePromotion(id);
        getPromotions();
    };

    return(
        <>
        <div className="container-fluid">
        <NavbarCom/>
        <div className="mb-2">
            <Button variant="dark edit" onClick={getPromotions}>Actualizar</Button>
        </div>
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
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
                <td>{doc.nombre}</td>
                <td>{doc.descripcion}</td>
                <td>{doc.Lugar}</td>
                <td>{doc.descuento}</td>
                <td>{doc.vigencia}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getPromotionId(doc.id)}
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

export default PromotionsList;