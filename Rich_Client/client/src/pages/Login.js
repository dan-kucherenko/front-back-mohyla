import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [adminChecked, setAdminChecked] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    };
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleChangeAdmin = () => {
        setAdminChecked(current => !current);
    };

    const login = () => {
        if (username === 'root' && password === 'root' && adminChecked)
            navigate('/company/employees');
        else
            alert("Wrong username or password");
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="container" id="login-cont">
                        <form>
                            <div className="form-group">
                                <label className="form-label" htmlFor="username">Username</label>
                                <input id="username" className="form-control form-control-md"
                                       onChange={handleChangeUsername}
                                       placeholder="Enter a valid username"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password"
                                       onChange={handleChangePassword}
                                       placeholder="Password"/>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" onChange={handleChangeAdmin}
                                       id="admin"/>
                                <label className="form-check-label" htmlFor="admin">I am administrator</label>
                            </div>
                            <button type="button" className="btn btn-primary mt-2" onClick={login}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;