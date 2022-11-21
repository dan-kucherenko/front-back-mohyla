import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./pages/NavBar";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import Login from "./pages/Login";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    <NavBar/>
                    <Routes>
                        <Route to="/company" exact component={Login}/>
                        <Route to="/employees" exact component={Employees}/>
                        <Route to="/add-employee" exact component={AddEmployee}/>
                    </Routes>
                    <div className="container">
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="table-dark">
                                <tr>
                                    <th scope="col">Emp_ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Surname</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Country Support</th>
                                    <th scope="col">Contract Type</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Department</th>
                                    <th scope="col">Salary</th>
                                </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </header>
            </div>
        </BrowserRouter>
    );
}

export default App;
