"use strict";
const Users = require("../models/Users");
const Messages = require("../models/Messages");
const mail_sender = require("../mail-sender/send-email");

const getMainPage = (req, res) => {
    res.sendFile("D:\\dev\\WebstormProjects\\Front-end Back-end\\Spammer-HLPR\\pages\\add-user.html");
};

const getUsers = async (req, res) => {
    try {
        const allUsers = await Users.find({}, {_id: 1, email: 1}).sort({email: -1});
        const allMessages = await Messages.find({}, {_id: 1, message: 1});
        res.render('show-users', {users: allUsers, messages: allMessages});
    } catch (err) {
        res.json({message: err});
    }
};

const sendEmail = async (req, res) => {
    try {
        const subject = req.body.subject;
        const message = req.body.message;
        const result = await mail_sender.sendEmail(subject, message);
        res.json(result);
    } catch (err) {
        res.json({message: err});
    }
}

const addUserForMail = async (req, res) => {
    const newUser = new Users(req.body);
    try {
        const savedUser = await newUser.save();
        res.redirect("http://localhost:4567/spammer");
    } catch (err) {
        res.json({message: err});
    }
};

const removeUser = async (req, res) => {
    try {
        const removedUser = await Users.remove({email: req.body.email});
        res.json(removedUser);
    } catch (err) {
        res.json({message: err});
    }
};

const updateUserEmail = async (req, res) => {
    try {
        const updatedUserEmail = await Users.updateOne({email: req.body.emailToChange},
            {$set: {email: req.body.newEmail}});
        res.json(updatedUserEmail);
    } catch (err) {
        res.json({message: err});
    }
};

module.exports = {getMainPage, getUsers, sendEmail, addUserForMail, removeUser, updateUserEmail};