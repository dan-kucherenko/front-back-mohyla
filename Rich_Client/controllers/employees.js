const Employee = require("../models/Employees");

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

const addEmployee = async (req, res) => {
    const newEmployee = new Employee({
        employee_id: req.body.employee_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age,
        position: req.body.position,
        department: req.body.department,
        country_support: req.body.country_support,
        contract_type: req.body.contract_type,
        gender: req.body.gender,
        hire_date: req.body.hire_date
    });
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
    getEmployees,
    getEmployee,
    getEmployeesFromDepartment,
    getEmployeesWithPosition,
    addEmployee,
    removeEmployee,
    updateEmployeeInfo,
    promoteEmployee
};
