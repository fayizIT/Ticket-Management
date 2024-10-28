import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import AdminLogin from './pages/AdminSide/AdminLogin/AdminLogin'; 
import NotFound from './components/NotFound';
import CreateTicketCategory from './pages/AdminSide/TicketCategory/CreateTicketCategory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import ParkRulesPage from './pages/UserSide/ParkRules/ParkRulePage';
import AdminSidebar from './components/AdminSidebar';
import HomePage from './pages/UserSide/Homepage/HomePage';
import DateSelector from './pages/UserSide/DateSelector/DateSelector';
import Dashboard from './pages/AdminSide/Dashboard'; 
import StayCategoryList from './pages/AdminSide/StayCategory/StayCategoryList';
import EditStayCategory from './pages/AdminSide/StayCategory/EditStayCategory';
import CreateStayCategory from './pages/AdminSide/StayCategory/CreateStayCategory';
import StayCart from './pages/UserSide/StayCart/StayCart';
import EditTicketCategory from './pages/AdminSide/TicketCategory/EditTicketCategory';
import TicketCategoriesList from './pages/AdminSide/TicketCategory/ListTicketCategory';
import CouponCodeList from './pages/AdminSide/CouponCode/CouponCodeList';
import CreateCouponCode from './pages/AdminSide/CouponCode/CreateCouponCode';
import EditCouponCode from './pages/AdminSide/CouponCode/EditCouponCode';
// import ReviewBookingPage from './pages/UserSide/ReviewBookingPage';
import BookingDetails from './pages/AdminSide/userDetails/BookingDetails';
import PaymentFailed from './components/PaymentFailed';
// import TicketCartPage from './pages/UserSide/TicketCartPage';
import PaymentSuccess from './components/PaymentSuccess';
import { useState } from 'react'; 
import TicketCartPage from './pages/UserSide/TicketCart/TicketCartPage';
import ReviewBookingPage from './pages/UserSide/ReviewBooking/ReviewBookingPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout />
        <ToastContainer />
      </Router>
    </Provider>
  );
}

function MainLayout() {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const noSidebarRoutes = ['/admin/login']; 
  const isAdminRoute = location.pathname.startsWith('/admin') && !noSidebarRoutes.includes(location.pathname);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex ">
      {/* Hamburger Button for small screens */}
      {isAdminRoute && (
        <button onClick={toggleSidebar} className="md:hidden p-2">
          <span className="material-icons">menu</span>
        </button>
      )}

      {/* Sidebar */}
      {isAdminRoute && (
        <div className={`fixed z-50 h-screen overflow-y-auto border-r border-gray-300 bg-sky-100 ${isSidebarOpen ? 'block' : 'hidden'} md:block w-72`}>
          <AdminSidebar />
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-grow ${isAdminRoute ? 'md:ml-72' : ''}`}>
        <div className={isAdminRoute ? 'h-screen overflow-y-auto' : ''}>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/add-ticket-category" element={<CreateTicketCategory />} />
            <Route path="/admin/ticket-Category" element={<TicketCategoriesList />} />
            <Route path="/admin/edit-ticket-Category/:id" element={<EditTicketCategory />} />
            <Route path="/admin/stay-category" element={<StayCategoryList />} />
            <Route path="/admin/editStayCategory/:id" element={<EditStayCategory />} />
            <Route path="/admin/addStayCategory" element={<CreateStayCategory />} />
            <Route path="/admin/coupon-code" element={<CouponCodeList />} />
            <Route path="/admin/addCoupon" element={<CreateCouponCode />} />
            <Route path="/admin/editCoupon/:id" element={<EditCouponCode />} />
            <Route path="/admin/booking-ticket" element={<BookingDetails />} />

            {/* User Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/date-selector" element={<DateSelector />} />
            <Route path="/ticket-cart" element={<TicketCartPage />} />
            <Route path="/park-rules" element={<ParkRulesPage />} />
            <Route path="/stay-categories" element={<StayCart />} />
            <Route path="/billing" element={<ReviewBookingPage />} />
            <Route path="/thank-you" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
