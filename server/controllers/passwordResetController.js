/* eslint-disable consistent-return */
import passwordHash from 'password-hash';
import Mailer from '../helper/mailer';
import Helper from '../helper/helper';
import pool from '../config/connection';
import Authenticator from '../helper/authenticator';

const { generateToken, verifyToken } = Authenticator;
const { sendMail } = Mailer;

class PasswordResetController {
  static async passwordReset(req, res) {
    let token;
    let info;
    try {
      const { userEmail } = req.params;
      token = await generateToken({ userEmail });
      const url = `${req.protocol}://${req.get('host')}/password/reset/${token}`;
      const message = Helper.passwordResetTemplate(url);
      const subject = 'Password Reset';
      info = await sendMail({ to: userEmail, subject, html: message });
      const { accepted } = info;
      if (accepted[0] === userEmail) {
        return res.status(200).json({ status: 'success', message: 'Check your mailbox for password reset link', userEmail });
      }
    } catch (err) {
      return res.status(500).json({ status: 'error', error: err, info });
    }
  }

  static async resetPassword(req, res) {
    const { email, password, passwordConfirmation } = req.body;
    if (!password || password.length < 8) {
      res.send(Helper.resetTemplate(email, '<div class="alert">Password must be at least 8 characters long</div>'));
    } else if (password !== passwordConfirmation) {
      res.send(Helper.resetTemplate(email, '<div class="alert">Password does not match!</div>'));
    } else {
      const hashPassword = await passwordHash.generate(password);
      const sqlQuery = 'UPDATE users SET password = $1 WHERE email = $2';
      const values = [hashPassword, email];
      const client = await pool.connect();
      try {
        const updatedPassword = await client.query({ text: sqlQuery, values });
        if (updatedPassword.rowCount) {
          const url = 'https://emmanuelnwankwo.github.io/PropertyPro-lite/UI/login.html';
          res.send(Helper.successTemplate('Password reset successfully', `<a href="${url}">Login</a>`));
        } else {
          res.send(Helper.resetTemplate(email, '<div class="alert">Unable to reset password, try again</div>'));
        }
      } catch (err) {
        res.send(Helper.resetTemplate(email, '<div class="alert">Unable to reset password, try again</div>'));
      } finally {
        await client.release();
      }
    }
  }

  static resetPasswordForm(req, res) {
    const { token } = req.params;
    try {
      const { userEmail } = verifyToken(token);
      if (!userEmail) {
        res.send(Helper.errorTemplate('Invalid token'));
      }
      res.send(Helper.resetTemplate(userEmail));
    } catch (err) {
      res.send(Helper.errorTemplate('Invalid Token'));
    }
  }
}

export default PasswordResetController;
