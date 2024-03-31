import React, {useEffect, useState} from "react";
import $ from 'jquery'

function AddEmployee() {
    const [emp_id, setEmpID] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const [country_support, setCountrySupp] = useState('');
    const [contract_type, setContractType] = useState('');
    const [gender, setGender] = useState('');
    const [salary, setSalary] = useState('');

    const btnClick = () => {
        const form_data = {
            employee_id: $("#employee_id").val(),
            first_name: $("#first_name").val(),
            last_name: $("#last_name").val(),
            email: $("#email").val(),
            age: $("#age").val(),
            position: $("#position").val(),
            department: $("#department").val(),
            country_support: $("#country_support").val(),
            contract_type: $("#contract_type").val(),
            gender: $("#gender").val(),
            salary: $("#salary").val()
        };
        $.ajax({
            method: "POST",
            url: "http://localhost:4567/company/employees",
            data: form_data,
            success: function () {
                alert("Employee has been added");
                clearInputs();
            },
            error: function () {
                alert("Failure");
            }
        });

        function clearInputs() {
            $("#employee_id").val("");
            $("#first_name").val("");
            $("#last_name").val("");
            $("#email").val("");
            $("#age").val("");
            $("#position").val("");
            $("#department").val("");
            $("#country_support").val("");
            $("#contract_type").val("");
            $("#gender").val("Male");
            $("#salary").val("");
        }
    }
    return (
        <div className="container" id="#add-employee-cont">
            <link rel="stylesheet" href="../styles/add-employee.css"/>
            <form method="post" id="add-emp-form" action="">
                <div className="form-row">
                    <label htmlFor="employee_id">Employee ID</label>
                    <input type="text" className="form-control" id="employee_id" placeholder="Employee ID"
                           onChange={(event) => {
                               setEmpID(event.target.value);
                           }}></input>
                </div>
                <label htmlFor="first_name">First name</label>
                <input type="text" className="form-control" id="first_name" placeholder="First name"
                       onChange={(event) => {
                           setFirstName(event.target.value);
                       }}></input>
                <label htmlFor="last_name">Last name</label>
                <input type="text" className="form-control" id="last_name" placeholder="Last name"
                       onChange={(event) => {
                           setLastName(event.target.value);
                       }}></input>
                <label htmlFor="email">Email</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="email_span">@</span>
                    </div>
                    <input type="email" className="form-control" id="email" placeholder="Email"
                           aria-describedby="inputGroupPrepend2" onChange={(event) => {
                        setEmail(event.target.value);
                    }}></input>
                </div>
                <div className="form-row">
                    <label htmlFor="age">Age</label>
                    <input type="text" className="form-control" id="age" placeholder="Age" onChange={(event) => {
                        setFirstName(event.target.value);
                    }}></input>
                </div>
                <label htmlFor="position">Position</label>
                <input type="text" className="form-control" id="position" placeholder="Position"
                       onChange={(event) => {
                           setPosition(event.target.value);
                       }}></input>
                <label htmlFor="department">Department</label>
                <input type="text" className="form-control" id="department" placeholder="Department"
                       onChange={(event) => {
                           setDepartment(event.target.value);
                       }}></input>
                <label htmlFor="country_support">Country Support</label>
                <input type="text" className="form-control" id="country_support"
                       placeholder="Country Support" onChange={(event) => {
                    setCountrySupp(event.target.value);
                }}></input>
                <label htmlFor="contract_type">Contract Type</label>
                <input type="text" className="form-control" id="contract_type" placeholder="Contract Type"
                       onChange={(event) => {
                           setContractType(event.target.value);
                       }}></input>
                <label htmlFor="gender">Gender</label>
                <select className="form-select" id="gender" onChange={(event) => {
                    setGender(event.target.value);
                }}>
                    <option selected>Male</option>
                    <option>Female</option>
                </select>
                <label htmlFor="salary">Salary</label>
                <input type="text" className="form-control" id="salary" placeholder="Salary"
                       onChange={(event) => {
                           setSalary(event.target.value);
                       }}></input>
                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck2"
                               required></input>
                        <label className="form-check-label" htmlFor="invalidCheck2">
                            Agree to terms and conditions
                        </label>
                    </div>
                </div>
                <button className="btn btn-primary" type="button" onClick={btnClick} id="add-empl">Submit form</button>
            </form>
        </div>
    )
        ;
}

export default AddEmployee;