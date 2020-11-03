import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: "JgPWY62DXERYvR9vKF",
    },
  });

  let info = await transporter.sendMail({
    from: `"Henry Boisdequin" <${process.env.EMAIL}>`, // sender address
    to: to, // list of receivers
    subject: "Change Password", // Subject line
    html: html, // html
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
