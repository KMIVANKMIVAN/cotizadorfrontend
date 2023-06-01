import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { useLocation } from "react-router-dom";
const Menu = () => {
  const location = useLocation();
  const parametros = location.state;

  // Acceder a los parámetros
  console.log(parametros.parametro1);
  console.log(parametros.parametro2);
  console.log(parametros.parametro3);
  return (
    <>
      <h2 className="mb-4 text-white text-center">Panel de Cotizaciones</h2>
      <CardGroup className="text-center">
        <Card className="m-3">
          <Card.Header>
            <h3>Registrar Cliente</h3>
          </Card.Header>
          <Card.Body>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              fill="currentColor"
              class="bi bi-person-fill-add"
              viewBox="0 0 16 16"
            >
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
            </svg>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Link to="/createclienteae" className="mt-2 btn btn-success">
              Registrar Cliente
            </Link>
          </Card.Footer>
        </Card>
        <Card className="m-3">
          <Card.Header>
            <h3>Ver Clientes</h3>
          </Card.Header>
          <Card.Body>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              fill="currentColor"
              class="bi bi-people-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              fill="currentColor"
              class="bi bi-table"
              viewBox="0 0 16 16"
            >
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
            </svg>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Link to="/taclae" className="mt-2 btn btn-success">
              Ver Clientes
            </Link>
          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
};

export default Menu;
