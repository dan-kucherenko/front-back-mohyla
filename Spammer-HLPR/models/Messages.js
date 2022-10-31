"use strict"
const mongoose = require("mongoose");

const MessagesSchema = mongoose.Schema({
    message: {type: String, required: true}
});

module.exports = mongoose.model('Messages', MessagesSchema);