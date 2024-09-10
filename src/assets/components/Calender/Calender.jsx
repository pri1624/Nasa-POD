import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calender.css";

function Calender({ onDateChange, closeCalendar }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
    closeCalendar();
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month" && date > new Date()) {
      return "future";
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={tileClassName}
        maxDate={new Date()}
      />
    </div>
  );
}

export default Calender;
