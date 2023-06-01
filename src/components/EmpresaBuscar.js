import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ActualizarEmpresaPru from "./ActualizarEmpresaPru";
import Card from "react-bootstrap/Card";
const BUSCAR_QUERY = gql`
  query BuscarMostrarEmpresa($buscarMostrarEmpresaId: ID!) {
    BuscarMostrarEmpresa(id: $buscarMostrarEmpresaId) {
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
const EmpresaBuscar = props => {
  const [modalShow, setModalShow] = React.useState(false);

  const [nom, { data: databus }] = useLazyQuery(BUSCAR_QUERY);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const { url, bid, emp } = props;

  return (
    <Container fluid>
      <Row>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => {
            setModalShow(true);
            nom(
              {
                variables: { buscarMostrarEmpresaId: parseInt(bid) },
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
              if (databus?.BuscarMostrarEmpresa !== undefined) {
                return (
                  <Card border="light bg-transparent text-black">
                    <Card.Body>
                      <h4 className="card-title">Empresa a Actualizar</h4>
                      <h5 className="card-text">
                        ID {emp.id} {": "}
                      </h5>
                      <h5 className="card-text">
                        {emp.razon_social} Nit: {emp.nit_empresa}
                      </h5>
                      <br />
                      <ActualizarEmpresaPru empresas={emp} url={url} />
                    </Card.Body>
                  </Card>
                );
              } else {
                return <p className="text-center text-black"></p>;
              }
            })()}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
      <br />
      <br />
    </Container>
  );
};

export default EmpresaBuscar;
