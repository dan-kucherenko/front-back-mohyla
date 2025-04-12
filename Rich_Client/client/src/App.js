import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./pages/NavBar";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/company/*"
                element={
                  <PrivateRoute>
                    <>
                      <NavBar />
                      <Routes>
                        <Route path="employees" element={<Employees />} />
                        <Route
                          path="add-employee"
                          element={
                            <AdminRoute>
                              <AddEmployee />
                            </AdminRoute>
                          }
                        />
                        <Route
                          path="analytics"
                          element={
                            <AdminRoute>
                              <Analytics />
                            </AdminRoute>
                          }
                        />
                      </Routes>
                    </>
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
