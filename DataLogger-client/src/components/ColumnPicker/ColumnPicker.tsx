import { useEffect, useRef } from "react";
import { Columns3Cog } from "lucide-react";
import "./ColumnPicker.css";
import { Tooltip } from "@mui/material";

interface ColumnPickerProps {
  showPicker: boolean;
  setShowPicker: (v: boolean) => void;
  allSelected: boolean;
  toggleSelectAll: () => void;
  selectedColumns: string[];
  toggleColumn: (key: string) => void;
  columns: { key: string; label: string }[];
}

export default function ColumnPicker({
  showPicker,
  setShowPicker,
  allSelected,
  toggleSelectAll,
  selectedColumns,
  toggleColumn,
  columns,
}: ColumnPickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [setShowPicker]);

  return (
    <div
      className="column-picker-wrapper"
      ref={pickerRef}
    >
      <Tooltip title="column picker">
        <button
          className="column-picker-btn std-control"
          onClick={() => setShowPicker(!showPicker)}
        >
          <Columns3Cog size={18} />
          Columns
        </button>
      </Tooltip>

      {showPicker && (
        <div className="column-picker-dropdown">
          <label className="column-picker-item">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
            />
            Select All
          </label>

          <hr />

          {columns.map((col) => (
            <label key={col.key} className="column-picker-item">
              <input
                type="checkbox"
                checked={selectedColumns.includes(col.key)}
                onChange={() => toggleColumn(col.key)}
              />
              {col.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
