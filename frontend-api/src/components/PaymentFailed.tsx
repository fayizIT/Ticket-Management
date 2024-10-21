import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PaymentFailed: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/"); // Redirect to home
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto text-center">
        <FaExclamationTriangle className="text-red-500 text-5xl mb-4" />
        <h2 className="text-2xl font-bold mb-2">Payment Failed!</h2>
        <p className="text-gray-600 mb-4">
          Unfortunately, your payment could not be processed. Please try again.
        </p>
        <button
          onClick={handleRedirect}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
