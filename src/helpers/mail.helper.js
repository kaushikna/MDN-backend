const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const sendMail = async (mailData, sendToAdmin) => {
  try {
    const emailTemplateSource = fs.readFileSync(
      path.join(__dirname, mailData.root),
      "utf8"
    );
    const template = handlebars.compile(emailTemplateSource);
    const htmlToSend = template({ ...mailData?.templateData });

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: process.env.EMAIL,
          pass: process.env.SMTP_PASSWORD
      }
  });

    if (sendToAdmin) {
      await transporter.sendMail({
        from: mailData.email,
        to: process.env.EMAIL,
        subject: mailData.subject,
        html: htmlToSend,
      });
    } else {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: mailData.email,
        subject: mailData.subject,
        html: htmlToSend,
      });
    }
  } catch (error) {
    console.log("Error while sending mail ", error);
    throw error;
  }
};

module.exports = {
  sendMail,
};
