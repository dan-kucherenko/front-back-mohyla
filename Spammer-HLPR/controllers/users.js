// "use strict";
const Users = require("../models/Users");
const Messages = require("../models/Messages");
const mail_sender = require("../mail-sender/send-email");


const getMainPage = (req, res) => {
    console.log("Main page");
    res.sendFile("D:\\dev\\WebstormProjects\\Front-end Back-end\\Spammer-HLPR\\pages\\add-user.html");
};

const getUsers = async (req, res) => {
    try {
        const allUsers = await Users.find({}, {_id: 1, email: 1});
        const allMessages = await Messages.find({}, {_id: 1, message: 1});
        res.render('show-users', {users: allUsers, messages: allMessages});
    } catch (err) {
        res.json({message: err});
    }
};

const sendEmail = async (req, res) => {
    await mail_sender.sendEmail();
    res.redirect("http://localhost:4567/spammer/show-users");
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
        await Users.remove({email: req.body.email});
        console.log("Deleted a user");
        res.redirect('http://localhost:4567/spammer/show-users');
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

module.exports = {getMainPage, getUsers, sendEmail, addUserForMail, removeUser, updateUserEmail};