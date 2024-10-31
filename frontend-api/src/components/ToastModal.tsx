import React from 'react';
import handIcon from '../../public/assets/Hold.png'; // Adjust the path as needed

interface ModalProps {
  message: string;
  onClose: () => void;
}

const ToastModal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-6 shadow-lg max-w-60 text-center">
        <div className="flex justify-center mb-4">
          <div
            className="flex items-center justify-center bg-blue-900 rounded-full w-24 h-24 cursor-pointer"
            onClick={onClose}
          >
            <img src={handIcon} alt="Icon" className="w-12 h-12" /> {/* Adjust icon size as needed */}
          </div>
        </div>
        <p className="text-lg font-semibold text-blue-900 mb-4">{message}</p>
      </div>
    </div>
  );
};

export default ToastModal;
