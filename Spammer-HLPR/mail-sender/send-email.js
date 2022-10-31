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

    // const message_selector = document.getElementById('message-selector');
    // const selected_message = message_selector.options[message_selector.selectedIndex].text;
    // console.log(selected_message);
    let result = await transporter.sendMail({
        from: USERNAME,
        to: usersEmails,
        subject: "Miaoo!!",
        text: "Miaoo!"
    });
    console.log(result);
}

module.exports = {sendEmail};