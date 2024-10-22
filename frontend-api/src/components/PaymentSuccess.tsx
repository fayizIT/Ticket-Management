import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import JsBarcode from 'jsbarcode';
import logo from '../../public/assets/clientlogo.png';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  const handleRedirect = () => {
    navigate("/");
  };

  const handleGeneratePdf = () => {
    const doc = new jsPDF();

    // Add logo
    const logoImg = new Image();
    logoImg.src = logo; // Use the imported logo path
    logoImg.onload = () => {
      doc.addImage(logoImg, 'PNG', 5, 5, 50, 20); // Adjusted position

      // Title
      doc.setFontSize(22);
      doc.text("Booking Confirmation", 100, 30, { align: 'center' }); // Increase x-coordinate

      // Booking Details
      doc.setFontSize(12);
      doc.text(`Name: ${bookingData.fullName}`, 20, 60);
      doc.text(`Email: ${bookingData.email}`, 20, 70);
      doc.text(`Total Amount: ₹ ${bookingData.grandTotal}`, 20, 80);
      doc.text(`Booking ID: ${bookingData.bookingId}`, 20, 90);
      doc.text(`Date of Visit: ${new Date(bookingData.dateOfVisit).toLocaleDateString()}`, 20, 100);
      doc.text(`PIN Code: ${bookingData.pinCode}`, 20, 110);
      doc.text(`Payment ID: ${bookingData.orderId}`, 20, 120);

      // Generate a barcode
      const barcodeCanvas = document.createElement("canvas");
      JsBarcode(barcodeCanvas, bookingData.bookingId, {
        format: "CODE128",
        width: 2,
        height: 50,
        displayValue: true,
        text: "Booking ID",
      });

      const barcodeDataUrl = barcodeCanvas.toDataURL("image/png");
      doc.addImage(barcodeDataUrl, 'PNG', 20, 130, 180, 30);

      // Save the PDF
      doc.save("booking_confirmation.pdf");
    };
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto text-center">
        <FaCheckCircle className="text-green-500 text-6xl mb-4" />
        <h2 className="text-3xl font-bold mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-4">
          Thank you for your payment. Your booking has been confirmed!
        </p>
        <div className="space-y-2">
          <button
            onClick={handleGeneratePdf}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300"
          >
            Generate PDF Ticket
          </button>
          <button
            onClick={handleRedirect}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
