"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventNotifyEmail = eventNotifyEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../config/envConfig/config");
function eventNotifyEmail(email, eventDetails, admin) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!config_1.AUTH_EMAIL || !config_1.AUTH_PASS) {
            throw new Error('Authentication email and password must be defined.');
        }
        let transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: config_1.AUTH_EMAIL,
                pass: config_1.AUTH_PASS,
            },
        });
        const mailOptions = {
            from: config_1.AUTH_EMAIL,
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
            yield transporter.sendMail(mailOptions);
            console.log('Email sent successfully to:', email);
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email notification.');
        }
    });
}
