import React from "react";
import { useQuery, gql } from "@apollo/client";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EmpresaBuscar from "./EmpresaBuscar";
import Alert from "react-bootstrap/Alert";
const Empresas_QUERY = gql`
  query MostrarEmpresas {
    MostrarEmpresas {
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
        tipo
      }
    }
  }
`;
const TablaEmpresa = props => {
  const { url } = props;
  const { data, error } = useQuery(Empresas_QUERY);
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
              <EmpresaBuscar
                url={url}
                bid={data?.MostrarEmpresas[tableMeta.rowIndex].id}
                emp={data?.MostrarEmpresas[tableMeta.rowIndex]}
              />
            </div>
          );
        },
      },
    },
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "razon_social",
      label: "RAZON SOCIAL",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "nit_empresa",
      label: "NIT EMPRESA",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "direccion_empresa",
      label: "DIRECCION",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "pagina_web_empresa",
      label: "PAGINA WEB",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "telefono_empresa",
      label: "TELEFONO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "linea_gratuita",
      label: "LINEA GRATUITA",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "celular_empresa",
      label: "CELULAR",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "correo_empresa",
      label: "CORREO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "tipo_empresa.tipo",
      label: "TIPO DE EMPRESA",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

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
        title={"Empresas"}
        data={data?.MostrarEmpresas}
        columns={columns}
        options={options}
      />
      <Row className="mt-5">
        <Col className="text-center">
          <Link className="btn btn-info" to="/createempresa">
            Registrar Empresas
          </Link>
        </Col>
        <Col className="text-center">
          <Link className="btn btn-info" to="/createusuario">
            Registrar Usuarios
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

export default TablaEmpresa;
