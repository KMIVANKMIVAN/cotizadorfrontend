import React from "react";
import { useQuery, gql } from "@apollo/client";
import Empresa from "./Empresa";
import Alert from "react-bootstrap/Alert";
const Empresas_QUERY = gql`
  query MostrarEmpresas {
    MostrarEmpresas {
      id
      razon_social
      nit_empresa
      direccion_empresa
      pagina_web_empresa
      telefono_empresa
      linea_gratuita
      celular_empresa
      correo_empresa
      tipo_empresa {
        id
        tipo
      }
    }
  }
`;
const EmpresaListas = () => {
  const { data, error } = useQuery(Empresas_QUERY);
  const url = "/empresalista";

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
      {data && (
        <>
          <h1 class="text-white">Empresas</h1>
          {data.MostrarEmpresas.map(MostrarEmpresas => (
            <Empresa
              key={MostrarEmpresas.id}
              empresas={MostrarEmpresas}
              url={url}
            />
          ))}
        </>
      )}
    </>
  );
};

export default EmpresaListas;
