import React from 'react';
import MUIDataTable from 'mui-datatables';

const data = {
  "MostrarParametro": [
    {
      "id": "1",
      "descripcion": "TIPO",
      "tipo": "LISTA",
      "nrolista": 1,
      "obligatorio": true,
      "fila": 2,
      "columna": 1
    },
    {
      "id": "2",
      "descripcion": "SUBTIPO",
      "tipo": "LISTA",
      "nrolista": 2,
      "obligatorio": true,
      "fila": 3,
      "columna": 1
    },
    // Resto de los objetos...
  ]
};

const CrearTabla = () => {
  let maxColumna = -Infinity;
  let maxFila = -Infinity;

  // Obtener los valores máximos de columna y fila
  data.MostrarParametro.forEach(objeto => {
    const columna = objeto.columna;
    const fila = objeto.fila;

    if (columna > maxColumna) {
      maxColumna = columna;
    }

    if (fila > maxFila) {
      maxFila = fila;
    }
  });

  // Crear los datos para la tabla
  const filas = [];
  for (let i = 1; i <= maxFila; i++) {
    const fila = [];
    for (let j = 1; j <= maxColumna; j++) {
      const objeto = data.MostrarParametro.find(item => item.fila === i && item.columna === j);
      const descripcion = objeto ? objeto.descripcion : '';

      const cellStyle = {
        backgroundColor:
          ['DATOS GENERALES', 'EXTRAPRIMAS POR MIL', 'CAPITALES ASEGURADOS', 'PORCENTAJE DE SOBREMORTALIDAD', 'TASA DIFERENCIADA', 'RE-CALCULO'].includes(descripcion)
            ? '#17FF00'
            : 'transparent',
      };

      fila.push(<div style={cellStyle}>{descripcion}</div>);
    }
    filas.push(fila);
  }

  // Definir las columnas de la tabla
  const columnas = [];
  for (let j = 1; j <= maxColumna; j++) {
    columnas.push(`Columna ${j}`);
  }

  // Configuración adicional de la tabla
  const options = {
    filterType: 'checkbox',
    responsive: 'vertical',
    selectableRows: 'none', // Evita que se puedan seleccionar filas
    print: false, // Oculta el botón de impresión
    download: false, // Oculta el botón de descarga
    viewColumns: false, // Oculta el botón de vista de columnas
    rowsPerPageOptions: [], // Oculta el selector de filas por página
  };

  return (
    <div>
      <MUIDataTable
        title={'Tabla de Datos'}
        data={filas}
        columns={columnas}
        options={options}
      />
    </div>
  );
};

export default CrearTabla;

import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';

const data = {
  "MostrarParametro": [
    {
      "id": "1",
      "descripcion": "TIPO",
      "tipo": "LISTA",
      "nrolista": 1,
      "obligatorio": true,
      "fila": 2,
      "columna": 1
    },
    {
      "id": "2",
      "descripcion": "SUBTIPO",
      "tipo": "LISTA",
      "nrolista": 2,
      "obligatorio": true,
      "fila": 3,
      "columna": 1
    },
    // Resto de los objetos...
  ]
};

