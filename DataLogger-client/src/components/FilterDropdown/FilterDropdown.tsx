import { useState, useRef, useEffect } from "react";
import {
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./FilterDropdown.css";
import { Tooltip } from "@mui/material";
interface Props {
  filters: {
    geo: string;
    month: string;
    quarter: string;
    lob: string;
    rag: string;
  };
  setFilters: (filters: any) => void;
}

// const GEOFILTER = ["APAC", "US", "Oceania", "Europe", "India"];
// const MONTHFILTER = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug","Sept","Oct","Nov","Dec"];
// const QUARTERFILTER = ["Q1", "Q2", "Q3", "Q4"];
// const LOBFILTER = ["LOB1", "LOB2", "LOB3"];
// const RAGFILTER = ["Red", "Amber", "Green"];

const GEOFILTER = [
  { key: "APAC", value: "APAC" },
  { key: "US", value: "US" },
  { key: "Oceania", value: "Oceania" },
  { key: "Europe", value: "Europe" },
  { key: "India", value: "India" },
];

const MONTHFILTER = [
  { key: "January", value: "January" },
  { key: "Febuary", value: "Febuary" },
  { key: "March", value: "March" },
  { key: "April", value: "April" },
  { key: "May", value: "May" },
  { key: "June", value: "June" },
  { key: "July", value: "July" },
  { key: "August", value: "August" },
  { key: "September", value: "September" },
  { key: "October", value: "October" },
  { key: "November", value: "November" },
  { key: "December", value: "December" },
];

const QUARTERFILTER = [
  { key: "Q1", value: "Q1" },
  { key: "Q2", value: "Q2" },
  { key: "Q3", value: "Q3" },
  { key: "Q4", value: "Q4" },
];

const LOBFILTER = [
  { key: "LOB1", value: "lob1" },
  { key: "LOB2", value: "lob2" },
  { key: "LOB3", value: "lob3" },
];

const RAGFILTER = [
  { key: "Red", value: "Red" },
  { key: "Amber", value: "Amber" },
  { key: "Green", value: "Green" },
];

const FilterDropdown = ({ filters, setFilters }: Props) => {
  const [showFilter, setShowFilter] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Active badge count
  const activeCount = Object.values(filters).filter((v) => v !== "").length;

  // Close on outside click
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowFilter(false);
        setActiveSubMenu(null);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const updateFilter = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
    setShowFilter(false);
    setActiveSubMenu(null);
  };

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <Tooltip title="filter">
        <button
          className="filter-btn"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <Filter size={18} />
          {showFilter ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {activeCount > 0 && (
            <span className="filter-badge">{activeCount}</span>
          )}
        </button>
      </Tooltip>

      {showFilter && (
        <div
          className={`filter-menu multi-level ${
            activeSubMenu ? "show-submenu" : ""
          }`}
        >
          {/* LEFT MENU */}
          {/* <div className="filter-main">
            {["geo", "month", "quarter", "lob", "rag"].map((key) => (
              <div
                key={key}
                className={`filter-item ${
                  activeSubMenu === key ? "active-submenu" : ""
                }`}
                onClick={() =>
                  setActiveSubMenu(activeSubMenu === key ? null : key)
                }
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
                {activeSubMenu === key ? (
                  <ChevronLeft size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </div>
            ))}
          </div> */}

          <div className="filter-main">
  {["geo", "month", "quarter", "lob", "rag"].map((key) => {
    const isActive = filters[key] !== ""; // filter applied?

    return (
      <div
        key={key}
        className={`filter-item ${
          activeSubMenu === key ? "active-submenu" : ""
        }`}
        onClick={() =>
          setActiveSubMenu(activeSubMenu === key ? null : key)
        }
      >
        <div className="filter-label">
          {key.charAt(0).toUpperCase() + key.slice(1)}

          {/* Black Dot (shown only when filter applied) */}
          {isActive && <span className="active-dot" />}
        </div>

        {activeSubMenu === key ? (
          <ChevronLeft size={14} />
        ) : (
          <ChevronRight size={14} />
        )}
      </div>
    );
  })}
</div>


          {/* RIGHT SUB MENU */}
          {activeSubMenu && (
            <div className="filter-submenu">
              <div
                className={`filter-item ${
                  filters[activeSubMenu] === "" ? "active-filter" : ""
                }`}
                onClick={() => updateFilter(activeSubMenu, "")}
              >
                All
              </div>

              {(activeSubMenu === "geo"
                ? GEOFILTER
                : activeSubMenu === "month"
                ? MONTHFILTER
                : activeSubMenu === "quarter"
                ? QUARTERFILTER
                : activeSubMenu === "lob"
                ? LOBFILTER
                : RAGFILTER
              ).map(({ key, value }) => (
                <div
                  key={value}
                  className={`filter-item ${
                    filters[activeSubMenu] === value ? "active-filter" : ""
                  }`}
                  onClick={() => updateFilter(activeSubMenu, value)}
                >
                  {key}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
