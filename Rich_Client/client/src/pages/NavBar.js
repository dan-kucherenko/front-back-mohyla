import React from "react";
import {Link} from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/company">Employees Handbook</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/employees"> Employees</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-employee"> Add Employee</Link>
                    </li>
                </ul>
            </div>
        </nav>);
}

export default NavBar;