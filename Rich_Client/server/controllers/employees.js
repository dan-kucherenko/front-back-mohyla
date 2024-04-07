const Employee = require("../models/Employees");

const getAllEmployees = async (req, res) => {
    try {
        let filter = {};

        if (req.query.department) {
            filter.department = req.query.department;
        }
        if (req.query.position) {
            filter.position = req.query.position;
        }

        if (req.query.employee_id) {
            const employee = await Employee.findOne({ employee_id: req.query.employee_id });
            if (!employee) {
                return res.status(404).json({ message: "Employee not found." });
            }
            return res.json(employee);
        }

        const employees = await Employee.find(filter);
        if (!employees.length) {
            return res.status(404).json({ message: "No employees found matching the criteria." });
        }

        res.json(employees);
    } catch (err) {
        res.status(500).json({
            message: "An error occurred while retrieving employees.",
            error: err.message
        });
    }
};

const addEmployee = async (req, res) => {
    const newEmployee = new Employee(req.body);
    try {
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(400).json({message: "An error occurred while adding the employee.", error: err.message});
    }
};

const removeEmployee = async (req, res) => {
    try {
        const employee = await Employee.findOneAndDelete({ employee_id: req.query.employee_id });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json({ message: "Employee removed successfully", employee: employee });
    } catch (err) {
        res.status(500).json({ message: "An error occurred while removing the employee.", error: err.message });
    }
};


const updateEmployeeInfo = async (req, res) => {
    try {
        const updatedEmployeeInfo = await Employee.findOneAndUpdate(
            { employee_id: req.query.employee_id },
            { $set: req.body },
            { new: false, runValidators: true }
        );

        if (!updatedEmployeeInfo) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json(updatedEmployeeInfo);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while updating the employee info.", error: err.message });
    }
};

const promoteEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findOneAndUpdate({employee_id: req.params.employee_id}, {$set: {position: req.body.position}}, {new: false});
        if (!updatedEmployee) {
            return res.status(404).json({message: "Employee not found"});
        }
        res.json(updatedEmployee);
    } catch (err) {
        res.status(400).json({message: "An error occurred while promoting the employee.", error: err.message});
    }
};

module.exports = {
    getAllEmployees,
    addEmployee,
    removeEmployee,
    updateEmployeeInfo,
    promoteEmployee
};
