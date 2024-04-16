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
                        <Route path="/company" element={<Login/>}/>
                        <Route path="/company/employees" element={<Employees/>}/>
                        <Route path="/company/add-employee" element={<AddEmployee/>}/>
                    </Routes>
                </header>
            </div>
        </BrowserRouter>
    );
}

export default App;
