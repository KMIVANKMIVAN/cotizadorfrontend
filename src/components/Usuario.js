import React from "react";
import { Link } from "react-router-dom";
import ActualizarUsuarioPru from "./ActualizarUsuarioPru";
import CambiarPasswordPru from "./CambiarPasswordPru";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const Usuario = props => {
  const { url, usuarios } = props;
  return (
    <div>
      <Card border="light bg-transparent text-white">
        <Card.Body>
          <h4>Datos Personales</h4>
          <h5>
            ID {usuarios.id} Nombres{": "} {usuarios.nombres}{" "}
            {usuarios.ap_paterno} {usuarios.ap_materno}{" "}
            {usuarios.ap_casado ? `${usuarios.ap_casado}` : ""}
          </h5>
          <h5>
            {usuarios.numero_carnet
              ? `Numero de Carnet: ${usuarios.numero_carnet} `
              : ""}{" "}
            {usuarios.extesion ? `${usuarios.extesion}` : ""}
          </h5>
          <h5>
            {usuarios.nit_usuario ? `Con Nit: ${usuarios.nit_usuario}` : ""}
          </h5>
          <h4>Estado</h4>
          <h5>{usuarios.estado ? "Activo" : "Inactivo"}</h5>
          <h4>Contactos Personales</h4>
          <h5>Correo: {usuarios.correo}</h5>
          <h5>{usuarios.celular ? `Celular: ${usuarios.celular}` : ""}</h5>
          <h5>{usuarios.telefono ? `Telefono: ${usuarios.telefono}` : ""}</h5>
          <h5>
            {usuarios.direccion_usuario
              ? `Direccion: ${usuarios.direccion_usuario}`
              : ""}{" "}
          </h5>
          <h5>
            {usuarios.pagina_web_usuario
              ? `Pagina Web: ${usuarios.pagina_web_usuario}`
              : ""}
          </h5>
          <h4>Tipo de Rol</h4>
          <h5>{usuarios.rol.rol}</h5>
          <h4>Empresa</h4>
          <h5>{usuarios.empresa.razon_social}</h5>
          <h5>Nit: {usuarios.empresa.nit_empresa}</h5>
          <h4>Sucursal</h4>
          <h5>{usuarios.sucursal.sucursal}</h5>
          <br />
          <br />
          <ActualizarUsuarioPru usuarios={usuarios} url={url} />
              <br />
              <CambiarPasswordPru usuarios={usuarios} url={url} />
        </Card.Body>
        <Row className="mt-3 text-center">
          <Col>
            <Link className="btn btn-info" to="/menuadmin">
              Menu
            </Link>
          </Col>
        </Row>
        <br />
      </Card>
    </div>
  );
};

export default Usuario;
