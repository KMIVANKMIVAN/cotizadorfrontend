import React from "react";
import { Link } from "react-router-dom";
import ActualizarUsuario from "./ActualizarUsuario";
import CambiarPassword from "./CambiarPassword";
import ActualozarSucursal from "./ActualozarSucursal";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const UsuarioExterno = props => {
  const { url, usuarios } = props;
  return (
    <div>
      <Card border="light bg-transparent text-white">
        <Card.Body>
          <h4>Datos Personales</h4>
          ID {usuarios.id} Nombres{": "} {usuarios.nombres}{" "}
          {usuarios.ap_paterno} {usuarios.ap_materno}{" "}
          {usuarios.ap_casado ? `${usuarios.ap_casado}` : ""}{" "}
          {usuarios.numero_carnet
            ? `Numero de Carnet: ${usuarios.numero_carnet}`
            : ""}{" "}
          {usuarios.extesion ? `${usuarios.extesion}` : ""}{" "}
          {usuarios.nit_usuario ? `Con Nit: ${usuarios.nit_usuario}` : ""}
          <h4>Estado</h4>
          {usuarios.estado ? "Activo" : "Inactivo"}
          <h4>Contactos Personales</h4>
          Correo: {usuarios.correo}{" "}
          {usuarios.celular ? `Celular: ${usuarios.celular}` : ""}{" "}
          {usuarios.telefono ? `Telefono: ${usuarios.telefono}` : ""}{" "}
          {usuarios.direccion_usuario
            ? `Direccion: ${usuarios.direccion_usuario}`
            : ""}{" "}
          {usuarios.pagina_web_usuario
            ? `Pagina Web: ${usuarios.pagina_web_usuario}`
            : ""}
          <h4>Tipo de Rol</h4>
          {usuarios.rol.rol}
          <h4>Empresa</h4>
          {usuarios.empresa.razon_social} Nit: {usuarios.empresa.nit_empresa}
          <h4>Sucursal</h4>
          {usuarios.sucursal.sucursal}
          <br />
          <br />
          <ActualizarUsuario usuarios={usuarios} url={url} />
          <br />
          <CambiarPassword usuarios={usuarios} url={url} />
          <br />
          <ActualozarSucursal usuarios={usuarios} url={url} />
        </Card.Body>
        <Row className="mt-3 justify-content-md-center">
          <Col xs lg="3">
            <Link className="btn btn-primary  text-white " to="/menuadmin">
              Volver
            </Link>
          </Col>
        </Row>
        <br />
      </Card>
    </div>
  );
};

export default UsuarioExterno;
