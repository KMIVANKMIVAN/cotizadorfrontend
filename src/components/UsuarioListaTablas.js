import React from "react";
import { useQuery, gql } from "@apollo/client";
import UsuarioBuscarPru from "./UsuarioBuscarPru";
import Container from "react-bootstrap/Container";
import UsuarioBuscar from "./UsuarioBuscar";
import Table from "react-bootstrap/Table";
const USUARIOS_QUERY = gql`
  query MostrarUsuario {
    MostrarUsuario {
      id
      ap_paterno
      ap_materno
      ap_casado
      nombres
      numero_carnet
      extesion
      correo
      estado
      celular
      telefono
      nit_usuario
      direccion_usuario
      pagina_web_usuario
      rol {
        id
        rol
        tiporol
      }
      sucursal {
        id
        sucursal
      }
      empresa {
        id
        razon_social
        nit_empresa
      }
    }
  }
`;
const UsuarioListaTablas = () => {
  const { data } = useQuery(USUARIOS_QUERY);

  const url = "/usuarioslista";
  // console.log(databus?.BuscarUsuario.length === 0);
  return (
    <Container fluid>
      <UsuarioBuscar url={url} />
      <Table responsive className="bg-light">
        <thead>
          <tr className="text-center">
            <th>Actualizar</th>
            <th>ID</th>
            <th>APELLIDO PATERNO</th>
            <th>APELLIDO MATERNO</th>
            <th>APELLIDO CASADO</th>
            <th>NOMBRES</th>
            <th>CARNET</th>
            <th>EXTENSION</th>
            <th>CORREO</th>
            <th>ESTADO</th>
            <th>CELULAR</th>
            <th>TELEFONO</th>
            <th>NIT USUARIO</th>
            <th>DIRECCION</th>
            <th>PAGINA WEB</th>
            <th>ROL</th>
            <th>SUCURSAL</th>
            <th>RAZON SOCIAL</th>
            <th>NIT DE EMPRESA</th>
          </tr>
        </thead>
        <tbody>
          {data && (
            <>
              {data.MostrarUsuario.map(MostrarUsuario => (
                <tr>
                  <td key={MostrarUsuario.id}>
                    <UsuarioBuscarPru url={url} bid={MostrarUsuario.id} />
                  </td>
                  <td key={MostrarUsuario.id}>{MostrarUsuario.id}</td>
                  <td key={MostrarUsuario.nombres}>{MostrarUsuario.nombres}</td>
                  <td key={MostrarUsuario.ap_paterno}>
                    {MostrarUsuario.ap_paterno}
                  </td>
                  <td key={MostrarUsuario.ap_materno}>
                    {MostrarUsuario.ap_materno}
                  </td>
                  <td key={MostrarUsuario.ap_casado}>
                    {MostrarUsuario.ap_casado}
                  </td>
                  <td key={MostrarUsuario.nit_usuario}>
                    {MostrarUsuario.nit_usuario}
                  </td>
                  <td key={MostrarUsuario.numero_carnet}>
                    {MostrarUsuario.numero_carnet}
                  </td>
                  <td key={MostrarUsuario.extesion}>
                    {MostrarUsuario.extesion}
                  </td>
                  <td key={MostrarUsuario.correo}>{MostrarUsuario.correo}</td>
                  <td key={MostrarUsuario.estado}>
                    {MostrarUsuario.estado ? "Activo" : "Inactivo"}
                  </td>
                  <td key={MostrarUsuario.celular}>{MostrarUsuario.celular}</td>
                  <td key={MostrarUsuario.telefono}>
                    {MostrarUsuario.telefono}
                  </td>
                  <td key={MostrarUsuario.direccion_usuario}>
                    {MostrarUsuario.direccion_usuario}
                  </td>
                  <td key={MostrarUsuario.pagina_web_usuario}>
                    {MostrarUsuario.pagina_web_usuario}
                  </td>
                  <td key={MostrarUsuario.rol.rol}>{MostrarUsuario.rol.rol}</td>
                  <td key={MostrarUsuario.sucursal.sucursal}>
                    {MostrarUsuario.sucursal.sucursal}
                  </td>
                  <td key={MostrarUsuario.empresa.razon_social}>
                    {MostrarUsuario.empresa.razon_social}
                  </td>
                  <td key={MostrarUsuario.empresa.nit_empresa}>
                    {MostrarUsuario.empresa.nit_empresa}
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default UsuarioListaTablas;
