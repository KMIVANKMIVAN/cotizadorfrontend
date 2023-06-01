import React from "react";
import { useQuery, gql } from "@apollo/client";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cliente from "./Cliente";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
const CLIENTES_QUERY = gql`
  query MostrarCliente {
    MostrarCliente {
      id
      ap_paterno
      ap_materno
      ap_casado
      nombres
      numero_carnet
      extesion
      fechanacimiento
      correo
      celular
      telefono
    }
  }
`;
const TaClAE = props => {
  const { data, error } = useQuery(CLIENTES_QUERY);
  const options = {
    filter: "true",
    filterType: "dropdown",
    responsive: "horisontal",
    enableNestedDataAccess: ".",
  };

  const columns = [
    {
      name: "id",
      label: "ACTUALIZAR",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Cliente
              url={url}
              cliente={data?.MostrarCliente[tableMeta.rowIndex]}
            />
          );
        },
      },
    },
    {
      name: "id",
      label: "COTIZAR",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="outline-secondary" size="sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-file-earmark-check"
                viewBox="0 0 16 16"
              >
                <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
              </svg>
            </Button>
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
      name: "fechanacimiento",
      label: "FECHA DE NACIMIENTO",
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
        title={"Clientes"}
        data={data?.MostrarCliente}
        columns={columns}
        options={options}
      />
      <Row className="mt-5">
        <Col className="text-center">
          <Link className="btn btn-info" to="/createclienteae">
            Registrar Clientes
          </Link>
        </Col>
        <Col className="text-center">
          <Link className="btn btn-info" to="/menu">
            Menu
          </Link>
        </Col>
      </Row>
    </>
  );
};
export default TaClAE;
