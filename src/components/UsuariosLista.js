import React from "react";
import { useQuery, gql } from "@apollo/client";
import Usuario from "./Usuario";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import UsuarioBuscar from "./UsuarioBuscar";
const USUARIOS_QUERY = gql`
  query MostrarUsuario {
    MostrarUsuario {
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

const UsuariosLista = () => {
  const { data } = useQuery(USUARIOS_QUERY);

  const url = "/usuariolista"
  return (
    <Container fluid>
      <UsuarioBuscar url={url} />
      <Row>
        <Col>
          {data && (
            <>
            <h2  className="text-center text-white">Usuario Interno</h2>
              {data.MostrarUsuario.map(MostrarUsuario => (
                <div >
                  {MostrarUsuario.rol.tiporol === "INTERNA" && (
                    <Usuario url={url} usuarios={MostrarUsuario} />
                  )}
                </div>
              ))}
            </>
          )}
        </Col>
        <Col>
          {data && (
            <>
            <h2 className="text-center text-white">Usuario Externo</h2>
              {data.MostrarUsuario.map(MostrarUsuario => (
                <div >
                  {MostrarUsuario.rol.tiporol === "EXTERNA" && (
                    <Usuario url={url} usuarios={MostrarUsuario} />
                  )}
                </div>
              ))}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UsuariosLista;
