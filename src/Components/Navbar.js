import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";

const Navbar = (props) => {
  let location = useLocation();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark"
      data-bs-theme={`${props.mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotes
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          {/* <div
            className={`form-check form-switch text-${
              props.mode !== "light" ? "dark" : "light"
            }`}
          >
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onClick={props.toggleMode}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Dark Mode
            </label>
          </div> */}
          {!(localStorage.getItem('token')) ? <form className="d-flex"><Link to="/login" type="button" className="btn btn-outline-primary mx-1">Login</Link>
          <Link to="/signup" type="button" className="btn btn-outline-primary mx-1">Signup</Link></form> : <button onClick = {handleLogout} className="btn btn-outline-primary mx-1">Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
