/* eslint-disable consistent-return */
import nodemailer from 'nodemailer';
import mailConfig from '../config/mailConfig';

class Mailer {
  static async sendMail(payload) {
    try {
      const from = 'PropertyPro Team support@propertypro.com <support@propertypro.com>';
      const { to, subject, html } = payload;
      const mailOptions = {
        from, to, subject, html,
      };
      const transporter = await nodemailer.createTransport(mailConfig);
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
}

export default Mailer;
