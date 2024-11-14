import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../pages/AdminSide/AdminLogin/AdminLogin'; 
import Dashboard from '../pages/AdminSide/Dashboard'; 
import CreateTicketCategory from '../pages/AdminSide/TicketCategory/CreateTicketCategory'; 
import TicketCategoriesList from '../pages/AdminSide/TicketCategory/ListTicketCategory'; 
import EditTicketCategory from '../pages/AdminSide/TicketCategory/EditTicketCategory'; 
import StayCategoryList from '../pages/AdminSide/StayCategory/StayCategoryList'; 
import EditStayCategory from '../pages/AdminSide/StayCategory/EditStayCategory'; 
import CreateStayCategory from '../pages/AdminSide/StayCategory/CreateStayCategory'; 
import CouponCodeList from '../pages/AdminSide/CouponCode/CouponCodeList'; 
import CreateCouponCode from '../pages/AdminSide/CouponCode/CreateCouponCode'; 
import EditCouponCode from '../pages/AdminSide/CouponCode/EditCouponCode'; 
import BookingDetails from '../pages/AdminSide/userDetails/BookingDetails'; 

const AdminRouter = () => (
  <Routes>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/home" element={<Dashboard />} />
    <Route path="/admin/add tickect" element={<CreateTicketCategory />} />
    <Route path="/admin/ticketlist" element={<TicketCategoriesList />} />
    <Route path="/admin/edit-ticketlist/:id" element={<EditTicketCategory />} />
    <Route path="/admin/stayList" element={<StayCategoryList />} />
    <Route path="/admin/editStayList/:id" element={<EditStayCategory />} />
    <Route path="/admin/addStayList" element={<CreateStayCategory />} />
    <Route path="/admin/couponcode" element={<CouponCodeList />} />
    <Route path="/admin/ceateCoupon" element={<CreateCouponCode />} />
    <Route path="/admin/editCoupon/:id" element={<EditCouponCode />} />
    <Route path="/admin/booking-ticket" element={<BookingDetails />} />
  </Routes>
);

export default AdminRouter;
