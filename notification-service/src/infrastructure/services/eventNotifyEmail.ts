import nodemailer from 'nodemailer';
import { AUTH_EMAIL, AUTH_PASS } from '../../config/envConfig/config';

interface EventDetails {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    description: string;
}

interface Admin {
    firstName: string;
    lastName: string;
    email: string;
}

export async function eventNotifyEmail(email: string, eventDetails: EventDetails, admin: Admin): Promise<void> {
    if (!AUTH_EMAIL || !AUTH_PASS) {
        throw new Error('Authentication email and password must be defined.');
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: AUTH_EMAIL,
            pass: AUTH_PASS,
        },
    });

    const mailOptions = {
        from: AUTH_EMAIL,
        to: email,
        subject: `New Event: ${eventDetails.title}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2 style="color: #4CAF50;">${eventDetails.title}</h2>
            <p><strong>Date:</strong> ${eventDetails.date}</p>
            <p><strong>Start Time:</strong> ${eventDetails.startTime}</p>
            <p><strong>End Time:</strong> ${eventDetails.endTime}</p>
            <p><strong>Description:</strong> ${eventDetails.description}</p>
            <p>Organized by: ${admin.firstName} ${admin.lastName} (${admin.email})</p>
            <p>We hope you can join us!</p>
          </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', email);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email notification.');
    }
}
