const Employee = require("../models/Employees");

const getAnalytics = async (req, res) => {
  try {
    // Get all employees
    const employees = await Employee.find({});

    // Calculate department counts
    const departmentCounts = {};
    employees.forEach((employee) => {
      const dept = employee.department || "Unknown";
      departmentCounts[dept] = (departmentCounts[dept] || 0) + 1;
    });

    // Calculate salary ranges
    const salaryRanges = {
      "0-30000": 0,
      "30001-50000": 0,
      "50001-80000": 0,
      "80001-100000": 0,
      "100000+": 0,
    };

    let totalSalary = 0;
    let validSalaryCount = 0;

    employees.forEach((employee) => {
      // Convert salary string to number, removing any non-numeric characters
      const salaryStr = employee.salary || "0";
      const salaryNum = parseInt(salaryStr.replace(/[^0-9]/g, ""), 10);

      if (!isNaN(salaryNum)) {
        totalSalary += salaryNum;
        validSalaryCount++;

        if (salaryNum <= 30000) {
          salaryRanges["0-30000"]++;
        } else if (salaryNum <= 50000) {
          salaryRanges["30001-50000"]++;
        } else if (salaryNum <= 80000) {
          salaryRanges["50001-80000"]++;
        } else if (salaryNum <= 100000) {
          salaryRanges["80001-100000"]++;
        } else {
          salaryRanges["100000+"]++;
        }
      }
    });

    // Calculate contract types
    const contractTypes = {};
    employees.forEach((employee) => {
      const type = employee.contract_type || "Unknown";
      contractTypes[type] = (contractTypes[type] || 0) + 1;
    });

    // Calculate monthly hires
    const monthlyHires = {};
    employees.forEach((employee) => {
      if (employee.hire_date) {
        const hireDate = new Date(employee.hire_date);
        const monthYear = `${
          hireDate.getMonth() + 1
        }/${hireDate.getFullYear()}`;
        monthlyHires[monthYear] = (monthlyHires[monthYear] || 0) + 1;
      }
    });

    // Calculate key metrics
    const totalEmployees = employees.length;
    const averageSalary =
      validSalaryCount > 0 ? Math.round(totalSalary / validSalaryCount) : 0;

    // Calculate new hires this month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const newHires = employees.filter((employee) => {
      if (!employee.hire_date) return false;
      const hireDate = new Date(employee.hire_date);
      return (
        hireDate.getMonth() === currentMonth &&
        hireDate.getFullYear() === currentYear
      );
    }).length;

    res.json({
      departmentCounts,
      salaryRanges,
      contractTypes,
      monthlyHires,
      totalEmployees,
      averageSalary,
      newHires,
    });
  } catch (err) {
    console.error("Error in getAnalytics:", err);
    res.status(500).json({
      message: "An error occurred while retrieving analytics.",
      error: err.message,
    });
  }
};

module.exports = {
  getAnalytics,
};
