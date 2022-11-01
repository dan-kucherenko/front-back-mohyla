"use strict"
const nodemailer = require("nodemailer");
const Users = require("../models/Users");

async function sendEmail(subject, message) {
    const USERNAME = process.env.SPAMMER_USERNAME;
    const PASSWORD = process.env.SPAMMER_PASSWORD;
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: USERNAME,
            pass: PASSWORD
        }
    });

    const allUsers = await Users.find({}, {email: 1});
    let usersEmails = [];
    for (let i in allUsers)
        usersEmails.push(allUsers[i]['email']);
    let result = await transporter.sendMail({
        from: USERNAME,
        to: usersEmails,
        subject: subject,
        text: message
    });
    console.log(result);
}

module.exports = {sendEmail};