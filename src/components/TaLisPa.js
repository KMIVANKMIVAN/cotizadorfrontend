import React from "react";
import { useQuery, gql } from "@apollo/client";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListaParametro from "./ListaParametro";
import Alert from "react-bootstrap/Alert";
const LISTA_PARAMETRO_QUERY = gql`
query MostrarListaparametro {
  MostrarListaparametro {
    id
    nrolista
    descripcion
    valor
  }
}
`;
const TaLisPa = props => {
  const { data, error } = useQuery(LISTA_PARAMETRO_QUERY);
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
            <ListaParametro
              url={url}
              listaparametro={data?.MostrarListaparametro[tableMeta.rowIndex]}
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
      name: "nrolista",
      label: "Numero de Lista",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "valor",
      label: "VALOR",
      options: {
        filter: true,
        sort: true,
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
/*     {
      name: "producto.descripcion",
      label: "PRODUCTO DESCRIPCION",
      options: {
        filter: true,
        sort: true,
      },
    }, */
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
        title={"Lista Parametros"}
        data={data?.MostrarListaparametro}
        columns={columns}
        options={options}
      />
      <Row className="mt-5">
        <Col className="text-center">
          <Link className="btn btn-info" to="/createlistaparametro">
            Crear Lista Parametro
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
export default TaLisPa;
