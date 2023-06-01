import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
const COTIZACION_MUTATION = gql`
  mutation ActualizarCotizacione(
    $updateCotizacioneInput: UpdateCotizacioneInput!
  ) {
    ActualizarCotizacione(updateCotizacioneInput: $updateCotizacioneInput) {
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
        password
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
        tipo
      }
    }
  }
`;
const PRODUCTO_QUERY = gql`
  query MostrarProducto {
    MostrarProducto {
      id
      descripcion
      tipo
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
const ActualizarCotizacion = props => {
  const { cotizacion, url } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: data1 } = useQuery(PRODUCTO_QUERY);
  const { data: data2 } = useQuery(USUARIOS_QUERY);
  const { data: data3 } = useQuery(CLIENTES_QUERY);

  const [formState, setFormState] = useState({
    id: parseInt(cotizacion.id),
    clienteId: parseInt(cotizacion.cliente.id),
    usuarioId: parseInt(cotizacion.usuario.id),
    productoId: parseInt(cotizacion.producto.id),
  });

  const [updateParametro, { error: error1, data }] = useMutation(
    COTIZACION_MUTATION,
    {
      variables: {
        updateCotizacioneInput: {
          id: parseInt(formState.id),

          clienteId: parseInt(formState.clienteId),
          usuarioId: parseInt(formState.usuarioId),
          productoId: parseInt(formState.productoId),
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
          updateParametro();
        }}
      >
        <Row>
          <Col>
            <Form.Label className="text-black">Usuario</Form.Label>
            <Form.Group>
              <Form.Select
                value={formState.usuarioId}
                onChange={e =>
                  setFormState({
                    ...formState,
                    usuarioId: parseInt(e.target.value),
                  })
                }
              >
                {data2?.MostrarUsuario.map(MostrarUsuario => (
                  <>
                    <option value={MostrarUsuario.id}>
                      {MostrarUsuario.nombres}
                    </option>
                  </>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Label className="text-black">Cliente</Form.Label>
            <Form.Group>
              <Form.Select
                value={formState.clienteId}
                onChange={e =>
                  setFormState({
                    ...formState,
                    clienteId: parseInt(e.target.value),
                  })
                }
              >
                {data3?.MostrarCliente.map(MostrarCliente => (
                  <>
                    <option value={MostrarCliente.id}>
                      {MostrarCliente.nombres}
                    </option>
                  </>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label className="text-black">Producto</Form.Label>
            <Form.Group>
              <Form.Select
                value={formState.productoId}
                onChange={e =>
                  setFormState({
                    ...formState,
                    productoId: parseInt(e.target.value),
                  })
                }
              >
                {data1?.MostrarProducto.map(MostrarProducto => (
                  <>
                    <option value={MostrarProducto.id}>
                      {MostrarProducto.descripcion}
                    </option>
                  </>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>
        <Col>
          <button
            class="btn btn-warning  text-black"
            type="submit"
            onClick={handleShow}
          >
            Actualizar Cotizacion
          </button>
        </Col>
      </Form>
      {(() => {
        if (data?.ActualizarCotizacione.id) {
          return (
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <h3 className="mt-3 text-center">
                  Se Actualizo los Datos del Parametro:
                </h3>
              </Modal.Header>
              <Modal.Body>
                <h5>
                  ID {data?.ActualizarCotizacione.id} Cotizacion{": "}{" "}
                </h5>
                <h5>
                  Usuario{": "} {data?.ActualizarCotizacione.usuario.nombres}{" "}
                </h5>
                <h5>
                  Cliente{": "}{" "}
                  {data?.ActualizarCotizacione.cliente.nombres}{" "}
                </h5>
                <h5>
                  Producto{": "} {data?.ActualizarCotizacione.producto.descripcion}{" "}
                  Tipo{": "} {data?.ActualizarCotizacione.producto.tipo}{" "}
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
                  to="/createparametro"
                >
                  Create Parametro
                </Link>
              </Modal.Footer>
            </Modal>
          );
        }
      })()}
    </>
  );
};
export default ActualizarCotizacion;