const CrearTabla = () => {
  let maxColumna = -Infinity;
  let maxFila = -Infinity;

  // Obtener los valores máximos de columna y fila
  data.MostrarParametro.forEach(objeto => {
    const columna = objeto.columna;
    const fila = objeto.fila;

    if (columna > maxColumna) {
      maxColumna = columna;
    }

    if (fila > maxFila) {
      maxFila = fila;
    }
  });

  // Crear los datos para la tabla
  const filas = [];
  for (let i = 1; i <= maxFila; i++) {
    const fila = [];
    for (let j = 1; j <= maxColumna; j++) {
      const objeto = data.MostrarParametro.find(item => item.fila === i && item.columna === j);
      const descripcion = objeto ? objeto.descripcion : '';
      const tipo = objeto ? objeto.tipo : '';

      const cellStyle = {
        backgroundColor:
          ['DATOS GENERALES', 'EXTRAPRIMAS POR MIL', 'CAPITALES ASEGURADOS', 'PORCENTAJE DE SOBREMORTALIDAD', 'TASA DIFERENCIADA', 'RE-CALCULO'].includes(descripcion)
            ? '#17FF00'
            : 'transparent',
      };

      if (descripcion) {
        if (tipo === "LISTA") {
          // Aquí puedes reemplazar el input por el selector de lista que desees
          fila.push(
            <div style={cellStyle}>
              {descripcion}
              <select>
                {/* Agrega las opciones del selector aquí */}
                <option value="opcion1">Opción 1</option>
                <option value="opcion2">Opción 2</option>
                <option value="opcion3">Opción 3</option>
              </select>
            </div>
          );
        } else {
          fila.push(
            <div style={cellStyle}>
              {descripcion}
              {['DATOS GENERALES', 'EXTRAPRIMAS POR MIL', 'CAPITALES ASEGURADOS', 'PORCENTAJE DE SOBREMORTALIDAD', 'TASA DIFERENCIADA', 'RE-CALCULO'].includes(descripcion) ? null : <input type="text" />}
            </div>
          );
        }
      } else {
        fila.push(
          <div style={cellStyle}>
            {descripcion}
          </div>
        );
      }
    }
    filas.push(fila);
  }

  // Definir las columnas de la tabla
  const columnas = [];
  for (let j = 1; j <= maxColumna; j++) {
    columnas.push(`Columna ${j}`);
  }

  // Configuración adicional de la tabla
  const options = {
    filterType: 'checkbox',
    responsive: 'vertical',
    selectableRows: 'none', // Evita que se puedan seleccionar filas
    print: false, // Oculta el botón de impresión
    download: false, // Oculta el botón de descarga
    viewColumns: false, // Oculta el botón de vista de columnas
    rowsPerPageOptions: [], // Oculta el selector de filas por página
  };

  return (
    <div>
      <MUIDataTable
        title={'Tabla de Datos'}
        data={filas}
        columns={columnas}
        options={options}
      />
    </div>
  );
};

export default CrearTabla;
/* var formattedDate = new Date("2003-11-30").toLocaleDateString();
console.log(formattedDate) */
/* 
var formattedDate = new Date("2021-09-21").toJSON();
console.log(formattedDate)
 */

/* console.log("Escribe tu nombre:");
const stdin = process.openStdin();

stdin.addListener("data", data => {
  // console.log("Tu nombre es: " + data.toString());
  //process.exit();
  var tempDate = new Date(data.toString());
  var formattedDate = [
    tempDate.getDate() ,
    tempDate.getMonth() + 1,
    tempDate.getFullYear(),
  ].join("/");

  console.log(formattedDate);
}); */

// // Fecha en formato "1999-2-7"
// var fechaOriginal = "1985-9-22";

// // Convertir la fecha a un objeto Date
// var fecha = new Date(fechaOriginal);

// // Obtener los componentes de la fecha
// var dia = fecha.getDate();
// var mes = fecha.getMonth() + 1; // Los meses en JavaScript comienzan desde 0
// var anio = fecha.getFullYear();

// // Formatear la fecha en "MM/DD/YYYY"
// var fechaFormateada = (mes < 10 ? "0" : "") + mes + "/" + (dia < 10 ? "0" : "") + dia + "/" + anio;

// console.log(fechaFormateada);

/* var tempDate = new Date("1998-09-28");
var formattedDate = [
  tempDate.getDate() + 1,
  tempDate.getMonth() + 1,
  tempDate.getFullYear(),
].join("/");

console.log(formattedDate); */

