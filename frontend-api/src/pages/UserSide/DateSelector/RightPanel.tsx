import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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

  const isSelectedDate = (date: Date) =>
    selectedDate && date.toDateString() === selectedDate.toDateString();

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
    <div className="bg-white p-4 rounded-xl shadow-lg w-full h-auto border border-gray-300">
      <h3 className="text-center text-lg sm:text-xl font-bold mb-3 text-blue-900">
        Choose a Date to Visit
      </h3>
      <div className="flex justify-center mb-4">
        <Calendar
          onChange={(value) => {
            if (value instanceof Date) onDateChange(value);
            else if (Array.isArray(value)) onDateChange(value[0]);
          }}
          value={selectedDate}
          tileClassName={({ date }: { date: Date }) =>
            isPastDate(date)
              ? "bg-gray-200 text-gray-500 text-xs"
              : isSelectedDate(date)
              ? "bg-blue-600 text-white text-xs"
              : "bg-white text-xs"
          }
          tileDisabled={({ date }: { date: Date }) => isPastDate(date)}
          className="w-full text-xs"
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
        <h6 className="text-xs sm:text-sm font-bold text-blue-900 text-center sm:text-left">
          You have selected: <span className="font-semibold">{formattedSelectedDate}</span>
        </h6>
        <button
          className="w-full sm:w-auto bg-blue-900 text-white py-2 px-4 rounded-full text-xs sm:text-sm hover:bg-blue-700 transition duration-200"
          onClick={onConfirm}
        >
          Proceed to Buy Tickets
        </button>
      </div>
    </div>
  );
};

export default RightPanel;
