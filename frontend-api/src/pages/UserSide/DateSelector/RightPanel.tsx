import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface RightPanelProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | Date[] | null) => void;
  onConfirm: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ selectedDate, onDateChange, onConfirm }) => {
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isSelectedDate = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const currentMonthYear = selectedDate
    ? selectedDate.toLocaleString("default", { month: "long", year: "numeric" })
    : new Date().toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-1/2 border border-gray-300 flex-grow min-h-[500px]">
      <h3 className="text-2xl font-bold mb-4">{currentMonthYear}</h3>
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
            return "bg-gray-1000 text-white";
          }
          if (isSelectedDate(date)) {
            return "bg-green-600 text-white";
          }
          return "bg-white-400 text-black";
        }}
        tileDisabled={({ date }: { date: Date }) => isPastDate(date)}
        className="w-full"
      />
      <button
        className="mt-6 bg-blue-700 text-white py-3 px-6 rounded-full w-full hover:bg-blue-800"
        onClick={onConfirm}
      >
        Confirm
      </button>
    </div>
  );
};
export default RightPanel;
