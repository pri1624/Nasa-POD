import { useState } from "react";

function Main({ data, handleCloseSidebar }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="img-container">
      {!imageLoaded && (
        <div className="loading-placeholder">Loading Image...</div>
      )}
      <img
        src={data.hdurl}
        alt={data.title || "bg-img"}
        className="bgImage"
        onClick={handleCloseSidebar}
        onLoad={() => setImageLoaded(true)}
        loading="lazy"
      />
    </div>
  );
}

export default Main;
