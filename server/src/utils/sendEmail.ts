import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string, port: number) {
  let testAccount = await nodemailer.createTestAccount();
  console.log(testAccount);

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user: "iscc4wf2zx52i6xs@ethereal.email", // generated ethereal user
      pass: "JgPWY62DXERYvR9vKF", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Henry Boisdequin" <henryboisdequin@swimmingly.com>', // sender address
    to: to, // list of receivers
    subject: "Change Password", // Subject line
    html: html, // html
  });

  console.log(`Message sent: ${info.messageId}`);
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}
