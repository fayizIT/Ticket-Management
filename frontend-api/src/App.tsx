import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider
import store from './store'; // Import your Redux store
import AdminLogin from './pages/AdminSide/AdminLogin';
import Home from './pages/AdminSide/Home';
import HomePage from './pages/UserSide/DateSelector';
import NotFound from './components/NotFound';
import AddAgeCategory from './pages/AdminSide/AddAgeCategory';
import AgeCategoriesList from './pages/AdminSide/ListAgeCategory';
import Sidebar from './components/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import EditAgeCategory from './pages/AdminSide/EditAgeCategory';
import TicketCartPage from './pages/UserSide/TicketCartPage';
import ParkRulesPage from './pages/UserSide/ParkRulePage';
import AdminSidebar from './components/AdminSidebar';
import FoggywebsitefirstdraftPage from './pages/UserSide/Homepage/FoggywebsitefirstdraftPage';

function App() {
  return (
    // Wrap the application with Provider and pass the store
    <Provider store={store}>
      <HelmetProvider> {/* Wrap with HelmetProvider */}
        <Router>
          <MainLayout />
          <ToastContainer />
        </Router>
      </HelmetProvider>
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
    <div className="flex">
      {isAdminRoute && <AdminSidebar />} {/* Render Sidebar only for specific admin routes */}
      <div className="flex-grow p-6">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/home" element={<Home />} />
          <Route path="/admin/addAgecategory" element={<AddAgeCategory />} />
          <Route path="/admin/age-categories" element={<AgeCategoriesList />} />
          <Route path="/admin/editAgeCategory/:id" element={<EditAgeCategory />} />
          <Route path="/" element={<FoggywebsitefirstdraftPage />} />
          <Route path="/ticket-cart" element={<TicketCartPage />} />
          <Route path="/park-rules" element={<ParkRulesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
