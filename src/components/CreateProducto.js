import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
const CREATE_PRODUCTO_MUTATION = gql`
  mutation CrearProducto($createProductoInput: CreateProductoInput!) {
    CrearProducto(createProductoInput: $createProductoInput) {
      id
      descripcion
    }
  }
`;
const CreateProducto = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    descripcion: null,
  });

  const [createProducto, { error, data }] = useMutation(
    CREATE_PRODUCTO_MUTATION,
    {
      variables: {
        createProductoInput: {
          descripcion: formState.descripcion,
        },
      },
    }
  );
  return (
    <>
      {(() => {
        if (error) {
          return (
            <Alert className="text-danger bg-light ">
              <h3 className="text-center">
                ¡Error en un Campo! verifique: {error.message};
              </h3>
            </Alert>
          );
        }
      })()}
      <Form
        className="row g-3 m-3 text-white needs-validation"
        novalidate
        onSubmit={e => {
          e.preventDefault();
          createProducto();
        }}
      >
        <h2 className="text-white">Crear Producto</h2>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              value={formState.descripcion}
              onChange={e => {
                if (e.target.value === "") {
                  setFormState({
                    ...formState,
                    descripcion: null,
                  });
                }
                if (e.target.value !== "") {
                  setFormState({
                    ...formState,
                    descripcion: e.target.value.toUpperCase(),
                  });
                }
              }}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3 justify-content-md-center">
          <Col xs lg="6">
            <Button variant="warning" type="submit" onClick={handleShow}>
              Crear Producto
            </Button>
          </Col>
          <Col xs lg="3">
            <Link className="btn btn-info" to="/menuadmin">
              Menu
            </Link>
          </Col>
        </Row>
      </Form>
      {(() => {
        if (data?.CrearProducto.id) {
          return (
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <h2 className="mt-3 text-center">
                  Registro Exitoso el nuevo Producto es:
                </h2>
              </Modal.Header>
              <Modal.Body>
                <div className="card border-light bg-transparent">
                  <div className="card-body bg-transparent">
                    <h5 className="card-text">
                      ID {data?.CrearProducto.id} {": "}
                    </h5>
                    <h5 className="card-text">
                      Descripcion: {data?.CrearProducto.descripcion}{" "}
                    </h5>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Link className="btn btn-secondary" onClick={handleClose}>
                  Cerrar
                </Link>
                <Link className="btn btn-info" to="/menu">
                  Menu
                </Link>
                <Link className="btn btn-info" to="/rollista">
                  Cotizar
                </Link>
              </Modal.Footer>
            </Modal>
          );
        }
      })()}
    </>
  );
};

export default CreateProducto;
