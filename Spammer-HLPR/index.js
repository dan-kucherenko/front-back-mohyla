"use strict";
require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express");
const service = express();
const bodyParser = require("body-parser");
service.set('view engine', 'ejs');

const PORT = process.env.PORT;
service.listen(PORT);
console.log('Server is running on port ' + PORT);
mongoose.connect('mongodb://localhost:27017/spammer',
    {useNewUrlParser: true},
    () => console.log("Connected to the DB")
);

service.use(express.urlencoded({extended: false}));
service.use(express.static(__dirname));
service.use(express.json());
service.use(bodyParser.json());

// import routes
const usersRoutes = require('./routes/users');
service.use('/spammer', usersRoutes);