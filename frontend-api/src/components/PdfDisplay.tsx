import React from 'react';
import jsPDF from 'jspdf';
import JsBarcode from 'jsbarcode';

interface PdfGeneratorProps {
  bookingData: {
    fullName: string;
    email: string;
    grandTotal: number;
    bookingId: string;
    dateOfVisit: string;
    pinCode: string;
    orderId: string;
  };
}

export const PdfGenerator: React.FC<PdfGeneratorProps> = ({ bookingData }) => {
  const handleGeneratePdf = () => {
    if (!bookingData) {
      console.log('No booking data available.');
      return;
    }

    const doc = new jsPDF();

    // Add logo
    const logo = '/assets/images/clientlogo.png';
    const logoImg = new Image();
    logoImg.src = logo;
    logoImg.onload = () => {
      doc.addImage(logoImg, "PNG", 10, 10, 50, 20);

      // Title
      doc.setFontSize(22);
      doc.text("Booking Confirmation", 105, 35, { align: "center" });

      // Table for Booking Details
      const tableData = [
        { detail: "Name", info: bookingData.fullName },
        { detail: "Email", info: bookingData.email },
        { detail: "Total Amount", info: `₹ ${bookingData.grandTotal}` },
        { detail: "Booking ID", info: bookingData.bookingId },
        {
          detail: "Date of Visit",
          info: new Date(bookingData.dateOfVisit).toLocaleDateString(),
        },
        { detail: "PIN Code", info: bookingData.pinCode },
        { detail: "Payment ID", info: bookingData.orderId },
      ];

      (doc as any).autoTable({
        head: [["Detail", "Information"]],
        body: tableData.map((item) => [item.detail, item.info]),
        startY: 50,
        theme: "grid",
        styles: {
          halign: "left",
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
      doc.addImage(
        barcodeDataUrl,
        "PNG",
        20,
        (doc as any).lastAutoTable.finalY + 10,
        180,
        30
      );

      // Convert the PDF to Blob
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open the PDF in a new tab
      window.open(pdfUrl);
    };
  };

  return (
    <button
      onClick={handleGeneratePdf}
      className="w-4/5 font-semibold py-2 md:py-3 bg-blue-900 text-white rounded-3xl hover:bg-green-700 transition duration-300 text-sm md:text-base"
    >
      Download Tickets
    </button>
  );
};
