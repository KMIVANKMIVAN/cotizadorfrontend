import React from "react";
import CreateUsuarioInterno from "./CreateUsuarioInterno";
import CreateUsuarioExterno from "./CreateUsuarioExterno";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const CreateUsuarios = () => {
  return (
    <div>
      <CreateUsuarioInterno url="/createusuario" />
      <br />
      <CreateUsuarioExterno url="/createusuario" />
      <br/>
      <Row className="mb-3 text-center">
        <Col>
          <Link className="btn btn-info  text-black " to="/menuadmin">
            Menu
          </Link>
        </Col>
        <Col>
          <Link className="btn btn-info  text-black " to="/usuariotablas">
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

export default CreateUsuarios;
