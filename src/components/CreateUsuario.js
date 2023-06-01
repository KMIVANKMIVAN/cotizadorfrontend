import React from "react";
import CreateUsuarioInterno from "./CreateUsuarioInterno";
import CreateUsuarioExterno from "./CreateUsuarioExterno";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
const CreateUsuario = () => {
  
  return (
    <div>
      <CreateUsuarioInterno url="/createusuarios" />
      <br/>
      <CreateUsuarioExterno url="/createusuarios" />
      <br/>
      <Row className="mb-3 text-center">
        <Col>
          <Link className="btn btn-info  text-blacke " to="/menuadmin">
            Menu
          </Link>
        </Col>
        <Col>
          <Link className="btn btn-info  text-black " to="/ustas">
            Usuarios en Tablas
          </Link>
        </Col>
        <Col>
          <Link className="btn btn-info  text-black " to="/usuariolista">
            Usuarios
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default CreateUsuario;
