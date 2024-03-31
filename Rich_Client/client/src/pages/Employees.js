import React, {useEffect, useState} from "react";
import $ from 'jquery';

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [emp_id, setEmpID] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const [btn_text, setBtnText] = useState('Edit');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = (queryString = '') => {
        $.ajax({
            method: "GET",
            url: `http://localhost:4567/company/employees${queryString ? '?' + queryString : ''}`,
            dataType: 'json',
            success: function (data) {
                setEmployees(Array.isArray(data) ? data : [data]);
            },
            error: function () {
                alert("An error occurred during the fetch operation.");
            }
        });
    };

    const handleSearch = () => {
        // Construct the query object based on search parameters
        let query = {};

        if (emp_id) query.employee_id = emp_id;
        if (department) query.department = department;
        if (position) query.position = position;

        if (!emp_id && !department && !position) {
            fetchEmployees();
        } else {
            // Construct the query string from the query object for non-empty search parameters
            const queryString = Object.keys(query)
                .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
                .join('&');

            fetchEmployees(queryString);
        }
    };

    const deleteEmployee = (empID) => {
        $.ajax({
            url: 'http://localhost:4567/company/employees?employee_id=' + empID,
            method: 'DELETE',
            success: function () {
                alert("Employee has been deleted");
                fetchEmployees();
            },
            error: function () {
                console.log(empID)
                alert("There has been an error");
            }
        });
    }
    return (
        <div>
            <link rel="stylesheet" href="../styles/employees.css"/>
                <div className="form-outline mb-2">
                    <input type="search" className="form-control" id="db-emp_id-search"
                           onChange={(event) => setEmpID(event.target.value)}
                           onBlur={handleSearch}/>
                    <label className="form-label" htmlFor="db-emp_id-search">EmployeeID Search</label>
                    <input type="search" className="form-control" id="db-department-search"
                           onChange={(event) => setDepartment(event.target.value)}
                           onBlur={handleSearch}/>
                    <label className="form-label" htmlFor="db-department-search">Department
                        Search</label>
                    <input type="search" className="form-control" id="db-position-search"
                           onChange={(event) => setPosition(event.target.value)}
                           onBlur={handleSearch}/>
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
                                                    // onClick={() => editPosition(employee.employee_id)}
                                            >{btn_text}
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