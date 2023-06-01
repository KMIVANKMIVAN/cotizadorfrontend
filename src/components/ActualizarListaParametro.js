import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
const ACTUALIZAR_LISTAPARAMETRO_MUTATION = gql`
mutation ActualizarListaparametro($updateListaparametroInput: UpdateListaparametroInput!) {
  ActualizarListaparametro(updateListaparametroInput: $updateListaparametroInput) {
    id
    nrolista
    valor
    descripcion
  }
}
`;

const ActualizarListaParametro = props => {
  const { listaparametro, url } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    id: parseInt(listaparametro.id),
    nrolista: listaparametro.nrolista,
    valor: listaparametro.valor,
    descripcion: listaparametro.descripcion,
  });

  const [updateListaParametro, { error: error1, data }] = useMutation(
    ACTUALIZAR_LISTAPARAMETRO_MUTATION,
    {
      variables: {
        updateListaparametroInput: {
          id: parseInt(formState.id),
          nrolista: parseInt(formState.nrolista),
          valor: formState.valor,
          descripcion: formState.descripcion,
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
          updateListaParametro();
        }}
      >
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Numero de Lista</Form.Label>
              <Form.Control
                type="text"
                value={formState.nrolista}
                onChange={e =>
                  setFormState({
                    ...formState,
                    nrolista: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Valor</Form.Label>
              <Form.Control
                type="text"
                value={formState.valor}
                onChange={e =>
                  setFormState({
                    ...formState,
                    valor: e.target.value.toUpperCase(),
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="text-black">Descripcion</Form.Label>
              <Form.Control
                type="text"
                value={formState.descripcion}
                onChange={e =>
                  setFormState({
                    ...formState,
                    descripcion: e.target.value.toUpperCase(),
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Col>
          <button
            class="btn btn-warning  text-black"
            type="submit"
            onClick={handleShow}
          >
            Actualizar Lista Parametro
          </button>
        </Col>
      </Form>
      {(() => {
        if (data?.ActualizarListaparametro.id) {
          return (
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <h3 className="mt-3 text-center">
                  Se Actualizo los Datos de la Lista Parametro:
                </h3>
              </Modal.Header>
              <Modal.Body>
                <h5>ID {data?.ActualizarListaparametro.id}</h5>
                <h5 className="card-text">
                  Numero Lista {data?.ActualizarListaparametro.nrolista}
                </h5>
                <h5 className="card-text">
                  Valor {data?.ActualizarListaparametro.valor}
                </h5>
                <h5 className="card-text">
                  Descripcion {data?.ActualizarListaparametro.descripcion}
                </h5>
              </Modal.Body>
              <Modal.Footer>
                <Link className="btn btn-secondary" onClick={handleClose}>
                  Cerrar
                </Link>
                <Link className="btn btn-primary  text-white " to="/menuadmin">
                  Menu
                </Link>
                <Link className="btn btn-info" to="/createlistaparametro">
                  Crear Lista Parametro
                </Link>
              </Modal.Footer>
            </Modal>
          );
        }
      })()}
    </>
  );
};
export default ActualizarListaParametro;
