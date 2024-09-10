import "./SideBar.css";

function SideBar(props) {
  const { handleToggleModal, data } = props;
  return (
    <div className="sidebar-container">
      <div onClick={handleToggleModal} className="bgOverlay"></div>
      <div className="sidebarContents">
        <h2>{data?.title}</h2>
        <div className="description-container">
          <p>{data?.date}</p>
          <p className="description">{data?.explanation}</p>
        </div>
        <button onClick={handleToggleModal} className="arrow">
          <i className="fa-solid fa-right-long"></i>
        </button>
      </div>
    </div>
  );
}

export default SideBar;
