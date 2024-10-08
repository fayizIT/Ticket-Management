// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AdminLogin from './pages/AdminSide/AdminLogin';
// import Home from './pages/AdminSide/Home';
// import HomePage from './pages/UserSide/HomePage';
// import NotFound from './components/NotFound';
// import AddAgeCategory from './pages/AdminSide/AddAgeCategory';
// import AgeCategoriesList from './pages/AdminSide/ListAgeCategory';
// import Sidebar from './components/Sidebar';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import the styles
// import EditAgeCategory from './pages/AdminSide/EditAgeCategory';

// function App() {
//   return (
    
//     <Router>
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-grow p-6">
//           <Routes>
//             <Route path="/admin/login" element={<AdminLogin />} />
//             <Route path="/admin/home" element={<Home />} />
//             <Route path="/admin/addAgecategory" element={<AddAgeCategory />} />
//             <Route path="/admin/age-categories" element={<AgeCategoriesList />} />
//             <Route path="/admin/editAgeCategory/:id" element={<EditAgeCategory />} />






//             <Route path="/" element={<HomePage />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </div>
//       </div>
//       <ToastContainer /> 
//     </Router>
//   );
// }

// export default App;




import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './store'; // Import your Redux store
import AdminLogin from './pages/AdminSide/AdminLogin';
import Home from './pages/AdminSide/Home';
import HomePage from './pages/UserSide/HomePage';
import NotFound from './components/NotFound';
import AddAgeCategory from './pages/AdminSide/AddAgeCategory';
import AgeCategoriesList from './pages/AdminSide/ListAgeCategory';
import Sidebar from './components/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import EditAgeCategory from './pages/AdminSide/EditAgeCategory';
import TicketCartPage from './pages/UserSide/TicketCartPage';

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

  // Check if the current path starts with "/admin"
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex">
      {isAdminRoute && <Sidebar />} {/* Render Sidebar only for admin routes */}
      <div className="flex-grow p-6">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/home" element={<Home />} />
          <Route path="/admin/addAgecategory" element={<AddAgeCategory />} />
          <Route path="/admin/age-categories" element={<AgeCategoriesList />} />
          <Route path="/admin/editAgeCategory/:id" element={<EditAgeCategory />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/ticket-cart" element={<TicketCartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;


