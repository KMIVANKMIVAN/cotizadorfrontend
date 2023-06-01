import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
const CREATE_CLIENTE_MUTATION = gql`
  mutation CrearCliente($createClienteInput: CreateClienteInput!) {
    CrearCliente(createClienteInput: $createClienteInput) {
      id
      ap_paterno
      ap_materno
      ap_casado
      nombres
      numero_carnet
      extesion
      fechanacimiento
      correo
      celular
      telefono
    }
  }
`;
const CreateClienteAE = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    ap_paterno: null,
    ap_materno: null,
    ap_casado: null,
    nombres: null,
    numero_carnet: null,
    extesion: null,
    fechanacimiento: null,
    correo: null,
    celular: null,
    telefono: null,
  });

  const [createCliente, { error, data }] = useMutation(
    CREATE_CLIENTE_MUTATION,
    {
      variables: {
        createClienteInput: {
          ap_paterno: formState.ap_paterno,
          ap_materno: formState.ap_materno,
          ap_casado: formState.ap_casado,
          nombres: formState.nombres,
          numero_carnet: formState.numero_carnet,
          extesion: formState.extesion,
          fechanacimiento: formState.fechanacimiento,
          correo: formState.correo,
          celular: formState.celular,
          telefono: formState.telefono,
        },
      },
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
          createCliente();
        }}
      >
        <h2 className="text-white">Registrar Cliente</h2>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Apellido Paterno</Form.Label>
            <Form.Control
              value={formState.ap_paterno}
              onChange={e => {
                if (e.target.value === "") {
                  setFormState({
                    ...formState,
                    ap_paterno: null,
                  });
                }
                if (e.target.value !== "") {
                  setFormState({
                    ...formState,
                    ap_paterno: e.target.value.toUpperCase(),
                  });
                }
              }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Apellido Materno</Form.Label>
            <Form.Control
              value={formState.ap_materno}
              onChange={e => {
                if (e.target.value === "") {
                  setFormState({
                    ...formState,
                    ap_materno: null,
                  });
                }
                if (e.target.value !== "") {
                  setFormState({
                    ...formState,
                    ap_materno: e.target.value.toUpperCase(),
                  });
                }
              }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Apellido De Casado</Form.Label>
            <Form.Control
              value={formState.ap_casado}
              onChange={e => {
                if (e.target.value === "") {
                  setFormState({
                    ...formState,
                    ap_casado: null,
                  });
                }
                if (e.target.value !== "") {
                  setFormState({
                    ...formState,
                    ap_casado: e.target.value.toUpperCase(),
                  });
                }
              }}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} className="was-validated">
            <Form.Label>Nombres</Form.Label>
            <Form.Control
              className="is-valid"
              id="validationTextarea"
              required
              value={formState.nombres}
              onChange={e => {
                if (e.target.value === "") {
                  setFormState({
                    ...formState,
                    nombres: null,
                  });
                }
                if (e.target.value !== "") {
                  setFormState({
                    ...formState,
                    nombres: e.target.value.toUpperCase(),
                  });
                }
              }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Carnet</Form.Label>
            <Form.Control
              value={formState.numero_carnet}
              onChange={e => {
                if (e.target.value === "") {
                  setFormState({
                    ...formState,
                    numero_carnet: null,
                  });
                }
                if (e.target.value !== "") {
                  setFormState({
                    ...formState,
                    numero_carnet: e.target.value,
                  });
                }
              }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Extencion</Form.Label>
            <Form.Select
              value={formState.extesion}
              onChange={e => {
                if (e.target.value === "1") {
                  setFormState({
                    ...formState,
                    extesion: null,
                  });
                }
                setFormState({
                  ...formState,
                  extesion: e.target.value,
                });
              }}
            >
              <option value="1">Sin Extencion</option>
              <option value="LP">LP</option>
              <option value="CB">CB</option>
              <option value="SC">SC</option>
              <option value="BE">BE</option>
              <option value="CH">CH</option>
              <option value="OR">OR</option>
              <option value="PD">PD</option>
              <option value="PT">PT</option>
              <option value="TJ">TJ</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} className="was-validated">
            <Form.Label>Fecha De Nacimiento</Form.Label>
            <Form.Control
              type="date"
              className="is-valid"
              id="validationTextarea"
              required
              value={formState.fechanacimiento}
              onChange={e =>
                setFormState({
                  ...formState,
                  fechanacimiento: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              value={formState.correo}
              onChange={e => {
                if (e.target.value === "") {
                  setFormState({
                    ...formState,
                    correo: null,
                  });
                }
                if (e.target.value !== "") {
                  setFormState({
                    ...formState,
                    correo: e.target.value.toUpperCase(),
                  });
                }
              }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Celular</Form.Label>
            <Form.Control
              value={formState.celular}
              onChange={e => {
                if (e.target.value === "") {
                  setFormState({
                    ...formState,
                    celular: null,
                  });
                }
                if (e.target.value !== "") {
                  setFormState({
                    ...formState,
                    celular: e.target.value,
                  });
                }
              }}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              value={formState.telefono}
              onChange={e => {
                if (e.target.value === "") {
                  setFormState({
                    ...formState,
                    telefono: null,
                  });
                }
                if (e.target.value !== "") {
                  setFormState({
                    ...formState,
                    telefono: e.target.value,
                  });
                }
              }}
            />
          </Form.Group>
          <Form.Group as={Col}></Form.Group>
          <Form.Group as={Col}></Form.Group>
        </Row>
        <Row className="mb-3 justify-content-md-center">
          <Col xs lg="6">
            <Button variant="warning" type="submit" onClick={handleShow}>
              Registrar Cliente
            </Button>
          </Col>
          <Col xs lg="3">
            <Link className="btn btn-info" to="/menu">
              Menu
            </Link>
          </Col>
        </Row>
      </Form>
      {(() => {
        if (data?.CrearCliente.id) {
          return (
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <h2 className="mt-3 text-center">
                  Registro Exitoso el nuevo Cliente es:
                </h2>
              </Modal.Header>
              <Modal.Body>
                <div className="card border-light bg-transparent">
                  <div className="card-body bg-transparent">
                    <h5 className="card-text">
                      ID {data?.CrearCliente.id} {": "}
                      {data?.CrearCliente.nombres}{" "}
                      {data?.CrearCliente.ap_materno}{" "}
                      {data?.CrearCliente.ap_paterno}{" "}
                      {data?.CrearCliente.ap_casado
                        ? `${data?.CrearCliente.ap_casado}`
                        : ""}{" "}
                    </h5>
                    <h5 className="card-text">
                      {data?.CrearCliente.numero_carnet
                        ? `Numero de Carnet: ${data?.CrearCliente.numero_carnet}`
                        : ""}{" "}
                      {data?.CrearCliente.extesion
                        ? `${data?.CrearCliente.extesion}`
                        : ""}{" "}
                    </h5>
                    <h5 className="card-text">
                      Fecha de Nacimiento: {data?.CrearCliente.fechanacimiento}{" "}
                    </h5>
                    <h4 className="card-title">Contactos Personales</h4>
                    <h5 className="card-text">
                      {data?.CrearCliente.correo
                        ? `Correo: ${data?.CrearCliente.correo}`
                        : ""}
                    </h5>
                    <h5 className="card-text">
                      {data?.CrearCliente.celular
                        ? `Celular: ${data?.CrearCliente.celular}`
                        : ""}{" "}
                    </h5>
                    <h5 className="card-text">
                      {data?.CrearCliente.telefono
                        ? `Telefono: ${data?.CrearCliente.telefono}`
                        : ""}{" "}
                    </h5>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Link className="btn btn-secondary" onClick={handleClose}>
                  Cerrar
                </Link>
                <Link className="btn btn-info" to="/menu">
                  Menu
                </Link>
                <Link className="btn btn-info" to="/rollista">
                  Cotizar
                </Link>
              </Modal.Footer>
            </Modal>
          );
        }
      })()}
    </>
  );
};

export default CreateClienteAE;
