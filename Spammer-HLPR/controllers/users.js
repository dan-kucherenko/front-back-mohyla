"use strict";
const Users = require("../models/Users");
const Messages = require("../models/Messages");

const getUsers = async (req, res) => {
    try {
        const allUsers = await Users.find({}, {email: 1});
        const usersEmails = [];
        for (let i in allUsers)
            usersEmails.push(allUsers[i]['email']);
        const allMessages = await Messages.find({}, {message: 1, _id: 0});
        const messages = [];
        for (let i in allMessages)
            messages.push(allMessages[i]['message']);
        res.render('show-users', {users: usersEmails, messages: messages});
    } catch (err) {
        res.json({message: err});
    }
};

const addUserForMail = async (req, res) => {
    const newUser = new Users(req.body);
    try {
        // if (Users.find({email: req.body.email}) != null)
        //     throw new Error('One of your employees already has this email, which is unique');
        const savedUser = await newUser.save();
        // req.session.message = {
        //     type: 'success',
        //     intro: 'User added!',
        //     message: 'Your user has been added.'
        // }
        res.redirect("http://localhost:4567/spammer");
    } catch (err) {
        res.json({message: err});
    }
};

const removeUser = async (req, res) => {
    try {
        // const removedUser = await Users.findByIdAndDelete({email: req.body.email});
        // res.json(removedUser);
        console.log("Deleted a user");
    } catch (err) {
        res.json({message: err});
    }
};

const updateUserEmail = async (req, res) => {
    try {
        const updatedUserEmail = await Users.updateOne({_id: req.body.id},
            {$set: {email: req.body.email}});
        res.json(updatedUserEmail);
    } catch (err) {
        res.json({message: err});
    }
};

module.exports = {getUsers, addUserForMail, removeUser, updateUserEmail};