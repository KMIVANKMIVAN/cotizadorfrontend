import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
const CREATE_LISTA_PARAMETRO_MUTATION = gql`
  mutation CrearteListaparametro($createListaparametroInput: CreateListaparametroInput!) {
    CrearteListaparametro(createListaparametroInput: $createListaparametroInput) {
      id
      nrolista
      valor
      descripcion
    }
  }
`;
const CreateListaParametro = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    nrolista: null,
    valor: null,
    descripcion: null,
  });

  const [createListaParametro, { error, data }] = useMutation(CREATE_LISTA_PARAMETRO_MUTATION, {
    variables: {
      createListaparametroInput: {
        nrolista: parseInt(formState.nrolista),
        valor: formState.valor,
        descripcion: formState.descripcion,
      },
    },
  });
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
          createListaParametro();
        }}
      >
        <h2 className="text-white">Registrar Lista Parametro</h2>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            className="was-validated"
            controlId="formGridState"
          >
            <Form.Label>Numero de Lista</Form.Label>
            <Form.Control
              className="form-control is-valid"
              id="validationTextarea"
              required
              value={formState.nrolista}
              onChange={e =>
                setFormState({
                  ...formState,
                  nrolista: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group
            as={Col}
            className="was-validated"
            controlId="formGridState"
          >
            <Form.Label>Valor</Form.Label>
            <Form.Control
              className="form-control is-valid"
              id="validationTextarea"
              required
              value={formState.valor}
              onChange={e =>
                setFormState({
                  ...formState,
                  valor: e.target.value.toUpperCase(),
                })
              }
            />
          </Form.Group>
          <Form.Group
            as={Col}
            className="was-validated"
            controlId="formGridState"
          >
            <Form.Label>Valor</Form.Label>
            <Form.Control
              className="form-control is-valid"
              id="validationTextarea"
              required
              value={formState.descripcion}
              onChange={e =>
                setFormState({
                  ...formState,
                  descripcion: e.target.value.toUpperCase(),
                })
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3 justify-content-md-center">
          <Col xs lg="6">
            <Button
              variant="warning"
              type="submit"
              onClick={handleShow}
            >
              Registrar Lista Parametro
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
        if (data?.CrearteListaparametro.id) {
          return (
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <h2 className="mt-3 text-center">
                  Registro Exitoso la nueva Lista Parametro es:
                </h2>
              </Modal.Header>
              <Modal.Body>
                <div className="card border-light bg-transparent">
                  <div className="card-body bg-transparent">
                    <h5 className="card-text">
                      ID {data?.CrearteListaparametro.id}
                    </h5>
                    <h5 className="card-text">
                      Numero Lista {data?.CrearteListaparametro.nrolista}
                    </h5>
                    <h5 className="card-text">
                      Valor {data?.CrearteListaparametro.valor}
                    </h5>
                    <h5 className="card-text">
                      Descripcion {data?.CrearteListaparametro.descripcion}
                    </h5>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Link
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Cerrar
                </Link>
                <Link className="btn btn-info" to="/menuadmin">
                  Menu
                </Link>
                <Link className="btn btn-info" to="/talispa">
                Ver Lista Parametro
                </Link>
              </Modal.Footer>
            </Modal>
          );
        }
      })()}
    </>
  );
};

export default CreateListaParametro;
