import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
const CLIENTE_MUTATION = gql`
  mutation ActualizarCliente($updateClienteInput: UpdateClienteInput!) {
    ActualizarCliente(updateClienteInput: $updateClienteInput) {
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

const ActualizarCliente = props => {
  const { cliente, url } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    id: parseInt(cliente.id),
    correo: cliente.correo,
    celular: cliente.celular,
    telefono: cliente.telefono,
    fechanacimiento: cliente.fechanacimiento,
    ap_paterno: cliente.ap_paterno,
    ap_materno: cliente.ap_materno,
    ap_casado: cliente.ap_casado,
    nombres: cliente.nombres,
    numero_carnet: cliente.numero_carnet,
    extesion: cliente.extesion,
  });

  const [updateCliente, { error: error1, data }] = useMutation(
    CLIENTE_MUTATION,
    {
      variables: {
        updateClienteInput: {
          id: parseInt(formState.id),
          correo: formState.correo,
          estado: formState.estado,
          celular: formState.celular,
          telefono: formState.telefono,
          ap_paterno: formState.ap_paterno,
          ap_materno: formState.ap_materno,
          ap_casado: formState.ap_casado,
          nombres: formState.nombres,
          numero_carnet: formState.numero_carnet,
          extesion: formState.extesion,
          fechanacimiento: formState.fechanacimiento,
        },
      },
      // onCompleted: () => <UsuarioLista />,
    }
  );

  return (
    <>
      {(() => {
        if (error1) {
          return (
            <Alert className="text-danger bg-light ">
              <h3 className="text-center">
                ¡Error en un Campo! verifique: {error1.message};
              </h3>
            </Alert>
          );
        }
      })()}
      <Form
        className="row g-3"
        onSubmit={e => {
          e.preventDefault();
          updateCliente();
        }}
      >
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Apellido Paterno</Form.Label>
              <Form.Control
                type="text"
                value={formState.ap_paterno}
                onChange={e =>
                  setFormState({
                    ...formState,
                    ap_paterno: e.target.value.toUpperCase(),
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Apellido Materno</Form.Label>
              <Form.Control
                type="text"
                value={formState.ap_materno}
                onChange={e =>
                  setFormState({
                    ...formState,
                    ap_materno: e.target.value.toUpperCase(),
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Apellido De Casado</Form.Label>
              <Form.Control
                type="text"
                value={formState.ap_casado}
                onChange={e => {
                  if (e.target.value === "" || e.target.value === null) {
                    setFormState({
                      ...formState,
                      ap_casado: null,
                    });
                  } else {
                    setFormState({
                      ...formState,
                      ap_casado: e.target.value.toUpperCase(),
                    });
                  }
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Nombres</Form.Label>
              <Form.Control
                type="text"
                value={formState.nombres}
                onChange={e =>
                  setFormState({
                    ...formState,
                    nombres: e.target.value.toUpperCase(),
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Carnet</Form.Label>
              <Form.Control
                type="text"
                value={formState.numero_carnet}
                onChange={e =>
                  setFormState({
                    ...formState,
                    numero_carnet: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Extencion</Form.Label>
              <Form.Select
                required
                value={formState.extesion}
                onChange={e => {
                  setFormState({
                    ...formState,
                    extesion: e.target.value,
                  });
                }}
              >
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
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">
                Fecha de Nacimiento
              </Form.Label>
              <Form.Control
                type="text"
                value={formState.fechanacimiento}
                onChange={e =>
                  setFormState({
                    ...formState,
                    fechanacimiento: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Correo</Form.Label>
              <Form.Control
                type="email"
                value={formState.correo}
                onChange={e =>
                  setFormState({
                    ...formState,
                    correo: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Telefono</Form.Label>
              <Form.Control
                value={formState.telefono}
                onChange={e =>
                  setFormState({
                    ...formState,
                    telefono: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Celular</Form.Label>
              <Form.Control
                value={formState.celular}
                onChange={e =>
                  setFormState({
                    ...formState,
                    celular: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Col>
          <button
            class="btn btn-warning  text-black"
            type="submit"
            onClick={handleShow}
          >
            Actualizar Usuario
          </button>
        </Col>
      </Form>
      {(() => {
        if (data?.ActualizarCliente.id) {
          return (
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <h3 className="mt-3 text-center">
                  Se Actualizo los Datos del Usuario:
                </h3>
              </Modal.Header>
              <Modal.Body>
                <h5>
                  ID {data?.ActualizarCliente.id} Nombres{": "}{" "}
                  {data?.ActualizarCliente.nombres}{" "}
                  {data?.ActualizarCliente.ap_paterno}{" "}
                  {data?.ActualizarCliente.ap_materno}{" "}
                  {data?.ActualizarCliente.ap_casado
                    ? `${data?.ActualizarCliente.ap_casado}`
                    : ""}{" "}
                </h5>
                <h5>
                  {data?.ActualizarCliente.numero_carnet
                    ? `Numero de Carnet:  ${data?.ActualizarCliente.numero_carnet}`
                    : ""}
                  {data?.ActualizarCliente.extesion
                    ? `${data?.ActualizarCliente.extesion}`
                    : ""}
                </h5>
                <h4>Fecha de Nacimiento</h4>
                <h5>{data?.ActualizarCliente.fechanacimiento}</h5>
                <h4>Contactos Personales</h4>
                <h5>
                  {data?.ActualizarCliente.correo
                    ? `Correo: ${data?.ActualizarCliente.correo}`
                    : ""}
                </h5>
                <h5>
                  {data?.ActualizarCliente.celular
                    ? `Celular: ${data?.ActualizarCliente.celular}`
                    : ""}{" "}
                </h5>
                <h5>
                  {data?.ActualizarCliente.telefono
                    ? `Telefono: ${data?.ActualizarCliente.telefono}`
                    : ""}{" "}
                </h5>
              </Modal.Body>
              <Modal.Footer>
                <Link className="btn btn-secondary" onClick={handleClose}>
                  Cerrar
                </Link>
                <Link className="btn btn-primary  text-white " to="/menuadmin">
                  Menu
                </Link>
                <Link
                  className="btn btn-primary  text-white "
                  to="/createcliente"
                >
                  Registrar Clientes
                </Link>
              </Modal.Footer>
            </Modal>
          );
        }
      })()}
    </>
  );
};
export default ActualizarCliente;
