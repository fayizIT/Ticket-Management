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

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const day = date.getDate();
    const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
    const formattedDate = `${day}${suffix} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    return formattedDate;
  };

  const formattedSelectedDate = selectedDate ? formatDate(selectedDate) : 'No date selected';

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full h-full border border-gray-300 flex-grow">
      <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Panton Narrow-Trial' }}>
        {currentMonthYear}
      </h3>
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
            return "bg-gray-200 text-gray-500";
          }
          if (isSelectedDate(date)) {
            return "bg-blue-600 text-white";
          }
          return "bg-white";
        }}
        tileDisabled={({ date }: { date: Date }) => isPastDate(date)}
        className="w-full"
      />
      <div className="w-full flex justify-between items-center mt-4">
        <h6 className="text-lg font-bold text-blue-700">You have selected: {formattedSelectedDate}</h6>
        <button
          className="mt-6 bg-blue-700 text-white py-3 px-6 rounded-full w-1/4 hover:bg-blue-800"
          onClick={onConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default RightPanel;
