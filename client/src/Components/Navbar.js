import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg" id="nav-inner">
      <div className="container-fluid">
        <Link className="navbar-brand " to="/" id="dd">
          InkMap
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
              aria-current="page"
              to="/home"
            >
              Home
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/About" ? "active" : ""
              }`}
              to="/About"
            >
              About
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/Contact" ? "active" : ""
              }`}
              to="/Contact"
            >
              Contact Us
            </Link>
          </div>
        </div>
          {!localStorage.getItem('token') ? <form className="d-flex gap-3" role="search">
            <Link to="/login" >Login</Link>
            <Link to="/register" >Register</Link>
          </form>:
          <div >
            <Link to="/userinfo" className="d-flex gap-3 align-items-center justify-content-between">
            <i className="fa-solid fa-user" style={{color: "#fff", cursor:"pointer"}}></i>
            <span className="navbar-text text-light fs-4">{localStorage.getItem("username")}</span>
            </Link>
          </div>} 
      </div>
      
    </nav>
  );
}
