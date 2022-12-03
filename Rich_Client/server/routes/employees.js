"use strict"
const router = require('express').Router();
const controller = require('../controllers/employees');

// GET func for all elements
router.get('/employees', controller.getEmployees);

// GET func for exact department
router.get('/employees/departments/:department', controller.getEmployeesFromDepartment);

// GET func for exact position employees
router.get('/employees/positions/:position', controller.getEmployeesWithPosition);

// GET func for exact employee_id
router.get('/employees/:employee_id', controller.getEmployee);

// POST func
router.post('/add-employee', controller.addEmployee);

// DELETE func
router.delete('/remove/:employee_id', controller.removeEmployee);

// UPDATE func
router.patch('/promote/:employee_id', controller.updateEmployeeInfo);

module.exports = router;