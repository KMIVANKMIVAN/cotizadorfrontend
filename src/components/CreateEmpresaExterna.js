import React from "react";
import CreateEmpresa from "./CreateEmpresa";

const CreateEmpresaExterna = () => {
  
  const url = "/createempresas"

  return (
    <div>
      <CreateEmpresa url={url}/>
    </div>
  );
};
export default CreateEmpresaExterna;
