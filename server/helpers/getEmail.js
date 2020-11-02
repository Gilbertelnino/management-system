import sgMail from '@sendgrid/mail';
import mailgen from 'mailgen';
import dotenv from 'dotenv';

dotenv.config();

const template = new mailgen({
    theme: 'default',
    product: {
        name: 'Gilbert Tek',
        link: 'https://www.gilberttek.com/'
    }
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const host = process.env.APP_URL;
export const passwordResetURL = (user, token) => `${host}/password/reset?id=${user.id}&&token=${token}`;
export const emailVerifytURL = (token) => `${host}/verify/signup/?token=${token}`;
const generateEmail = (name,instructions, link) => ({
    body: {
        name,
        intro: 'Welcome to Gilbert Tek! We\'re very excited to have you on board.',
        action: {
            instructions,
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Confirm your account',
                link,
            }
        },
        outro: 'Elnino, Manager at Gilbert Tek'
    }
});
export const resetPasswordTemplate = async (user, url, message) => {
  const emailBody = generateEmail(
    `${user.firstName}! Welcome to gilbert tek!`,
    message,
    `${url}`,
  );
  const emailTemplate = template.generate(emailBody);

  const msg = {
    to: user.email,
    from: 'gilbeltelnino@gmail.com',
    subject: 'Verify Your Email',
    html: emailTemplate,
  };
  try {
    await sgMail.send(msg);
  } catch(error){
    return 'Internal server error'
  }
};
