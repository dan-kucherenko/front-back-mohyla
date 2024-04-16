import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'font-awesome/css/font-awesome.min.css';
import './styles/employees.css';
import './styles/add-employee.css';
import './styles/navbar.css';
import './styles/login.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);