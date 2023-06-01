import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
const USUARIOS_MUTATION = gql`
  mutation ActualizarEmpresa($updateEmpresaInput: UpdateEmpresaInput!) {
    ActualizarEmpresa(updateEmpresaInput: $updateEmpresaInput) {
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
const ActualizarEmpresaPru = props => {
  const { empresas, url } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    id: parseInt(empresas.id),
    razon_social: empresas.razon_social,
    nit_empresa: empresas.nit_empresa,
    direccion_empresa: empresas.direccion_empresa,
    pagina_web_empresa: empresas.pagina_web_empresa,
    telefono_empresa: empresas.telefono_empresa,
    linea_gratuita: empresas.linea_gratuita,
    celular_empresa: empresas.celular_empresa,
    correo_empresa: empresas.correo_empresa,

    tipo_empresas_id: parseInt(empresas.tipo_empresa.id),
  });

  const [updateUsuario, { error: error1, data }] = useMutation(
    USUARIOS_MUTATION,
    {
      variables: {
        updateEmpresaInput: {
          id: parseInt(formState.id),
          razon_social: formState.razon_social,
          nit_empresa: formState.nit_empresa,
          direccion_empresa: formState.direccion_empresa,
          pagina_web_empresa: formState.pagina_web_empresa,
          telefono_empresa: formState.telefono_empresa,
          linea_gratuita: formState.linea_gratuita,
          celular_empresa: formState.celular_empresa,
          correo_empresa: formState.correo_empresa,

          tipo_empresas_id: parseInt(empresas.tipo_empresa.id),
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
          updateUsuario();
        }}
      >
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Razon Social</Form.Label>
              <Form.Control
                type="text"
                value={formState.razon_social}
                onChange={e =>
                  setFormState({
                    ...formState,
                    razon_social: e.target.value.toUpperCase(),
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Nit Empresa</Form.Label>
              <Form.Control
                type="text"
                value={formState.nit_empresa}
                onChange={e =>
                  setFormState({
                    ...formState,
                    nit_empresa: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Direccion Empresa</Form.Label>
              <Form.Control
                type="text"
                value={formState.direccion_empresa}
                onChange={e => {
                  if (e.target.value === "" || e.target.value === null) {
                    setFormState({
                      ...formState,
                      direccion_empresa: null,
                    });
                  } else {
                    setFormState({
                      ...formState,
                      direccion_empresa: e.target.value.toUpperCase(),
                    });
                  }
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Pagina Web Empresa</Form.Label>
              <Form.Control
                type="text"
                value={formState.pagina_web_empresa}
                onChange={e => {
                  if (e.target.value === "" || e.target.value === null) {
                    setFormState({
                      ...formState,
                      pagina_web_empresa: null,
                    });
                  } else {
                    setFormState({
                      ...formState,
                      pagina_web_empresa: e.target.value,
                    });
                  }
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Telefono Empresa</Form.Label>
              <Form.Control
                type="text"
                value={formState.telefono_empresa}
                onChange={e => {
                  if (e.target.value === "" || e.target.value === null) {
                    setFormState({
                      ...formState,
                      telefono_empresa: null,
                    });
                  } else {
                    setFormState({
                      ...formState,
                      telefono_empresa: e.target.value,
                    });
                  }
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Linea Gratuita</Form.Label>
              <Form.Control
                type="text"
                value={formState.linea_gratuita}
                onChange={e => {
                  if (e.target.value === "" || e.target.value === null) {
                    setFormState({
                      ...formState,
                      linea_gratuita: null,
                    });
                  } else {
                    setFormState({
                      ...formState,
                      linea_gratuita: e.target.value,
                    });
                  }
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Celular Empresa</Form.Label>
              <Form.Control
                type="text"
                value={formState.celular_empresa}
                onChange={e => {
                  if (e.target.value === "" || e.target.value === null) {
                    setFormState({
                      ...formState,
                      celular_empresa: null,
                    });
                  } else {
                    setFormState({
                      ...formState,
                      celular_empresa: e.target.value,
                    });
                  }
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Correo Empresa</Form.Label>
              <Form.Control
                type="email"
                value={formState.correo_empresa}
                onChange={e => {
                  if (e.target.value === "" || e.target.value === null) {
                    setFormState({
                      ...formState,
                      correo_empresa: null,
                    });
                  } else {
                    setFormState({
                      ...formState,
                      correo_empresa: e.target.value,
                    });
                  }
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Col>
          <Button variant="warning" type="submit" onClick={handleShow}>
            Actualizar Empresa
          </Button>
        </Col>
      </Form>
      {(() => {
        if (data?.ActualizarEmpresa.id) {
          return (
            <>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header>
                  <h3 className="mt-3 text-center">
                    Se Actualizo los Datos de la Empresa:
                  </h3>
                </Modal.Header>
                <Modal.Body>
                  <h5 className="card-text">
                    ID {data?.ActualizarEmpresa.id} {": "}{" "}
                    {data?.ActualizarEmpresa.razon_social}
                  </h5>
                  <h5 className="card-text">
                    Nit: {data?.ActualizarEmpresa.nit_empresa}
                  </h5>
                  <h4 className="card-title">Contactos</h4>
                  <h5 className="card-text">
                    {data?.ActualizarEmpresa.correo_empresa
                      ? `Correo: ${data?.ActualizarEmpresa.correo_empresa}`
                      : ""}{" "}
                  </h5>
                  <h5 className="card-text">
                    {data?.ActualizarEmpresa.celular_empresa
                      ? `Celular: ${data?.ActualizarEmpresa.celular_empresa}`
                      : ""}{" "}
                  </h5>
                  <h5 className="card-text">
                    {data?.ActualizarEmpresa.telefono_empresa
                      ? `Telefono: ${data?.ActualizarEmpresa.telefono_empresa}`
                      : ""}{" "}
                  </h5>
                  <h5 className="card-text">
                    {data?.ActualizarEmpresa.direccion_empresa
                      ? `Direccion: ${data?.ActualizarEmpresa.direccion_empresa}`
                      : ""}{" "}
                  </h5>
                  <h5 className="card-text">
                    {data?.ActualizarEmpresa.linea_gratuita
                      ? `Linea Gratuita: ${data?.ActualizarEmpresa.linea_gratuita}`
                      : ""}{" "}
                  </h5>
                  <h4 className="card-title">Tipo de Empresa</h4>
                  <h5 className="card-text">
                    {data?.ActualizarEmpresa.tipo_empresa.tipo}
                  </h5>
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
                  <Link className="btn btn-info" to="/createusuario">
                    Registrar Usuarios
                  </Link>
                </Modal.Footer>
              </Modal>
            </>
          );
        }
      })()}
    </>
  );
};
export default ActualizarEmpresaPru;
