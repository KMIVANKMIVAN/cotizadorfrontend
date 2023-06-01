import React from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import EmpresaPru from "./EmpresaPru";
const Empresa = props => {
  const { empresas, url } = props;
  return (
    <>
      <div className="card border-light bg-transparent text-white">
        <div className="card-body">
          <h4 className="card-title">Datos Internos</h4>
          <h5 className="card-text">
            ID {empresas.id} {": "}
            {empresas.razon_social}
          </h5>
          <h5 className="card-text">Nit: {empresas.nit_empresa}</h5>
          <h4 className="card-title">Contactos</h4>
          <h5 className="card-text">
            {empresas.correo_empresa
              ? `Correo: ${empresas.correo_empresa}`
              : ""}{" "}
          </h5>
          <h5 className="card-text">
            {empresas.celular_empresa
              ? `Celular: ${empresas.celular_empresa}`
              : ""}{" "}
          </h5>
          <h5 className="card-text">
            {empresas.telefono_empresa
              ? `Telefono: ${empresas.telefono_empresa}`
              : ""}{" "}
          </h5>
          <h5 className="card-text">
            {empresas.pagina_web_empresa
              ? `Pagina Web: ${empresas.pagina_web_empresa}`
              : ""}{" "}
          </h5>
          <h5 className="card-text">
            {empresas.direccion_empresa
              ? `Direccion: ${empresas.direccion_empresa}`
              : ""}{" "}
          </h5>
          <h5 className="card-text">
            {empresas.linea_gratuita
              ? `Linea Gratuita: ${empresas.linea_gratuita}`
              : ""}{" "}
          </h5>
          <h4 className="card-title">Tipo de Empresa</h4>
          <h5 className="card-text">{empresas.tipo_empresa.tipo}</h5>
        </div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Actualizar Empresa</Accordion.Header>
          <Accordion.Body>
            <EmpresaPru empresas={empresas} url={url} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      </div>
      <br />
      <br />
      <div className="col-md">
        <div className="form-floating">
          <Link className="btn btn-info" to="/menuadmin">
            Volver
          </Link>
        </div>
        <br />
      </div>
    </>
  );
};

export default Empresa;
