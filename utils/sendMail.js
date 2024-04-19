const nodemailer = require('nodemailer');

const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    // Configure your email service provider here
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_password',
    },
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'OTP for Account Verification',
    text: `Your OTP for account verification is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
