import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
const VALORPARAMETRO_MUTATION = gql`
  mutation ActualizarValorparametro(
    $updateValorparametroInput: UpdateValorparametroInput!
  ) {
    ActualizarValorparametro(
      updateValorparametroInput: $updateValorparametroInput
    ) {
      id
      valorString
      valorInt
      valorDouble
      valorBoolean
      parametro {
        id
        descripcion
        tipo
        producto {
          id
          descripcion
          tipo
        }
      }
      cotizacione {
        id
        cliente {
          id
          nombres
        }
        usuario {
          id
          nombres
        }
        producto {
          id
          descripcion
          tipo
        }
      }
    }
  }
`;
const COTIZACION_QUERY = gql`
  query MostrarCotizacione {
    MostrarCotizacione {
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
const PARAMETRO_QUERY = gql`
  query MostrarParametro {
    MostrarParametro {
      id
      descripcion
      tipo
      producto {
        id
        descripcion
        tipo
      }
    }
  }
`;
const ActualizarValorParametro = props => {
  const { valorparametro, url } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: data1 } = useQuery(COTIZACION_QUERY);
  const { data: data2 } = useQuery(PARAMETRO_QUERY);

  const [formState, setFormState] = useState({
    id: parseInt(valorparametro.id),
    valorString: valorparametro.valorString,
    valorInt: valorparametro.valorInt,
    valorDouble: valorparametro.valorDouble,
    valorBoolean: valorparametro.valorBoolean,

    cotizacionId: parseInt(valorparametro.cotizacione.id),
    parametroId: parseInt(valorparametro.parametro.id),
  });

  const [updateValorParametro, { error: error1, data }] = useMutation(
    VALORPARAMETRO_MUTATION,
    {
      variables: {
        updateValorparametroInput: {
          id: parseInt(formState.id),
          valorString: formState.valorString,
          valorInt: formState.valorInt,
          valorDouble: parseFloat(formState.valorDouble),
          valorBoolean: formState.valorBoolean,

          cotizacionId: parseInt(formState.cotizacionId),
          parametroId: parseInt(formState.parametroId),
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
          updateValorParametro();
        }}
      >
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Valor String</Form.Label>
            <Form.Control
              value={formState.valorString}
              onChange={e => {
                if (e.target.value === "") {
                  setFormState({
                    ...formState,
                    valorString: null,
                  });
                }
                if (e.target.value !== "") {
                  setFormState({
                    ...formState,
                    valorString: e.target.value.toUpperCase(),
                  });
                }
              }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Valor Int</Form.Label>
            <Form.Control
              value={formState.valorInt}
              onChange={e => {
                if (e.target.value === "") {
                  setFormState({
                    ...formState,
                    valorInt: null,
                  });
                }
                if (e.target.value !== "") {
                  setFormState({
                    ...formState,
                    valorInt: parseInt(e.target.value),
                  });
                }
              }}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Valor Boolean</Form.Label>
            <Form.Select
              required
              value={formState.valorBoolean}
              onChange={e => {
                let esta = true;
                if (e.target.value === "false") {
                  esta = false;
                }
                setFormState({
                  ...formState,
                  valorBoolean: esta,
                });
              }}
            >
              <option value="">Seleccionar</option>
              <option value="true">Verdadero</option>
              <option value="false">Falso</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Valor Double</Form.Label>
            <Form.Control
              value={formState.valorDouble}
              onChange={e => {
                if (e.target.value === "") {
                  setFormState({
                    ...formState,
                    valorDouble: null,
                  });
                }
                if (e.target.value !== "") {
                  setFormState({
                    ...formState,
                    valorDouble: e.target.value,
                  });
                }
              }}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Label className="text-black">Cotizaciones</Form.Label>
            <Form.Group>
              <Form.Select
                value={formState.cotizacionId}
                onChange={e =>
                  setFormState({
                    ...formState,
                    cotizacionId: parseInt(e.target.value),
                  })
                }
              >
                {data1?.MostrarCotizacione.map(MostrarCotizacione => (
                  <>
                    <option value={MostrarCotizacione.id}>
                      {MostrarCotizacione.id}
                    </option>
                  </>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Label className="text-black">Parametros</Form.Label>
            <Form.Group>
              <Form.Select
                value={formState.parametroId}
                onChange={e =>
                  setFormState({
                    ...formState,
                    parametroId: parseInt(e.target.value),
                  })
                }
              >
                {data2?.MostrarParametro.map(MostrarParametro => (
                  <>
                    <option value={MostrarParametro.id}>
                      {MostrarParametro.descripcion}
                    </option>
                  </>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Col>
          <button
            class="btn btn-warning  text-black"
            type="submit"
            onClick={handleShow}
          >
            Actualizar Valor Parametro
          </button>
        </Col>
      </Form>
      {(() => {
        if (data?.ActualizarValorparametro.id) {
          return (
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <h3 className="mt-3 text-center">
                  Se Actualizo los Datos del Valor Parametro:
                </h3>
              </Modal.Header>
              <Modal.Body>
                <h5>
                  ID {data?.ActualizarValorparametro.id}
                </h5>
                <h5>
                      Valor String{": "}{" "}
                      {data?.ActualizarValorparametro.valorString}{" "}
                    </h5>
                    <h5>
                      Valor Int{": "}
                      {data?.ActualizarValorparametro.valorInt}{" "}
                    </h5>
                    <h5>
                      Valor Double{": "}{" "}
                      {data?.ActualizarValorparametro.valorDouble}{" "}
                    </h5>
                    <h5>
                      Valor Boolean{": "}{" "}
                      {data?.ActualizarValorparametro.valorBoolean
                        ? "Verdadero"
                        : "Falso"}{" "}
                    </h5>
                    <h5>
                      Parametro {": "} {data?.ActualizarValorparametro.parametro.id}{" "}
                    </h5>
                    <h5>
                      Parametro {": "}{" "}
                      {data?.ActualizarValorparametro.parametro.descripcion}{" "}
                    </h5>
                    <h5>
                      Cotizaciones{": "}{" "}
                      {data?.ActualizarValorparametro.cotizacione.id}{" "}
                    </h5>
                    <h5>Clientes</h5>
                    <h5>
                      Cotizaciones{": "}{" "}
                      {data?.ActualizarValorparametro.cotizacione.cliente.id}{" "}
                    </h5>
                    <h5>
                      Cotizaciones{": "}{" "}
                      {data?.ActualizarValorparametro.cotizacione.cliente.nombres}{" "}
                    </h5>
                    <h5>Usuarios</h5>
                    <h5>
                      Cotizaciones{": "}{" "}
                      {data?.ActualizarValorparametro.cotizacione.usuario.id}{" "}
                    </h5>
                    <h5>
                      Cotizaciones{": "}{" "}
                      {data?.ActualizarValorparametro.cotizacione.usuario.nombres}{" "}
                    </h5>
                    <h5>Productos</h5>
                    <h5>
                      Producto{": "}{" "}
                      {data?.ActualizarValorparametro.cotizacione.producto.id}{" "}
                    </h5>
                    <h5>
                      Producto{": "}{" "}
                      {
                        data?.ActualizarValorparametro.cotizacione.producto
                          .descripcion
                      }{" "}
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
export default ActualizarValorParametro;
