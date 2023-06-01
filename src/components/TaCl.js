import React from "react";
import { useQuery, gql } from "@apollo/client";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cliente from "./Cliente";
import CreateCotizacionCliente from "./CreateCotizacionCliente";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
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
// const TaCl = ({ props, location }) => {
const TaCl = props => {


  /* console.log("estamos en TaCl");
  const p1 = useSelector((state) => state.p1);
  const p2 = useSelector((state) => state.p2);
  const p3 = useSelector((state) => state.p3);

  console.log(p1);
  console.log(p2);
  console.log(p3); */


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
            <CreateCotizacionCliente
              url={url}
              cliente={data?.MostrarCliente[tableMeta.rowIndex]}
              // usuario={p1}
            />
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
          <Link className="btn btn-info" to="/createcliente">
            Registrar Clientes
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
export default TaCl;
