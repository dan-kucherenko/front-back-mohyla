import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    departmentCounts: {},
    salaryRanges: {},
    contractTypes: {},
    monthlyHires: {},
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4567/company/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  const departmentData = {
    labels: Object.keys(stats.departmentCounts),
    datasets: [
      {
        label: "Employees by Department",
        data: Object.values(stats.departmentCounts),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const salaryData = {
    labels: Object.keys(stats.salaryRanges),
    datasets: [
      {
        label: "Salary Distribution",
        data: Object.values(stats.salaryRanges),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h2>Analytics Dashboard</h2>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Department Distribution</h5>
              <Bar data={departmentData} />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Salary Distribution</h5>
              <Bar data={salaryData} />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Key Metrics</h5>
              <div className="row">
                <div className="col-md-4">
                  <div className="metric-card">
                    <h6>Total Employees</h6>
                    <p className="h3">{stats.totalEmployees}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="metric-card">
                    <h6>Average Salary</h6>
                    <p className="h3">${stats.averageSalary}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="metric-card">
                    <h6>New Hires (This Month)</h6>
                    <p className="h3">{stats.newHires}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
