import React from "react";
import { useQuery, gql } from "@apollo/client";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ValorParametro from "./ValorParametro";
import Alert from "react-bootstrap/Alert";
const VALORPARAMETRO_QUERY = gql`
query MostrarValorparametro {
  MostrarValorparametro {
    id
    valorString
    valorInt
    valorDouble
    valorBoolean
    parametro {
      id
      descripcion
      tipo
    }
    cotizacione {
      id
      
    }
  }
}
`;
const TaVaPa = props => {
  const { data, error } = useQuery(VALORPARAMETRO_QUERY);
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
            <ValorParametro
              url={url}
              valorparametro={data?.MostrarValorparametro[tableMeta.rowIndex]}
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
      name: "valorString",
      label: "VALOR STRING",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "valorInt",
      label: "VALOR INT",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "valorDouble",
      label: "VALOR DOUBLE",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "valorBoolean",
      label: "VALOR BOOLEAN",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p>{value ? "Verdadero" : "Falso"}</p>;
        },
      },
    },
    {
      name: "parametro.id",
      label: "PARAMETRO ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "parametro.descripcion",
      label: "PARAMETRO DESCRIPCION",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "parametro.tipo",
      label: "PARAMETRO TIPO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cotizacione.id",
      label: "COTIZACIONES ID",
      options: {
        filter: false,
        sort: false,
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
        title={"Valor Parametros"}
        data={data?.MostrarValorparametro}
        columns={columns}
        options={options}
      />
      <Row className="mt-5">
        <Col className="text-center">
          <Link className="btn btn-info" to="/createvalorparametro">
          Crear Valor Parametro
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
export default TaVaPa;
