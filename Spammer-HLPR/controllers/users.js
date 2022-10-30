"use strict";
const Users = require("../models/Users");

const getUsers = async (req, res, next) => {
    try {
        const allUsers = await Users.find({}, {email: 1, _id: 0});
        const usersEmails = [];
        for (let i in allUsers)
            usersEmails.push(allUsers[i]['email']);
        res.render('show-users', {users: usersEmails});
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
        res.json("User has been added");
    } catch (err) {
        res.json({message: err});
    }
};

const removeUser = async (req, res) => {
    try {
        const removedUser = await Users.remove({_id: req.body._id});
        res.json(removedUser);
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