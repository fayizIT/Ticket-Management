import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class OtpService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  async sendOtp(email: string, fullName: string, otp: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code for Booking Verification',
      html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
                <h2>Dear ${fullName},</h2>
                <p>Thank you for choosing <strong>Foggy Mountain Children’s Park</strong>! We are excited to assist you with your booking.</p>
                <p>To verify your email and secure your booking, please use the following OTP (One-Time Password):</p>
                <h3 style="color: #4CAF50;">Your OTP code is: <strong>${otp}</strong></h3>
                <p>This code is valid for the next 10 minutes. If you did not request this OTP, please ignore this email.</p>
                <p>If you encounter any issues or need assistance, feel free to reach out to our customer support team.</p>
                <p>Have a fantastic day at Foggy Mountain Children’s Park!</p>
                <br />
                <p>Best regards,</p>
                <p>Gee Varghese Nagar<br />
                Kakkadampoyil<br />
                Kozhikode 673604<br />
                <a href="https://foggymountain.in/" style="color: #1E90FF;">foggymountain.in</a></p>
                
                <img src="https://foggymountain.in/sitepad-data/uploads/2024/01/20240110_101452_0000.jpg" alt="Foggy Mountain Logo"
                  style="width: 150px; height: 150px; margin: 20px auto; display: block;" 
            </div>
        `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new Error('Failed to send OTP. Please try again later.');
    }
  }
}
