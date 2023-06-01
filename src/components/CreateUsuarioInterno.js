import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import validator from "validator";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
const CREATE_USUARIO_MUTATION = gql`
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
const INTERNOS_QUERY = gql`
  query MostrarRolesInternos {
    MostrarRolesInternos {
      id
      rol
    }
  }
`;
const VITA_QUERY = gql`
  query SoloVitalicia {
    SoloVitalicia {
      id
      razon_social
    }
  }
`;
const linkStyle = {
  background: "linear-gradient(to right, #005b44, #00c9a7)",
};
const CreateUsuarioInterno = props => {
  const { url } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: data2 } = useQuery(SUCURSAL_QUERY);
  const { data: data4 } = useQuery(INTERNOS_QUERY);
  const { data: data6 } = useQuery(VITA_QUERY);

  const [formState, setFormState] = useState({
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

  const [createUsuario, { error, data }] = useMutation(
    CREATE_USUARIO_MUTATION,
    {
      variables: {
        createUsuarioInput: {
          ap_paterno: formState.ap_paterno,
          ap_materno: formState.ap_materno,
          ap_casado: formState.ap_casado,
          nombres: formState.nombres,
          numero_carnet: formState.numero_carnet,
          extesion: formState.extesion,
          correo: formState.correo,
          password: formState.password,
          estado: formState.estado,
          celular: formState.celular,
          telefono: formState.telefono,
          nit_usuario: formState.nit_usuario,
          direccion_usuario: formState.direccion_usuario,
          pagina_web_usuario: formState.pagina_web_usuario,
          rolId: formState.rolId,
          sucursalId: formState.sucursalId,
          empresasId: formState.empresasId,
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
        <Accordion.Item eventKey="1" className="bg-transparent">
          <Alert className="text-danger bg-light ">
            <p>
              Los Campos:
              <strong className="text-danger">
                {" "}
                "Empresa", "Rol", "Estado", "Sucursal", "Apellido Materno o
                Paterno", "Nombres", "Numero Carnet", "Extesion", "Nit de
                Usuario", "Correo", "Contraseña" SON OBLIGATORIOS
              </strong>
              , caso contrario no se Realizara el Registro.
            </p>
            {(() => {
              if (error) {
                return (
                  <h3 className="text-center">
                    ¡Error en un Campo! verifique: {error.message};
                  </h3>
                );
              }
            })()}
          </Alert>
          <Accordion.Header className="mt-3">
            Registrar Usuario Agente o Administrador
          </Accordion.Header>
          <Accordion.Body className="text-white mt-3">
            <Form
              className="row g-3"
              onSubmit={e => {
                e.preventDefault();
                createUsuario();
              }}
            >
              <Row className="mb-3">
                <Form.Group as={Col} className="was-validated">
                  <Form.Label>Empresa</Form.Label>
                  <Form.Select
                    required
                    value={formState.empresasId}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        empresasId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Seleccionar</option>
                    {data6 && (
                      <>
                        {data6.SoloVitalicia.map(SoloVitalicia => (
                          <option value={SoloVitalicia.id}>
                            {SoloVitalicia.razon_social}
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
                    value={formState.rolId}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        rolId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Seleccionar</option>
                    {data4 && (
                      <>
                        {data4.MostrarRolesInternos.map(
                          MostrarRolesInternos => (
                            <option value={MostrarRolesInternos.id}>
                              {MostrarRolesInternos.rol}
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
                    value={formState.estado}
                    onChange={e => {
                      let esta = true;
                      if (e.target.value === "false") {
                        esta = false;
                      }
                      setFormState({
                        ...formState,
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
                    value={formState.sucursalId}
                    onChange={e =>
                      setFormState({
                        ...formState,
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
                    value={formState.ap_paterno}
                    onChange={e => {
                      if (e.target.value === "") {
                        setFormState({
                          ...formState,
                          ap_paterno: null,
                        });
                      }
                      if (e.target.value !== "") {
                        setFormState({
                          ...formState,
                          ap_paterno: e.target.value.toUpperCase(),
                        });
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Apellido Materno</Form.Label>
                  <Form.Control
                    value={formState.ap_materno}
                    onChange={e => {
                      if (e.target.value === "") {
                        setFormState({
                          ...formState,
                          ap_materno: null,
                        });
                      }
                      if (e.target.value !== "") {
                        setFormState({
                          ...formState,
                          ap_materno: e.target.value.toUpperCase(),
                        });
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Apellido De Casado</Form.Label>
                  <Form.Control
                    value={formState.ap_casado}
                    onChange={e => {
                      if (e.target.value === "") {
                        setFormState({
                          ...formState,
                          ap_casado: null,
                        });
                      }
                      if (e.target.value !== "") {
                        setFormState({
                          ...formState,
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
                    required
                    value={formState.nombres}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        nombres: e.target.value.toUpperCase(),
                      })
                    }
                  />
                  <div className="invalid-feedback">
                    Este Campo es Obligatorio.
                  </div>
                </Form.Group>
                <Form.Group as={Col} className="was-validated">
                  <Form.Label>Carnet</Form.Label>
                  <Form.Control
                    required
                    value={formState.numero_carnet}
                    onChange={e => {
                      if (e.target.value === "") {
                        setFormState({
                          ...formState,
                          numero_carnet: null,
                        });
                      }
                      if (e.target.value !== "") {
                        setFormState({
                          ...formState,
                          numero_carnet: e.target.value,
                        });
                      }
                    }}
                  />
                  <div class="invalid-feedback">Este Campo es Obligatorio.</div>
                </Form.Group>
                <Form.Group as={Col} className="was-validated">
                  <Form.Label>Extencion</Form.Label>
                  <Form.Select
                    required
                    value={formState.extesion}
                    onChange={e => {
                      if (e.target.value === "1") {
                        setFormState({
                          ...formState,
                          extesion: null,
                        });
                      }
                      setFormState({
                        ...formState,
                        extesion: e.target.value,
                      });
                    }}
                  >
                    <option value="">Seleccionar</option>
                    <option value="1">Sin Extencion</option>
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
                  <div className="invalid-feedback">Debe Seleccionar</div>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} className="was-validated">
                  <Form.Label>Nit de Usuario</Form.Label>
                  <Form.Control
                    required
                    value={formState.nit_usuario}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        nit_usuario: e.target.value,
                      })
                    }
                  />
                  <div class="invalid-feedback">Este Campo es Obligatorio.</div>
                </Form.Group>
                <Form.Group as={Col} className="was-validated">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    value={formState.correo}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        correo: e.target.value,
                      })
                    }
                  />
                  <div class="invalid-feedback">Este Campo es Obligatorio.</div>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Contraña</Form.Label>
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
                                  value={formState.password}
                                  onChange={e =>
                                    setFormState(
                                      {
                                        ...formState,
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
                                  value={formState.password}
                                  onChange={e =>
                                    setFormState(
                                      {
                                        ...formState,
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
                    value={formState.celular}
                    onChange={e => {
                      if (e.target.value === "") {
                        setFormState({
                          ...formState,
                          celular: null,
                        });
                      }
                      if (e.target.value !== "") {
                        setFormState({
                          ...formState,
                          celular: e.target.value,
                        });
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    value={formState.telefono}
                    onChange={e => {
                      if (e.target.value === "") {
                        setFormState({
                          ...formState,
                          telefono: null,
                        });
                      }
                      if (e.target.value !== "") {
                        setFormState({
                          ...formState,
                          telefono: e.target.value,
                        });
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Direccion</Form.Label>
                  <Form.Control
                    value={formState.direccion_usuario}
                    onChange={e => {
                      if (e.target.value === "") {
                        setFormState({
                          ...formState,
                          direccion_usuario: null,
                        });
                      }
                      if (e.target.value !== "") {
                        setFormState({
                          ...formState,
                          direccion_usuario: e.target.value.toUpperCase(),
                        });
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Pagina Web</Form.Label>
                  <Form.Control
                    value={formState.pagina_web_usuario}
                    onChange={e => {
                      if (e.target.value === "") {
                        setFormState({
                          ...formState,
                          pagina_web_usuario: null,
                        });
                      }
                      if (e.target.value !== "") {
                        setFormState({
                          ...formState,
                          pagina_web_usuario: e.target.value,
                        });
                      }
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="text-center">
                <Col>
                  {(() => {
                    if (
                      formState.nombres &&
                      formState.numero_carnet &&
                      formState.correo &&
                      formState.password &&
                      (formState.estado || !formState.estado) &&
                      formState.nit_usuario &&
                      formState.rolId &&
                      formState.sucursalId &&
                      formState.empresasId &&
                      (formState.ap_paterno || formState.ap_materno)
                    ) {
                      return (
                        <Button
                          variant="warning"
                          type="submit"
                          onClick={handleShow}
                        >
                          Registrar Usuario Interno
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
                          Registrar Usuario Interno
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
        if (data?.CrearUsuario.id) {
          return (
            <Modal
              show={true}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header className="mt-3 text-center">
                <h3>
                  Registro Exitoso los Datos del Nuevo Usuario Interno Son:
                </h3>
              </Modal.Header>
              <Modal.Body>
                <div className="card-body bg-transparent">
                  <h5 className="card-text">
                    ID {data?.CrearUsuario.id} Nombres{": "}{" "}
                    {data?.CrearUsuario.nombres} {data?.CrearUsuario.ap_paterno}{" "}
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
                <Link className="btn btn-info  text-black " to="/usuariolista">
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

export default CreateUsuarioInterno;
