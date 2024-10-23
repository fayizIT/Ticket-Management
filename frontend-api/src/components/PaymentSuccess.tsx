import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import JsBarcode from 'jsbarcode';
import 'jspdf-autotable';
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
      doc.addImage(logoImg, 'PNG', 10, 10, 50, 20); // Adjusted position

      // Title
      doc.setFontSize(22);
      doc.text("Booking Confirmation", 105, 35, { align: 'center' });

      // Table for Booking Details
      const tableData = [
        { detail: 'Name', info: bookingData.fullName },
        { detail: 'Email', info: bookingData.email },
        { detail: 'Total Amount', info: `'₹' ${bookingData.grandTotal}` },
        { detail: 'Booking ID', info: bookingData.bookingId },
        { detail: 'Date of Visit', info: new Date(bookingData.dateOfVisit).toLocaleDateString() },
        { detail: 'PIN Code', info: bookingData.pinCode },
        { detail: 'Payment ID', info: bookingData.orderId },
      ];

      (doc as any).autoTable({
        head: [['Detail', 'Information']],
        body: tableData.map(item => [item.detail, item.info]),
        startY: 50, // Start the table below the title
        theme: 'grid',
        styles: {
          halign: 'left',
          fontSize: 12,
        },
        headStyles: {
          fillColor: [22, 160, 133],
          textColor: [255, 255, 255],
          fontSize: 14,
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240],
        },
        margin: { top: 20 },
      });

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
      doc.addImage(barcodeDataUrl, 'PNG', 20, (doc as any).lastAutoTable.finalY + 10, 180, 30);

      // Save the PDF
      doc.save("booking_confirmation.pdf");
    };  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4 md:p-10">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 w-full max-w-lg lg:max-w-3xl text-center">
        {/* Success Icon */}
        <FaCheckCircle className="text-green-500 text-6xl md:text-9xl mb-6" />
        
        {/* Success Message */}
        <h2 className="text-2xl md:text-5xl font-bold mb-4">Payment Successful!</h2>
        <p className="text-gray-600 text-base md:text-xl mb-8">
          Thank you for your payment. Your booking has been confirmed!
        </p>
        
        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGeneratePdf}
            className="w-full py-3 md:py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 text-base md:text-lg"
          >
            Generate PDF Ticket
          </button>
          <button
            onClick={handleRedirect}
            className="w-full py-3 md:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-base md:text-lg"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
