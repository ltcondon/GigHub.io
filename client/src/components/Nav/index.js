import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Logo from '../Logo';

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <Link className="navbar-brand" to="/">
        <Logo />
        Welcome to GigHub
      </Link>
      <div>
        <ul className="navbar-nav right">

          <li className="nav-item">
            <Link
              to="/dashboard"
              className={window.location.pathname === "/search" ? "nav-link active" : "nav-link"}
            >
              <i className='fab fa-linkedin' color='primary'/>
              <span className="loginText">
                Login 
              </span>
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;