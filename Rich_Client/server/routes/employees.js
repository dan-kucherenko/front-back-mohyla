"use strict";
const router = require("express").Router();
const controller = require("../controllers/employees");
const { auth, isAdmin } = require("../middleware/auth");

// GET all employees/ by id / by department / by position
router.get("/employees", auth, controller.getAllEmployees);

// POST to add a new employee
router.post("/employees", [auth, isAdmin], controller.addEmployee);

// DELETE an employee
router.delete("/employees", [auth, isAdmin], controller.removeEmployee);

// PATCH to update an employee's info
router.patch("/employees", [auth, isAdmin], controller.updateEmployeeInfo);

module.exports = router;
