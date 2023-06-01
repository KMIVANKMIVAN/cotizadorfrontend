import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
const USUARIOS_MUTATION = gql`
  mutation ActualizarUsuarioActivo($updateUsuarioInput: UpdateUsuarioInput!) {
    ActualizarUsuarioActivo(updateUsuarioInput: $updateUsuarioInput) {
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
        rol
        tiporol
      }
      sucursal {
        sucursal
      }
      empresa {
        razon_social
        nit_empresa
      }
    }
  }
`;
const UBIn = props => {
  const navigate = useNavigate();

  const { url, us } = props;

  const [formState, setFormState] = useState({
    id: parseInt(us.id),
    correo: us.correo,
    estado: us.estado,
    celular: us.celular,
    telefono: us.telefono,
    direccion_usuario: us.direccion_usuario,
    pagina_web_usuario: us.pagina_web_usuario,

    ap_paterno: us.ap_paterno,
    ap_materno: us.ap_materno,
    ap_casado: us.ap_casado,
    nombres: us.nombres,
    numero_carnet: us.numero_carnet,
    extesion: us.extesion,
    nit_usuario: us.nit_usuario,

    rolId: parseInt(us.rol.id),
    empresasId: parseInt(us.empresa.id),
    sucursalId: parseInt(us.sucursal.id),
  });

  const [updateUsuario] = useMutation(USUARIOS_MUTATION, {
    variables: {
      updateUsuarioInput: {
        id: parseInt(us.id),
        estado: false,

        rolId: parseInt(us.rol.id),
        empresasId: parseInt(us.empresa.id),
        sucursalId: parseInt(us.sucursal.id),
      },
    },
    onCompleted: () => navigate({ url }),
  });

  return (
    <>
      {(() => {
        if (us.estado) {
          return (
            <Form
              className="row g-3 text-center"
              onSubmit={e => {
                e.preventDefault();
                updateUsuario();
              }}
            >
              <Col>
                <button class="btn btn-danger" type="submit">
                  Inactivar
                </button>
              </Col>
            </Form>
          );
        }
      })()}
    </>
  );
};

export default UBIn;
