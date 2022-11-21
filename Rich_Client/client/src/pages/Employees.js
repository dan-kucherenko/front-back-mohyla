import React from "react";
import $ from 'jquery';

function Employees() {
    // const editEmail = (emailInput) => {
    //     const button = document.getElementById(emailInput);
    //     const li = button.parentNode.parentNode;
    //     if (button.innerText == 'Edit') {
    //         const span = li.firstElementChild
    //         const input = document.createElement('input');
    //         input.type = 'text';
    //         input.value = span.textContent;
    //         li.insertBefore(input, span);
    //         li.removeChild(span);
    //         button.innerText = 'Save';
    //     } else if (button.innerText == 'Save') {
    //         const input = li.firstElementChild;
    //         const span = document.createElement('span');
    //         span.textContent = input.value;
    //         li.insertBefore(span, input);
    //         li.removeChild(input);
    //         button.innerText = 'Edit';
    //         let object = {
    //             emailToChange: emailInput,
    //             newEmail: span.innerText
    //         }
    //         fetch('http://localhost:4567/spammer/update-email', {
    //             method: 'PATCH',
    //             body: JSON.stringify(object),
    //             headers: {'Content-type': 'application/json'}
    //         }).then((res) => {
    //             if (!res.ok) {
    //                 alert("There is an error");
    //                 return res;
    //             }
    //         }).then((res) => {
    //             alert("Email has been changed");
    //             res.json();
    //         }).then(() =>
    //             window.location.reload());
    //     }
    // };
    //
    // const deleteUser = (emailInput) => {
    //     let object = {
    //         email: emailInput
    //     }
    //     fetch('http://localhost:4567/spammer/delete-user', {
    //         method: 'DELETE',
    //         body: JSON.stringify(object),
    //         headers: {'Content-type': 'application/json'}
    //     }).then((res) => {
    //         if (!res.ok) {
    //             alert("There is an error");
    //             return res;
    //         }
    //     }).then((res) => {
    //         alert("Email has been deleted");
    //         res.json();
    //     }).then(() =>
    //         window.location.reload());
    // };
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="http://localhost:4567/company">Employees Handbook</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="http://localhost:4567/company/employees"> Employees</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:4567/company/add-employee">Add employee</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="table-responsive">
                <table className="table">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">Emp_ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Age</th>
                        <th scope="col">Country Support</th>
                        <th scope="col">Contract Type</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Position</th>
                        <th scope="col">Department</th>
                        <th scope="col">Salary</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Employees;