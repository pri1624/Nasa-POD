
import React from "react";
import "./Footer.css";

function Footer(props) {
  const { handleToggleModal, handleCalendarToggle, data } = props;

  return (
    <footer>
      <div className="footer-content">
        <h2>{data?.title}</h2>
        <h1>PICTURE OF THE DAY</h1>
      </div>
      <button onClick={handleToggleModal} className="info">
        <i className="fa-solid fa-circle-info"></i>
      </button>
      <button onClick={handleCalendarToggle} className="calendar">
        <i className="fa-regular fa-calendar-days"></i>
      </button>
    </footer>
  );
}

export default Footer;
