"use strict"
const router = require('express').Router();
const controller = require('../controllers/employees')

// GET func for all elements
router.get('/employees', controller.getEmployees);

// GET func for exact employee_id
router.get('/:employee_id', controller.getEmployee);

// GET func for exact department
router.get('/:department', controller.getEmployeesFromDepartment);

// GET func for exact position employees
router.get('/:position', controller.getEmployeesWithPosition);

// POST func
router.post('/', controller.addEmployee);

// DELETE func
router.delete('/:employee_id', controller.removeEmployee);

// UPDATE func
router.patch('/:id', controller.updateEmployeeInfo);

module.exports = router;