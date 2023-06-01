import React from "react";
import ActualizarEmpresa from "./ActualizarEmpresa";
const Empresas = props => {
  const { empresas } = props;
  const url = "/empresa";
  return (
    <ActualizarEmpresa empresas={empresas} url={url}/>
  );
};

export default Empresas;
