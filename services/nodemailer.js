const nodemailer = require("nodemailer");

async function main(userEmail, subject, passwordUpdateLink) {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST_NAME,
        port: process.env.MAILPORT,
        secure: false,
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD,
        },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
        to: userEmail,
        subject: subject
    });
}
module.exports = main