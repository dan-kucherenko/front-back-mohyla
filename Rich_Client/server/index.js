"use strict"
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const service = express();
const PORT = 4567;
service.set('view engine', 'ejs');

service.listen(PORT);
console.log('Server is running on port ' + PORT);
// mongoose.connect('mongodb://localhost:27017/company',
//USE FOR LAPTOP
mongoose.connect('mongodb://127.0.0.1:27017/company',
    {useNewUrlParser: true},
    () => console.log("Connected to the DB"));

service.use(express.static(__dirname));
// service.use(express.json());
// service.use(express.urlencoded({extended: true}));
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({extended: true}));

// import routes
const employeesRoutes = require('./routes/employees');
service.use('/company', employeesRoutes);