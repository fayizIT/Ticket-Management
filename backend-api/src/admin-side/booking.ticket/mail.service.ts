import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT), 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendBookingConfirmation(email: string, fullName: string, bookingDetails: any) {
    // Format the dateOfVisit to dd-Month-yyyy
    const formattedDate = this.formatDate(bookingDetails.dateOfVisit);

    // Create a clean booking details object
    const cleanBookingDetails = {
      'Booking ID': bookingDetails.bookingId,
      'Total Amount': `${bookingDetails.totalAmount.toFixed(2)} USD`, // Format amount
      'Date of Visit': formattedDate,
    };

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'Booking Confirmation',
      html: this.generateBookingConfirmationHTML(fullName, cleanBookingDetails),
    };

    return this.transporter.sendMail(mailOptions);
  }

  private formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  }

  private generateBookingConfirmationHTML(fullName: string, bookingDetails: any): string {
    // Create a table for booking details
    const bookingDetailsRows = Object.entries(bookingDetails)
      .map(([key, value]) => `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${key}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${value}</td>
        </tr>`)
      .join('');

    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="font-size: 24px; color: #2c3e50;">Booking Confirmation</h1>
        <p style="font-size: 16px;">Dear <strong>${fullName}</strong>,</p>
        <p style="font-size: 16px;">Your booking has been confirmed!</p>
        <h2 style="font-size: 20px; color: #2980b9;">Details:</h2>
        <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
          <thead>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; font-size: 18px; text-align: left;">Item</th>
              <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; font-size: 18px; text-align: left;">Details</th>
            </tr>
          </thead>
          <tbody>
            ${bookingDetailsRows}
          </tbody>
        </table>
        <p style="font-size: 16px; margin-top: 20px;">Thank you!</p>
      </div>
    `;
  }
}
