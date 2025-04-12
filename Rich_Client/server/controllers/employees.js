const Employee = require("../models/Employees");

const getAllEmployees = async (req, res) => {
  try {
    const {
      employee_id,
      position,
      department,
      page = 1,
      limit = 10,
      sortField = "employee_id",
      sortOrder = "asc",
    } = req.query;

    // Build filter object
    const filter = {};
    if (employee_id) {
      // Convert employee_id to number for exact matching
      filter.employee_id = parseInt(employee_id);
    }
    if (position) filter.position = { $regex: position, $options: "i" };
    if (department) filter.department = { $regex: department, $options: "i" };

    console.log("Applied filters:", filter); // Debug log

    // Build sort object
    const sort = { [sortField]: sortOrder === "asc" ? 1 : -1 };

    const employees = await Employee.find(filter)
      .sort(sort)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Employee.countDocuments(filter);

    console.log(`Found ${employees.length} employees`); // Debug log

    res.json({
      employees,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      totalEmployees: total,
    });
  } catch (err) {
    console.error("Error in getAllEmployees:", err);
    res.status(500).json({
      message: "An error occurred while retrieving employees.",
      error: err.message,
    });
  }
};

const addEmployee = async (req, res) => {
  const newEmployee = new Employee(req.body);
  try {
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({
      message: "An error occurred while adding the employee.",
      error: err.message,
    });
  }
};

const removeEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({
      employee_id: req.query.employee_id,
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee removed successfully", employee: employee });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while removing the employee.",
      error: err.message,
    });
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
    res.status(500).json({
      message: "An error occurred while updating the employee info.",
      error: err.message,
    });
  }
};

const promoteEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { employee_id: req.params.employee_id },
      { $set: { position: req.body.position } },
      { new: false }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({
      message: "An error occurred while promoting the employee.",
      error: err.message,
    });
  }
};

module.exports = {
  getAllEmployees,
  addEmployee,
  removeEmployee,
  updateEmployeeInfo,
  promoteEmployee,
};
