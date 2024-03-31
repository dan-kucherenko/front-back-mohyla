// "use strict"
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require("body-parser");
// const cors = require ('cors');
// const service = express();
// const PORT = 4567;
//
// service.listen(PORT);
// console.log('Server is running on port ' + PORT);
// // mongoose.connect('mongodb://localhost:27017/company',
// // USE FOR LAPTOP
// mongoose.connect('mongodb://127.0.0.1:27017/company',
//     {useNewUrlParser: true},
//     () => console.log("Connected to the DB"));
//
// service.use(cors());
// service.use(express.static(__dirname));
// service.use(express.json());
// service.use(express.urlencoded({extended: true}));
// service.use(bodyParser.json());
// service.use(bodyParser.urlencoded({extended: true}));
//
// // import routes
// const employeesRoutes = require('./routes/employees');
// service.use('/company', employeesRoutes);


"use strict";
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 4567; // Use the PORT from environment variables or default to 4567

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/company', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the DB");
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((error) => {
        console.error("Could not connect to the database", error);
        process.exit(1);
    });

// Middlewares
app.use(cors());
app.use(express.static(__dirname)); // Consider specifying a folder for static content explicitly
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const employeesRoutes = require('./routes/employees');
app.use('/company', employeesRoutes);
