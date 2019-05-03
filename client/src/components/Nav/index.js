import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Logo from '../Logo';

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top landingNav">
      <Link className="navbar-brand" to="/">
        <Logo />
        <span className="logoText">
        <span id="g">G</span>ig<span id="h">H</span>ub
        </span>
      </Link>
      <div className="navLinks">
        <ul className="navbar-nav mr-3">

          <li className="nav-item">
            <a
              className="btn btn-small"
              href="/"
            >
              <i className='fab fa-linkedin' color='primary'/>
              <span className="loginText">
                Login 
              </span>
            </a>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;