import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class OtpService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || "fayizcj94@gmail.com " ,
            pass: process.env.EMAIL_PASS ||"gnzr hyjx vprk xjpg",
        },
    });

    async sendOtp(email: string, otp: string): Promise<void> {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code for Booking Verification',
            text: `
            Dear User,

            Thank you for choosing Foggy Mountain Children’s Park! We are excited to assist you with your booking.

            To verify your email and secure your booking, please use the following OTP (One-Time Password):

            Your OTP code is: ${otp}

            This code is valid for the next 10 minutes. If you did not request this OTP, please ignore this email.

            If you encounter any issues or need assistance, feel free to reach out to our customer support team.

            Have a fantastic day at Foggy Mountain Children’s Park!

            Best regards,
            Gee Varghese Nagar
            Kakkadampoyil
            Kozhikode 673604
            https://foggymountain.in/
        `,
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending OTP:', error);
            throw new Error('Failed to send OTP. Please try again later.'); // Better error handling
        }
    }
}
