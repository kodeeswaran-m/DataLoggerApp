import React, { useState } from "react";
import { FaHome, FaFileAlt, FaBars } from "react-icons/fa";
import "./Sidebar.css";

type SidebarProps = {
  activePage: "demo" | "report";
  setActivePage: (page: "demo" | "report") => void;
};

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-logo">{collapsed ? "CRM" : "CRM Dashboard"}</h2>
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <FaBars />
        </button>
      </div>

      <ul className="sidebar-menu">
        <li
          className={activePage === "demo" ? "active" : ""}
          onClick={() => setActivePage("demo")}
        >
          <FaHome className="icon" />
          <span className="menu-text">Basic Data</span>
        </li>

        <li
          className={activePage === "report" ? "active" : ""}
          onClick={() => setActivePage("report")}
        >
          <FaFileAlt className="icon" />
          <span className="menu-text">Prospect Report</span>
        </li>
      </ul>

      <div className="sidebar-footer">
        <span>v1.0.0</span>
      </div>
    </aside>
  );
};

export default Sidebar;
