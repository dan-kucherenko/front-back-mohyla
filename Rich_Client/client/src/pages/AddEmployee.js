import React from "react";
import $ from 'jquery'

function AddEmployee() {
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
            url: "http://localhost:4567/company/add-employee",
            data: form_data,
            success: function (msg) {
                alert(msg);
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
        <form method="post" id="add-emp-form" action="">
            <div class="form-row">
                <div class="col-md-4 mb-3">
                    <label for="employee_id">Employee ID</label>
                    <input type="text" class="form-control" id="employee_id" placeholder="Employee ID"></input>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="first_name">First name</label>
                    <input type="text" class="form-control" id="first_name" placeholder="First name"></input>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="last_name">Last name</label>
                    <input type="text" class="form-control" id="last_name" placeholder="Last name"></input>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="email">Email</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="email_span">@</span>
                        </div>
                        <input type="email" class="form-control" id="email" placeholder="Email"
                               aria-describedby="inputGroupPrepend2"></input>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-4 mb-3">
                    <label for="age">Age</label>
                    <input type="text" class="form-control" id="age" placeholder="Age"></input>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="position">Position</label>
                    <input type="text" class="form-control" id="position" placeholder="Position"></input>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="department">Department</label>
                    <input type="text" class="form-control" id="department" placeholder="Department"></input>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="country_support">Country Support</label>
                    <input type="text" class="form-control" id="country_support"
                           placeholder="Country Support"></input>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="contract_type">Contract Type</label>
                    <input type="text" class="form-control" id="contract_type" placeholder="Contract Type"></input>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="gender">Gender</label>
                    <select class="form-select" id="gender">
                        <option selected>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="salary">Salary</label>
                    <input type="text" class="form-control" id="salary" placeholder="Salary"></input>
                </div>
            </div>
            <div class="form-group">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required></input>
                    <label class="form-check-label" for="invalidCheck2">
                        Agree to terms and conditions
                    </label>
                </div>
            </div>
            <button class="btn btn-primary" type="button" onClick={btnClick} id="add-empl">Submit form</button>
        </form>

    );
}

export default AddEmployee;