/* function format(inputDate) {
  let date, month, year;

  date = inputDate.getDate();
  month = inputDate.getMonth() ;
  year = inputDate.getFullYear();

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");

  return `${date}/${month}/${year}`;
}

const result = format(new Date("2022", "3", "28"));

console.log(result); // 28/03/2022
const p = "2022-2-28";
console.log(p.replace("-", "/")); */
// let a  
// console.log("73510105".length === 8);
// {
//   "createValorparametroInput": [
//     {
//       "valorString": "p1",
//       "valorInt": null,
//       "valorDouble": null,
//       "valorBoolean": null,
//       "parametroId": 1,
//       "cotizacionId": 1,
//     },
//     {
//       "valorString": null,
//       "valorInt": 1,
//       "valorDouble": null,
//       "valorBoolean": null,
//       "parametroId": 1,
//       "cotizacionId": 1,
//     },
//     {
//       "valorString": null,
//       "valorInt": null,
//       "valorDouble": null,
//       "valorBoolean": true,
//       "parametroId": 1,
//       "cotizacionId": 1,
//     }
//   ]
// }

// import json

// //  Tu objeto JSON
// data = '''
// {
//   "MostrarParametro": [
//     {
//       "id": "1",
//       "descripcion": "TIPO",
//       "tipo": "LISTA",
//       "nrolista": 1,
//       "obligatorio": true,
//       "fila": 2,
//       "columna": 1
//     },
//     {
//       "id": "2",
//       "descripcion": "SUBTIPO",
//       "tipo": "LISTA",
//       "nrolista": 2,
//       "obligatorio": true,
//       "fila": 3,
//       "columna": 1
//     },
//     // ...
//   ]
// };
// // '''

// # Analizar el objeto JSON
// objeto_json = json.loads(data)

// # Inicializar el valor máximo de columna como el valor mínimo posible (-∞)
// max_columna = float('-inf')

// # Recorrer los objetos en la matriz "MostrarParametro"
// for objeto in objeto_json['MostrarParametro']:
//     columna = objeto['columna']
//     if columna > max_columna:
//         max_columna = columna

