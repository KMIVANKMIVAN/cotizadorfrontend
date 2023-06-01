import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useMutation, useQuery, gql } from "@apollo/client";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
const USUARIOS_MUTATION = gql`
  mutation ActualizarUsuarioSucursal($updateUsuarioInput: UpdateUsuarioInput!) {
    ActualizarUsuarioSucursal(updateUsuarioInput: $updateUsuarioInput) {
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
const SUCURSAL_QUERY = gql`
  query MostrarSucursales {
    MostrarSucursales {
      id
      sucursal
    }
  }
`;
const ActualizarSucursalPru = props => {
  const { usuarios, url } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: data2, error: error0 } = useQuery(SUCURSAL_QUERY);

  const [form3State, set3FormState] = useState({
    id: parseInt(usuarios.id),
    sucursalId: usuarios.sucursalId,
    rolId: parseInt(usuarios.rol.id),
    empresasId: parseInt(usuarios.empresa.id),
  });

  const [update3Usuario, { error: error3, data }] = useMutation(
    USUARIOS_MUTATION,
    {
      variables: {
        updateUsuarioInput: {
          id: parseInt(form3State.id),
          sucursalId: form3State.sucursalId,
          rolId: parseInt(usuarios.rol.id),
          empresasId: parseInt(usuarios.empresa.id),
        },
      },
      // onCompleted: () => navigate("/usuariolista"),
    }
  );

  return (
    <>
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
      })()}
      {(() => {
        if (error3) {
          return (
            <Alert className="text-danger bg-light ">
              <h3 className="text-center">
                ¡Error en un Campo! verifique: {error3.message};
              </h3>
            </Alert>
          );
        }
      })()}
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="3" className="bg-transparent">
          <Accordion.Header>Actualizar Sucursal</Accordion.Header>
          <Accordion.Body>
            <Form
              className="row g-3 needs-validation"
              novalidate
              onSubmit={e => {
                e.preventDefault();
                update3Usuario();
              }}
            >
              <Col>
                <Form.Group>
                  <Form.Select
                    value={form3State.sucursalId}
                    onChange={e =>
                      set3FormState({
                        ...form3State,
                        sucursalId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option selected>Seleccione</option>
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
                </Form.Group>
              </Col>
              <Col></Col>
              <Row className="mt-3 text-center">
                <Col>
                  <button
                    class="btn btn-warning  text-black"
                    type="submit"
                    onClick={handleShow}
                  >
                    Actualizar Sucursal
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
            Se Actualizo los Datos del Usuario:
          </h3>
        </Modal.Header>
        <Modal.Body>
          {(() => {
            if (data) {
              return (
                <>
                  <h5>
                    ID {data.ActualizarUsuarioSucursal.id} Nombres{": "}{" "}
                    {data.ActualizarUsuarioSucursal.nombres}{" "}
                    {data.ActualizarUsuarioSucursal.ap_paterno}{" "}
                    {data.ActualizarUsuarioSucursal.ap_materno}{" "}
                    {data.ActualizarUsuarioSucursal.ap_casado
                      ? `${data.ActualizarUsuarioSucursal.ap_casado}`
                      : ""}{" "}
                  </h5>
                  <h5>
                    {data.ActualizarUsuarioSucursal.numero_carnet
                      ? `Numero de Carnet:  ${data.ActualizarUsuarioSucursal.numero_carnet}`
                      : ""}
                    {data.ActualizarUsuarioSucursal.extesion
                      ? `${data.ActualizarUsuarioSucursal.extesion}`
                      : ""}
                  </h5>
                  <h5>
                    {data.ActualizarUsuarioSucursal.nit_usuario
                      ? `Con Nit: ${data.ActualizarUsuarioSucursal.nit_usuario}`
                      : ""}
                  </h5>
                  <h4>Estado</h4>
                  <h5>
                    {data.ActualizarUsuarioSucursal.estado
                      ? "Activo"
                      : "Inactivo"}
                  </h5>
                  <h4>Contactos Personales</h4>
                  <h5>Correo: {data.ActualizarUsuarioSucursal.correo} </h5>
                  <h5>
                    {data.ActualizarUsuarioSucursal.celular
                      ? `Celular: ${data.ActualizarUsuarioSucursal.celular}`
                      : ""}{" "}
                  </h5>
                  <h5>
                    {data.ActualizarUsuarioSucursal.telefono
                      ? `Telefono: ${data.ActualizarUsuarioSucursal.telefono}`
                      : ""}{" "}
                  </h5>
                  <h5>
                    {data.ActualizarUsuarioSucursal.direccion_usuario
                      ? `Direccion: ${data.ActualizarUsuarioSucursal.direccion_usuario}`
                      : ""}{" "}
                  </h5>
                  <h5>
                    {data.ActualizarUsuarioSucursal.pagina_web_usuario
                      ? `Pagina Web: ${data.ActualizarUsuarioSucursal.pagina_web_usuario}`
                      : ""}
                  </h5>
                  <h4>Tipo de Rol</h4>
                  <h5>{data.ActualizarUsuarioSucursal.rol.rol}</h5>
                  <h4>Empresa</h4>
                  <h5>
                    {data.ActualizarUsuarioSucursal.empresa.razon_social} Nit:{" "}
                    {data.ActualizarUsuarioSucursal.empresa.nit_empresa}
                  </h5>
                  <h4>Sucursal</h4>
                  <h5>{data.ActualizarUsuarioSucursal.sucursal.sucursal}</h5>
                </>
              );
            }
          })()}
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
export default ActualizarSucursalPru;
