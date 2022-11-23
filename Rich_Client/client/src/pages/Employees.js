import React, {useEffect, useState} from "react";
import $ from 'jquery';

function Employees() {
    useEffect(() => {
        fetchItems();
    }, []);
    const [employees, setEmployees] = useState([]);

    const fetchItems = () => {
        $.ajax({
            method: "GET",
            url: "http://localhost:4567/company/employees",
            data: 'json',
            success: function (data) {
                setEmployees(data);
            },
            error: function () {
                alert("Failure");
            }
        });
//TODO: edit, delete buttons. implement search by id, position, department
    };
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
        <div>
            <div className="form-outline mb-4">
                <input type="search" className="form-control" id="datatable-search-input"/>
                <label className="form-label" htmlFor="datatable-search-input">Search</label>
            </div>
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
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        employees.map(employee => (
                            <tr>
                                <th scope="row">{employee.employee_id}</th>
                                <td>{employee.first_name}</td>
                                <td>{employee.last_name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.age}</td>
                                <td>{employee.country_support}</td>
                                <td>{employee.contract_type}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.position}</td>
                                <td>{employee.department}</td>
                                <td>{employee.salary}</td>
                                <td>
                                    <div className="btn-group-vertical">
                                        <button type="button" className="btn btn-warning">Edit</button>
                                        <button type="button" className="btn btn-danger">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Employees;