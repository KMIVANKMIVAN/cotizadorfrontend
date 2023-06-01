import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
const CREATE_SUCURSAL_MUTATION = gql`
  mutation CrearSucursal($createSucursalInput: CreateSucursalInput!) {
    CrearSucursal(createSucursalInput: $createSucursalInput) {
      id
      sucursal
    }
  }
`;

const CreateSucursal = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    sucursal: null,
  });

  const [createSucursal, { error, data }] = useMutation(
    CREATE_SUCURSAL_MUTATION,
    {
      variables: {
        createSucursalInput: {
          sucursal: formState.sucursal,
        },
      },
      // onCompleted: () => navigate("/menuadmin"),
    }
  );

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
          createSucursal();
        }}
      >
        <h2 class="text-white">Registrar Sucursal</h2>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            className="was-validated"
            controlId="formGridState"
          >
            <Form.Label>Sucursal</Form.Label>
            <Form.Control
              className="form-control is-valid"
              id="validationTextarea"
              required
              placeholder="La Paz..."
              value={formState.sucursal}
              onChange={e =>
                setFormState({
                  ...formState,
                  sucursal: e.target.value.toUpperCase(),
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
              Registrar Sucursal
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
        if (data?.CrearSucursal.id) {
          return (
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <h2 className="mt-3 text-center">
                  Registro Exitoso la nueva Sucursal es:
                </h2>
              </Modal.Header>
              <Modal.Body>
                <div className="card border-light bg-transparent">
                  <div className="card-body bg-transparent">
                    <h5 className="card-text">
                      ID {data?.CrearSucursal.id} {": "}
                      {data?.CrearSucursal.sucursal}
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
                <Link className="btn btn-info" to="/sucursallista">
                  Ver Sucursales
                </Link>
              </Modal.Footer>
            </Modal>
          );
        }
      })()}
    </>
  );
};

export default CreateSucursal;
