import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
const CREATE_ROL_MUTATION = gql`
  mutation CrearRol($createRolInput: CreateRolInput!) {
    CrearRol(createRolInput: $createRolInput) {
      id
      rol
      tiporol
    }
  }
`;
const CreateRol = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    rol: null,
    tiporol: null,
  });

  const [createRol, { error, data }] = useMutation(CREATE_ROL_MUTATION, {
    variables: {
      createRolInput: {
        rol: formState.rol,
        tiporol: formState.tiporol,
      },
    },
  });
  return (
    <>
      {(() => {
        if (error) {
          return (
            <Alert className="text-danger bg-light ">
              <h3 className="text-center">
                ¡Error en un Campo! verifique: {error.message};
              </h3>
            </Alert>
          );
        }
      })()}
      <Form
        className="row g-3 m-3 text-white needs-validation"
        novalidate
        onSubmit={e => {
          e.preventDefault();
          createRol();
        }}
      >
        <h2 className="text-white">Registrar Rol</h2>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            className="was-validated"
            controlId="formGridState"
          >
            <Form.Label>Rol</Form.Label>
            <Form.Control
              className="form-control is-valid"
              id="validationTextarea"
              required
              placeholder="Administrador, Agente, Ejecutivo"
              value={formState.rol}
              onChange={e =>
                setFormState({
                  ...formState,
                  rol: e.target.value.toUpperCase(),
                })
              }
            />
          </Form.Group>
          <Form.Group
            as={Col}
            className="was-validated"
            controlId="formGridState"
          >
            <Form.Label>Tipo de Rol</Form.Label>
            <Form.Control
              className="form-control is-valid"
              id="validationTextarea"
              required
              placeholder="Interno, Externo"
              value={formState.tiporol}
              onChange={e =>
                setFormState({
                  ...formState,
                  tiporol: e.target.value.toUpperCase(),
                })
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3 justify-content-md-center">
          <Col xs lg="6">
            <Button
              variant="warning"
              type="submit"
              onClick={handleShow}
            >
              Registrar Rol
            </Button>
          </Col>
          <Col xs lg="3">
            <Link className="btn btn-info" to="/menuadmin">
              Menu
            </Link>
          </Col>
        </Row>
      </Form>
      {(() => {
        if (data?.CrearRol.id) {
          return (
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <h2 className="mt-3 text-center">
                  Registro Exitoso el nuevo Rol es:
                </h2>
              </Modal.Header>
              <Modal.Body>
                <div className="card border-light bg-transparent">
                  <div className="card-body bg-transparent">
                    <h5 className="card-text">
                      ID {data?.CrearRol.id} {": "}
                      {data?.CrearRol.rol} {" "} {data?.CrearRol.tiporol}
                    </h5>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Link
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Cerrar
                </Link>
                <Link className="btn btn-info" to="/menuadmin">
                  Menu
                </Link>
                <Link className="btn btn-info" to="/rollista">
                  Ver Roles
                </Link>
              </Modal.Footer>
            </Modal>
          );
        }
      })()}
    </>
  );
};

export default CreateRol;
