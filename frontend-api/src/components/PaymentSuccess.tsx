import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto text-center">
        <FaCheckCircle className="text-green-500 text-5xl mb-4" />
        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-4">
          Thank you for your payment. Your booking has been confirmed!
        </p>
        <button
          onClick={handleRedirect}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Go to Home Generate Pdf ticket
        </button>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
