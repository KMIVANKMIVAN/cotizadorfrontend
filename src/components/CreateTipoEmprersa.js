import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const CREATE_TIPO_EMPRESA_MUTATION = gql`
  mutation CrearTipoEmpresa($createTipoEmpresaInput: CreateTipoEmpresaInput!) {
    CrearTipoEmpresa(createTipoEmpresaInput: $createTipoEmpresaInput) {
      id
      tipo
    }
  }
`;

const CreateTipoEmprersa = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    tipo: null,
  });

  const [createTipoEmpresa, { error, data }] = useMutation(
    CREATE_TIPO_EMPRESA_MUTATION,
    {
      variables: {
        createTipoEmpresaInput: {
          tipo: formState.tipo,
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
          createTipoEmpresa();
        }}
      >
        <h2 class="text-white">Registrar Tipo de Empresa</h2>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            className="was-validated"
            controlId="formGridState"
          >
            <Form.Label>Tipo de Empresa</Form.Label>
            <Form.Control
              className="form-control is-valid"
              id="validationTextarea"
              required
              placeholder="Interna o Externa"
              value={formState.tipo}
              onChange={e =>
                setFormState({
                  ...formState,
                  tipo: e.target.value.toUpperCase(),
                })
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3 justify-content-md-center">
          <Col xs lg="6">
            <Button variant="warning" type="submit" onClick={handleShow}>
              Registrar Tipo de Empresa
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
        if (data?.CrearTipoEmpresa.id) {
          return (
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <h2 className="mt-3 text-center">
                  Registro Exitoso el nuevo Tipo Empresa es:
                </h2>
              </Modal.Header>
              <Modal.Body>
                <div className="card border-light bg-transparent">
                  <div className="card-body bg-transparent">
                    <h5 className="card-text">
                      ID {data?.CrearTipoEmpresa.id} {": "}
                      {data?.CrearTipoEmpresa.tipo}
                    </h5>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Link className="btn btn-secondary" onClick={handleClose}>
                  Cerrar
                </Link>
                <Link className="btn btn-info" to="/menuadmin">
                  Menu
                </Link>
                <Link className="btn btn-info" to="/tipoempresalista">
                  Ver Tipo Empresas
                </Link>
              </Modal.Footer>
            </Modal>
          );
        }
      })()}
    </>
  );
};

export default CreateTipoEmprersa;
