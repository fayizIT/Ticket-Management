import React, { useState } from 'react';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import { useDispatch } from 'react-redux';
import { setDate } from '../../redux/dateSlice';
import { useNavigate } from 'react-router-dom';
import Timeline from '../../components/Timeline'; // Import Timeline component

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDateState] = useState<Date | null>(null);
    const [currentStep, setCurrentStep] = useState(0); // Track current timeline step

    const handleDateChange = (value: Date | null) => {
        if (value instanceof Date) {
            setSelectedDateState(value);
            dispatch(setDate(value.toISOString())); 
        }
    };

    const isPastDate = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        return date < today;
    };

    const handleConfirm = () => {
        // Increment the current step to mark it as completed and set it to green
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1); // Increment step on confirm
        }
        navigate('/ticket-cart');
    };

    const handleStepClick = (step: number) => {
        setCurrentStep(step);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Timeline */}
            <Timeline currentStep={currentStep} onStepClick={handleStepClick} />

            <div className="flex flex-col md:flex-row justify-center items-start p-8 space-y-6 md:space-y-0 md:space-x-6 mt-12 bg-gray-50">
                {/* Left Side */}
                <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-1/2 border border-gray-300 flex-grow min-h-[500px]">
                    <button className="text-blue-600 font-semibold mb-4">{`<`} Plan Your Visit</button>
                    <h2 className="text-2xl font-bold mb-4">Plan Your Visit</h2>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Prepare for 7 hours of continuous enjoyment, with exhilarating ups and downs and fantastic thrills at every turn! 
                        Brace yourself to be blown away by the incredible rides that lie ahead!
                    </p>

                    <div className="border border-gray-300 rounded-lg p-4 mb-4">
                        <h3 className="font-semibold mb-3 flex items-center text-lg">
                            <span role="img" aria-label="clock" className="mr-2">⏰</span> Hours of Fun
                        </h3>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-gray-500 text-sm">
                                    <th className="py-2">Park Timings</th>
                                    <th className="py-2">Water Park</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-gray-800">
                                    <td className="py-2">11:00 AM - 06:00 PM (Weekdays)</td>
                                    <td className="py-2">12:30 PM - 05:00 PM</td>
                                </tr>
                                <tr className="text-gray-800">
                                    <td className="py-2">11:00 AM - 07:00 PM (Weekends & Holidays)</td>
                                    <td className="py-2">12:00 PM - 06:00 PM</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="text-blue-600 font-medium text-sm">
                        📅 Book 3 days in advance and grab <span className="font-bold">10% off</span> on Regular adult tickets.
                    </p>
                </div>

                {/* Right Side */}
                <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-1/2 border border-gray-300 flex-grow min-h-[500px]">
                    <h3 className="text-2xl font-bold mb-4 ">October 2024</h3>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        tileClassName={({ date }: { date: Date }) => {
                            if (isPastDate(date)) {
                                return 'bg-gray-700 text-white';
                            }
                            return 'bg-green-400 text-white'; 
                        }}
                        tileDisabled={({ date }: { date: Date }) => isPastDate(date)}
                        className="w-full"
                    />
                    <div className="mt-4 flex justify-between items-center text-xs bg-gray-200 p-2 rounded-full border border-gray-300">
                        <span className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-green-500 inline-block mr-1"></span> Available
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-yellow-300 inline-block mr-1"></span> Fast Filling
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-red-400 inline-block mr-1"></span> Sold Out
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-gray-400 inline-block mr-1"></span> Closed
                        </span>
                    </div>

                    <button
                        className="mt-6 bg-blue-700 text-white py-3 px-6 rounded-full w-full hover:bg-blue-800"
                        onClick={handleConfirm} 
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
