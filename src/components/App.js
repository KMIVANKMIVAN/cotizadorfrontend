import React, { Component } from "react";

import UsuarioLista from "./UsuarioLista";

import EmpresaLista from "./EmpresaLista";

import CreateUsuario from "./CreateUsuario";
import Login from "./Login";
import Menu from "./Menu";
import MenuAdmin from "./MenuAdmin";
import PagNoEncontrada from "./PagNoEncontrada";
// import Prueba from "./Prueba";
import Header from "./Header";
import CreateSucursal from "./CreateSucursal";
import CreateTipoEmprersa from "./CreateTipoEmprersa";
import CreateRol from "./CreateRol";

import { Route, Routes } from "react-router-dom";

import Container from "react-bootstrap/Container";
import SucursalLista from "./SucursalLista";
import RolLista from "./RolLista";
import TipoEmpresaLista from "./TipoEmpresaLista";

import UsuariosLista from "./UsuariosLista";
import CreateUsuarios from "./CreateUsuarios";
import CreateEmpresaExterna from "./CreateEmpresaExterna";

import CreateEmpresasExterna from "./CreateEmpresasExterna";
import EmpresaTablas from "./EmpresaTablas";
import EmpresaTabla from "./EmpresaTabla";
import UsuarioListaTablas from "./UsuarioListaTablas";

import UsTas from "./UsTas";
import UsTa from "./UsTa";

import EmpresaListas from "./EmpresaListas";
import CreateCliente from "./CreateCliente";
import CreateClienteAE from "./CreateClienteAE";

import TaCl from "./TaCl";
import TaClAE from "./TaClAE";
import CreateProducto from "./CreateProducto";
import TaPro from "./TaPro";

import CreateParametro from "./CreateParametro";
import TaPa from "./TaPa";

import CreateCotizacion from "./CreateCotizacion";
import TaCo from "./TaCo";

import CreateValorParametro from "./CreateValorParametro";
import TaVaPa from "./TaVaPa";

import CreateListaParametro from "./CreateListaParametro";
import TaLisPa from "./TaLisPa";

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="*" element={<PagNoEncontrada />} />
          <Route path="/" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menuadmin" element={<MenuAdmin />} />
          <Route path="/usuariolista" element={<UsuarioLista />} />
          <Route path="/empresalista" element={<EmpresaLista />} />
          <Route path="/createusuario" element={<CreateUsuario />} />
          <Route path="/createsucursal" element={<CreateSucursal />} />
          <Route path="/createtipoemprersa" element={<CreateTipoEmprersa />} />
          <Route path="/createrol" element={<CreateRol />} />
          <Route path="/sucursallista" element={<SucursalLista />} />
          <Route path="/rollista" element={<RolLista />} />
          <Route path="/tipoempresalista" element={<TipoEmpresaLista />} />
          <Route path="/usuarioslista" element={<UsuariosLista />} />
          <Route path="/createusuarios" element={<CreateUsuarios />} />
          <Route path="/createempresa" element={<CreateEmpresaExterna />} />
          <Route path="/createempresas" element={<CreateEmpresasExterna />} />
          <Route path="/empresatablas" element={<EmpresaTablas />} />
          <Route path="/empresatabla" element={<EmpresaTabla />} />
          <Route path="/usuariolistatablas" element={<UsuarioListaTablas />} />

          <Route path="/ustas" element={<UsTas />} />
          <Route path="/usta" element={<UsTa />} />
          <Route path="/empresalistas" element={<EmpresaListas />} />

          <Route path="/createcliente" element={<CreateCliente />} />
          <Route path="/createclienteae" element={<CreateClienteAE />} />

          <Route path="/tacl" element={<TaCl />} />
          <Route path="/taclae" element={<TaClAE />} />

          <Route path="/createproducto" element={<CreateProducto />} />
          <Route path="/tapro" element={<TaPro />} />

          <Route path="/createparametro" element={<CreateParametro />} />
          <Route path="/tapa" element={<TaPa />} />

          <Route path="/createcotizacion" element={<CreateCotizacion />} />
          <Route path="/taco" element={<TaCo />} />

          <Route path="/createvalorparametro" element={<CreateValorParametro />} />
          <Route path="/tavapa" element={<TaVaPa />} />

          <Route path="/createlistaparametro" element={<CreateListaParametro />} />
          <Route path="/talispa" element={<TaLisPa />} />

        </Routes>
      </Container>
    </>
  );
};

export default App;
