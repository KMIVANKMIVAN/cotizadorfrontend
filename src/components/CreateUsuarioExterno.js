import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import validator from "validator";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
const CREATE_USUARIO_EXTERNO_MUTATION = gql`
  mutation CrearUsuario($createUsuarioInput: CreateUsuarioInput!) {
    CrearUsuario(createUsuarioInput: $createUsuarioInput) {
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
      rol {
        id
        rol
        tiporol
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
const SUCURSAL_QUERY = gql`
  query MostrarSucursales {
    MostrarSucursales {
      id
      sucursal
    }
  }
`;
const EXTERNOS_QUERY = gql`
  query MostrarRolesExternos {
    MostrarRolesExternos {
      id
      rol
    }
  }
`;
const EMPRESAS_QUERY = gql`
  query BuscarTodoMenos {
    BuscarTodoMenos {
      id
      razon_social
    }
  }
`;
const CreateUsuarioExterno = props => {
  const { url } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: data2 } = useQuery(SUCURSAL_QUERY);
  const { data: data5 } = useQuery(EXTERNOS_QUERY);
  const { data: data7 } = useQuery(EMPRESAS_QUERY);

  const [formState2, setFormState2] = useState({
    ap_paterno: null,
    ap_materno: null,
    ap_casado: null,
    nombres: null,
    numero_carnet: null,
    extesion: null,
    correo: null,
    password: null,
    estado: null,
    celular: null,
    telefono: null,
    nit_usuario: null,
    direccion_usuario: null,
    pagina_web_usuario: null,
    rolId: null,
    sucursalId: null,
    empresasId: null,
  });

  const [password, setPasswordValue] = React.useState("password");

  const toggle = () => {
    if (password === "password") {
      setPasswordValue("text");
      return;
    }
    setPasswordValue("password");
  };

  const [createUsuarioExterno, { error: error2, data }] = useMutation(
    CREATE_USUARIO_EXTERNO_MUTATION,
    {
      variables: {
        createUsuarioInput: {
          ap_paterno: formState2.ap_paterno,
          ap_materno: formState2.ap_materno,
          ap_casado: formState2.ap_casado,
          nombres: formState2.nombres,
          correo: formState2.correo,
          password: formState2.password,
          estado: formState2.estado,
          celular: formState2.celular,
          telefono: formState2.telefono,
          nit_usuario: formState2.nit_usuario,
          direccion_usuario: formState2.direccion_usuario,
          pagina_web_usuario: formState2.pagina_web_usuario,
          rolId: formState2.rolId,
          sucursalId: formState2.sucursalId,
          empresasId: formState2.empresasId,
        },
      },
    }
  );

  const [errorMessage, setErrorMessage] = useState("");

  const validate = value => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Contraseña Segura");
    } else {
      setErrorMessage("Min. 8 Caracteres, Simb, Num, May, Min");
    }
  };

  return (
    <>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="2" className="bg-transparent">
          <Alert className="text-danger bg-light">
            <p>
              Los Campos:
              <strong className="text-danger">
                {" "}
                "Empresa", "Rol", "Estado", "Sucursal", "Apellido Materno o
                Paterno", "Nombres", "Correo", "Contraseña", SON OBLIGATORIOS
              </strong>
              , caso contrario no se Realizara el Registro
            </p>
            {(() => {
              if (error2) {
                return (
                  <h3 className="text-center">
                    ¡Error en un Campo! verifique: {error2.message};
                  </h3>
                );
              }
            })()}
          </Alert>
          <Accordion.Header className="mt-3">
            Registrar Usuario Ejecutivo
          </Accordion.Header>
          <Accordion.Body className="text-white mt-3">
            <Form
              onSubmit={e => {
                e.preventDefault();
                createUsuarioExterno();
              }}
            >
              <Row className="mb-3">
                <Form.Group as={Col} className="was-validated">
                  <Form.Label>Empresa</Form.Label>
                  <Form.Select
                    required
                    value={formState2.empresasId}
                    onChange={e =>
                      setFormState2({
                        ...formState2,
                        empresasId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Seleccionar</option>
                    {data7 && (
                      <>
                        {data7.BuscarTodoMenos.map(BuscarTodoMenos => (
                          <option value={BuscarTodoMenos.id}>
                            {BuscarTodoMenos.razon_social}
                          </option>
                        ))}
                      </>
                    )}
                  </Form.Select>
                  <div className="invalid-feedback">Debe Seleccionar</div>
                </Form.Group>
                <Form.Group as={Col} className="was-validated">
                  <Form.Label>Rol</Form.Label>
                  <Form.Select
                    required
                    value={formState2.rolId}
                    onChange={e =>
                      setFormState2({
                        ...formState2,
                        rolId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Seleccionar</option>
                    {data5 && (
                      <>
                        {data5.MostrarRolesExternos.map(
                          MostrarRolesExternos => (
                            <option value={MostrarRolesExternos.id}>
                              {MostrarRolesExternos.rol}
                            </option>
                          )
                        )}
                      </>
                    )}
                  </Form.Select>
                  <div className="invalid-feedback">Debe Seleccionar</div>
                </Form.Group>
                <Form.Group as={Col} className="was-validated">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    required
                    value={formState2.estado}
                    onChange={e => {
                      let esta = true;
                      if (e.target.value === "false") {
                        esta = false;
                      }
                      setFormState2({
                        ...formState2,
                        estado: esta,
                      });
                    }}
                  >
                    <option value="">Seleccionar</option>
                    <option value="true">ACTIVO</option>
                    <option value="false">INACTIVO</option>
                  </Form.Select>
                  <div className="invalid-feedback">Debe Seleccionar</div>
                </Form.Group>
                <Form.Group as={Col} className="was-validated">
                  <Form.Label>Sucursal</Form.Label>
                  <Form.Select
                    required
                    value={formState2.sucursalId}
                    onChange={e =>
                      setFormState2({
                        ...formState2,
                        sucursalId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Seleccionar</option>
                    {data2 && (
                      <>
                        {data2.MostrarSucursales.map(MostrarSucursales => (
                          <option value={MostrarSucursales.id}>
                            {MostrarSucursales.sucursal}
                          </option>
                        ))}
                      </>
                    )}
                  </Form.Select>
                  <div className="invalid-feedback">Debe Seleccionar</div>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Apellido Paterno</Form.Label>
                  <Form.Control
                    value={formState2.ap_paterno}
                    onChange={e => {
                      if (e.target.value === "") {
                        setFormState2({
                          ...formState2,
                          ap_paterno: null,
                        });
                      }
                      if (e.target.value !== "") {
                        setFormState2({
                          ...formState2,
                          ap_paterno: e.target.value.toUpperCase(),
                        });
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Apellido Materno</Form.Label>
                  <Form.Control
                    value={formState2.ap_materno}
                    onChange={e => {
                      if (e.target.value === "") {
                        setFormState2({
                          ...formState2,
                          ap_materno: null,
                        });
                      }
                      if (e.target.value !== "") {
                        setFormState2({
                          ...formState2,
                          ap_materno: e.target.value.toUpperCase(),
                        });
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Apellido De Casado</Form.Label>
                  <Form.Control
                    value={formState2.ap_casado}
                    onChange={e => {
                      if (e.target.value === "") {
                        setFormState2({
                          ...formState2,
                          ap_casado: null,
                        });
                      }
                      if (e.target.value !== "") {
                        setFormState2({
                          ...formState2,
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
                    required
                    value={formState2.nombres}
                    onChange={e =>
                      setFormState2({
                        ...formState2,
                        nombres: e.target.value.toUpperCase(),
                      })
                    }
                  />
                  <div className="invalid-feedback">
                    Este Campo es Obligatorio.
                  </div>
                </Form.Group>
                <Form.Group as={Col} className="was-validated">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control
                    className="is-valid"
                    required
                    type="email"
                    value={formState2.correo}
                    onChange={e =>
                      setFormState2({
                        ...formState2,
                        correo: e.target.value,
                      })
                    }
                  />
                  <div className="invalid-feedback">
                    Este Campo es Obligatorio.
                  </div>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Contraseña</Form.Label>
                  {(() => {
                    if (errorMessage === "Contraseña Segura") {
                      return (
                        <OverlayTrigger
                          placement="right"
                          overlay={<Tooltip>Contraseña Segura</Tooltip>}
                        >
                          {({ ref, ...triggerHandler }) => (
                            <InputGroup className="mb-3 ">
                              <div className="input-group rounded border border-success ">
                                <Form.Control
                                  {...triggerHandler}
                                  className="form-control bg-white border border-white"
                                  type={password}
                                  value={formState2.password}
                                  onChange={e =>
                                    setFormState2(
                                      {
                                        ...formState2,
                                        password: e.target.value,
                                      },
                                      validate(e.target.value)
                                    )
                                  }
                                />
                                <a className="btn btn-dark" onClick={toggle}>
                                  {password === "password" ? (
                                    <svg
                                      width="20"
                                      height="17"
                                      fill="currentColor"
                                      className="bi bi-eye-slash-fill"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                      <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                    </svg>
                                  ) : (
                                    <svg
                                      width="20"
                                      height="17"
                                      fill="currentColor"
                                      className="bi bi-eye-fill"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                    </svg>
                                  )}
                                </a>
                                <span
                                  ref={ref}
                                  className="input-group-text bg-white "
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-check-lg"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                  </svg>
                                </span>
                              </div>
                            </InputGroup>
                          )}
                        </OverlayTrigger>
                      );
                    } else {
                      return (
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip>
                              Minimo. 8 Caracteres, Simb, Num, May, Min
                            </Tooltip>
                          }
                        >
                          {({ ref, ...triggerHandler }) => (
                            <InputGroup className="mb-3">
                              <div className="input-group rounded border border-danger">
                                <Form.Control
                                  {...triggerHandler}
                                  className="form-control border border-white"
                                  type={password}
                                  value={formState2.password}
                                  onChange={e =>
                                    setFormState2(
                                      {
                                        ...formState2,
                                        password: e.target.value,
                                      },
                                      validate(e.target.value)
                                    )
                                  }
                                />
                                <a className="btn btn-dark" onClick={toggle}>
                                  {password === "password" ? (
                                    <svg
                                      width="20"
                                      height="17"
                                      fill="currentColor"
                                      className="bi bi-eye-slash-fill"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                      <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                    </svg>
                                  ) : (
                                    <svg
                                      width="20"
                                      height="17"
                                      fill="currentColor"
                                      className="bi bi-eye-fill"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                    </svg>
                                  )}
                                </a>
                                <span
                                  ref={ref}
                                  className="input-group-text bg-white border "
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="text-danger bi bi-exclamation-circle"
                                    viewBox="0 0 16 16"
                                    alt="Check icon"
                                  >
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                                  </svg>
                                </span>
                              </div>
                            </InputGroup>
                          )}
                        </OverlayTrigger>
                      );
                    }
                  })()}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    value={formState2.celular}
                    onChange={e => {
                      if (e.target.value === "") {
                        setFormState2({
                          ...formState2,
                          celular: null,
                        });
                      }
                      if (e.target.value !== "") {
                        setFormState2({
                          ...formState2,
                          celular: e.target.value,
                        });
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    value={formState2.telefono}
                    onChange={e => {
                      if (e.target.value === "") {
                        setFormState2({
                          ...formState2,
                          telefono: null,
                        });
                      }
                      if (e.target.value !== "") {
                        setFormState2({
                          ...formState2,
                          telefono: e.target.value,
                        });
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Direccion</Form.Label>
                  <Form.Control
                    value={formState2.direccion_usuario}
                    onChange={e => {
                      if (e.target.value === "") {
                        setFormState2({
                          ...formState2,
                          direccion_usuario: null,
                        });
                      }
                      if (e.target.value !== "") {
                        setFormState2({
                          ...formState2,
                          direccion_usuario: e.target.value.toUpperCase(),
                        });
                      }
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Pagina Web</Form.Label>
                  <Form.Control
                    value={formState2.pagina_web_usuario}
                    onChange={e => {
                      if (e.target.value === "") {
                        setFormState2({
                          ...formState2,
                          pagina_web_usuario: null,
                        });
                      }
                      if (e.target.value !== "") {
                        setFormState2({
                          ...formState2,
                          pagina_web_usuario: e.target.value,
                        });
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                </Form.Group>
                <Form.Group as={Col}></Form.Group>
              </Row>
              <Row className="text-center">
                <Col>
                  {(() => {
                    if (
                      formState2.nombres &&
                      formState2.correo &&
                      formState2.password &&
                      (formState2.estado || !formState2.estado) &&
                      formState2.rolId &&
                      formState2.sucursalId &&
                      formState2.empresasId &&
                      (formState2.ap_materno || formState2.ap_paterno)
                    ) {
                      return (
                        <Button
                          variant="warning"
                          type="submit"
                          onClick={handleShow}
                        >
                          Registrar Usuario Externo
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
                          Registrar Usuario Externo
                        </Button>
                      );
                    }
                  })()}
                </Col>
              </Row>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {(() => {
        if (data?.CrearUsuario.id !== undefined) {
          return (
            <Modal
              show={true}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header className="mt-3 text-center">
                <h3>
                  Registro Exitoso los Datos del Nuevo Usuario Externo Son:
                </h3>
              </Modal.Header>
              <Modal.Body>
                <div className="card-body bg-transparent">
                  <h5 className="card-text">
                    ID {data?.CrearUsuario.id} Nombres{": "}{" "}
                    {data?.CrearUsuario.nombres}{" "}
                    {data?.CrearUsuario.ap_paterno}{" "}
                    {data?.CrearUsuario.ap_materno}{" "}
                    {data?.CrearUsuario.ap_casado
                      ? `${data?.CrearUsuario.ap_casado}`
                      : ""}{" "}
                  </h5>
                  <h5 className="card-text">
                    {data?.CrearUsuario.numero_carnet
                      ? `Numero de Carnet: ${data?.CrearUsuario.numero_carnet}`
                      : ""}{" "}
                    {data?.CrearUsuario.extesion
                      ? `${data?.CrearUsuario.extesion}`
                      : ""}{" "}
                  </h5>
                  <h5 className="card-text">
                    {data?.CrearUsuario.nit_usuario
                      ? `Con Nit: ${data?.CrearUsuario.nit_usuario}`
                      : ""}
                  </h5>
                  <h4 className="card-title">Estado</h4>
                  <h5 className="card-text">
                    {data?.CrearUsuario.estado ? "Activo" : "Inactivo"}
                  </h5>
                  <h4 className="card-title">Contactos Personales</h4>
                  <h5 className="card-text">
                    Correo: {data?.CrearUsuario.correo}{" "}
                  </h5>
                  <h5 className="card-text">
                    {data?.CrearUsuario.celular
                      ? `Celular: ${data?.CrearUsuario.celular}`
                      : ""}{" "}
                  </h5>
                  <h5 className="card-text">
                    {data?.CrearUsuario.telefono
                      ? `Telefono: ${data?.CrearUsuario.telefono}`
                      : ""}{" "}
                  </h5>
                  <h5 className="card-text">
                    {data?.CrearUsuario.direccion_usuario
                      ? `Direccion: ${data?.CrearUsuario.direccion_usuario}`
                      : ""}{" "}
                  </h5>
                  <h5 className="card-text">
                    {data?.CrearUsuario.pagina_web_usuario
                      ? `Pagina Web: ${data?.CrearUsuario.pagina_web_usuario}`
                      : ""}
                  </h5>
                  <h4 className="card-title">Tipo de Rol</h4>
                  <h5 className="card-text">{data?.CrearUsuario.rol.rol}</h5>
                  <h4 className="card-title">Empresa</h4>
                  <h5 className="card-text">
                    {data?.CrearUsuario.empresa.razon_social}
                  </h5>
                  <h5 className="card-text">
                    Nit: {data?.CrearUsuario.empresa.nit_empresa}
                  </h5>
                  <h4 className="card-title">Sucursal</h4>
                  <h5 className="card-text">
                    {data?.CrearUsuario.sucursal.sucursal}
                  </h5>
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
                <Link className="btn btn-info  text-black " to="/menuadmin">
                  Menu
                </Link>
                <Link
                  className="btn btn-info  text-black "
                  to="/usuariolista"
                >
                  Usuarios
                </Link>
              </Modal.Footer>
            </Modal>
          );
        }
      })()}
    </>
  );
};

export default CreateUsuarioExterno;
