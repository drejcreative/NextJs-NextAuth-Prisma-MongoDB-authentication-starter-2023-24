// utils/sendEmail.js
import nodemailer from 'nodemailer';

const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  // Configure your SMTP transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail', 'outlook'
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_FROM, // Sender address
    to, // List of receivers
    subject, // Subject line
    text, // Plain text body
    html, // HTML body (optional)
  };

  // Send the email
  return transporter.sendMail(mailOptions);
};

export default sendEmail;
