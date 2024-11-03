import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";

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
  const [clickedDates, setClickedDates] = useState<Date[]>([]);

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
  const handleDateClick = (date: Date) => {
    const today = new Date();
    const selectedDateIsToday = date.toDateString() === today.toDateString();
    const currentTime = today.getHours();

    if (selectedDateIsToday && currentTime >= 11) {
      toast.error(
        "You can't book a date after 11 AM today. Please select a different date."
      );
      return;
    }

    if (!clickedDates.some((d) => d.toDateString() === date.toDateString())) {
      setClickedDates((prev) => [...prev, date]);
    }
    onDateChange(date);
  };

  return (
    <div className="bg-white p-5 sm:p-7 rounded-3xl w-full border border-gray-300">
      <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold mb-4 sm:mb-5 mt-2 text-[#15196E] ">
        Choose a date to visit
      </h3>

      <div className="flex justify-center mb-6  w-full rounded-lg p-3 sm:p-3">
        <Calendar
          onChange={(value) => {
            if (value instanceof Date) handleDateClick(value);
            else if (Array.isArray(value)) onDateChange(value[0]);
          }}
          value={selectedDate}
          tileClassName={({ date }: { date: Date }) =>
            ` ${
              isPastDate(date)
                ? "bg-gray-200 text-gray-500"
                : isSelectedDate(date)
                ? "bg-blue-900 text-white font-semibold"
                : clickedDates.some(
                    (d) => d.toDateString() === date.toDateString()
                  )
                ? "bg-[#D5EFFF] bg-opacity-55 text-[#15196E] font-semibold"
                : "bg-[#D5EFFF] bg-opacity-55 text-blue-900"
            } p-3 sm:p-5 w-full flex items-center justify-center text-xs sm:text-sm border-0`
          }
          tileDisabled={({ date }: { date: Date }) => isPastDate(date)}
          className="w-full text-xs sm:text-sm border-0"
          calendarType="gregory"
          navigationLabel={({ label }) => (
            <span className="font-semibold text-blue-900">{label}</span>
          )}
          nextLabel="›"
          next2Label="»"
          prevLabel="‹"
          prev2Label="«"
          showNeighboringMonth={false}
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString(locale, { weekday: "short" }).toUpperCase()
          }
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 space-y-3 sm:space-y-0 sm:space-x-3">
        <h6 className="text-sm sm:text-lg font-bold text-[#15196E] text-center sm:text-left">
          You selected{" "}
          <span className="font-bold">{formattedSelectedDate}</span>
        </h6>
        <button
          className="w-full sm:w-auto font-semibold bg-[#2D3192] text-white py-2 px-6 sm:py-3 sm:px-8 rounded-full text-xs sm:text-base md:text-lg hover:bg-blue-800 transition duration-200"
          onClick={onConfirm}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RightPanel;
