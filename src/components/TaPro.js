import React from "react";
import { useQuery, gql } from "@apollo/client";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Producto from "./Producto";
import Alert from "react-bootstrap/Alert";
const PRODUCTOS_QUERY = gql`
  query MostrarProducto {
    MostrarProducto {
      id
      descripcion
    }
  }
`;
const TaPro = props => {
  const { data, error } = useQuery(PRODUCTOS_QUERY);
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
            <Producto
              url={url}
              producto={data?.MostrarProducto[tableMeta.rowIndex]}
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
    /* {
      name: "tipo",
      label: "TIPO",
      options: {
        filter: true,
        sort: true,
      },
    } */
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
        title={"Productos"}
        data={data?.MostrarProducto}
        columns={columns}
        options={options}
      />
      <Row className="mt-5">
        <Col className="text-center">
          <Link className="btn btn-info" to="/createproducto">
          Crear Producto
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
export default TaPro;
