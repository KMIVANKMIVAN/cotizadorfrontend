import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import validator from "validator";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
const USUARIOS_PASSWORD_MUTATION = gql`
  mutation ActualizarUsuarioPassword($updateUsuarioInput: UpdateUsuarioInput!) {
    ActualizarUsuarioPassword(updateUsuarioInput: $updateUsuarioInput) {
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
        rol
        tiporol
      }
      sucursal {
        sucursal
      }
      empresa {
        razon_social
        nit_empresa
      }
    }
  }
`;
const linkStyle = {
  background: "linear-gradient(to right, #005b44, #00c9a7)",
};
const CambiarPasswordPru = props => {
  const { usuarios, url } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form2State, set2FormState] = useState({
    id: parseInt(usuarios.id),
    password: null,
    rolId: parseInt(usuarios.rol.id),
    empresasId: parseInt(usuarios.empresa.id),
    sucursalId: parseInt(usuarios.sucursal.id),
  });

  const [update2Usuario, { error: error2, data }] = useMutation(
    USUARIOS_PASSWORD_MUTATION,
    {
      variables: {
        updateUsuarioInput: {
          id: parseInt(form2State.id),
          password: form2State.password,

          rolId: parseInt(usuarios.rol.id),
          empresasId: parseInt(usuarios.empresa.id),
          sucursalId: parseInt(usuarios.sucursal.id),
        },
      },
      // onCompleted: () => navigate("/usuariolista"),
    }
  );

  const [password, setPasswordValue] = React.useState("password");
  const toggle = () => {
    if (password === "password") {
      setPasswordValue("text");
      return;
    }
    setPasswordValue("password");
  };

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
      setErrorMessage(
        "Minimo 8 Caracteres, Simbolos, Numeros, Mayusculas, Minusculas: No Se Cambiara"
      );
    }
  };
  return (
    <>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="2" className="bg-transparent">
          <Accordion.Header>Cambiar Contraseña</Accordion.Header>
          <Accordion.Body>
            {(() => {
              if (error2) {
                return (
                  <Alert className="text-danger bg-light ">
                    <h3 className="text-center">
                      ¡Error en un Campo! verifique: {error2.message};
                    </h3>
                  </Alert>
                );
              }
            })()}
            <Form
              className="row g-3 needs-validation bg-transparent"
              novalidate
              onSubmit={e => {
                e.preventDefault();
                update2Usuario();
              }}
            >
              <Row className="mt-3">
                <Col>
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
                                  value={form2State.password}
                                  onChange={e =>
                                    set2FormState(
                                      {
                                        ...form2State,
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
                                  value={form2State.password}
                                  onChange={e =>
                                    set2FormState(
                                      {
                                        ...form2State,
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
                </Col>
                <Col></Col>
              </Row>
              <Row className="mt-3 text-center">
                <Col>
                  <button
                    class="btn btn-warning"
                    type="submit"
                    onClick={handleShow}
                  >
                    Cambiar Contraseña
                  </button>
                </Col>
              </Row>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <h3 className="mt-3 text-center">
            Se Actualizo La Contraseña del Usuario:
          </h3>
        </Modal.Header>
        <Modal.Body>
          <h5>
            ID {data?.ActualizarUsuarioPassword.id} Nombres{": "}{" "}
            {data?.ActualizarUsuarioPassword.nombres}{" "}
            {data?.ActualizarUsuarioPassword.ap_paterno}{" "}
            {data?.ActualizarUsuarioPassword.ap_materno}{" "}
            {data?.ActualizarUsuarioPassword.ap_casado
              ? `${data?.ActualizarUsuarioPassword.ap_casado}`
              : ""}{" "}
          </h5>
          <h5>
            {data?.ActualizarUsuarioPassword.numero_carnet
              ? `Numero de Carnet:  ${data?.ActualizarUsuarioPassword.numero_carnet}`
              : ""}
            {data?.ActualizarUsuarioPassword.extesion
              ? `${data?.ActualizarUsuarioPassword.extesion}`
              : ""}
          </h5>
          <h5>
            {data?.ActualizarUsuarioPassword.nit_usuario
              ? `Con Nit: ${data?.ActualizarUsuarioPassword.nit_usuario}`
              : ""}
          </h5>
          <h4>Estado</h4>
          <h5>
            {data?.ActualizarUsuarioPassword.estado ? "Activo" : "Inactivo"}
          </h5>
          <h4>Contactos Personales</h4>
          <h5>Correo: {data?.ActualizarUsuarioPassword.correo} </h5>
          <h5>
            {data?.ActualizarUsuarioPassword.celular
              ? `Celular: ${data?.ActualizarUsuarioPassword.celular}`
              : ""}{" "}
          </h5>
          <h5>
            {data?.ActualizarUsuarioPassword.telefono
              ? `Telefono: ${data?.ActualizarUsuarioPassword.telefono}`
              : ""}{" "}
          </h5>
          <h5>
            {data?.ActualizarUsuarioPassword.direccion_usuario
              ? `Direccion: ${data?.ActualizarUsuarioPassword.direccion_usuario}`
              : ""}{" "}
          </h5>
          <h5>
            {data?.ActualizarUsuarioPassword.pagina_web_usuario
              ? `Pagina Web: ${data?.ActualizarUsuarioPassword.pagina_web_usuario}`
              : ""}
          </h5>
          <h4>Tipo de Rol</h4>
          <h5>{data?.ActualizarUsuarioPassword.rol.rol}</h5>
          <h4>Empresa</h4>
          <h5>
            {data?.ActualizarUsuarioPassword.empresa.razon_social} Nit:{" "}
            {data?.ActualizarUsuarioPassword.empresa.nit_empresa}
          </h5>
          <h4>Sucursal</h4>
          <h5>{data?.ActualizarUsuarioPassword.sucursal.sucursal}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Link className="btn btn-secondary" onClick={handleClose} to={url}>
            Cerrar
          </Link>
          <Link className="btn btn-primary  text-white " to="/menuadmin">
            Menu
          </Link>
          <Link className="btn btn-primary  text-white " to="/createusuario">
            Registrar Usuarios
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CambiarPasswordPru;
