import React from "react";
import { useQuery, gql } from "@apollo/client";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Parametro from "./Parametro";
import Alert from "react-bootstrap/Alert";
const PARAMETRO_QUERY = gql`
  query MostrarParametro {
    MostrarParametro {
      id
      descripcion
      tipo
      nrolista
      obligatorio
      fila
      columna
      producto {
        id
        descripcion
      }
    }
  }
`;
const TaPa = props => {
  const { data, error } = useQuery(PARAMETRO_QUERY);
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
            <Parametro
              url={url}
              parametro={data?.MostrarParametro[tableMeta.rowIndex]}
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
      name: "descripcion",
      label: "DESCRIPCION",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "tipo",
      label: "TIPO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "nrolista",
      label: "NUMERO DE LISTA",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "obligatorio",
      label: "OBLIGATORIO",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p>{value ? "Si" : "No"}</p>;
        },
      },
    },
    {
      name: "fila",
      label: "FILA",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "columna",
      label: "COLUMNA",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "producto.id",
      label: "PRODUCTO ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "producto.descripcion",
      label: "PRODUCTO DESCRIPCION",
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
        title={"Parametros"}
        data={data?.MostrarParametro}
        columns={columns}
        options={options}
      />
      <Row className="mt-5">
        <Col className="text-center">
          <Link className="btn btn-info" to="/createparametro">
            Crear Parametro
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
export default TaPa;
