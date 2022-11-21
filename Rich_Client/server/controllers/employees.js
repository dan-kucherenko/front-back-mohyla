const Employee = require("../models/Employees");
const {render} = require("ejs");
const path = require("path");

// const login = async (req, res) => {
//     try {
//         res.sendFile(path.join(__dirname + '/../pages/login.html'));
//     } catch (err) {
//         res.json({message: err});
//     }
// }

const getEmployees = async (req, res) => {
    try {
        const allEmployees = await Employee.find();
        res.json(allEmployees);
    } catch (err) {
        res.json({message: err});
    }
}

const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.find({employee_id: req.params.employee_id});
        res.json(employee);
    } catch (err) {
        res.json({message: err});
    }
}

const getEmployeesFromDepartment = async (req, res) => {
    try {
        const employees = await Employee.find({department: req.params.department});
        res.json(employees);
    } catch (err) {
        res.json({message: err});
    }
}

const getEmployeesWithPosition = async (req, res) => {
    try {
        const employees = await Employee.find({position: req.params.position});
        res.json(employees);
    } catch (err) {
        res.json({message: err});
    }
}

// const addEmployeeForm = async (req, res) => {
//     try {
//         res.sendFile(path.join(__dirname + '/../pages/add-employee.html'));
//     } catch (err) {
//         res.json({message: err});
//     }
// }

const addEmployee = async (req, res) => {
    const newEmployee = new Employee(req.body);
    try {
        const savedEmployee = await newEmployee.save();
        res.json(savedEmployee);
    } catch (err) {
        res.json({message: err});
    }
}

const removeEmployee = async (req, res) => {
    try {
        const firedEmployee = await Employee.remove({employee_id: req.params.employee_id});
        res.json(firedEmployee);
    } catch (err) {
        res.json({message: err});
    }
}

const updateEmployeeInfo = async (req, res) => {
    try {
        const updatedEmployeeInfo = await Employee.updateOne({_id: req.params.id},
            {$set: {first_name: req.body.first_name}});
        res.json(updatedEmployeeInfo);
    } catch (err) {
        res.json({message: err});
    }
}

const promoteEmployee = async (req, res) => {
    try {
        const updatedEmployeeInfo = await Employee.updateOne({employee_id: req.params.employee_id},
            {$set: {position: req.body.position}});
        res.json(updatedEmployeeInfo);
    } catch (err) {
        res.json({message: err});
    }
}

module.exports = {
    // login,
    getEmployees,
    getEmployee,
    getEmployeesFromDepartment,
    getEmployeesWithPosition,
    // addEmployeeForm,
    addEmployee,
    removeEmployee,
    updateEmployeeInfo,
    promoteEmployee
};
