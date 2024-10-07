import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white text-blue-600 fixed top-0 left-0 w-full z-20 shadow-md">
            <div className="container mx-auto px-4 py-2">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-2xl font-bold">
                        <Link to="/" className="text-blue-600 hover:text-blue-400">canary digital.ai</Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button onClick={toggleMenu} className="text-2xl md:hidden text-blue-600">
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    <div className="MuiBox-root css-1cjf47m" style={{background: "rgb(67, 29, 129)", height: "35px"}}></div>

                    {/* Nav Links - Mobile and Desktop */}
                    <nav className={`absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                        <ul className="flex flex-col md:flex-row items-center justify-center md:space-x-8 space-y-4 md:space-y-0 p-4 md:p-0">
                            <li className="md:inline text-center">
                                <Link to="/about" className="block py-1 hover:text-blue-400">About Us</Link>
                            </li>
                            <li className="md:inline text-center">
                                <Link to="/rides" className="block py-1 hover:text-blue-400">Rides & Attractions</Link>
                            </li>
                            <li className="md:inline text-center">
                                <Link to="/tickets" className="block py-1 hover:text-blue-400">Ticket & Price</Link>
                            </li>
                            <li className="md:inline text-center">
                                <Link to="/career" className="block py-1 hover:text-blue-400">Career</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Contact Info */}
                <div className="text-sm mt-2 md:mt-1 text-center md:text-right">
                    <span className="block md:inline">Call us: +91 999 44 66 777</span>
                    <a href="#" className="block md:inline md:ml-4 hover:text-blue-400">Instagram</a>
                </div>
            </div>
        </header>
    );

};
export default Header;
