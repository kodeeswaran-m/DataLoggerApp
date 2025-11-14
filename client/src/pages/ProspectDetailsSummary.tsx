import { useEffect, useState } from "react";
import ProspectDetailsTable from "../components/ProspectDetailsTable";
import { fetchProspects } from "../services/ProspectDetailServices";

const sampleData = [
  {
    month: "January",
    quarter: "Q1",
    prospect: "ABC Corp",
    geo: "APAC",
    lob: "Tech",
    call1: { checked: true, notes: "Initial call done" },
    call2: { checked: false, notes: "" },
    call3: { checked: false, notes: "" },
    coreOfferings: "Cloud Services",
    primaryNeed: "Scalability",
    secondaryNeed: "Automation",
    trace: "Green",
    salesSpoc: "John Doe",
    oppId: "OPP123",
    oppDetails: "Migration project",
    deck: "Shared",
    rag: "Green",
    remark: "Good potential",
  },
  {
    month: "February",
    quarter: "Q1",
    prospect: "XYZ Ltd",
    geo: "Europe",
    lob: "Business",
    call1: { checked: true, notes: "Discovery done" },
    call2: { checked: true, notes: "Follow-up" },
    call3: { checked: false, notes: "" },
    coreOfferings: "AI",
    primaryNeed: "Insights",
    secondaryNeed: "Optimization",
    trace: "Amber",
    salesSpoc: "Sarah",
    oppId: "OPP456",
    oppDetails: "AI analytics",
    deck: "Not Shared",
    rag: "Amber",
    remark: "Need pricing",
  },
];

const ProspectDetailsSummary = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
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
    <div>
      <ProspectDetailsTable data={items} />
      {/* Pagination */}
      <div style={{ marginTop: 20 }}>
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
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
  );
};

export default ProspectDetailsSummary;
