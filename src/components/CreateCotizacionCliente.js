import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import InputGroup from 'react-bootstrap/InputGroup';

import { useSelector } from "react-redux";

const CREATE_COTIZACION_MUTATION = gql`
  mutation CrearCotizacione($createCotizacioneInput: CreateCotizacioneInput!) {
    CrearCotizacione(createCotizacioneInput: $createCotizacioneInput) {
      id
      cliente {
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
      usuario {
        id
        ap_paterno
        ap_materno
        ap_casado
        nombres
        numero_carnet
        extesion
        correo
        estado
        celular
        telefono
        nit_usuario
        direccion_usuario
        pagina_web_usuario
      }
      producto {
        id
        descripcion
        
      }
    }
  }
`;
const CLIENTES_QUERY = gql`
  query MostrarCliente {
    MostrarCliente {
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
const USUARIOS_QUERY = gql`
  query MostrarUsuario {
    MostrarUsuario {
      id
      ap_paterno
      ap_materno
      ap_casado
      nombres
      numero_carnet
      extesion
      correo
      estado
      celular
      telefono
      nit_usuario
      direccion_usuario
      pagina_web_usuario
      rol {
        id
        rol
      }
      sucursal {
        id
        sucursal
      }
      empresa {
        id
        razon_social
        nit_empresa
      }
    }
  }
`;
const PRODUCTO_QUERY = gql`
  query MostrarProducto {
    MostrarProducto {
      id
      descripcion
      
    }
  }
