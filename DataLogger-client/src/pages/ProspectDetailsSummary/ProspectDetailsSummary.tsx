// pages/ProspectDetailsSummary/ProspectDetailsSummary.tsx
import { useEffect, useRef, useState, useCallback } from "react";
import "./ProspectDetailsSummary.css";
import { useNavigate, useSearchParams } from "react-router-dom";

import { columns } from "../../components/ProspectTable/ProspectDetailsTable.config";
import {
  deleteProspect,
  fetchProspects,
} from "../../services/ProspectDetailServices";
import ProspectDetailsTable from "../../components/ProspectTable/ProspectDetailsTable";
import SummaryToolbar from "../../components/SummaryToolbar/SummaryToolbar";
import { CircularProgress } from "@mui/material";
import ConfirmDialog from "../../components/Common/ConfirmDialog";

const LS_KEY = "prospect_params";

const ProspectDetailsSummary = () => {
  const saved = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || "";
  const urlFilters = {
    geo: searchParams.get("geo") || "",
    month: searchParams.get("month") || "",
    quarter: searchParams.get("quarter") || "",
    lob: searchParams.get("lob") || "",
    rag: searchParams.get("rag") || "",
  };

  const [search, setSearch] = useState(urlSearch || saved.search || "");
  const [filters, setFilters] = useState({
    geo: urlFilters.geo || saved.filters?.geo || "",
    month: urlFilters.month || saved.filters?.month || "",
    quarter: urlFilters.quarter || saved.filters?.quarter || "",
    lob: urlFilters.lob || saved.filters?.lob || "",
    rag: urlFilters.rag || saved.filters?.rag || "",
  });
  const [totalRecords, setTotalRecords]=useState(0);
  const DEFAULT_COLUMNS = [
    "month",
    "quarter",
    "geo",
    "prospect",
    "lob",
    "actions",
  ];
  const [selectedColumns, setSelectedColumns] = useState(
    saved.selectedColumns || DEFAULT_COLUMNS
  );

  const [showPicker, setShowPicker] = useState(false);
  const [showSearch, setShowSearch] = useState(saved.showSearch || false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(30);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const params: any = {
      search,
      ...filters,
    };

    Object.keys(params).forEach(
      (key) =>
        (params[key] === "" || params[key] === undefined) && delete params[key]
    );

    setSearchParams(params);
  }, [search, filters]);

  useEffect(() => {
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({
        search,
        filters,
        selectedColumns,
        showSearch,
      })
    );
  }, [search, filters, selectedColumns, showSearch]);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [search, filters]);

  const loadData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetchProspects(page, limit, search, filters);

      setItems((prev) => [...prev, ...res.data]);
      setTotalRecords(res.meta.total)
      if (res.data.length < limit) {
        setHasMore(false);
      } else {
        setPage((p) => p + 1);
      }
    } catch (err) {
      console.error(err);
      setHasMore(false);
    }

    setLoading(false);
  };

  const handleObserver = useCallback(
    (entries: any) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !loading) {
        loadData();
      }
    },
    [hasMore, loading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.2,
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const allSelected = selectedColumns.length === columns.length;

  const handleEdit = (row: any) => {
    navigate(`/form/${row._id}`);
  };

  // const handleDelete = async (row: any) => {
  //   if (!window.confirm("Are you sure you want to delete this record?")) return;

  //   try {
  //     await deleteProspect(row._id);

  //     // Refresh list after delete
  //     setItems((prev) => prev.filter((item) => item._id !== row._id));
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to delete. Check console for details.");
  //   }
  // };
  const handleDeleteClick = (row: any) => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRow) return;

    try {
      await deleteProspect(selectedRow._id);

      setItems((prev) => prev.filter((item) => item._id !== selectedRow._id));
      setTotalRecords((prev)=>prev-1)
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }

    setDeleteDialogOpen(false);
    setSelectedRow(null);
  };
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedRow(null);
  };

  const toggleColumn = (key: string) => {
    setSelectedColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleSelectAll = () => {
    setSelectedColumns(
      allSelected ? DEFAULT_COLUMNS : columns.map((c) => c.key)
    );
  };

  return (
    <div className="summary-container">
      <div className="summary-card">
        <h1>Prospect Summary</h1>

        <SummaryToolbar
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          search={search}
          setSearch={setSearch}
          filters={filters}
          setFilters={setFilters}
          showPicker={showPicker}
          setShowPicker={setShowPicker}
          allSelected={allSelected}
          toggleSelectAll={toggleSelectAll}
          selectedColumns={selectedColumns}
          toggleColumn={toggleColumn}
          columns={columns}
          onAddNew={() => navigate("/form")}
          total={totalRecords}
        />

        {/* <ProspectDetailsTable data={items} selectedColumns={selectedColumns} /> */}
        <ProspectDetailsTable
          data={items}
          selectedColumns={selectedColumns}
          onDelete={handleDeleteClick}
          onEdit={handleEdit}
        />

        <div ref={loaderRef} style={{ textAlign: "center", padding: "1rem" }}>
          {loading ? (
            <CircularProgress color="inherit" />
          ) : hasMore ? (
            <CircularProgress color="inherit" />
          ) : (
            "- No More Records -"
          )}
        </div>
      </div>
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Prospect"
        message="Are you sure you want to delete this record? This action cannot be undone."
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ProspectDetailsSummary;
