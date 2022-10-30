"use strict"
const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true}
});

module.exports = mongoose.model('Users', UsersSchema);