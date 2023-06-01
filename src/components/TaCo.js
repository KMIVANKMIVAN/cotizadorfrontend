import React from "react";
import { useQuery, gql } from "@apollo/client";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cotizacion from "./Cotizacion";
import Alert from "react-bootstrap/Alert";
const COTIZACION_QUERY = gql`
  query MostrarCotizacione {
    MostrarCotizacione {
      id
      cliente {
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
      usuario {
        id
        ap_paterno
        ap_materno
        ap_casado
        nombres
        numero_carnet
        extesion
        correo
        password
        estado
        celular
        telefono
        nit_usuario
        direccion_usuario
        pagina_web_usuario
      }
      producto {
        id
        descripcion
        
      }
    }
  }
`;
const TaCo = props => {
  const { data, error } = useQuery(COTIZACION_QUERY);
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
              <Cotizacion
                url={url}
                cotizacion={data?.MostrarCotizacione[tableMeta.rowIndex]}
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
        filter: false,
        sort: false,
      },
    },
    {
      name: "cliente.ap_paterno",
      label: "APELLIDO PATERNO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cliente.ap_materno",
      label: "APELLIDO MATERNO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cliente.ap_casado",
      label: "APELLIDO CASADO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cliente.nombres",
      label: "NOMBRES",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cliente.numero_carnet",
      label: "CARNET",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cliente.extesion",
      label: "EXTENSION",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cliente.correo",
      label: "CORREO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cliente.celular",
      label: "CELULAR",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cliente.telefono",
      label: "TELEFONO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "usuario.id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "usuario.ap_paterno",
      label: "APELLIDO PATERNO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "usuario.ap_materno",
      label: "APELLIDO MATERNO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "usuario.ap_casado",
      label: "APELLIDO CASADO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "usuario.nombres",
      label: "NOMBRES",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "usuario.numero_carnet",
      label: "CARNET",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "usuario.extesion",
      label: "EXTENSION",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "usuario.correo",
      label: "CORREO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "usuario.estado",
      label: "ESTADO",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p>{value ? "Activo" : "Inactivo"}</p>;
        },
      },
    },
    {
      name: "usuario.celular",
      label: "CELULAR",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "usuario.telefono",
      label: "TELEFONO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "usuario.nit_usuario",
      label: "NIT USUARIO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "usuario.direccion_usuario",
      label: "DIRECCION",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "usuario.pagina_web_usuario",
      label: "PAGINA WEB",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "producto.id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "producto.descripcion",
      label: "DESCRIPCION",
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
        title={"Cotizaciones"}
        data={data?.MostrarCotizacione}
        columns={columns}
        options={options}
      />
      <Row className="mt-5">
        <Col className="text-center">
          <Link className="btn btn-info" to="/createcotizacion">
          Crear Cotizacion
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
export default TaCo;
