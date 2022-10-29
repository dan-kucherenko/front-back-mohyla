"use strict";
const Users = require("../models/Users");

const getUsers = async (req, res) => {
    try {
        const allUsers = await Users.find();
        res.json(allUsers);
    } catch (err) {
        res.json({message: err});
    }
};

const addUserForMail = async (req, res) => {
    const newUser = new Users({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        surname: req.body.surname,
        email: req.body.email
    });
    try {
        // if (Users.find({email: req.body.email}) != null)
        //     throw new Error('One of your employees already has this email, which is unique');
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.json(err.message);
    }
    console.log(req.body);
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