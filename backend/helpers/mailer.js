// TODO currently unused - later for register/password reset
require("dotenv").config({
  path: "./.env"
});
const nodemailer = require("nodemailer");
const port = process.env.PORT || 8080;

module.exports = sendVerificationEmail = async (mailOptions) => {
  return new Promise((resolve, reject) => {
    const config = {
      host: process.env.MAILHOST,
      port: process.env.MAILPORT,
      auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPW
      }
    };
    const host = process.env.FRONTENDHOST || "localhost"
    let transporter = nodemailer.createTransport(config);
    let verificationLink = `http://${host}:${port}/api/verify/${verificationToken}`;
    let text = `Hi "${
      req.body.email
      }", thanks for registering to the HEDERA Dashboard. <br />
	Click <a href="${verificationLink}">here</a> to verify your email address. Your request will be reviewed by our administrator and
      we will notify you when your account has been activated. <br />Thank you for waiting! `;
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error("Send Mail failed")
        reject({
          success: false,
          error: error
        });
      }
      // console.log(`Verficationlink ${verificationLink} send to ${req.body.email}`);

      resolve({
        success: true
      });
    });
  });
};
