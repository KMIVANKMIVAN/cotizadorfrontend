import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { AUTH_TOKEN } from "../constants";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
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
          direccion_empresa
          pagina_web_empresa
          telefono_empresa
          linea_gratuita
          celular_empresa
          correo_empresa
        }
      }
    }
  }
`;

const Login = () => {


  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    correo: null,
    password: null,
  });


  const [login, { error }] = useMutation(LOGIN_MUTATION, {
    
    variables: {
      loginInput: {
        correo: formState.correo,
        password: formState.password,
      },
    },
    onCompleted: ({ login }) => {
      if (login.usuario.estado) {
        localStorage.setItem(AUTH_TOKEN, login.token);
        if (login.usuario.rol.rol === "ADMINISTRADOR") {
          const parametros = {
            parametro1: login.usuario.id,
            parametro2: login.usuario.correo,
            parametro3: login.usuario.nombres,
          };
          navigate("/menuadmin", { state: parametros });
        } else {
          const parametros = {
            parametro1: login.usuario.id,
            parametro2: login.usuario.correo,
            parametro3: login.usuario.nombres,
          };
          navigate("/menu", { state: parametros });
        }
      } else {
        navigate("/inactivo");
      }
    },
  });

  const [password, setPasswordValue] = React.useState("password");
  const toggle = () => {
    if (password === "password") {
      setPasswordValue("text");
      return;
    }
    setPasswordValue("password");
  };

  return (
    <>
      <div className="container w-75 mt-5 mb-5 rounded shadow">
        {(() => {
          if (error) {
            return (
              <div className="alert alert-danger text-center" role="alert">
                <h4>{error.message}</h4>
              </div>
            );
          }
        })()}
        <div className="row align-items-stretch">
          <div className="col p-2 d-none d-lg-block rounded ">
            <img
              src={require("../assets/img/login.jpg")}
              className="rounded"
              width="100%"
            />
          </div>
          <div className="col rounded">
            <div className="text-left text-white">
              <h2 className="fw-bold text-center py-5">Bienvenido</h2>
              <div className="mb-4 was-validated">
                <Form.Label for="user" className="for-label">
                  Correo
                </Form.Label>
                <Form.Control
                  className="form-control is-invalid"
                  id="validationTextarea"
                  placeholder="Campo Obligatorio"
                  required
                  value={formState.correo}
                  onChange={e =>
                    setFormState({
                      ...formState,
                      correo: e.target.value,
                    })
                  }
                  type="text"
                />
              </div>
              <div className="mb-4 was-validated">
                <Form.Label for="password" class="for-label">
                  Contraseña
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    className="form-control is-invalid"
                    id="validationTextarea"
                    placeholder="Campo Obligatorio"
                    required
                    value={formState.password}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        password: e.target.value,
                      })
                    }
                    type={password}
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
                </InputGroup>
              </div>
              <div className="d-grid">
                {(() => {
                  if (
                    formState.correo !== null &&
                    formState.password !== null
                  ) {
                    return (
                      <Col className="text-center">
                        <Button variant="info" onClick={login}>
                          Iniciar Sesion
                        </Button>
                      </Col>
                    );
                  } else {
                    return (
                      <Col className="text-center">
                        <Button variant="info" disabled onClick={login}>
                          Iniciar Sesion
                        </Button>
                      </Col>
                    );
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
