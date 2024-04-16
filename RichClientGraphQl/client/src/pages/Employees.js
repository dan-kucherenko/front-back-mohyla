import React, {useEffect, useState} from "react";
import $ from 'jquery';

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [emp_id, setEmpID] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const [editEmployeeId, setEditEmployeeId] = useState(null);
    const [currentEdits, setCurrentEdits] = useState({});


    useEffect(() => {
        fetchEmployees();
        const intervalId = setInterval(() => {
            fetchEmployees();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const fetchEmployees = (queryString = '') => {
        const query = `
        query GetEmployees($department: String, $position: String, $employee_id: ID) {
            employees(department: $department, position: $position, employee_id: $employee_id) {
                employee_id
                first_name
                last_name
                email
                position
                department
                country_support
                contract_type
                gender
                salary
            }
        }
    `;

        const variables = {
            department: department,
            position: position
        };

        $.ajax({
            url: 'http://localhost:4567/graphql',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ query, variables }),
            success: function (response) {
                if (response.data) {
                    setEmployees(Array.isArray(response.data.employees) ? response.data.employees : [response.data.employees]);
                } else if (response.errors) {
                    alert(response.errors[0].message);
                }
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

    const saveChanges = (employeeId, updatedData) => {
        const graphqlQuery = {
            query: `
            mutation UpdateEmployee($employee_id: Int!, $updatedEmployee: UpdatedEmployee!) {
                updateEmployee(employee_id: $employee_id, updatedEmployee: $updatedEmployee) {
                    employee_id
                    first_name
                    last_name
                    email
                    age
                    position
                    department
                    country_support
                    contract_type
                    gender
                    salary
                }
            }
        `,
            variables: {
                employee_id: employeeId,
                updatedEmployee: updatedData
            }
        };

        $.ajax({
            url: `http://localhost:4567/graphql`, // Adjust to your GraphQL endpoint
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(graphqlQuery),
            success: function(response) {
                if (response.data && response.data.updateEmployee) {
                    alert("Employee updated successfully");
                    fetchEmployees(); // Refresh the employee list if necessary
                } else {
                    alert("Failed to update employee. Check the data you have entered.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Update failed:", status, error);
                alert("Failed to update employee.");
            }
        });
    };


    const deleteEmployee = (empID) => {
        const graphqlQuery = {
            query: `
            mutation DeleteEmployee($employee_id: Int!) {
                deleteEmployee(employee_id: $employee_id)
            }
        `,
            variables: {
                employee_id: empID
            }
        };

        $.ajax({
            url: 'http://localhost:4567/graphql', // Ensure this points to your GraphQL endpoint
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(graphqlQuery),
            success: function(response) {
                if (response.data && response.data.deleteEmployee) {
                    alert("Employee has been deleted");
                    fetchEmployees(); // Refresh the employee list if necessary
                } else {
                    alert("Failed to delete employee. Check the data you have entered.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Deletion failed for employee ID " + empID + ":", status, error);
                alert("There has been an error");
            }
        });
    };

    const toggleEditMode = (employee) => {
        if (editEmployeeId === employee.employee_id) {
            // Save logic here
            console.log("Saving...", currentEdits);
            saveChanges(editEmployeeId, currentEdits);
            setEditEmployeeId(null); // Exit edit mode
            setCurrentEdits({}); // Clear current edits
        } else {
            setEditEmployeeId(employee.employee_id);
            setCurrentEdits({...employee}); // Initialize currentEdits with the employee's data
        }
    };

    const handleEditChange = (field, value) => {
        setCurrentEdits(prev => ({...prev, [field]: value}));
    };

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
                            <tr key={employee.employee_id}>
                                <th scope="row">{employee.employee_id}</th>
                                <td>
                                    {editEmployeeId === employee.employee_id ? (
                                        <input
                                            type="text"
                                            value={currentEdits.first_name}
                                            onChange={(e) => handleEditChange('first_name', e.target.value)}
                                        />
                                    ) : (
                                        employee.first_name
                                    )}
                                </td>
                                <td>
                                    {editEmployeeId === employee.employee_id ? (
                                        <input
                                            type="text"
                                            value={currentEdits.last_name}
                                            onChange={(e) => handleEditChange('last_name', e.target.value)}
                                        />
                                    ) : (
                                        employee.last_name
                                    )}
                                </td>
                                <td>
                                    {editEmployeeId === employee.employee_id ? (
                                        <input
                                            type="email"
                                            value={currentEdits.email}
                                            onChange={(e) => handleEditChange('email', e.target.value)}
                                        />
                                    ) : (
                                        employee.email
                                    )}
                                </td>
                                <td>
                                    {editEmployeeId === employee.employee_id ? (
                                        <input
                                            type="email"
                                            value={currentEdits.age}
                                            onChange={(e) => handleEditChange('age', e.target.value)}
                                        />
                                    ) : (
                                        employee.age
                                    )}
                                </td>
                                <td>
                                    {editEmployeeId === employee.employee_id ? (
                                        <input
                                            type="email"
                                            value={currentEdits.country_support}
                                            onChange={(e) => handleEditChange('country_support', e.target.value)}
                                        />
                                    ) : (
                                        employee.country_support
                                    )}
                                </td>
                                <td>
                                    {editEmployeeId === employee.employee_id ? (
                                        <input
                                            type="email"
                                            value={currentEdits.contract_type}
                                            onChange={(e) => handleEditChange('contract_type', e.target.value)}
                                        />
                                    ) : (
                                        employee.contract_type
                                    )}
                                </td>
                                <td>
                                    {editEmployeeId === employee.employee_id ? (
                                        <input
                                            type="email"
                                            value={currentEdits.gender}
                                            onChange={(e) => handleEditChange('gender', e.target.value)}
                                        />
                                    ) : (
                                        employee.gender
                                    )}
                                </td>
                                <td>
                                    {editEmployeeId === employee.employee_id ? (
                                        <input
                                            type="text"
                                            value={currentEdits.position}
                                            onChange={(e) => setCurrentEdits(prev => ({
                                                ...prev,
                                                position: e.target.value
                                            }))}
                                        />
                                    ) : (
                                        employee.position
                                    )}
                                </td>
                                <td>
                                    {editEmployeeId === employee.employee_id ? (
                                        <input
                                            type="text"
                                            value={currentEdits.department}
                                            onChange={(e) => setCurrentEdits(prev => ({
                                                ...prev,
                                                department: e.target.value
                                            }))}
                                        />
                                    ) : (
                                        employee.department
                                    )}
                                </td>
                                <td>
                                    {editEmployeeId === employee.employee_id ? (
                                        <input
                                            type="text"
                                            value={currentEdits.salary}
                                            onChange={(e) => setCurrentEdits(prev => ({
                                                ...prev,
                                                salary: e.target.value
                                            }))}
                                        />
                                    ) : (
                                        employee.salary
                                    )}
                                </td>
                                <td>
                                    <div className="btn-group-vertical">
                                        {/*<button type="button" className="btn btn-warning"*/}
                                        {/*        // onClick={() => editPosition(employee.employee_id)}*/}
                                        {/*>{btn_text}*/}
                                        {/*</button>*/}
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => toggleEditMode(employee)}
                                        >
                                            {editEmployeeId === employee.employee_id ? "Save" : "Edit"}
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