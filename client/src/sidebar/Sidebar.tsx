import React, { useState } from "react";
import { FaBars, FaHome, FaFileAlt } from "react-icons/fa";
import "./sidebar.css";

type SidebarProps = {
  onMenuClick?: (menu: string) => void;
  activeMenu?: string;
};

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick, activeMenu }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <span className="sidebar-logo">{collapsed ? "D" : "Dashboard"}</span>
        <button className="collapse-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      <ul className="sidebar-menu">
        <li
          className={activeMenu === "demo" ? "active" : ""}
          onClick={() => onMenuClick?.("demo")}
        >
          <span className="icon">
            <FaHome />
          </span>
          <span className="menu-text">Demo Page</span>
        </li>

        <li
          className={activeMenu === "report" ? "active" : ""}
          onClick={() => onMenuClick?.("report")}
        >
          <span className="icon">
            <FaFileAlt />
          </span>
          <span className="menu-text">Prospect Report</span>
        </li>

        <li
          className={activeMenu === "summary" ? "active" : ""}
          onClick={() => onMenuClick?.("summary")}
        >
          <span className="icon">
            <FaFileAlt />
          </span>
          <span className="menu-text">Prospect Summary</span>
        </li>
      </ul>

      <div className="sidebar-footer">© 2025 Your Company</div>
    </aside>
  );
};

export default Sidebar;
