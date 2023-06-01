import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
const PRODUCTO_MUTATION = gql`
  mutation ActualizarProducto($updateProductoInput: UpdateProductoInput!) {
    ActualizarProducto(updateProductoInput: $updateProductoInput) {
      id
      descripcion
    }
  }
`;

const ActualizarProducto = props => {
  const { producto, url } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    id: parseInt(producto.id),
    descripcion: producto.descripcion,
  });

  const [updateProducto, { error: error1, data }] = useMutation(
    PRODUCTO_MUTATION,
    {
      variables: {
        updateProductoInput: {
          id: parseInt(formState.id),
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
          updateProducto();
        }}
      >
        <Row>
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
            Actualizar Producto
          </button>
        </Col>
      </Form>
      {(() => {
        if (data?.ActualizarProducto.id) {
          return (
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <h3 className="mt-3 text-center">
                  Se Actualizo los Datos del Producto:
                </h3>
              </Modal.Header>
              <Modal.Body>
                <h5>ID {data?.ActualizarProducto.id}</h5>
                <h4>Descripcion:</h4>
                <h5>{data?.ActualizarProducto.descripcion}</h5>
              </Modal.Body>
              <Modal.Footer>
                <Link className="btn btn-secondary" onClick={handleClose}>
                  Cerrar
                </Link>
                <Link className="btn btn-primary  text-white " to="/menuadmin">
                  Menu
                </Link>
                <Link
                  className="btn btn-primary  text-white "
                  to="/createcliente"
                >
                  Registrar Clientes
                </Link>
              </Modal.Footer>
            </Modal>
          );
        }
      })()}
    </>
  );
};
export default ActualizarProducto;
