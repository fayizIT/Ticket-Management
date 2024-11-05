// UserRouter.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/UserSide/Homepage/HomePage'; 
import DateSelector from '../pages/UserSide/DateSelector/DateSelector'; 
import TicketCartPage from '../pages/UserSide/TicketCart/TicketCartPage'; 
import ParkRulesPage from '../pages/UserSide/ParkRules/ParkRulePage'; 
import StayCart from '../pages/UserSide/StayCart/StayCart'; 
import ReviewBookingPage from '../pages/UserSide/ReviewBooking/ReviewBookingPage'; 
import PaymentSuccess from '../components/PaymentSuccess'; 
import PaymentFailed from '../components/PaymentFailed'; 
import UserBookings from '../components/UserBookings'; 
import NotFound from '../components/NotFound'; 

const UserRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/date-selector" element={<DateSelector />} />
    <Route path="/ticket-cart" element={<TicketCartPage />} />
    <Route path="/park-rules" element={<ParkRulesPage />} />
    <Route path="/stay-categories" element={<StayCart />} />
    <Route path="/billing" element={<ReviewBookingPage />} />
    <Route path="/thank-you" element={<PaymentSuccess />} />
    <Route path="/payment-failed" element={<PaymentFailed />} />
    <Route path="/booking-details" element={<UserBookings />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default UserRouter;
