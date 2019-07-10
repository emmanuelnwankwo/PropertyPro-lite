import dotenv from 'dotenv';

dotenv.config();

const {
  MAIL_HOST, MAIL_PORT, MAIL_ENCRYPTION, MAIL_USERNAME, MAIL_PASSWORD,
} = process.env;

const mailConfig = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: MAIL_ENCRYPTION,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
};

export default mailConfig;
