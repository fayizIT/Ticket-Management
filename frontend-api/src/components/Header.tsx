// src/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const Header: React.FC = () => {
    return (
        <header className="bg-purple-700 text-white p-4 fixed top-0 left-0 w-full z-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link to="/">canary digital.ai</Link>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/about" className="hover:text-yellow-300 transition">About Us</Link>
                        </li>
                        <li>
                            <Link to="/rides" className="hover:text-yellow-300 transition">Rides & Attractions</Link>
                        </li>
                        <li>
                            <Link to="/tickets" className="hover:text-yellow-300 transition">Ticket & Price</Link>
                        </li>
                        <li>
                            <Link to="/career" className="hover:text-yellow-300 transition">Career</Link>
                        </li>
                    </ul>
                </nav>
                <div className="hidden md:block">
                    <span className="mr-4">Call us: +91 944 75 13 344</span>
                    <span className="mr-4">Follow us on Instagram</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
