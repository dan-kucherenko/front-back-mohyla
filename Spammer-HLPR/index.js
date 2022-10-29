"use strict"
require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express");
const service = express();


const PORT = process.env.PORT;
service.listen(PORT);
console.log('Server is running on port ' + PORT);
mongoose.connect('mongodb://localhost:27017/spammer',
    {useNewUrlParser: true},
    () => console.log("Connected to the DB")
);

service.use(express.urlencoded({extended: true}));
service.use(express.json());
service.use(express.static(__dirname));

// import routes
const usersRoutes = require('./routes/users');
service.use('/spammer/users', usersRoutes);


service.get('/spammer/users', (req, res) => {
    res.sendFile(__dirname + "/pages/add-user.html");
});


