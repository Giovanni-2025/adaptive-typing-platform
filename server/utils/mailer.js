const nodemailer = require("nodemailer");

async function sendMail({ to, subject, text }) {
  // No SMTP configured: print the email in the terminal (development)
  if (!process.env.SMTP_HOST) {
    console.log(`\n[DEV EMAIL] To: ${to}\nSubject: ${subject}\n${text}\n`);
    return;
  }

  const port = Number(process.env.SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({ from: process.env.MAIL_FROM, to, subject, text });
}

module.exports = { sendMail };