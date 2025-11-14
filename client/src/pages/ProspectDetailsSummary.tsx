import { useEffect, useState } from "react";
import ProspectDetailsTable from "../components/ProspectDetailsTable";
import { fetchProspects } from "../services/ProspectDetailServices";
import "./ProspectDetailsSummary.css";

const ProspectDetailsSummary = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [page]);

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

  return (
    <div className="summary-container">
      <div className="summary-card">
        <h1>Prospect Summary</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ProspectDetailsTable data={items} />
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
