"use strict"
require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express");
const {sendEmail} = require("./mail-sender/send-email");

const service = express();

service.set('view engine', 'ejs');


const PORT = process.env.PORT;
service.listen(PORT);
console.log('Server is running on port ' + PORT);
mongoose.connect('mongodb://localhost:27017/spammer',
    {useNewUrlParser: true},
    () => console.log("Connected to the DB")
);

sendEmail;

service.use(express.urlencoded({extended: false}));
service.use(express.static(__dirname));
service.use(express.json());

// import routes
const usersRoutes = require('./routes/users');
service.use('/spammer', usersRoutes);


service.get('/spammer', (req, res) => {
    res.sendFile(__dirname + "/pages/add-user.html");
});



