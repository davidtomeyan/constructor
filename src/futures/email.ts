import nodemailer from 'nodemailer'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: process.env.NODE_ENV === "production",
  auth: {
    type: "OAuth2",
    user: "tomeyandavid1@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

export const emailFuture = nodemailerAdapter({
  defaultFromAddress: 'tomeyandavid1@gmail.com',
  defaultFromName: 'Tomeyan.ru',
  transport:transporter,
  // transportOptions: {
  //
  // },
})