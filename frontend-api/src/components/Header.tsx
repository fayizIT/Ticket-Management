import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-purple-700 text-white p-4 fixed top-0 left-0 w-full z-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-2xl font-bold mb-4 md:mb-0">
                    <Link to="/">canary digital.ai</Link>
                </div>
                <nav className="w-full md:w-auto">
                    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                        <li>
                            <Link to="/about" className="block py-2 md:py-0 hover:text-yellow-300 transition">About Us</Link>
                        </li>
                        <li>
                            <Link to="/rides" className="block py-2 md:py-0 hover:text-yellow-300 transition">Rides & Attractions</Link>
                        </li>
                        <li>
                            <Link to="/tickets" className="block py-2 md:py-0 hover:text-yellow-300 transition">Ticket & Price</Link>
                        </li>
                        <li>
                            <Link to="/career" className="block py-2 md:py-0 hover:text-yellow-300 transition">Career</Link>
                        </li>
                    </ul>
                </nav>
                <div className="mt-4 md:mt-0">
                    <span className="block md:inline-block mb-2 md:mb-0 md:mr-4">Call us: +91 999 44 66 777</span>
                    <span className="block md:inline-block">Follow us on Instagram</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
