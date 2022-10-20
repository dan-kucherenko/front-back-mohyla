async function send() {
    let nodemailer = require("nodemailer");
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "currrate@gmail.com",
            pass: "irjldepyitskztvl"
        }
    });

    let result = await transporter.sendMail({
        from: 'currrate@gmail.com',
        to: "daniil.ukraine@gmail.com",
        subject: "Miaoo!!",
        text: "Miaoo!"

    });
    console.log(result);

}

send();
