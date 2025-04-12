import $ from "jquery";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

// First, let's create a mapping object for the header names to database fields
const SORT_FIELD_MAPPING = {
  emp_id: "employee_id",
  name: "first_name",
  surname: "last_name",
  email: "email",
  age: "age",
  "country support": "country_support",
  "contract type": "contract_type",
  gender: "gender",
  position: "position",
  department: "department",
  salary: "salary",
};

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [emp_id, setEmpID] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [currentEdits, setCurrentEdits] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("employee_id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({
    emp_id: "",
    position: "",
    department: "",
  });
  const itemsPerPage = 10;
  const { user } = useAuth();

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      // Filter out empty values
      const activeFilters = Object.entries(filters).reduce(
        (acc, [key, value]) => {
          if (value && value.trim() !== "") {
            acc[key] = value.trim();
          }
          return acc;
        },
        {}
      );

      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        sortField,
        sortOrder,
        ...activeFilters,
      });

      console.log("Fetching with params:", queryParams.toString()); // Debug log

      const response = await fetch(
        `http://localhost:4567/company/employees?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data); // Debug log

      if (data.employees) {
        setEmployees(data.employees);
        setTotalPages(data.totalPages);
      } else {
        console.error("Invalid data format:", data);
        setEmployees([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
      setEmployees([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchEmployees();
    }, 300); // Add debounce to prevent too many requests

    return () => clearTimeout(debounceTimer);
  }, [currentPage, sortField, sortOrder, filters]);

  const handleSort = (field) => {
    const dbField = SORT_FIELD_MAPPING[field.toLowerCase()];
    if (dbField) {
      setSortOrder(
        sortField === dbField && sortOrder === "asc" ? "desc" : "asc"
      );
      setSortField(dbField);
    }
  };

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    // Construct the query object based on search parameters
    let query = {};

    if (emp_id) query.employee_id = emp_id;
    if (department) query.department = department;
    if (position) query.position = position;

    if (!emp_id && !department && !position) {
      fetchEmployees();
    } else {
      // Construct the query string from the query object for non-empty search parameters
      const queryString = Object.keys(query)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join("&");

      fetchEmployees(queryString);
    }
  };

  const saveChanges = (employeeId, updatedData) => {
    $.ajax({
      url: `http://localhost:4567/company/employees?employee_id=${employeeId}`,
      method: "PATCH",
      contentType: "application/json",
      data: JSON.stringify(updatedData),
      success: function (response) {
        alert("Employee updated successfully");
        // Refresh the employee list here if necessary, or update the state to reflect the changes
        fetchEmployees();
      },
      error: function (xhr, status, error) {
        console.error("Update failed:", status, error);
        alert("Failed to update employee.");
      },
    });
  };

  const deleteEmployee = (empID) => {
    $.ajax({
      url: "http://localhost:4567/company/employees?employee_id=" + empID,
      method: "DELETE",
      success: function () {
        alert("Employee has been deleted");
        fetchEmployees();
      },
      error: function () {
        console.log(empID);
        alert("There has been an error");
      },
    });
  };

  const toggleEditMode = (employee) => {
    if (editEmployeeId === employee.employee_id) {
      // Save logic here
      console.log("Saving...", currentEdits);
      saveChanges(editEmployeeId, currentEdits);
      setEditEmployeeId(null); // Exit edit mode
      setCurrentEdits({}); // Clear current edits
    } else {
      setEditEmployeeId(employee.employee_id);
      setCurrentEdits({ ...employee }); // Initialize currentEdits with the employee's data
    }
  };

  const handleEditChange = (field, value) => {
    setCurrentEdits((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container">
      {/* Filters */}
      <div className="row mb-3 p-4">
        {" "}
        <div className="col px-2">
          {" "}
          <input
            type="text"
            className="form-control"
            placeholder="Employee ID"
            name="emp_id"
            value={filters.emp_id}
            onChange={handleFilter}
          />
        </div>
        <div className="col px-2">
          <input
            type="text"
            className="form-control"
            placeholder="Position"
            name="position"
            value={filters.position}
            onChange={handleFilter}
          />
        </div>
        <div className="col px-2">
          <input
            type="text"
            className="form-control"
            placeholder="Department"
            name="department"
            value={filters.department}
            onChange={handleFilter}
          />
        </div>
        <div className="col px-2">
          <button className="btn btn-primary w-100" onClick={fetchEmployees}>
            Apply Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              {[
                { display: "Emp_ID", field: "emp_id" },
                { display: "Name", field: "name" },
                { display: "Surname", field: "surname" },
                { display: "Email", field: "email" },
                { display: "Age", field: "age" },
                { display: "Country Support", field: "country support" },
                { display: "Contract Type", field: "contract type" },
                { display: "Gender", field: "gender" },
                { display: "Position", field: "position" },
                { display: "Department", field: "department" },
                { display: "Salary", field: "salary" },
                { display: "Actions", field: "actions" },
              ].map(({ display, field }) => (
                <th
                  scope="col"
                  key={display}
                  onClick={() => field !== "actions" && handleSort(field)}
                  style={{
                    cursor: field !== "actions" ? "pointer" : "default",
                  }}
                >
                  {display}
                  {sortField === SORT_FIELD_MAPPING[field] &&
                    field !== "actions" && (
                      <i className={`ms-1 fa fa-sort-${sortOrder}`} />
                    )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees && employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.employee_id}>
                  <th scope="row">{employee.employee_id}</th>
                  <td>
                    {editEmployeeId === employee.employee_id ? (
                      <input
                        type="text"
                        value={currentEdits.first_name}
                        onChange={(e) =>
                          handleEditChange("first_name", e.target.value)
                        }
                      />
                    ) : (
                      employee.first_name
                    )}
                  </td>
                  <td>
                    {editEmployeeId === employee.employee_id ? (
                      <input
                        type="text"
                        value={currentEdits.last_name}
                        onChange={(e) =>
                          handleEditChange("last_name", e.target.value)
                        }
                      />
                    ) : (
                      employee.last_name
                    )}
                  </td>
                  <td>
                    {editEmployeeId === employee.employee_id ? (
                      <input
                        type="email"
                        value={currentEdits.email}
                        onChange={(e) =>
                          handleEditChange("email", e.target.value)
                        }
                      />
                    ) : (
                      employee.email
                    )}
                  </td>
                  <td>
                    {editEmployeeId === employee.employee_id ? (
                      <input
                        type="number"
                        value={currentEdits.age}
                        onChange={(e) =>
                          handleEditChange("age", e.target.value)
                        }
                      />
                    ) : (
                      employee.age
                    )}
                  </td>
                  <td>
                    {editEmployeeId === employee.employee_id ? (
                      <input
                        type="text"
                        value={currentEdits.country_support}
                        onChange={(e) =>
                          handleEditChange("country_support", e.target.value)
                        }
                      />
                    ) : (
                      employee.country_support
                    )}
                  </td>
                  <td>
                    {editEmployeeId === employee.employee_id ? (
                      <input
                        type="text"
                        value={currentEdits.contract_type}
                        onChange={(e) =>
                          handleEditChange("contract_type", e.target.value)
                        }
                      />
                    ) : (
                      employee.contract_type
                    )}
                  </td>
                  <td>
                    {editEmployeeId === employee.employee_id ? (
                      <input
                        type="text"
                        value={currentEdits.gender}
                        onChange={(e) =>
                          handleEditChange("gender", e.target.value)
                        }
                      />
                    ) : (
                      employee.gender
                    )}
                  </td>
                  <td>
                    {editEmployeeId === employee.employee_id ? (
                      <input
                        type="text"
                        value={currentEdits.position}
                        onChange={(e) =>
                          handleEditChange("position", e.target.value)
                        }
                      />
                    ) : (
                      employee.position
                    )}
                  </td>
                  <td>
                    {editEmployeeId === employee.employee_id ? (
                      <input
                        type="text"
                        value={currentEdits.department}
                        onChange={(e) =>
                          handleEditChange("department", e.target.value)
                        }
                      />
                    ) : (
                      employee.department
                    )}
                  </td>
                  <td>
                    {editEmployeeId === employee.employee_id ? (
                      <input
                        type="text"
                        value={currentEdits.salary}
                        onChange={(e) =>
                          handleEditChange("salary", e.target.value)
                        }
                      />
                    ) : (
                      employee.salary
                    )}
                  </td>
                  <td>
                    <div className="btn-group-vertical">
                      <button
                        className="btn btn-warning"
                        onClick={() => toggleEditMode(employee)}
                      >
                        {editEmployeeId === employee.employee_id
                          ? "Save"
                          : "Edit"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteEmployee(employee.employee_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i + 1}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Employees;
