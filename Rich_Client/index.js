"use strict"
const express = require('express');
const mongoose = require('mongoose');
const service = express();
const PORT = 4567;
service.use(express.json());

service.listen(PORT);
console.log('Server is running on port ' + PORT);
mongoose.connect('mongodb://localhost:27017/company',
// mongoose.connect('mongodb://127.0.0.1:27017/company', USE FOR LAPTOP
    {useNewUrlParser: true},
    () => console.log("Connected to the DB"));

// import routes
const employeesRoutes = require('./routes/employees');
service.use('/company', employeesRoutes);
