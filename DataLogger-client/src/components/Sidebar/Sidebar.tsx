import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import FitbitIcon from "@mui/icons-material/Fitbit";
import PollIcon from "@mui/icons-material/Poll";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SegmentIcon from "@mui/icons-material/Segment";
import { Tooltip } from "@mui/material";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const location = useLocation(); 

  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  document.documentElement.style.setProperty(
    "--sidebar-width",
    isOpen ? "220px" : "70px"
  );

  const menu = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { name: "Summary", icon: <PollIcon />, path: "/summary" },
    { name: "Form", icon: <SegmentIcon />, path: "/form" },
  ];

  return (
    <div className={isOpen ? "sidebar open" : "sidebar"}>
      {/* TOP SECTION */}
      <div
        className="top"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className="logo-section"
          onClick={toggleSidebar}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {isOpen ? (
            <>
              {/* <Shredder className="logo icon-standard" /> */}
              <span onClick={() => navigate("/")}>
                <FitbitIcon className="logo icon-standard  icon-bdr" />
              </span>
              <span className="app-name">Data Logger</span>
              <span className="toggle-icon ">
                <PanelLeftClose className="icon-standard toggle-btn icon-bdr" />
              </span>
            </>
          ) : hover ? (
            <PanelLeftOpen className="icon-standard hover-icon toggle-btn  icon-bdr" />
          ) : (
            // <Shredder className="logo icon-standard" />
            <FitbitIcon className="logo icon-standard  icon-bdr" />
          )}
        </div>
      </div>

      {/* MENU */}

      <ul className="menu">
        {menu.map((m) => {
          const isActive = location.pathname === m.path;

          const menuContent = (
            <Link to={m.path} className="menu-link">
              <span className="icon icon-standard">{m.icon}</span>
              {isOpen && <span className="text">{m.name}</span>}
            </Link>
          );

          return (
            <li
              key={m.name}
              className={`menu-item ${isActive ? "active" : ""}`}
            >
              {isOpen ? (
                menuContent
              ) : (
                <Tooltip title={m.name} placement="right" arrow>
                  {/* span wrapper required for Tooltip + Link combination */}
                  <span>{menuContent}</span>
                </Tooltip>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
