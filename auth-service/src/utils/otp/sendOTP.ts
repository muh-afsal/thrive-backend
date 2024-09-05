import nodemailer from 'nodemailer';
import { AUTH_EMAIL, AUTH_PASS } from '../../config/envConfig/config';

export async function sendOTP(email: string, otp: string): Promise<void> {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: AUTH_EMAIL,
            pass: AUTH_PASS
        }
    });

    let mailOptions = {
        from: AUTH_EMAIL,
        to: email,
        subject: "verify the email using this OTP",
        html: `<p>Use this OTP to verify your email and continue:</p><b>${otp}</b>`,
    };

    await transporter.sendMail(mailOptions);
}
