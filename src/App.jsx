import React, { useEffect, useState, useRef, useCallback } from "react";
import Main from "./assets/components/Main/Main";
import Footer from "./assets/components/Footer/Footer";
import SideBar from "./assets/components/SideBar/SideBar";
import CalendarComponent from "./assets/components/Calender/Calender";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const handleToggleModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);

  const handleCalendarToggle = useCallback(() => {
    setShowCalendar((prev) => !prev);
  }, []);

  const closeCalendar = useCallback(() => {
    setShowCalendar(false);
  }, []);

  useEffect(() => {
    async function fetchAPIData(date) {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const formattedDate = date.toISOString().split("T")[0];
      const cacheKey = `nasa_apod_${formattedDate}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        setData(JSON.parse(cachedData));
        return;
      }

      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${formattedDate}`;

      try {
        const res = await fetch(url);
        const apiData = await res.json();
        setData(apiData);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchAPIData(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`app-container ${showModal ? "sidebar-open" : ""}`}>
      {showCalendar && (
        <div ref={calendarRef} className="calendar-container">
          <CalendarComponent
            onDateChange={(date) => setSelectedDate(date)}
            closeCalendar={closeCalendar}
          />
        </div>
      )}
      {data ? (
        <Main data={data} handleCloseSidebar={handleToggleModal} />
      ) : (
        <div className="loading-state">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data && (
        <Footer
          data={data}
          handleToggleModal={handleToggleModal}
          handleCalendarToggle={handleCalendarToggle}
        />
      )}
    </div>
  );
}

export default App;
