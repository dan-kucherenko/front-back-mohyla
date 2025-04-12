import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/company">
        Employees Handbook
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/company/employees">
              Employees
            </Link>
          </li>
          {user?.role === "admin" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/company/add-employee">
                  Add Employee
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/company/analytics">
                  Analytics
                </Link>
              </li>
            </>
          )}
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <span className="nav-link">Welcome, {user?.firstName}!</span>
          </li>
          <li className="nav-item">
            <button className="btn btn-link nav-link" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
