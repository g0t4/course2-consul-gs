import nodemailer from "nodemailer";
import { config } from "./config.mjs";
// https://nodemailer.com

// use case for tags - testing tag for a fake smtp service instance?
const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: false,
});

function sendOrderedEmail() {
  transporter.sendMail({
    from: "orders@example.com",
    to: "user@example.com",
    subject: "Order submitted",
    text: "Hi your order was placed successfully, your items will arrive soon. Thanks!",
  });
}

export { sendOrderedEmail };
