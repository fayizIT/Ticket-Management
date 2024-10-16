﻿# Ticket Booking System

## Overview
The Ticket Booking System is designed to facilitate the booking of tickets for various attractions. It allows users to select tickets based on their age, apply discounts, and make payments through an integrated online payment gateway. An admin interface is also available for managing user and ticket details.

## Technologies Used

### Frontend
- **React.js**: A JavaScript library for building user interfaces, enabling a dynamic and responsive user experience.
- **Tailwind CSS**: A utility-first CSS framework that allows for rapid and customizable styling.

### Backend
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, allowing server-side programming.
- **NestJS**: A progressive Node.js framework that enhances application architecture and scalability.
- **MongoDB**: A NoSQL database used for storing user and ticket data, ensuring flexibility and scalability in data management.

## User Site Specifications

### Features
- **Discount Offers**:
  - Up to 7.5% Discount on Silverstorm tickets.
  - Up to 7.5% Discount on Snowstorm tickets.
  - Up to 10% Discount for Silverstorm + Snowstorm (Combo).

- **Ticket Types**:
  - **Adult** (Height above 137 CM)
    - Price: ₹860 (Discounted from ₹930)
  - **Child** (Height 90 CM to 137 CM)
    - Price: ₹768 (Discounted from ₹830)
  - **Senior Citizen** (Above 60 Years)
    - Price: ₹675 (Discounted from ₹730)
  - **Infant** (Height below 90 CM)
    - Free (no ticket required)

### Booking Process
1. **Date Selection**: Users can choose a date (Today, Tomorrow, or Pick a Random Date).
2. **Ticket Selection**: Users select ticket types based on age and desired quantity.
3. **Apply Coupon**: Option to enter a coupon code for additional discounts (optional).
4. **Enter Details**: Users enter personal details for booking.
5. **Payment**: Complete payment through an online payment gateway.

### User Interface
- **Ticket Selection**: A section displaying available tickets, their prices, and discounts.
- **Date Selection Popup**: A user-friendly interface for selecting the visit date.
- **Booking Confirmation**: Users can review their selections and total cost before proceeding to payment.

## Admin Site Specifications

### Features
- **User Management**:
  - Admins can view and manage user information, including bookings.
  
- **Booking Management**:
  - Admins can monitor ticket sales and user bookings to ensure efficient operations.
  
- **Reporting**:
  - Generate reports on ticket sales, user activity, and revenue.

## Installation

### Prerequisites
- Node.js
- MongoDB

### Getting Started
1. Clone the repository:
   ```bash
   https://github.com/fayizIT/Ticket-Management.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ticket-booking-system
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend-api
   npm install
   cd ../backend-api
   npm install
   ```

4. Set up the database and environment variables as needed.
5. Start the server:
   ```bash
   npm start
   ```

## Contributing
Feel free to submit issues or pull requests to improve the Ticket Booking System.

## License
This project is licensed under the MIT License.



This structure should give users a clear understanding of your project and how to get started with it. Let me know if you need further modifications or additional information!
