import React from "react";
import { useQuery, gql } from "@apollo/client";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UBAc from "./UBAc";
import UBIn from "./UBIn";
import UsuarioPru from "./UsuarioPru";
import Alert from "react-bootstrap/Alert";
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
const TaUs = props => {
  const { data, error } = useQuery(USUARIOS_QUERY);
  const options = {
    filter: "true",
    filterType: "dropdown",
    responsive: "horisontal",
    enableNestedDataAccess: ".",
  };

  const columns = [
    {
      name: "id",
      label: "Actualizar",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <UsuarioPru
                url={url}
                us={data?.MostrarUsuario[tableMeta.rowIndex]}
              />
            </div>
          );
        },
      },
    },
    {
      name: "id",
      label: "Activar / Inactivar",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              {(() => {
                if (data?.MostrarUsuario[tableMeta.rowIndex].estado) {
                  return (
                    <UBIn
                      url={url}
                      us={data?.MostrarUsuario[tableMeta.rowIndex]}
                    />
                  );
                }
                if (!data?.MostrarUsuario[tableMeta.rowIndex].estado) {
                  return (
                    <UBAc
                      url={url}
                      us={data?.MostrarUsuario[tableMeta.rowIndex]}
                    />
                  );
                }
              })()}
            </div>
          );
        },
      },
    },
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "ap_paterno",
      label: "APELLIDO PATERNO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "ap_materno",
      label: "APELLIDO MATERNO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "ap_casado",
      label: "APELLIDO CASADO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "nombres",
      label: "NOMBRES",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "numero_carnet",
      label: "CARNET",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "extesion",
      label: "EXTENSION",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "correo",
      label: "CORREO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "estado",
      label: "ESTADO",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p>{value ? "Activo" : "Inactivo"}</p>;
        },
      },
    },
    {
      name: "celular",
      label: "CELULAR",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "telefono",
      label: "TELEFONO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "nit_usuario",
      label: "NIT USUARIO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "direccion_usuario",
      label: "DIRECCION",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "pagina_web_usuario",
      label: "PAGINA WEB",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "rol.rol",
      label: "ROL",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "sucursal.sucursal",
      label: "SUCURSAL",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "empresa.razon_social",
      label: "RAZON SOCIAL",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "empresa.nit_empresa",
      label: "NIT DE EMPRESA",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const { url } = props;
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
      <MUIDataTable
        title={"Usuarios"}
        data={data?.MostrarUsuario}
        columns={columns}
        options={options}
      />
      <Row className="mt-5">
        <Col className="text-center">
          <Link className="btn btn-info" to="/createusuario">
            Registrar Usuarios
          </Link>
        </Col>
        <Col className="text-center">
          <Link className="btn btn-info" to="/createempresa">
            Registrar Empresas
          </Link>
        </Col>
        <Col className="text-center">
          <Link className="btn btn-info" to="/menuadmin">
            Menu
          </Link>
        </Col>
      </Row>
    </>
  );
};
export default TaUs;
