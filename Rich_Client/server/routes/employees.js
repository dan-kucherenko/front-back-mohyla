"use strict";
const router = require('express').Router();
const controller = require('../controllers/employees');

// GET all employees/ by id / by department / by position
router.get('/employees', controller.getAllEmployees);

// POST to add a new employee
router.post('/employees', controller.addEmployee);

// DELETE an employee
router.delete('/employees', controller.removeEmployee);

// PATCH to update an employee's info
router.patch('/employees', controller.updateEmployeeInfo);

module.exports = router;