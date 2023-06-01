import React from "react";
import { useQuery, gql } from "@apollo/client";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
const ROL_QUERY = gql`
  query MostrarTipoEmpresa {
    MostrarTipoEmpresa {
      id
      tipo
    }
  }
`;

const TipoEmpresaLista = () => {
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
      name: "tipo",
      label: "TIPO",
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
        title={"Tipo de Empresas"}
        data={data?.MostrarTipoEmpresa}
        columns={columns}
        options={options}
      />
      <Row className="mt-5">
        <Col className="text-center">
          <Link className="btn btn-info" to="/createtipoemprersa">
            Registrar Tipo de Empresas
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

export default TipoEmpresaLista;
