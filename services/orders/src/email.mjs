import { Resolver } from "dns/promises";
import nodemailer from "nodemailer";
import { config } from "./config.mjs";
// https://nodemailer.com

// use case for tags - testing tag for a fake smtp service instance?

function sendOrderedEmail() {
  const resolver = new Resolver();
  // nodemailer isn't re-resolving DNS at record expiration (cursory inspection suggests it is linked to changes to handle multiple DNS record responses and rotating through the list of results and inadvertently caching when multi records for lifetime of app)
  // TLDR: resolving directly to bypass issue in nodemailer
  return resolver.resolve(config.SMTP_HOST).then((records) => {
    const firstRecord = records[0]; 
    // tested: no records, promise is rejected (pre-condition - always array w/ 1+ records)
    // tested: 1 record is still wrapped in array (as per docs)
    const transporter = nodemailer.createTransport({
      pool: false,
      host: firstRecord,
      port: config.SMTP_PORT,
      secure: false,
    });

    return transporter.sendMail({
      from: "orders@example.com",
      to: "user@example.com",
      subject: "Order submitted",
      text: "Hi your order was placed successfully, your items will arrive soon. Thanks!",
    });
  });
}

export { sendOrderedEmail };
