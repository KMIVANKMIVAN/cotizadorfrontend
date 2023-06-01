import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
const USUARIOS_MUTATION = gql`
  mutation ActualizarUsuario($updateUsuarioInput: UpdateUsuarioInput!) {
    ActualizarUsuario(updateUsuarioInput: $updateUsuarioInput) {
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
        rol
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
const SUCURSAL_QUERY = gql`
  query MostrarSucursales {
    MostrarSucursales {
      id
      sucursal
    }
  }
`;
const ActualizarUsuarioPru = props => {
  const { usuarios, url } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: data2, error: error0 } = useQuery(SUCURSAL_QUERY);

  const [formState, setFormState] = useState({
    id: parseInt(usuarios.id),
    correo: usuarios.correo,
    estado: usuarios.estado,
    celular: usuarios.celular,
    telefono: usuarios.telefono,
    direccion_usuario: usuarios.direccion_usuario,
    pagina_web_usuario: usuarios.pagina_web_usuario,

    ap_paterno: usuarios.ap_paterno,
    ap_materno: usuarios.ap_materno,
    ap_casado: usuarios.ap_casado,
    nombres: usuarios.nombres,
    numero_carnet: usuarios.numero_carnet,
    extesion: usuarios.extesion,
    nit_usuario: usuarios.nit_usuario,

    rolId: parseInt(usuarios.rol.id),
    empresasId: parseInt(usuarios.empresa.id),
    sucursalId: parseInt(usuarios.sucursal.id),
  });

  const [updateUsuario, { error: error1, data }] = useMutation(
    USUARIOS_MUTATION,
    {
      variables: {
        updateUsuarioInput: {
          id: parseInt(formState.id),
          correo: formState.correo,
          estado: formState.estado,
          celular: formState.celular,
          telefono: formState.telefono,
          direccion_usuario: formState.direccion_usuario,
          pagina_web_usuario: formState.pagina_web_usuario,

          ap_paterno: formState.ap_paterno,
          ap_materno: formState.ap_materno,
          ap_casado: formState.ap_casado,
          nombres: formState.nombres,
          numero_carnet: formState.numero_carnet,
          extesion: formState.extesion,
          nit_usuario: formState.nit_usuario,

          rolId: parseInt(usuarios.rol.id),
          empresasId: parseInt(usuarios.empresa.id),
          sucursalId: parseInt(formState.sucursalId),
        },
      },
      // onCompleted: () => <UsuarioLista />,
    }
  );

  return (
    <>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="0" className="bg-transparent">
          <Accordion.Header>Actualizar Usuario</Accordion.Header>
          <Accordion.Body>
            {(() => {
              if (error0) {
                return (
                  <Alert className="text-danger bg-light ">
                    <h3 className="text-center">
                      ¡Error en un Campo! verifique: {error0.message};
                    </h3>
                  </Alert>
                );
              }
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
                    <Form.Label className="text-black">
                      Apellido Paterno
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={formState.ap_paterno}
                      onChange={e =>
                        setFormState({
                          ...formState,
                          ap_paterno: e.target.value.toUpperCase(),
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className="text-black">
                      Apellido Materno
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={formState.ap_materno}
                      onChange={e =>
                        setFormState({
                          ...formState,
                          ap_materno: e.target.value.toUpperCase(),
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="text-black">
                      Apellido De Casado
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={formState.ap_casado}
                      onChange={e => {
                        if (e.target.value === "" || e.target.value === null) {
                          setFormState({
                            ...formState,
                            ap_casado: null,
                          });
                        } else {
                          setFormState({
                            ...formState,
                            ap_casado: e.target.value.toUpperCase(),
                          });
                        }
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className="text-black">Nombres</Form.Label>
                    <Form.Control
                      type="text"
                      value={formState.nombres}
                      onChange={e =>
                        setFormState({
                          ...formState,
                          nombres: e.target.value.toUpperCase(),
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="text-black">Carnet</Form.Label>
                    <Form.Control
                      type="text"
                      value={formState.numero_carnet}
                      onChange={e =>
                        setFormState({
                          ...formState,
                          numero_carnet: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className="text-black">Extencion</Form.Label>
                    <Form.Select
                      required
                      value={formState.extesion}
                      onChange={e => {
                        setFormState({
                          ...formState,
                          extesion: e.target.value,
                        });
                      }}
                    >
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
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="text-black">
                      Nit de Usuario
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={formState.nit_usuario}
                      onChange={e =>
                        setFormState({
                          ...formState,
                          nit_usuario: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className="text-black">Correo</Form.Label>
                    <Form.Control
                      type="email"
                      value={formState.correo}
                      onChange={e =>
                        setFormState({
                          ...formState,
                          correo: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="text-black">Telefono</Form.Label>
                    <Form.Control
                      value={formState.telefono}
                      onChange={e =>
                        setFormState({
                          ...formState,
                          telefono: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className="text-black">Celular</Form.Label>
                    <Form.Control
                      value={formState.celular}
                      onChange={e =>
                        setFormState({
                          ...formState,
                          celular: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="text-black">Direccion</Form.Label>
                    <Form.Control
                      value={formState.direccion_usuario}
                      onChange={e =>
                        setFormState({
                          ...formState,
                          direccion_usuario: e.target.value.toUpperCase(),
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className="text-black">Pagina Web</Form.Label>
                    <Form.Control
                      value={formState.pagina_web_usuario}
                      onChange={e =>
                        setFormState({
                          ...formState,
                          pagina_web_usuario: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="text-black">Estado</Form.Label>
                    <Form.Select
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
                      <option value="true">Activo</option>
                      <option value="false">Inactivo</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label className="text-black">Sucursal</Form.Label>
                  <Form.Group>
                    <Form.Select
                      value={formState.sucursalId}
                      onChange={e => {
                        setFormState({
                          ...formState,
                          sucursalId: parseInt(e.target.value),
                        });
                      }}
                    >
                      {data2?.MostrarSucursales.map(MostrarSucursales => (
                        <>
                          <option value={MostrarSucursales.id}>
                            {MostrarSucursales.sucursal}
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
                  Actualizar Usuario
                </button>
              </Col>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {(() => {
        if (data?.ActualizarUsuario.id) {
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
                    Se Actualizo los Datos del Usuario:
                  </h3>
                </Modal.Header>
                <Modal.Body>
                  <h5>
                    ID {data?.ActualizarUsuario.id} Nombres{": "}{" "}
                    {data?.ActualizarUsuario.nombres}{" "}
                    {data?.ActualizarUsuario.ap_paterno}{" "}
                    {data?.ActualizarUsuario.ap_materno}{" "}
                    {data?.ActualizarUsuario.ap_casado
                      ? `${data?.ActualizarUsuario.ap_casado}`
                      : ""}{" "}
                  </h5>
                  <h5>
                    {data?.ActualizarUsuario.numero_carnet
                      ? `Numero de Carnet:  ${data?.ActualizarUsuario.numero_carnet}`
                      : ""}
                    {data?.ActualizarUsuario.extesion
                      ? `${data?.ActualizarUsuario.extesion}`
                      : ""}
                  </h5>
                  <h5>
                    {data?.ActualizarUsuario.nit_usuario
                      ? `Con Nit: ${data?.ActualizarUsuario.nit_usuario}`
                      : ""}
                  </h5>
                  <h4>Estado</h4>
                  <h5>
                    {data?.ActualizarUsuario.estado ? "Activo" : "Inactivo"}
                  </h5>
                  <h4>Contactos Personales</h4>
                  <h5>Correo: {data?.ActualizarUsuario.correo} </h5>
                  <h5>
                    {data?.ActualizarUsuario.celular
                      ? `Celular: ${data?.ActualizarUsuario.celular}`
                      : ""}{" "}
                  </h5>
                  <h5>
                    {data?.ActualizarUsuario.telefono
                      ? `Telefono: ${data?.ActualizarUsuario.telefono}`
                      : ""}{" "}
                  </h5>
                  <h5>
                    {data?.ActualizarUsuario.direccion_usuario
                      ? `Direccion: ${data?.ActualizarUsuario.direccion_usuario}`
                      : ""}{" "}
                  </h5>
                  <h5>
                    {data?.ActualizarUsuario.pagina_web_usuario
                      ? `Pagina Web: ${data?.ActualizarUsuario.pagina_web_usuario}`
                      : ""}
                  </h5>
                  <h4>Tipo de Rol</h4>
                  <h5>{data?.ActualizarUsuario.rol.rol}</h5>
                  <h4>Empresa</h4>
                  <h5>
                    {data?.ActualizarUsuario.empresa.razon_social} Nit:{" "}
                    {data?.ActualizarUsuario.empresa.nit_empresa}
                  </h5>
                  <h4>Sucursal</h4>
                  <h5>{data?.ActualizarUsuario.sucursal.sucursal}</h5>
                </Modal.Body>
                <Modal.Footer>
                  <Link
                    className="btn btn-secondary"
                    onClick={handleClose}
                    to={url}
                  >
                    Cerrar
                  </Link>
                  <Link
                    className="btn btn-primary  text-white "
                    to="/menuadmin"
                  >
                    Menu
                  </Link>
                  <Link
                    className="btn btn-primary  text-white "
                    to="/createusuario"
                  >
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
export default ActualizarUsuarioPru;
