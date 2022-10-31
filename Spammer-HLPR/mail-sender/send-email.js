"use strict"
async function sendEmail() {
    const nodemailer = require("nodemailer");
    const Users = require("../models/Users");

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

    const allUsers = Users.find({}, {email: 1, _id: 0});
    const usersEmails = [];
    for (let i in allUsers)
        usersEmails.push(allUsers[i]['email']);
    let result = await transporter.sendMail({
        from: USERNAME,
        to: "daniil.ukraine@gmail.com",
        subject: "Miaoo!!",
        text: "Miaoo!"

    });
}


