const nodemailer = require("nodemailer");

const SendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "elliottchart2015@gmail.com",
      pass: "crsklqwemnhniljn",
    },
  });

  transporter
    .verify()
    .then((test) => console.log(test))
    .catch((error) => console.log(error));

  const mailOptions = {
    from: "EWave",
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = SendEmail;
