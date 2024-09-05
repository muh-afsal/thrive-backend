import nodemailer from 'nodemailer';
import { INotificationRepository } from "../../domain/repositories/INotificationRepository";
import { Notification } from "../../domain/entities/Notification";

export class EmailService implements INotificationRepository {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  async sendNotification(notification: Notification): Promise<void> {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: notification.email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${notification.otp}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
