import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles

interface RightPanelProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | Date[] | null) => void;
  onConfirm: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({
  selectedDate,
  onDateChange,
  onConfirm,
}) => {
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isSelectedDate = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";
    return `${day}${suffix} ${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;
  };

  const formattedSelectedDate = selectedDate ? formatDate(selectedDate) : "";

  return (
    <div className="bg-white p-2 md:p-4 rounded-xl shadow-lg w-full h-auto md:h-[400px] border border-gray-300 flex-grow -mt-8">
      <h3 className="text-xl md:text-2xl font-bold mb-2 text-blue-900">Choose a Date to Visit</h3>
      <Calendar
        onChange={(value) => {
          if (value instanceof Date) {
            onDateChange(value);
          } else if (Array.isArray(value)) {
            onDateChange(value[0]);
          }
        }}
        value={selectedDate}
        tileClassName={({ date }: { date: Date }) => {
          if (isPastDate(date)) {
            return "bg-gray-200 text-gray-500 text-xs"; // Adjust size for past dates
          }
          if (isSelectedDate(date)) {
            return "bg-blue-600 text-white text-xs"; // Adjust size for selected date
          }
          return "bg-white text-xs"; // Default size for unselected tiles
        }}
        tileDisabled={({ date }: { date: Date }) => isPastDate(date)}
        className="w-full text-xs" // Adjust the font size for the calendar
      />
      <div className="w-full flex flex-col md:flex-row justify-between items-center mt-4">
        <h6 className="text-xs md:text-sm font-bold text-blue-900 text-center md:text-left">
          You have selected: {formattedSelectedDate}
        </h6>
        <button
          className="mt-2 md:mt-0 bg-blue-900 text-white py-1 px-3 md:py-2 md:px-4 rounded-full w-full md:w-auto hover:bg-blue-800 text-xs md:text-sm"
          onClick={onConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default RightPanel;
