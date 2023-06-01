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
const CreateCotizacion = () => {
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
          clienteId: formState.clienteId,
          usuarioId: formState.usuarioId,
          productoId: formState.productoId,
        },
      },
      onCompleted: () => navigate("/createvalorparametro"),
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
      })()}
    </>
  );
};

export default CreateCotizacion;