`;
const CreateCotizacionCliente = props => {

  console.log("estamos en CreateCotizacionCliente");
  const p1 = useSelector((state) => state.p1);
  const p2 = useSelector((state) => state.p2);
  const p3 = useSelector((state) => state.p3);

  console.log(p1);
  console.log(p2);
  console.log(p3);

  const [modalShow, setModalShow] = React.useState(false);
  // const { url, cliente, usuario } = props;
  const { url, cliente } = props;

  // console.log("llllllllll ", usuario.p1);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: data1 } = useQuery(PRODUCTO_QUERY);
  const { data: data2 } = useQuery(CLIENTES_QUERY);
  const { data: data3 } = useQuery(USUARIOS_QUERY);

  const [formState, setFormState] = useState({
    clienteId: null,
    usuarioId: null,
    productoId: null,
  });

  const [createCotizacion, { error, data }] = useMutation(
    CREATE_COTIZACION_MUTATION,
    {
      variables: {
        createCotizacioneInput: {
          clienteId: parseInt(cliente.id),
          usuarioId: parseInt(p1),
          productoId: formState.productoId,
        },
      },

      onCompleted: () => {
        const valor1 = data?.CrearCotizacione.id; // Asigna el valor deseado a valor1
        const valor2 = formState.productoId; // Asigna el valor deseado a valor2
        // localStorage.setItem('param1', valor1);
        localStorage.setItem('param2', valor2);
        navigate("/createvalorparametro");
      },
      // onCompleted: () => navigate("/createvalorparametro"),
    }
  );
  return (
    <>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => {
          setModalShow(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-file-earmark-check"
          viewBox="0 0 16 16"
        >
          <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
        </svg>
      </Button>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="text-center">
          <Card border="light bg-transparent text-black">
            <Card.Body>
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
                className="row g-3 m-3 needs-validation"
                novalidate
                onSubmit={e => {
                  e.preventDefault();
                  createCotizacion();
                }}
              >
                <h2 className="">Crear Cotizacion</h2>

                <Row className="mb-3">
                  <Form.Group as={Col} className="">
                  </Form.Group>
                  <Form.Group as={Col} className="was-validated">
                    <Form.Label>Seleccionar Producto</Form.Label>
                    <Form.Select
                      required
                      value={formState.productoId}
                      onChange={e =>
                        setFormState({
                          ...formState,
                          productoId: parseInt(e.target.value),
                        })
                      }
                    >
                      <option value="">Seleccionar</option>
                      {data1 && (
                        <>
                          {data1.MostrarProducto.map(MostrarProducto => (
                            <option value={MostrarProducto.id}>
                              {MostrarProducto.descripcion}
                            </option>
                          ))}
                        </>
                      )}
                    </Form.Select>
                    <div className="invalid-feedback">Debe Seleccionar</div>
                  </Form.Group>
                  <Form.Group as={Col} className="">
                  </Form.Group>
                </Row>
                <Row className="mb-3 text-center">
                  <Col>
                    <Button variant="warning" type="submit" onClick={handleShow}>
                      Crear Cotizacion
                    </Button>
                  </Col>
                </Row>
              </Form>
              {(() => {
                if (data?.CrearCotizacione.id) {
                  return (
                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header>
                        <h2 className="mt-3 text-center">
                          Creacion Exitosa la nueva Cotizacion es:
                        </h2>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="card border-light bg-transparent">
                          <div className="card-body bg-transparent">
                            <h5>ID {data?.CrearCotizacione.id}</h5>
                            <h5>
                              Cliente{": "} {data?.CrearCotizacione.cliente.nombres}{" "}
                            </h5>
                            <h5>
                              Usuario{": "} {data?.CrearCotizacione.usuario.nombres}{" "}
                            </h5>
                            <h5>
                              Producto{": "}{" "}
                              {data?.CrearCotizacione.producto.descripcion}{" "}
                            </h5>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Link className="btn btn-secondary" onClick={handleClose}>
                          Cerrar
                        </Link>
                        <Link className="btn btn-info" to="/taco">
                          Ver Cotizaciones
                        </Link>
                        <Link className="btn btn-info" to="/menu">
                          Menu
                        </Link>
                      </Modal.Footer>
                    </Modal>
                  );
                }
              })()}
            </Card.Body>
            <br />
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* {(() => {
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
          createCotizacion();
        }}
      >
        <h2 className="text-white">Crear Cotizacion</h2>
        <Row className="mb-3">
          <Form.Group as={Col} className="was-validated">
            <Form.Label>Cliente</Form.Label>
            <Form.Select
              required
              value={formState.clienteId}
              onChange={e =>
                setFormState({
                  ...formState,
                  clienteId: parseInt(e.target.value),
                })
              }
            >
              <option value="">Seleccionar</option>
              {data2 && (
                <>
                  {data2.MostrarCliente.map(MostrarCliente => (
                    <option value={MostrarCliente.id}>
                      {MostrarCliente.nombres}
                    </option>
                  ))}
                </>
              )}
            </Form.Select>
            <div className="invalid-feedback">Debe Seleccionar</div>
          </Form.Group>
          <Form.Group as={Col} className="was-validated">
            <Form.Label>Usuario</Form.Label>
            <Form.Select
              required
              value={formState.usuarioId}
              onChange={e =>
                setFormState({
                  ...formState,
                  usuarioId: parseInt(e.target.value),
                })
              }
            >
              <option value="">Seleccionar</option>
              {data3 && (
                <>
                  {data3.MostrarUsuario.map(MostrarUsuario => (
                    <option value={MostrarUsuario.id}>
                      {MostrarUsuario.nombres}
                    </option>
                  ))}
                </>
              )}
            </Form.Select>
            <div className="invalid-feedback">Debe Seleccionar</div>
          </Form.Group>
          <Form.Group as={Col} className="was-validated">
            <Form.Label>Producto</Form.Label>
            <Form.Select
              required
              value={formState.productoId}
              onChange={e =>
                setFormState({
                  ...formState,
                  productoId: parseInt(e.target.value),
                })
              }
            >
              <option value="">Seleccionar</option>
              {data1 && (
                <>
                  {data1.MostrarProducto.map(MostrarProducto => (
                    <option value={MostrarProducto.id}>
                      {MostrarProducto.descripcion}
                    </option>
                  ))}
                </>
              )}
            </Form.Select>
            <div className="invalid-feedback">Debe Seleccionar</div>
          </Form.Group>
        </Row>
        <Row className="mb-3 text-center">
          <Col>
            <Button variant="warning" type="submit" onClick={handleShow}>
              Crear Cotizacion
            </Button>
          </Col>
          <Col>
            <Link className="btn btn-info" to="/taco">
              Ver Cotizaciones
            </Link>
          </Col>
          <Col>
            <Link className="btn btn-info" to="/menuadmin">
              Menu
            </Link>
          </Col>
        </Row>
      </Form>
      {(() => {
        if (data?.CrearCotizacione.id) {
          return (
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <h2 className="mt-3 text-center">
                  Creacion Exitosa la nueva Cotizacion es:
                </h2>
              </Modal.Header>
              <Modal.Body>
                <div className="card border-light bg-transparent">
                  <div className="card-body bg-transparent">
                    <h5>ID {data?.CrearCotizacione.id}</h5>
                    <h5>
                      Cliente{": "} {data?.CrearCotizacione.cliente.nombres}{" "}
                    </h5>
                    <h5>
                      Usuario{": "} {data?.CrearCotizacione.usuario.nombres}{" "}
                    </h5>
                    <h5>
                      Producto{": "}{" "}
                      {data?.CrearCotizacione.producto.descripcion}{" "}
                    </h5>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Link className="btn btn-secondary" onClick={handleClose}>
                  Cerrar
                </Link>
                <Link className="btn btn-info" to="/taco">
                  Ver Cotizaciones
                </Link>
                <Link className="btn btn-info" to="/menu">
                  Menu
                </Link>
              </Modal.Footer>
            </Modal>
          );
        }
      })()} */}
    </>
  );
};

export default CreateCotizacionCliente;
