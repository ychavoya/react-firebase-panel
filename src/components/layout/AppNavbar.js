import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AppNavbar extends Component {
  render() {
    return (
      <nav className="navbar navber-expand-md navbar-dark bg-success mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Panel Clientes
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
