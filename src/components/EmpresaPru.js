import React from "react";
import Card from "react-bootstrap/Card";
import ActualizarEmpresaPru from "./ActualizarEmpresaPru";

const EmpresaPru = props => {
  const { url, empresas } = props;

  return (
    <Card border="light bg-transparent text-black">
      <Card.Body>
        <h4 className="card-title">Empresa a Actualizar</h4>
        <h5 className="card-text">
          ID {empresas.id} {": "}
        </h5>
        <h5 className="card-text">
          {empresas.razon_social} Nit: {empresas.nit_empresa}
        </h5>
        <br/>
        <ActualizarEmpresaPru empresas={empresas} url={url}/>
      </Card.Body>
    </Card>
  );
};

export default EmpresaPru;
