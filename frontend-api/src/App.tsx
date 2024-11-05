import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRouter from "./Routes/AdminRouter";
import UserRouter from "./Routes/UserRouter";
import { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";

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

  const noSidebarRoutes = ["/admin/login"];
  const isAdminRoute =
    location.pathname.startsWith("/admin") &&
    !noSidebarRoutes.includes(location.pathname);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {isAdminRoute && (
        <button onClick={toggleSidebar} className="md:hidden p-2">
          <span className="material-icons">menu</span>
        </button>
      )}

      {/* Sidebar */}
      {isAdminRoute && (
        <div
          className={`fixed z-50 h-screen overflow-y-auto border-r border-gray-300 bg-sky-100 ${
            isSidebarOpen ? "block" : "hidden"
          } md:block w-72`}
        >
          <AdminSidebar />
        </div>
      )}

      {/* Main Content */}
      <div
        className={`flex-grow ${
          isAdminRoute ? "md:ml-72" : ""
        } h-screen overflow-y-auto no-scrollbar`}
      >
        {isAdminRoute ? <AdminRouter /> : <UserRouter />}
      </div>
    </div>
  );
}

export default App;
