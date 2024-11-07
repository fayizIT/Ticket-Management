import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./userFooter";
import { PiParkFill } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

interface TicketCategory {
  ticketCategoryId: string;
  name: string;
  quantity: number;
}

interface Booking {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfVisit: string;
  totalVisitors: number;
  grandTotal: number;
  ticketCategories: TicketCategory[];
  paymentStatus: boolean;
  createdBy: number;
}

const UserBookings: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookings: Booking[] = location.state?.bookings || [];

  useEffect(() => {
    if (!bookings.length) {
      navigate("/");
    }
  }, [bookings, navigate]);

  const now = new Date();

  const upcomingBookings = bookings
    .filter((booking) => new Date(booking.dateOfVisit) >= now)
    .sort(
      (a, b) =>
        new Date(a.dateOfVisit).getTime() - new Date(b.dateOfVisit).getTime()
    );

  const pastBookings = bookings.filter(
    (booking) => new Date(booking.dateOfVisit) < now
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const monthOptions: Intl.DateTimeFormatOptions = { month: "short" };
    const month = new Intl.DateTimeFormat("en-US", monthOptions).format(date);
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };



const generatePDF = (booking:Booking) => {
  const doc = new jsPDF();
  
  const columns = [
    { title: "Field", dataKey: "field" },
    { title: "Value", dataKey: "value" }
  ];

  const data = [
    { field: "Full Name", value: booking.fullName },
    { field: "Phone Number", value: booking.phoneNumber },
    { field: "Email", value: booking.email },
    { field: "Date of Visit", value: new Date(booking.dateOfVisit).toLocaleDateString() },
    { field: "Total Visitors", value: booking.totalVisitors },
    { field: "Grand Total", value: `Rs.${booking.grandTotal}` }
  ];

  if (booking.ticketCategories && Array.isArray(booking.ticketCategories) && booking.ticketCategories.length > 0) {
    booking.ticketCategories.forEach((category:any, index:any) => {
      data.push({ field: `Category ${index + 1}`, value: category.name });
      data.push({ field: `Price ${index + 1}`, value: `₹${category.price}` });
    });
  } else {
    data.push({ field: "Ticket Categories", value: "No categories available" });
  }

  // Add the table to the PDF
  doc.autoTable(columns, data, {
    margin: { top: 10 },
    styles: { fontSize: 10 },
    columnStyles: {
      field: { fontStyle: "bold", cellWidth: 60 },
      value: { cellWidth: 100 },
    },
  });

  doc.save(`Ticket_${booking.fullName}_${new Date(booking.dateOfVisit).toLocaleDateString()}.pdf`);
};


  const backgroundImage = "assets/images/TicketBg.png";
  const Image = "/assets/images/clientlogo.png";
  return (
    <>
      <div
        className="flex flex-col bg-no-repeat bg-cover bg-top w-full min-h-screen"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="container mx-auto px-4 py-6 mt-4 min-h-screen">
          <div className="w-full flex flex-col md:flex-row justify-between border-b-2 p-6 pb-8 border-[#2D3192] border-opacity-10">
            <h2 className="text-3xl md:text-[40px] text-[#15196E] font-bold">
              Hello {upcomingBookings[0].fullName}
            </h2>
            <button
              onClick={() => navigate("/")}
              className="text-lg md:text-xl text-[#2D3192] bg-[#2D3192] bg-opacity-10 px-6 md:px-12 py-2 rounded-[30px] font-bold mt-4 md:mt-0"
            >
              Logout
            </button>
          </div>

          <div className="w-full h-[700px] overflow-y-auto no-scrollbar">
            <p className="text-lg md:text-[22px] p-6 text-[#15196E] font-bold">
              Upcoming Tickets
            </p>

            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking, index) => (
                  <div
                    key={index}
                    className="w-full bg-white rounded-[19px] flex flex-col md:flex-row p-6 border"
                  >
                    <div className="w-full md:w-1/5 flex justify-between items-center border-b md:border-b-0 md:border-r-2 border-[#000000] border-opacity-10 mb-4 md:mb-0">
                      <p className="bg-[#D5EFFF] bg-opacity-55 p-3 rounded-[10px]">
                        <PiParkFill className="w-[50px] h-[40px] md:w-[61px] md:h-[50px] text-[#15196E]" />
                      </p>
                      <p className="text-[20px] md:text-[23px] font-bold mr-4 md:mr-6 text-[#15196E]">
                        Park Ticket
                      </p>
                    </div>
                    <div className="w-full md:w-3/5 flex flex-col md:flex-row justify-between border-b md:border-b-0 md:border-r-2 border-[#000000] border-opacity-10">
                      <div className="w-full md:w-1/3 mb-4 md:mb-0 ml-5">
                        <p className="text-[18px] md:text-[23px] ml-2 text-[#15196E] text-opacity-40 font-semibold">
                          Date Of Visit
                        </p>
                        <p className="text-[18px] md:text-[23px] ml-2 text-[#15196E] font-bold">
                          {formatDate(booking.dateOfVisit)}
                        </p>
                      </div>
                      <div className="w-full md:w-1/4 mb-4 md:mb-0 ml-5 md:ml-8 border-b md:border-b-0 md:border-r-2 border-[#000000] border-opacity-10">
                        <p className="text-[18px] md:text-[23px] ml-2 md:ml-6 text-[#15196E] text-opacity-40 font-semibold">
                          Visitors
                        </p>
                        <p className="text-[18px] md:text-[23px] ml-2 md:ml-6 font-bold text-[#15196E]">
                          {booking.totalVisitors} Ticket
                        </p>
                      </div>
                      <div className="w-full md:w-1/5 mb-4 md:mb-0 ml-5 md:ml-8">
                        <p className="text-[18px] md:text-[23px] text-[#15196E] text-opacity-40 font-semibold flex justify-center items-center">
                          Total
                        </p>
                        <p className="text-[18px] md:text-[23px] font-bold flex justify-center items-center gap-3 text-[#15196E]">
                          <FaCheckCircle size={20} className="text-[#89C541]" />
                          ₹{booking.grandTotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="w-full md:w-1/5 flex justify-center items-center">
                      <button className="bg-[#2D3192] text-white w-full md:w-[70%] ml-4 py-3 md:py-4 rounded-[41px] text-lg md:text-xl font-bold">
                        View Tickets
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-yellow-100 p-4 rounded">
                <p className="font-semibold">No Upcoming Tickets</p>
                <p>You have no upcoming tickets at this time.</p>
              </div>
            )}

            <p className="text-lg md:text-[22px] p-4 mt-4 mb-1 text-red-700 font-bold">
              Past Tickets
            </p>

            {pastBookings.length > 0 ? (
              <div className="space-y-4">
                {pastBookings.map((booking, index) => (
                  <div
                    key={index}
                    className="w-full bg-white rounded-2xl flex flex-col md:flex-row p-6 border"
                  >
                    <div className="w-full md:w-1/5 flex justify-between items-center border-b md:border-b-0 md:border-r-2 border-[#000000] border-opacity-10 mb-4 md:mb-0">
                      <p className="bg-[#D5EFFF] bg-opacity-55 p-3">
                        <PiParkFill className="w-[50px] h-[40px] md:w-[61px] md:h-[50px] text-[#15196E]" />
                      </p>
                      <p className="text-[20px] md:text-[23px] font-bold mr-4 md:mr-6 text-[#15196E]">
                        Park Ticket
                      </p>
                    </div>
                    <div className="w-full md:w-3/5 flex flex-col md:flex-row justify-between border-b md:border-b-0 md:border-r-2 border-[#000000] border-opacity-10">
                      <div className="w-full md:w-1/3 mb-4 md:mb-0 ml-5">
                        <p className="text-[18px] md:text-[23px] ml-2 text-[#15196E] text-opacity-40 font-semibold">
                          Date Of Visit
                        </p>
                        <p className="text-[18px] md:text-[23px] ml-2 text-[#15196E] font-bold">
                          {formatDate(booking.dateOfVisit)}
                        </p>
                      </div>
                      <div className="w-full md:w-1/4 mb-4 md:mb-0 ml-5 md:ml-8 border-b md:border-b-0 md:border-r-2 border-[#000000] border-opacity-10">
                        <p className="text-[18px] md:text-[23px] ml-2 md:ml-6 text-[#15196E] text-opacity-40 font-semibold">
                          Visitors
                        </p>
                        <p className="text-[18px] md:text-[23px] ml-2 md:ml-6 font-bold text-[#15196E]">
                          {booking.totalVisitors} Ticket
                        </p>
                      </div>
                      <div className="w-full md:w-1/5 mb-4 md:mb-0 ml-5 md:ml-8">
                        <p className="text-[18px] md:text-[23px] text-[#15196E] text-opacity-40 font-semibold flex justify-center items-center">
                          Total
                        </p>
                        <p className="text-[18px] md:text-[23px] font-bold flex justify-center items-center gap-3 text-[#15196E]">
                          <FaCheckCircle size={20} className="text-[#89C541]" />
                          ₹{booking.grandTotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="w-full md:w-1/5 flex justify-center items-center">
                      <button className="bg-[#2D3192] text-white w-full md:w-[70%] ml-4 py-3 md:py-4 rounded-[41px] text-lg md:text-xl font-bold">
                        View Tickets
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-yellow-100 p-4 rounded">
                <p className="font-semibold">No Upcoming Tickets</p>
                <p>You have no upcoming tickets at this time.</p>
              </div>
            )}
          </div>

          <div className="w-full mt-8">
            <Footer imageSrc={Image} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBookings;
