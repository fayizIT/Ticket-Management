import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './store'; // Import your Redux store
import AdminLogin from './pages/AdminSide/AdminLogin';
import NotFound from './components/NotFound';
import AddAgeCategory from './pages/AdminSide/AddAgeCategory';
import AgeCategoriesList from './pages/AdminSide/ListAgeCategory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import EditAgeCategory from './pages/AdminSide/EditAgeCategory';
import TicketCartPage from './pages/UserSide/TicketCartPage';
import ParkRulesPage from './pages/UserSide/ParkRulePage';
import AdminSidebar from './components/AdminSidebar';
import HomePage from './pages/UserSide/HomePage';
import DateSelector from './pages/UserSide/DateSelector';
import Dashboard from './pages/AdminSide/Dashboard';


function App() {
  return (
    // Wrap the application with Provider and pass the store
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

  // Array of routes where the sidebar should NOT be displayed
  const noSidebarRoutes = ['/admin/login']; // Add any additional routes here

  // Check if the current path is an admin route and not in the noSidebarRoutes
  const isAdminRoute = location.pathname.startsWith('/admin') && !noSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex" >
      {isAdminRoute && <AdminSidebar />} {/* Render Sidebar only for specific admin routes */}
      <div className="flex-grow">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/addAgecategory" element={<AddAgeCategory />} />
          <Route path="/admin/age-categories" element={<AgeCategoriesList />} />
          <Route path="/admin/editAgeCategory/:id" element={<EditAgeCategory />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/date-selector" element={<DateSelector />} />
          <Route path="/ticket-cart" element={<TicketCartPage />} />
          <Route path="/park-rules" element={<ParkRulesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}


export default App;


