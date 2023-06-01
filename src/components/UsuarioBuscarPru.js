import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import UsuarioPru from "./UsuarioPru";

const BUSCAR_QUERY = gql`
  query BuscarMostrarUsuario($buscarMostrarUsuarioId: Int!) {
    BuscarMostrarUsuario(id: $buscarMostrarUsuarioId) {
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
        direccion_empresa
        pagina_web_empresa
        telefono_empresa
        linea_gratuita
        celular_empresa
        correo_empresa
      }
    }
  }
`;

const UsuarioBuscarPru = props => {
  const [modalShow, setModalShow] = React.useState(false);

  const [nom, { data: databus }] = useLazyQuery(BUSCAR_QUERY);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const { url, bid } = props;

  return (
    <Container  fluid>
      <Row>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => {
            setModalShow(true);
            nom(
              {
                variables: { buscarMostrarUsuarioId: parseInt(bid) },
              },
              handleShow
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
        </Button>
        <Modal
          show={modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body className="text-center">
            {(() => {
              if (databus?.BuscarMostrarUsuario !== undefined) {
                return (
                  <UsuarioPru
                    url={url}
                    usuarios={databus?.BuscarMostrarUsuario}
                  />
                );
              } else {
                return <p className="text-center text-black"></p>;
              }
            })()}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </Container>
  );
};

export default UsuarioBuscarPru;
