import React, { useState } from 'react';
import Header from '../../components/Header';
import OfferPopup from '../../components/OfferPopup'; // Import the new popup component

const HomePage: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleButtonClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleContinue = (offer: { title: string; discount: number } | null) => {
        console.log('Continuing with selected offer:', offer);
        handleClosePopup();
    };

    return (
        <div 
            className="bg-cover bg-center min-h-screen flex flex-col" 
            style={{ backgroundImage: "url('/path/to/your/background.jpg')" }}
        >
            <Header />
            <div className="flex-grow flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
                <h1 className="text-white text-3xl mb-4 text-center md:text-4xl">Welcome to canary digital.ai</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                    <button
                        className="bg-yellow-400 text-black py-4 rounded shadow-md hover:bg-yellow-500 transition"
                        onClick={handleButtonClick} // Open the popup
                    >
                        <div className="text-xl">Offers</div>
                    </button>
                </div>

                {isPopupOpen && (
                    <OfferPopup
                        onClose={handleClosePopup}
                        onContinue={handleContinue}
                    />
                )}
            </div>
        </div>
    );
};

export default HomePage;
