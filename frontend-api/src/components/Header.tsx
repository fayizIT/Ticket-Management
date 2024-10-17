import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white fixed top-0 left-0 w-full z-20 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-extrabold">
            <Link
              to="/"
              className="text-white hover:text-yellow-300 transition duration-300"
            >
              canary digital.ai
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="text-2xl md:hidden text-white hover:text-yellow-300 transition duration-300"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Nav Links - Mobile and Desktop */}
          <nav
            className={`absolute md:relative top-full left-0 w-full md:w-auto bg-purple-700 md:bg-transparent ${
              isMenuOpen ? "block" : "hidden"
            } md:block`}
          >
            <ul className="flex flex-col md:flex-row items-center justify-center md:space-x-8 space-y-4 md:space-y-0 p-4 md:p-0">
              <li className="md:inline text-center">
                <Link
                  to="/about"
                  className="block py-2 px-4 hover:bg-indigo-500 hover:text-yellow-300 rounded-full transition duration-300"
                >
                  About Us
                </Link>
              </li>
              <li className="md:inline text-center">
                <Link
                  to="/rides"
                  className="block py-2 px-4 hover:bg-indigo-500 hover:text-yellow-300 rounded-full transition duration-300"
                >
                  Rides & Attractions
                </Link>
              </li>
              <li className="md:inline text-center">
                <Link
                  to="/tickets"
                  className="block py-2 px-4 hover:bg-indigo-500 hover:text-yellow-300 rounded-full transition duration-300"
                >
                  Ticket & Price
                </Link>
              </li>
              <li className="md:inline text-center">
                <Link
                  to="/career"
                  className="block py-2 px-4 hover:bg-indigo-500 hover:text-yellow-300 rounded-full transition duration-300"
                >
                  Career
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Contact Info */}
        <div className="text-sm mt-4 md:mt-2 text-center md:text-right">
          <span className="block md:inline bg-indigo-500 py-1 px-3 rounded-full">
            Call us: +91 999 44 66 777
          </span>
          <a
            href="#"
            className="block md:inline md:ml-4 hover:text-yellow-300 transition duration-300 bg-indigo-500 py-1 px-3 rounded-full mt-2 md:mt-0"
          >
            Instagram
          </a>
        </div>
      </div>
    </header>
  );
};
export default Header;
