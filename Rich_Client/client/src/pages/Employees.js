import React, {useEffect, useState} from "react";
import $ from 'jquery';

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [emp_id, setEmpID] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const [btn_text, setBtnText] = useState('Edit');

    useEffect(() => {
        fetchItems();
    }, []);

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
    };

    const handleChangeSearchEmpID = (event) => {
        $.ajax({
            method: "GET",
            url: "http://localhost:4567/company/employees/" + event.target.value,
            data: 'json',
            success: function (data) {
                setEmployees(data);
            },
            error: function () {
                alert("Failure searching by employee id");
            }
        });
    };
    const handleChangeSearchDepartment = (event) => {
        if (event.target.value === "")
            fetchItems();
        else {
            $.ajax({
                    method: "GET",
                    url: "http://localhost:4567/company/employees/departments/" + event.target.value,
                    data: 'json',
                    success: function (data) {
                        setEmployees(data);
                    },
                    error: function () {
                        alert("Failure searching by department");
                    }
                }
            );
        }
    };
    const handleChangeSearchPosition = (event) => {
        if (event.target.value === "")
            fetchItems();
        else {
            $.ajax({
                method: "GET",
                url: "http://localhost:4567/company/employees/positions/" + event.target.value,
                data: 'json',
                success: function (data) {
                    setEmployees(data);
                },
                error: function () {
                    alert("Failure searching by position");
                }
            });
        }
    };
    const editPosition = (employee_id, e) => {
        const button = $(".button #employee_id");
        const td = $(".td #employee_id");
        if (btn_text === 'Edit') {
            const span = $(".span #emp-pos");
            // const input = $('<input  id="position-input" type="text"/>');
            // td.append(input, span);
            // td.remove(span);
            setBtnText("Save");
            alert("Edit");
        } else if (btn_text === 'Save') {
            alert("Save");

            // const input = $("#position-input");
            // const span = $('<span>input.value</span>');
            // td.prepend(span, input);
            // td.remove(input);
            setBtnText("Edit");
            // let object = {
            //     employee_id: employee_id,
            //     newPosition: span.innerText
            // }
            //     $.ajax('http://localhost:4567/spammer/update-email', {
            //         method: 'PATCH',
            //         body: JSON.stringify(object),
            //         headers: {'Content-type': 'application/json'}
            //     }).then((res) => {
            //         if (!res.ok) {
            //             alert("There is an error");
            //             return res;
            //         }
            //     }).then((res) => {
            //         alert("Email has been changed");
            //         res.json();
            //     }).then(() =>
            //         window.location.reload());
        }
    };

    const deleteEmployee = (empID) => {
        $.ajax({
            url: 'http://localhost:4567/company/remove/' + empID,
            method: 'DELETE',
            success: function () {
                alert("Email has been deleted");
                fetchItems();
            },
            error: function () {
                alert("There has been an error");
            }
        });
    }
    return (
        <div>
            <link rel="stylesheet" href="../styles/employees.css"/>
                <div className="form-outline mb-2">
                    <input type="search" className="form-control" id="db-emp_id-search"
                           onChange={handleChangeSearchEmpID}/>
                    <label className="form-label" htmlFor="db-emp_id-search">EmployeeID Search</label>
                    <input type="search" className="form-control" id="db-department-search"
                           onChange={handleChangeSearchDepartment}/>
                    <label className="form-label" htmlFor="db-department-search">Department
                        Search</label>
                    <input type="search" className="form-control" id="db-position-search"
                           onChange={handleChangeSearchPosition}/>
                    <label className="form-label" htmlFor="db-position-search">Position
                        Search</label>
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
                                    <td id={employee.employee_id}><span id="emp-pos">{employee.position}</span></td>
                                    <td>{employee.department}</td>
                                    <td>{employee.salary}</td>
                                    <td>
                                        <div className="btn-group-vertical">
                                            <button type="button" className="btn btn-warning"
                                                    onClick={() => editPosition(employee.employee_id)}>{btn_text}
                                            </button>
                                            <button type="button" className="btn btn-danger"
                                                    onClick={() => deleteEmployee(employee.employee_id)}>Delete
                                            </button>
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