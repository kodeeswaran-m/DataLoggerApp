import React, { useState } from "react";
import { FaBars, FaHome, FaFileAlt } from "react-icons/fa";
import "./sidebar.css";

type SidebarProps = {
  onMenuClick?: (menu: string) => void;
  activeMenu?: string;
};

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick, activeMenu }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Header */}
      <div className="sidebar-header">
        <span className="sidebar-logo">{collapsed ? "" : "Dashboard"}</span>

        <button
          className={`collapse-btn ${collapsed ? "rotated" : ""}`}
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars color="#111" /> {/* Black icon */}
        </button>
      </div>

      {/* Menu */}
      <ul className="sidebar-menu">

        <li
          className={activeMenu === "demo" ? "active" : ""}
          onClick={() => onMenuClick?.("demo")}
        >
          <span className="icon"><FaHome color="#111" /></span>
          <span className="menu-text">Demo Page</span>
        </li>

        <li
          className={activeMenu === "report" ? "active" : ""}
          onClick={() => onMenuClick?.("report")}
        >
          <span className="icon"><FaFileAlt color="#111" /></span>
          <span className="menu-text">Prospect Report</span>
        </li>

        <li
          className={activeMenu === "summary" ? "active" : ""}
          onClick={() => onMenuClick?.("summary")}
        >
          <span className="icon"><FaFileAlt color="#111" /></span>
          <span className="menu-text">Prospect Summary</span>
        </li>

      </ul>

      {/* Footer */}
      <div className="sidebar-footer">© 2025 Aspire Systems</div>
    </aside>
  );
};

export default Sidebar;
