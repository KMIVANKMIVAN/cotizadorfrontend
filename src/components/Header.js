import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: "red",
};
const linkStyle2 = {
  margin: "1rem",
  textDecoration: "none",
  color: "white",
};

const Header = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <nav className="navbar navbar-expand-sm navbar-dark shadow p-3 mb-5 rounded">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/menuadmin">
          <img
            src={require("../assets/img/logo.png")}
            alt=""
            width="100"
            height="70"
            className="d-inline-block align-text-top"
          />
        </Link>
        <ul className="navbar-nav ">
          <li className="nav-item">
            {authToken ? (
              <div
                onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN);
                  navigate(`/`);
                }}
                style={linkStyle}
              >
                Salir
              </div>
            ) : (
              <Link to="/" style={linkStyle2}></Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
