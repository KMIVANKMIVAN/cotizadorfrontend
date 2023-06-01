import { Link } from "react-router-dom";
function PagNoEncontrada() {
  return (
    <div className="page-wrap d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block text-white">404</span>
            <div className="mb-4 lead text-white">
              No se encontró la página que está buscando.
            </div>
            <div className="form-floating">
              <Link className="btn btn-primary  text-white " to="/menuadmin">
                Volver
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagNoEncontrada;
