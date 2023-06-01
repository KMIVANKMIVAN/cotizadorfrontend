import React from "react";
import { useQuery, gql } from "@apollo/client";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
const ROL_QUERY = gql`
  query MostrarRoles {
    MostrarRoles {
      id
      rol
      tiporol
    }
  }
`;

const RolLista = () => {
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
      name: "rol",
      label: "ROL",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "tiporol",
      label: "TIPO ROL",
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
  const { data, error } = useQuery(ROL_QUERY);

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
        title={"Roles"}
        data={data?.MostrarRoles}
        columns={columns}
        options={options}
      />
      <Row className="mt-5">
        <Col className="text-center">
          <Link className="btn btn-info" to="/createrol">
            Registrar Rol
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

export default RolLista;
