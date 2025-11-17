import { useEffect, useState } from "react";
import ProspectDetailsTable from "../components/ProspectDetailsTable";
import { fetchProspects } from "../services/ProspectDetailServices";
import "./ProspectDetailsSummary.css";
import { columns } from "../components/ProspectDetailsTable"; // Import columns
import { Columns3Cog } from "lucide-react";

const ProspectDetailsSummary = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [showPicker, setShowPicker] = useState(false);

  // Initially, all columns are selected
  // const [selectedColumns, setSelectedColumns] = useState(
  //   columns.map((c) => c.key)
  // );
  const DEFAULT_COLUMNS = ["month", "quarter", "geo", "prospect"];

  const [selectedColumns, setSelectedColumns] =
    useState<string[]>(DEFAULT_COLUMNS);

  useEffect(() => {
    loadData();
  }, [page]);

  const allSelected = selectedColumns.length === columns.length;
  
  const toggleSelectAll = () => {
  if (allSelected) {
    // Reset to default columns instead of empty
    setSelectedColumns(DEFAULT_COLUMNS);
  } else {
    // Select all columns
    setSelectedColumns(columns.map((c) => c.key));
  }
};


  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchProspects(page, limit);
      setItems(res.data);
      setTotal(res.meta.total);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const toggleColumn = (colKey: string) => {
    setSelectedColumns((prev) =>
      prev.includes(colKey)
        ? prev.filter((key) => key !== colKey)
        : [...prev, colKey]
    );
  };

  return (
    <div className="summary-container">
      <div className="summary-card">
        <h1>Prospect Summary</h1>

        <div className="column-picker-wrapper">
          <button
            className="column-picker-btn"
            onClick={() => setShowPicker((prev) => !prev)}
          >
            <div className="column-picker">
              <Columns3Cog size={18} /> <span>Columns</span>
            </div>
          </button>

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

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ProspectDetailsTable
            data={items}
            selectedColumns={selectedColumns}
          />
        )}

        {/* Pagination */}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </button>

          <span>
            Page {page} of {Math.ceil(total / limit)}
          </span>

          <button
            disabled={page >= Math.ceil(total / limit)}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProspectDetailsSummary;

// import { useEffect, useState } from "react";
// import ProspectDetailsTable from "../components/ProspectDetailsTable";
// import { fetchProspects } from "../services/ProspectDetailServices";
// import "./ProspectDetailsSummary.css";

// const ProspectDetailsSummary = () => {
//   const [items, setItems] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(8);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadData();
//   }, [page]);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const res = await fetchProspects(page, limit);
//       setItems(res.data);
//       setTotal(res.meta.total);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="summary-container">
//       <div className="summary-card">
//         <h1>Prospect Summary</h1>

//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <ProspectDetailsTable data={items} />
//         )}

//         {/* Pagination */}
//         <div className="pagination">
//           <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
//             Prev
//           </button>

//           <span>
//             Page {page} of {Math.ceil(total / limit)}
//           </span>

//           <button
//             disabled={page >= Math.ceil(total / limit)}
//             onClick={() => setPage((p) => p + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProspectDetailsSummary;
