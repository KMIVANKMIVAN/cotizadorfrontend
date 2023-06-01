import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import { Dropdown, DropdownButton } from 'react-bootstrap';
const CREATE_PARAMETRO_MUTATION = gql`
  mutation CrearteParametro($createParametroInput: CreateParametroInput!) {
  CrearteParametro(createParametroInput: $createParametroInput) {
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
const LISTA_PARAMETRO_QUERY = gql`
query MostrarListaparametro {
  MostrarListaparametro {
    id
    nrolista
    descripcion
    valor
  }
}
`;
const CreateParametro = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: data1 } = useQuery(PRODUCTO_QUERY);
  const { data: data2 } = useQuery(LISTA_PARAMETRO_QUERY);

  const [formState, setFormState] = useState({
    descripcion: null,
    tipo: null,
    nrolista: null,
    obligatorio: null,
    fila: null,
    columna: null,
    productoId: null,
  });

  const [createParametro, { error, data }] = useMutation(
    CREATE_PARAMETRO_MUTATION,
    {
      variables: {
        createParametroInput: {
          descripcion: formState.descripcion,
          tipo: formState.tipo,
          nrolista: formState.nrolista,
          obligatorio: formState.obligatorio,
          fila: parseInt(formState.fila),
          columna: parseInt(formState.columna),
          productoId: parseInt(formState.productoId),
          /* nrolista: parseInt(formState.nrolista),
          obligatorio: formState.obligatorio,
          fila: parseInt(formState.fila),
          columna: parseInt(formState.columna),
          productoId: parseInt(formState.productoId),
          listaparametroId: parseInt(formState.listaparametroId), */
        },
      },
    }
  );
  console.log(typeof formState.descripcion);
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
          createParametro();
        }}
      >
        <h2 className="text-white">Crear Parametro</h2>
        <Row className="mb-3">
          {/* <h2>a {formState.descripcion}</h2>
          <h2>b {formState.tipo}</h2>
          <h2>c {formState.nrolista}</h2>
          <h2>d {formState.obligatorio}</h2>
          <h2>e {formState.fila}</h2>
          <h2>f {formState.columna}</h2>
          <h2>g {formState.productoId}</h2>
          <h2>h {formState.listaparametroId}</h2> */}
          <Form.Group as={Col} className="was-validated">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              required
              value={formState.descripcion}
              onChange={e => {
                if (e.target.value === "") {
                  setFormState({
                    ...formState,
                    descripcion: null,
                  });
                }
                if (e.target.value !== "") {
                  setFormState({
                    ...formState,
                    descripcion: e.target.value.toUpperCase(),
                  });
                }
              }}
            />
          </Form.Group>
          <Form.Group as={Col} className="was-validated">
            <Form.Label>Tipo</Form.Label>
            {/* <Form.Control
              required
              value={formState.tipo}
              onChange={e => {
                if (e.target.value === "") {
                  setFormState({
                    ...formState,
                    tipo: null,
                  });
                }
                if (e.target.value !== "") {
                  setFormState({
                    ...formState,
                    tipo: e.target.value.toUpperCase(),
                  });
                }
              }}
            /> */}
            <Form.Select
              required
              value={formState.tipo}
              onChange={e => {
                if (e.target.value === "1") {
                  setFormState({
                    ...formState,
                    tipo: null,
                  });
                }
                setFormState({
                  ...formState,
                  tipo: e.target.value,
                });
              }}
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
            {/* <Form.Select
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
            </Form.Select> */}
          </Form.Group>
          <Form.Group as={Col} className="was-validated">
            {(() => {
              if (formState.tipo === 'LISTA') {
                return (
                  <>
                    <Form.Label>Numero Lista</Form.Label>
                    <Form.Select
                      required
                      value={formState.nrolista}
                      onChange={e => {
                        if (formState.tipo !== 'LISTA') {
                          setFormState({
                            ...formState,
                            nrolista: null,
                          });
                        }
                        setFormState({
                          ...formState,
                          nrolista: parseInt(e.target.value),
                        });
                      }}
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
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} className="was-validated">
            <Form.Label>Obligatorio</Form.Label>
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
          <Form.Group as={Col} className="was-validated">
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
            />
          </Form.Group>
          <Form.Group as={Col} className="was-validated">
            <Form.Label>Columna</Form.Label>
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
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} className="was-validated">
            <Form.Label>Producto</Form.Label>
            <Form.Select
              required
              value={formState.productoId}
              onChange={e =>
                setFormState({
                  ...formState,
                  productoId: e.target.value,
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
          <Form.Group as={Col} className="was-validated">
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Row>
        <Row className="mb-3 justify-content-md-center">
          <Col xs lg="6">
            <Button variant="warning" type="submit" onClick={handleShow}>
              Crear Parametro
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
        if (data?.CrearteParametro.id) {
          return (
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <h2 className="mt-3 text-center">
                  Creacion Exitosa el nuevo Parametro es:
                </h2>
              </Modal.Header>
              <Modal.Body>
                <div className="card border-light bg-transparent">
                  <div className="card-body bg-transparent">
                    <h5>
                      ID {data?.CrearteParametro.id} Parametro{": "}{" "}
                      {data?.CrearteParametro.descripcion}{" "}
                    </h5>
                    <h5>
                      Tipo{": "} {data?.CrearteParametro.tipo}{" "}
                    </h5>
                    <h5>
                      {data?.CrearteParametro.nrolista
                        ? `Numero de Lista: ${data?.CrearteParametro.nrolista}`
                        : ""}{" "}
                    </h5>
                    <h5>
                      Obligatorio{": "} {data?.CrearteParametro.obligatorio ? "Si" : "No"}{" "}
                    </h5>
                    <h5>
                      Fila{": "} {data?.CrearteParametro.fila}{" "}
                    </h5>
                    <h5>
                      Columna{": "} {data?.CrearteParametro.columna}{" "}
                    </h5>
                    <h4>Producto</h4>
                    <h5>
                      Producto ID{": "}{" "}
                      {data?.CrearteParametro.producto.id}{" "}
                    </h5>
                    <h5>
                      Producto Descripcion{": "}{" "}
                      {data?.CrearteParametro.producto.descripcion}{" "}
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

export default CreateParametro;
