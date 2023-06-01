import React from "react";
import CreateEmpresa from "./CreateEmpresa";

const CreateEmpresasExterna = () => {
  
  const url = "/createempresa"

  return (
    <div>
      <CreateEmpresa url={url}/>
    </div>
  );
};
export default CreateEmpresasExterna;

