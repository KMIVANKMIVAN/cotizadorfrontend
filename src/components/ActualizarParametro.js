import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
const PARAMETRO_MUTATION = gql`
  mutation ActualizarParametro($updateParametroInput: UpdateParametroInput!) {
    ActualizarParametro(updateParametroInput: $updateParametroInput) {
      id
      descripcion
      tipo
      nrolista
      obligatorio
      fila
      columna
      producto {
        id
        descripcion
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
const ActualizarParametro = props => {
  const { parametro, url } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: data1 } = useQuery(PRODUCTO_QUERY);

  const [formState, setFormState] = useState({
    id: parseInt(parametro.id),
    descripcion: parametro.descripcion,
    tipo: parametro.tipo,

    nrolista: parametro.nrolista,
    obligatorio: parametro.obligatorio,
    fila: parametro.fila,
    columna: parametro.columna,

    productoId: parseInt(parametro.producto.id),
  });

  const [updateParametro, { error: error1, data }] = useMutation(
    PARAMETRO_MUTATION,
    {
      variables: {
        updateParametroInput: {
          id: parseInt(formState.id),
          descripcion: formState.descripcion,
          tipo: formState.tipo,

          nrolista: formState.nrolista,
          obligatorio: formState.obligatorio,
          fila: parseInt(formState.fila),
          columna: parseInt(formState.columna),

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
            <Form.Group>
              <Form.Label className="text-black">Descripcion</Form.Label>
              <Form.Control
                type="text"
                value={formState.descripcion}
                onChange={e =>
                  setFormState({
                    ...formState,
                    descripcion: e.target.value.toUpperCase(),
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Tipo</Form.Label>
              <Form.Select
                required
                value={formState.tipo}
                onChange={e =>
                  setFormState({
                    ...formState,
                    tipo: e.target.value,
                  })
                }
              >
                <option value="">Seleccionar</option>
                <option value="LISTA">LISTA</option>
                <option value="DATE">DATE</option>
                <option value="INTEGER">INTEGER</option>
                <option value="STRING">STRING</option>
                <option value="BOOLEAN">BOOLEAN</option>
                <option value="DOUBLE">DOUBLE</option>
                <option value="ETIQUETA">ETIQUETA</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            {(() => {
              if (formState.tipo === 'LISTA') {
                return (
                  <>
                    <Form.Label>Numero Lista</Form.Label>
                    <Form.Select
                      required
                      value={formState.nrolista}
                      /* onChange={e => {
                        setFormState({
                          ...formState,
                          nrolista: parseInt(e.target.value),
                        });
                      }} */
                      onChange={e =>
                        setFormState({
                          ...formState,
                          nrolista: parseInt(e.target.value),
                        })
                      }
                    >
                      <option value="">Seleccionar</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </Form.Select>
                  </>
                );
              }
            })()}
          </Col>
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
        </Row>
        <Row>
          <Col>
            <Form.Label>Obligatorio</Form.Label>
            <Form.Group>
              <Form.Select
                required
                value={formState.obligatorio}
                onChange={e => {
                  let esta = true;
                  if (e.target.value === "false") {
                    esta = false;
                  }
                  setFormState({
                    ...formState,
                    obligatorio: esta,
                  });
                }}
              >
                <option value="">Seleccionar</option>
                <option value="true">Si</option>
                <option value="false">No</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>Fila</Form.Label>
            <Form.Control
              required
              value={formState.fila}
              onChange={e => {
                if (e.target.value === "") {
                  setFormState({
                    ...formState,
                    fila: null,
                  });
                }
                if (e.target.value !== "") {
                  setFormState({
                    ...formState,
                    fila: e.target.value,
                  });
                }
              }}
            /></Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Columna</Form.Label>
            <Form.Group>
              <Form.Control
                required
                value={formState.columna}
                onChange={e => {
                  if (e.target.value === "") {
                    setFormState({
                      ...formState,
                      columna: null,
                    });
                  }
                  if (e.target.value !== "") {
                    setFormState({
                      ...formState,
                      columna: e.target.value,
                    });
                  }
                }}
              />
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
            Actualizar Parametro
          </button>
        </Col>
      </Form >
      {(() => {
        if (data?.ActualizarParametro.id) {
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
                  ID {data?.ActualizarParametro.id} Parametro{": "}{" "}
                  {data?.ActualizarParametro.descripcion}{" "}
                </h5>
                <h5>
                  Tipo{": "} {data?.ActualizarParametro.tipo}{" "}
                </h5>
                <h5>
                  {data?.ActualizarParametro.nrolista
                    ? `Numero de Lista: ${data?.ActualizarParametro.nrolista}`
                    : ""}{" "}
                </h5>
                <h5>
                  Obligatorio{": "} {data?.ActualizarParametro.obligatorio ? "Si" : "No"}{" "}
                </h5>
                <h5>
                  Fila{": "} {data?.ActualizarParametro.fila}{" "}
                </h5>
                <h5>
                  Columna{": "} {data?.ActualizarParametro.columna}{" "}
                </h5>
                <h4>Producto</h4>
                <h5>
                  Producto ID{": "}{" "}
                  {data?.ActualizarParametro.producto.id}{" "}
                </h5>
                <h5>
                  Producto Descripcion{": "}{" "}
                  {data?.ActualizarParametro.producto.descripcion}{" "}
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
      })()
      }
    </>
  );
};
export default ActualizarParametro;
