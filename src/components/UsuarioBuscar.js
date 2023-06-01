import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import Usuario from "./Usuario";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
const BUSCAR_QUERY = gql`
  query BuscarUsuario($search: String) {
    BuscarUsuario(search: $search) {
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
      }
    }
  }
`;
const BUSCAR_CI_QUERY = gql`
  query BuscarCiUsuario($search: String) {
    BuscarCiUsuario(search: $search) {
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
      }
    }
  }
`;

const UsuarioBuscar = props => {
  const [searchNom, setSearchNom] = useState("");
  const [nom, { data: databus }] = useLazyQuery(BUSCAR_QUERY);

  const [searchCI, setSearchCi] = useState("");
  const [ci, { data: dataci }] = useLazyQuery(BUSCAR_CI_QUERY);

  const {url} = props;

  return (
    <Container fluid>
      <h2 className="text-center text-white">Buscar Usurios</h2>
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text>Por Nombre</InputGroup.Text>
            <Form.Control
              type="text"
              onChange={e => setSearchNom(e.target.value.toUpperCase())}
            />
            <Button
            variant="secondary"
              onClick={() =>
                nom({
                  variables: { search: searchNom },
                })
              }
            >
              Buscar
            </Button>
          </InputGroup>
          
          {(() => {
            if (
              // !Array.isArray(databus?.BuscarUsuario) ||
              databus?.BuscarUsuario.length === 0
            ) {
              return <p className="text-center text-white">Sin Resultados</p>;
            } else {
              return (
                <div>
                  {databus &&
                    databus.BuscarUsuario.map(BuscarUsuario => (
                      <Usuario url={url} usuarios={BuscarUsuario} />
                    ))}
                </div>
              );
            }
          })()}
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text>Por CI</InputGroup.Text>
            <Form.Control
              type="text"
              onChange={e => setSearchCi(e.target.value)}
            />
            <Button
            variant="secondary"
              onClick={() =>
                ci({
                  variables: { search: searchCI },
                })
              }
            >
              Buscar
            </Button>
          </InputGroup>
            {(() => {
            if (
              dataci?.BuscarCiUsuario.length === 0
            ) {
              return <p className="text-center text-white">Sin Resultados</p>;
            } else {
              return (
                <div>
                  {dataci &&
                    dataci.BuscarCiUsuario.map(BuscarCiUsuario => (
                      <Usuario url={url} usuarios={BuscarCiUsuario} />
                    ))}
                </div>
              );
            }
          })()}
        </Col>
      </Row>
      <br />
      <br />
    </Container>
  );
};

export default UsuarioBuscar;
