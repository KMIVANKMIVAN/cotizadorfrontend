import React from "react";
import { useQuery, gql } from "@apollo/client";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
const SUCURSALES_QUERY = gql`
  query MostrarSucursales {
    MostrarSucursales {
      id
      sucursal
    }
  }
`;

const SucursalLista = () => {
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "sucursal",
      label: "SUCURSAL",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  const options = {
    filter: "true",
    filterType: "dropdown",
    responsive: "vertical",
    enableNestedDataAccess: ".",
  };
  const { data, error } = useQuery(SUCURSALES_QUERY);

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
        title={"Sucursales"}
        data={data?.MostrarSucursales}
        columns={columns}
        options={options}
      />
      <Row className="mt-5">
        <Col className="text-center">
          <Link className="btn btn-info" to="/createsucursal">
            Registrar Sucursales
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

export default SucursalLista;
