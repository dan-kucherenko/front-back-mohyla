const nodemailer = require("nodemailer");

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

let result = transporter.sendMail({
    from: USERNAME,
    to: "daniil.ukraine@gmail.com",
    subject: "Miaoo!!",
    text: "Miaoo!"

});
console.log(result);
