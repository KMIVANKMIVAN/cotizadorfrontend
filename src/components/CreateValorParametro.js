import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Link, json } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { FormGroup } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

const CREATE_VALORPARAMETRO_MUTATION = gql`
  mutation CreateValorparametrosLista($createValorparametroInput: CreateValorparametroInput!) {
  CreateValorparametrosLista(createValorparametroInput: $createValorparametroInput)
}
`;
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
const PARAMETRO_QUERY = gql`
  query MostrarParametro {
    MostrarParametro {
      id
      descripcion
      tipo
      nrolista
      obligatorio
      fila
      columna
      producto {
        id
        descripcion
      }
    }
  }
`;
const LISTA_PARAMETRO_QUERY = gql`
  query MostrarListaparametro {
    MostrarListaparametro {
      id
      nrolista
      descripcion
      valor
    }
  }
`;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const TIPOS_DE_PARAMETROS = {
  LISTA: 'LISTA',
  STRING: 'STRING',
  INTEGER: 'INTEGER',
  DOUBLE: 'DOUBLE',
  ETIQUETA: 'ETIQUETA',
  BOOLEAN: 'BOOLEAN',
}

const CreateValorParametro = () => {
  console.log("estamos en CreateValorParametro");
  const p1 = useSelector((state) => state.p1);
  console.log(p1);

  const param1 = localStorage.getItem('param1');
  const param2 = localStorage.getItem('param2');

  console.log("1111111111111111111111");
  console.log(param1);
  console.log("2222222222222222222222");
  console.log(param2);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: data1 } = useQuery(COTIZACION_QUERY);
  const { data: data2 } = useQuery(PARAMETRO_QUERY);
  const { data: data3 } = useQuery(LISTA_PARAMETRO_QUERY);

  const [form2State, setForm2State] = useState({
  });

  let maxColumna = -Infinity;
  let maxFila = -Infinity;

  data2?.MostrarParametro.forEach(objeto => {
    const columna = objeto.columna;
    const fila = objeto.fila;

    if (columna > maxColumna) {
      maxColumna = columna;
    }

    if (fila > maxFila) {
      maxFila = fila;
    }
  });

  const filas = [];
  for (let i = 1; i <= maxFila; i++) {
    const fila = [];
    for (let j = 1; j <= maxColumna; j++) {
      const objeto = data2?.MostrarParametro.find(item => item.fila === i && item.columna === j);
      const descripcion = objeto ? objeto.descripcion : '';
      const tipo = objeto ? objeto.tipo : '';
      const nrolista = objeto ? objeto.nrolista : '';
      const obligatorio = objeto ? objeto.obligatorio : '';

      const cellStyle = {
        backgroundColor:
          ['DATOS GENERALES', 'EXTRAPRIMAS POR MIL', 'CAPITALES ASEGURADOS', 'PORCENTAJE DE SOBREMORTALIDAD', 'TASA DIFERENCIADA', 'RE-CALCULO'].includes(descripcion)
            ? '#943126'
            : 'transparent',
      };

      if (tipo === TIPOS_DE_PARAMETROS.LISTA && obligatorio) {
        fila.push(
          <>
            {descripcion}
            <Form.Group className="was-validated">
              <Form.Select
                id={`form-control-${objeto.id}`}
                required={obligatorio}
                value={form2State[`${objeto.id}`]}
                onChange={e => {
                  const value = e.target.value
                  if (value == null || value == '') {
                    setForm2State(prevState => ({
                      ...prevState,
                      [`${objeto.id}`]: 0,
                    }));
                  }
                  setForm2State(prevState => ({
                    ...prevState,
                    [`${objeto.id}`]: value,
                  }));
                }}
              >
                <option value="">Seleccionar</option>
                {data3 && (
                  <>
                    {data3.MostrarListaparametro.map(MostrarListaparametro => {
                      if (nrolista === MostrarListaparametro.nrolista) {
                        return (
                          <option key={MostrarListaparametro.id} value={MostrarListaparametro.valor}>
                            {MostrarListaparametro.descripcion}
                          </option>
                        );
                      }
                    })}
                  </>
                )}
              </Form.Select>
            </Form.Group>
          </>
        );
      }
      else if (tipo === TIPOS_DE_PARAMETROS.LISTA && !obligatorio) {
        fila.push(
          <>
            {descripcion}
            <Form.Group className="">
              <Form.Select
                id={`form-control-${objeto.id}`}
                // required={obligatorio}
                value={form2State[`${objeto.id}`]}
                onChange={e => {
                  const value = e.target.value
                  if (value == null || value == '') {
                    setForm2State(prevState => ({
                      ...prevState,
                      [`${objeto.id}`]: 0,
                    }));
                  }
                  setForm2State(prevState => ({
                    ...prevState,
                    [`${objeto.id}`]: value,
                  }));
                }}
              >
                <option value="">Seleccionar</option>
                {data3 && (
                  <>
                    {data3.MostrarListaparametro.map(MostrarListaparametro => {
                      if (nrolista === MostrarListaparametro.nrolista) {
                        return (
                          <option key={MostrarListaparametro.id} value={MostrarListaparametro.valor}>
                            {MostrarListaparametro.descripcion}
                          </option>
                        );
                      }
                    })}
                  </>
                )}
              </Form.Select>
            </Form.Group>
          </>
        );
      }
      else if (tipo === TIPOS_DE_PARAMETROS.STRING && obligatorio) {
        fila.push(
          <div style={cellStyle}>
            {descripcion}
            <Form.Group className="was-validated">
              <Form.Control
                id={`form-control-${objeto.id}`}
                required={obligatorio}
                value={form2State[`${objeto.id}`]}
                onChange={e => {
                  const value = e.target.value;
                  if (value == undefined || value == '' || value == null) {
                    setForm2State(prevState => ({
                      ...prevState,
                      [`${objeto.id}`]: "",
                    }));
                  } else {
                    setForm2State(prevState => ({
                      ...prevState,
                      [`${objeto.id}`]: value,
                    }));
                  }
                }}
              />
            </Form.Group>
          </div>
        )
      }
      else if (tipo === TIPOS_DE_PARAMETROS.STRING && !obligatorio) {
        fila.push(
          <div style={cellStyle}>
            {descripcion}
            <Form.Group className="">
              <Form.Control
                id={`form-control-${objeto.id}`}
                value={form2State[`${objeto.id}`]}
                onChange={e => {
                  const value = e.target.value;
                  if (value == undefined || value == '' || value == null) {
                    setForm2State(prevState => ({
                      ...prevState,
                      [`${objeto.id}`]: "",
                    }));
                  } else {
                    setForm2State(prevState => ({
                      ...prevState,
                      [`${objeto.id}`]: value,
                    }));
                  }
                }}
              />
            </Form.Group>
          </div>
        )
      }
      else if (tipo === TIPOS_DE_PARAMETROS.INTEGER && obligatorio) {
        fila.push(
          <div style={cellStyle}>
            {descripcion}
            <Form.Group className="was-validated">
              <Form.Control
                id={`form-control-${objeto.id}`}
                required={obligatorio}
                value={form2State[`${objeto.id}`]}
                onChange={e => {
                  const value = e.target.value
                  if (value == null || value == '') {
                    setForm2State(prevState => ({
                      ...prevState,
                      [`${objeto.id}`]: 0,
                    }));
                  }
                  setForm2State(prevState => ({
                    ...prevState,
                    [`${objeto.id}`]: value,
                  }));
                }}
              />
            </Form.Group>
          </div>
        )
      }
      else if (tipo === TIPOS_DE_PARAMETROS.INTEGER && !obligatorio) {
        fila.push(
          <div style={cellStyle}>
            {descripcion}
            <Form.Group className="was-validated">
              <Form.Control
                id={`form-control-${objeto.id}`}
                required={obligatorio}
                value={form2State[`${objeto.id}`]}
                onChange={e => {
                  const value = e.target.value
                  if (value == null || value == '') {
                    setForm2State(prevState => ({
                      ...prevState,
                      [`${objeto.id}`]: 0,
                    }));
                  }
                  setForm2State(prevState => ({
                    ...prevState,
                    [`${objeto.id}`]: value,
                  }));
                }}
              />
            </Form.Group>
          </div>
        )
      }
      else if (tipo === TIPOS_DE_PARAMETROS.DOUBLE && obligatorio) {
        fila.push(
          <div style={cellStyle}>
            {descripcion}
            <Form.Group className="was-validated">
              <Form.Control
                id={`form-control-${objeto.id}`}
                required={obligatorio}
                value={form2State[`${objeto.id}`]}
                onChange={e => {
                  const value = e.target.value
                  if (value == null || value == '') {
                    setForm2State(prevState => ({
                      ...prevState,
                      [`${objeto.id}`]: 0.00,
                    }));
                  }
                  setForm2State(prevState => ({
                    ...prevState,
                    [`${objeto.id}`]: value,
                  }));
                }}
              />
            </Form.Group>
          </div>
        )
      }
      else if (tipo === TIPOS_DE_PARAMETROS.DOUBLE && !obligatorio) {
        fila.push(
          <div style={cellStyle}>
            {descripcion}
            <Form.Group className="">
              <Form.Control
                id={`form-control-${objeto.id}`}
                value={form2State[`${objeto.id}`]}
                onChange={e => {
                  const value = e.target.value
                  if (value == null || value == '') {
                    setForm2State(prevState => ({
                      ...prevState,
                      [`${objeto.id}`]: 0.00,
                    }));
                  }
                  setForm2State(prevState => ({
                    ...prevState,
                    [`${objeto.id}`]: value,
                  }));
                }}
              />
            </Form.Group>
          </div>
        )
      }
      else if (tipo === TIPOS_DE_PARAMETROS.BOOLEAN) {
        fila.push(
          <div style={cellStyle}>
            {descripcion}
            <Form.Group className="was-validated">
              <Form.Select
                id={`form-control-${objeto.id}`}
                required={obligatorio}
                value={form2State[`${objeto.id}`]}
                onChange={e => {
                  const value = e.target.value
                  let esta = true;
                  if (value === "false") {
                    esta = false;
                  }
                  setForm2State(prevState => ({
                    ...prevState,
                    [`${objeto.id}`]: esta,
                  }));
                }}
              >
                <option value="">Seleccionar</option>
                <option value="true">SI</option>
                <option value="false">NO</option>
              </Form.Select>
            </Form.Group>
          </div>
        )
      } else if (tipo === TIPOS_DE_PARAMETROS.ETIQUETA) {
        fila.push(
          <>
            <h5 className="text-center bg-red rounded">
              {descripcion}
            </h5>
          </>
        )
      }
    }
    filas.push(fila);
  }

  const columnas = [];
  for (let j = 1; j <= maxColumna; j++) {
    columnas.push(``);
  }

  const options = {
    pagination: false,
    filter: false,
    search: false,
    selectableRows: 'none',
    print: false,
    download: false,
    viewColumns: false,
    rowsPerPageOptions: [],
  }

  const valores = Object.entries(form2State).map(([key, value]) => {
    return {
      parametroId: Number(key),
      valor: value
      
    }
  })

  console.log("valores");
  console.log({valores});
  // const valoreseditar = valores.slice();
  // const valoreseditar = [...valores];
  const valoreseditar = Array.from(valores);
  console.log("valoreseditar");
  console.log({valoreseditar});

  const payload = {
    // "cotizacionId": 1,
    "cotizacionId": parseInt(param1),
    // "productoId": 1,
    "productoId": parseInt(param2),
    valores: valoreseditar
    // valores: valores
  }

  const [createValorParametro, { error, data: datas2 }] = useMutation(
    CREATE_VALORPARAMETRO_MUTATION,
    {
      variables: {
        createValorparametroInput: payload
      },
    }
  );

  return (
    <>
      {/* <h1>{valoresGuardar}</h1> */}
      <pre>{JSON.stringify(form2State, null, 2)}</pre>
      <form onSubmit={(e) => {
        e.preventDefault();
        createValorParametro()
      }}>
        <ThemeProvider theme={darkTheme}>
          <MUIDataTable
            title={'Formulario'}
            data={filas}
            columns={columnas}
            options={options}
          />
        </ThemeProvider>
        <br />
        <Button className="" type="submit">Enviar</Button>
      </form>
    </>
  );
};

export default CreateValorParametro;