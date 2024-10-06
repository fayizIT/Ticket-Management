import React, { useState } from 'react';

interface Offer {
    title: string;
    discount: number;
}

interface OfferPopupProps {
    onClose: () => void;
    onContinue: (selectedOffer: Offer | null) => void;
}

const OfferPopup: React.FC<OfferPopupProps> = ({ onClose, onContinue }) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const offers = [
        { title: 'Today', discount: 0 }, // No offer for today
        { title: 'Tomorrow', discount: 7.5 },
        { title: 'Pick Your Day', discount: 7.5 },
    ];

    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
    const [showCalendar, setShowCalendar] = useState(false);

    const handleOfferClick = (offer: Offer) => {
        setSelectedOffer(offer);
        if (offer.title === 'Pick Your Day') {
            setShowCalendar(true); // Show calendar when "Pick Your Day" is clicked
        }
    };

    const handleContinue = () => {
        if (selectedOffer) {
            console.log('Selected Offer:', selectedOffer);
            onContinue(selectedOffer);
        } else {
            alert('Please select a date!');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-75">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl mb-4">Canery - Plan Your Date</h2>

                {/* Offer Display */}
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center border border-gray-300 p-2 rounded">
                        <div className="cursor-pointer text-blue-500" onClick={() => handleOfferClick(offers[0])}>
                            Today
                        </div>
                        <div className="text-gray-500">{today.toLocaleDateString()}</div>
                        <div className="text-red-600">No Offer</div>
                    </div>

                    <div className="flex justify-between items-center border border-gray-300 p-2 rounded">
                        <div className="cursor-pointer text-blue-500" onClick={() => handleOfferClick(offers[1])}>
                            Tomorrow
                        </div>
                        <div className="text-gray-500">{tomorrow.toLocaleDateString()}</div>
                        <div className="text-green-600">7.5% Discount</div>
                    </div>

                    <div className="flex justify-between items-center border border-gray-300 p-2 rounded">
                        <div className="cursor-pointer text-blue-500" onClick={() => handleOfferClick(offers[2])}>
                            Pick Your Day
                        </div>
                        <div className="text-green-600">7.5% Discount</div>
                        <div className="text-gray-500">Choose a day of your convenience</div>
                    </div>
                </div>

                {showCalendar && (
                    <div className="mt-4">
                        <label className="block mb-2">Booking Date:</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                        />
                    </div>
                )}

                {/* Buttons */}
                <div className="flex justify-end mt-4">
                    <button className="bg-gray-300 text-black py-2 px-4 rounded mr-2" onClick={onClose}>
                        Close
                    </button>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                        onClick={handleContinue}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfferPopup;
