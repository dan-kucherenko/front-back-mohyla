"use strict";
require("dotenv").config();

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined in environment variables");
  process.exit(1);
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 4567; // Use the PORT from environment variables or default to 4567

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/company", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
const authRoutes = require("./routes/auth");
const employeesRoutes = require("./routes/employees");

app.use("/auth", authRoutes);
app.use("/company", employeesRoutes);