// # Imprimir el valor más alto de columna
// print("El valor más alto de columna es:", max_columna)

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

  // Obtener los valores máximos de columna y fila
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

  // Crear los datos para la tabla
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

      // if (descripcion) {//por demas
      if (tipo === TIPOS_DE_PARAMETROS.LISTA) {
        fila.push(
          <>
            {descripcion}
            <Form.Group className="was-validated">
              <Form.Select
                id={`form-control-${objeto.id}`}
                required={obligatorio}
                value={form2State[`${objeto.id}`]}
                /* onChange={e => {
                  const value = e.target.value;
                  setForm2State(prevState => ({
                    ...prevState,
                    [`${objeto.id}`]: value,
                  }));
                }} */
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
      } else if (tipo === TIPOS_DE_PARAMETROS.STRING) {
        // } else {
        fila.push(
          <div style={cellStyle}>
            {descripcion}
            {/* {!['DATOS GENERALES', 'EXTRAPRIMAS POR MIL', 'CAPITALES ASEGURADOS', 'PORCENTAJE DE SOBREMORTALIDAD', 'TASA DIFERENCIADA', 'RE-CALCULO'].includes(descripcion) && ( */}
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
                  /* setForm2State(prevState => ({
                    ...prevState,
                    [`${objeto.id}`]: value,
                  })); */
                }}
              /* onChange={e => {
                const value = e.target.value
                if (value == null || value == '') {
                  setForm2State(prevState => ({
                    ...prevState,
                    [`${objeto.id}`]: "hola",
                  }));
                }
                setForm2State(prevState => ({
                  ...prevState,
                  [`${objeto.id}`]: value,
                }));
              }} */
              />
            </Form.Group>
            {/* )} */}
          </div>
        )
      } else if (tipo === TIPOS_DE_PARAMETROS.INTEGER) {
        // } else {
        fila.push(
          <div style={cellStyle}>
            {descripcion}
            {/* {!['DATOS GENERALES', 'EXTRAPRIMAS POR MIL', 'CAPITALES ASEGURADOS', 'PORCENTAJE DE SOBREMORTALIDAD', 'TASA DIFERENCIADA', 'RE-CALCULO'].includes(descripcion) && ( */}
            <Form.Group className="was-validated">
              <Form.Control
                id={`form-control-${objeto.id}`}
                required={obligatorio}
                value={form2State[`${objeto.id}`]}
                /* onChange={e => {
                  const value = e.target.value;

                  setForm2State(prevState => ({
                    ...prevState,
                    [`${objeto.id}`]: value,
                  }));
                }} */
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
            {/* )} */}
          </div>
        )
      } else if (tipo === TIPOS_DE_PARAMETROS.DOUBLE) {
        // } else {
        fila.push(
          <div style={cellStyle}>
            {descripcion}
            {/* {!['DATOS GENERALES', 'EXTRAPRIMAS POR MIL', 'CAPITALES ASEGURADOS', 'PORCENTAJE DE SOBREMORTALIDAD', 'TASA DIFERENCIADA', 'RE-CALCULO'].includes(descripcion) && ( */}
            <Form.Group className="was-validated">
              <Form.Control
                id={`form-control-${objeto.id}`}
                required={obligatorio}
                value={form2State[`${objeto.id}`]}
                /* onChange={e => {
                  const value = e.target.value;

                  setForm2State(prevState => ({
                    ...prevState,
                    [`${objeto.id}`]: value,
                  }));
                }} */
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
            {/* )} */}
          </div>
        )
      } else if (tipo === TIPOS_DE_PARAMETROS.BOOLEAN) {
        // } else {
        fila.push(
          <div style={cellStyle}>
            {descripcion}
            {/* {!['DATOS GENERALES', 'EXTRAPRIMAS POR MIL', 'CAPITALES ASEGURADOS', 'PORCENTAJE DE SOBREMORTALIDAD', 'TASA DIFERENCIADA', 'RE-CALCULO'].includes(descripcion) && ( */}
            {/* <Form.Group className="was-validated">
              <Form.Control
                id={`form-control-${objeto.id}`}
                required={obligatorio}
                value={form2State[`${objeto.id}`]}
                // onChange={e => {
                //   const value = e.target.value;

                //   setForm2State(prevState => ({
                //     ...prevState,
                //     [`${objeto.id}`]: value,
                //   }));
                // }} 
                onChange={e => {
                  const value = e.target.value
                  if (value == null || value == '') {
                    setForm2State(prevState => ({
                      ...prevState,
                      [`${objeto.id}`]: true,
                    }));
                  }
                  setForm2State(prevState => ({
                    ...prevState,
                    [`${objeto.id}`]: value,
                  }));
                }}
              />
            </Form.Group> */}
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
            {/* )} */}
          </div>
        )
      } else if (tipo === TIPOS_DE_PARAMETROS.ETIQUETA) {
        fila.push(
          <>
            <h4 className="text-center">
              {descripcion}
            </h4>
            {/* <div style={cellStyle}>

          </div> */}
          </>
        )
      }
      /* } else {
        fila.push(
          <div style={cellStyle}>
            {descripcion}
          </div>
        );
      } */
    }
    filas.push(fila);
  }

  // Definir las columnas de la tabla
  const columnas = [];
  for (let j = 1; j <= maxColumna; j++) {
    columnas.push(`Columna ${j}`);
  }

  const options = {
    pagination: false, // Deshabilitar paginación
    filter: false, // Deshabilitar filtro
    search: false, // Deshabilitar búsqueda
    selectableRows: 'none', // Evitar la selección de filas
    print: false, // Ocultar botón de impresión
    download: false, // Ocultar botón de descarga
    viewColumns: false, // Ocultar botón de vista de columnas
    rowsPerPageOptions: [], // Ocultar selector de filas por página
  };



  const valores = Object.entries(form2State).map(([key, value]) => {
    return {
      parametroId: Number(key),
      valor: value
    }
  })
  const payload = {
    "cotizacionId": 1,
    "productoId": 1,
    valores: valores
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
      <pre>a 1: {JSON.stringify(form2State, null, 2)}</pre>
      <hr />
      <h2>El valor más alto de columna es: {maxColumna}</h2>
      <h2>El mayor valor de fila es: {maxFila}</h2>

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