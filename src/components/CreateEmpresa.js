import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const CREATE_EMPRESA_MUTATION = gql`
  mutation CrearEmpresa($createEmpresaInput: CreateEmpresaInput!) {
    CrearEmpresa(createEmpresaInput: $createEmpresaInput) {
      id
      razon_social
      nit_empresa
      direccion_empresa
      pagina_web_empresa
      telefono_empresa
      linea_gratuita
      celular_empresa
      correo_empresa
      tipo_empresa {
        id
        tipo
      }
    }
  }
`;
const TIPO_EMPRESA_QUERY = gql`
  query BuscarMostrarTipoEmpresaExterna {
    BuscarMostrarTipoEmpresaExterna {
      id
      tipo
    }
  }
`;
const CreateEmpresa = props => {
  const { url } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: data4 } = useQuery(TIPO_EMPRESA_QUERY);

  const [formState, setFormState] = useState({
    razon_social: null,
    nit_empresa: null,
    direccion_empresa: null,
    pagina_web_empresa: null,
    telefono_empresa: null,
    linea_gratuita: null,
    celular_empresa: null,
    correo_empresa: null,
    tipo_empresas_id: null,
  });

  const [createEmpresa, { error, data }] = useMutation(
    CREATE_EMPRESA_MUTATION,
    {
      variables: {
        createEmpresaInput: {
          razon_social: formState.razon_social,
          nit_empresa: formState.nit_empresa,
          direccion_empresa: formState.direccion_empresa,
          pagina_web_empresa: formState.pagina_web_empresa,
          telefono_empresa: formState.telefono_empresa,
          linea_gratuita: formState.linea_gratuita,
          celular_empresa: formState.celular_empresa,
          correo_empresa: formState.correo_empresa,
          tipo_empresas_id: formState.tipo_empresas_id,
        },
      },
    }
  );

  return (
    <div>
      <Alert className="text-danger bg-light m-3">
        Los Campos:
        <strong className="text-danger">
          "Razon Social", "Nit Empresa", "Direccion Empresa", "Tipo de Empresa".
          SON OBLIGATORIOS
        </strong>
        , caso contrario no se Realizara el Registro
        {(() => {
          if (error) {
            return (
              <h4 className="text-center">
                ¡Error en un Campo! verifique: {error.message};
              </h4>
            );
          }
        })()}
      </Alert>
      <Form
        className="row g-3 text-white"
        onSubmit={e => {
          e.preventDefault();
          createEmpresa();
        }}
      >
        <h2 className="text-white">Registrar Empresa Externa</h2>
        <Row className="mb-3">
          <Form.Group as={Col} className="was-validated">
            <Form.Label>Razon Social</Form.Label>
            <Form.Control
              required
              value={formState.razon_social}
              onChange={e =>
                setFormState({
                  ...formState,
                  razon_social: e.target.value.toUpperCase(),
                })
              }
            />
            <div className="invalid-feedback">Este Campo es Obligatorio.</div>
          </Form.Group>
          <Form.Group as={Col} className="was-validated">
            <Form.Label>Nit Empresa</Form.Label>
            <Form.Control
              required
              value={formState.nit_empresa}
              onChange={e =>
                setFormState({
                  ...formState,
                  nit_empresa: e.target.value,
                })
              }
            />
            <div className="invalid-feedback">Este Campo es Obligatorio.</div>
          </Form.Group>
          <Form.Group as={Col} className="was-validated">
            <Form.Label>Direccion Empresa</Form.Label>
            <Form.Control
              required
              value={formState.direccion_empresa}
              onChange={e =>
                setFormState({
                  ...formState,
                  direccion_empresa: e.target.value.toUpperCase(),
                })
              }
            />
            <div className="invalid-feedback">Este Campo es Obligatorio.</div>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Pagina Web Empresa</Form.Label>
            <Form.Control
              value={formState.pagina_web_empresa}
              onChange={e =>
                setFormState({
                  ...formState,
                  pagina_web_empresa: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Telefono Empresa</Form.Label>
            <Form.Control
              value={formState.telefono_empresa}
              onChange={e =>
                setFormState({
                  ...formState,
                  telefono_empresa: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Linea Gratuita</Form.Label>
            <Form.Control
              value={formState.linea_gratuita}
              onChange={e =>
                setFormState({
                  ...formState,
                  linea_gratuita: e.target.value,
                })
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Celular Empresa</Form.Label>
            <Form.Control
              value={formState.celular_empresa}
              onChange={e =>
                setFormState({
                  ...formState,
                  celular_empresa: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Correo Empresa</Form.Label>
            <Form.Control
              type="email"
              value={formState.correo_empresa}
              onChange={e =>
                setFormState({
                  ...formState,
                  correo_empresa: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <div>
              {data4 && (
                <>
                  {data4.BuscarMostrarTipoEmpresaExterna.map(
                    BuscarMostrarTipoEmpresaExterna => (
                      <div>
                        <Form.Check
                          className="mt-4 was-validated"
                          type="checkbox"
                          id={`check-api-"checkbox"`}
                        >
                          <Form.Check.Input
                            className="form-check-input"
                            id="validationFormCheck1"
                            required
                            value={formState.tipo_empresas_id}
                            onChange={e =>
                              setFormState({
                                ...formState,
                                tipo_empresas_id: parseInt(
                                  BuscarMostrarTipoEmpresaExterna.id
                                ),
                              })
                            }
                          />
                          <Form.Check.Label className="text-white">
                            Tipo de Empresa Externa
                          </Form.Check.Label>
                          <div class="invalid-feedback">De Ser Marcado</div>
                        </Form.Check>
                      </div>
                    )
                  )}
                </>
              )}
            </div>
          </Form.Group>
        </Row>
        <Row className="text-center">
          <Col>
            {(() => {
              if (
                formState.razon_social &&
                formState.nit_empresa &&
                formState.direccion_empresa &&
                formState.tipo_empresas_id
              ) {
                return (
                  <Button variant="warning" type="submit" onClick={handleShow}>
                    Registrar Empresa Externa
                  </Button>
                );
              } else {
                return (
                  <Button
                    disabled
                    variant="warning"
                    type="submit"
                    onClick={handleShow}
                  >
                    Registrar Empresa Externa
                  </Button>
                );
              }
            })()}
          </Col>
          <Col>
            <Link className="btn btn-info" to="/menuadmin">
              Menu
            </Link>
          </Col>
        </Row>
      </Form>
      {(() => {
        if (data?.CrearEmpresa.id) {
          return (
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header className="mt-3 text-center">
                <h3>
                  Registro Exitoso los Datos de la Nueva Empresa Externa Son:
                </h3>
              </Modal.Header>
              <Modal.Body>
                <div className="card border-light bg-transparent">
                  <div className="card-body bg-transparent">
                    <h5 className="card-text">
                      ID {data?.CrearEmpresa.id} {": "}
                      {data?.CrearEmpresa.razon_social}
                    </h5>
                    <h5 className="card-text">
                      Nit: {data?.CrearEmpresa.nit_empresa}
                    </h5>
                    <h4 className="card-title">Contactos</h4>
                    <h5 className="card-text">
                      {data?.CrearEmpresa.correo_empresa
                        ? `Correo: ${data?.CrearEmpresa.correo_empresa}`
                        : ""}{" "}
                    </h5>
                    <h5 className="card-text">
                      {data?.CrearEmpresa.celular_empresa
                        ? `Celular: ${data?.CrearEmpresa.celular_empresa}`
                        : ""}{" "}
                    </h5>
                    <h5 className="card-text">
                      {data?.CrearEmpresa.telefono_empresa
                        ? `Telefono: ${data?.CrearEmpresa.telefono_empresa}`
                        : ""}{" "}
                    </h5>
                    <h5 className="card-text">
                      {data?.CrearEmpresa.direccion_empresa
                        ? `Direccion: ${data?.CrearEmpresa.direccion_empresa}`
                        : ""}{" "}
                    </h5>
                    <h5 className="card-text">
                      {data?.CrearEmpresa.linea_gratuita
                        ? `Linea Gratuita: ${data?.CrearEmpresa.linea_gratuita}`
                        : ""}{" "}
                    </h5>
                    <h4 className="card-title">Tipo de Empresa</h4>
                    <h5 className="card-text">
                      {data?.CrearEmpresa.tipo_empresa.tipo}
                    </h5>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Link
                  className="btn btn-secondary"
                  onClick={handleClose}
                  to={url}
                >
                  Cerrar
                </Link>
                <Link className="btn btn-info" to="/menuadmin">
                  Menu
                </Link>
                <Link className="btn btn-info" to="/empresalista">
                  Empresas
                </Link>
              </Modal.Footer>
            </Modal>
          );
        }
      })()}
    </div>
  );
};

export default CreateEmpresa;
