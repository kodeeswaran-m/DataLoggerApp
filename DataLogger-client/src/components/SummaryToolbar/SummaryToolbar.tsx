import { Search, ArrowUpDown, Columns3Cog, Plus } from "lucide-react";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import "./SummaryToolbar.css";
import ColumnPicker from "../ColumnPicker/ColumnPicker";
import { Tooltip } from "@mui/material";

interface SummaryToolbarProps {
  showSearch: boolean;
  setShowSearch: (v: boolean) => void;
  search: string;
  setSearch: (v: string) => void;
  filters: any;
  setFilters: (v: any) => void;
  showPicker: boolean;
  setShowPicker: (v: boolean) => void;
  allSelected: boolean;
  toggleSelectAll: () => void;
  selectedColumns: string[];
  toggleColumn: (key: string) => void;
  columns: any[];
  onAddNew: () => void;
  total: number
}

export default function SummaryToolbar({
  showSearch,
  setShowSearch,
  search,
  setSearch,
  filters,
  setFilters,
  showPicker,
  setShowPicker,
  allSelected,
  toggleSelectAll,
  selectedColumns,
  toggleColumn,
  columns,
  onAddNew,
  total
}: SummaryToolbarProps) {
  return (
    <div className="summary-toolbar">
      {/* Search */}
      <div className="toolbar-item-left">
        <Tooltip title="search">
          <button
            className="icon-btn std-control"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search size={18} />
          </button>
        </Tooltip>

        {showSearch && (
          <input
            type="text"
            className="search-input std-control"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </div>
      <div className="toolbar-item-right">
        <ColumnPicker
          showPicker={showPicker}
          setShowPicker={setShowPicker}
          allSelected={allSelected}
          toggleSelectAll={toggleSelectAll}
          selectedColumns={selectedColumns}
          toggleColumn={toggleColumn}
          columns={columns}
        />
        <FilterDropdown filters={filters} setFilters={setFilters} />

        {/* <Tooltip title="sort">
          <button className="icon-btn std-control">
            <ArrowUpDown size={18} />
          </button>
        </Tooltip> */}
        <Tooltip title="total records">
          <p className="icon-btn count-txt">Total : {total}</p>
        </Tooltip>
        <Tooltip title="add new">
          <button className="add-btn" onClick={onAddNew}>
            <Plus size={18} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
