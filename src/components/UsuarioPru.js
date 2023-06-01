import React from "react";
import ActualizarUsuarioPru from "./ActualizarUsuarioPru";
import CambiarPasswordPru from "./CambiarPasswordPru";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const UsuarioPru = props => {
  const [modalShow, setModalShow] = React.useState(false);
  const { url, us } = props;
  return (
    <div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => {
          setModalShow(true);
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
          <Card border="light bg-transparent text-black">
            <Card.Body>
              <h4>Usuario a Actualizar</h4>
              ID {us.id} Nombres{": "} {us.nombres} {us.ap_paterno}{" "}
              {us.ap_materno} <br />
              <ActualizarUsuarioPru usuarios={us} url={url} />
              <br />
              <CambiarPasswordPru usuarios={us} url={url} />
            </Card.Body>
            <br />
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsuarioPru;
