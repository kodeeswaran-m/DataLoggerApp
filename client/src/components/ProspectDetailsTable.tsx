import "./ProspectDetailsTable.css";
const columns = [
  { key: "prospect", label: "Prospect" },
  { key: "geo", label: "Geo" },
  { key: "month", label: "Month" },
  { key: "quarter", label: "Quarter" },
  { key: "lob", label: "LOB" },

//   { key: "call1.checked", label: "Call 1 Checked" },
  { key: "call1.notes", label: "Call 1 Notes" },

//   { key: "call2.checked", label: "Call 2 Checked" },
  { key: "call2.notes", label: "Call 2 Notes" },

//   { key: "call3.checked", label: "Call 3 Checked" },
  { key: "call3.notes", label: "Call 3 Notes" },

  { key: "coreOfferings", label: "Core Offerings" },
  { key: "primaryNeed", label: "Primary Need" },
  { key: "secondaryNeed", label: "Secondary Need" },
  { key: "trace", label: "Trace" },
  { key: "salesSpoc", label: "Sales Spoc" },
  { key: "oppId", label: "Opp ID" },
  { key: "oppDetails", label: "Opp Details" },
  { key: "deck", label: "Deck" },
  { key: "rag", label: "RAG" },
  { key: "remark", label: "Remark" },
];

export type FormValues = {
  month: string;
  quarter: string;
  prospect: string;
  geo: string;
  lob: string;
  call1: { checked: boolean; notes: string };
  call2: { checked: boolean; notes: string };
  call3: { checked: boolean; notes: string };
  coreOfferings: string;
  primaryNeed: string;
  secondaryNeed: string;
  trace: string;
  salesSpoc: string;
  oppId: string;
  oppDetails: string;
  deck: string;
  rag: string;
  remark: string;
};

type ProspectDetailsProps = {
  data: FormValues[];
};

const ProspectDetailsTable = ({ data }: ProspectDetailsProps) => {
  return (
    <div className="table-container">
      <table className="opportunity-table">
        <thead>
          {/* <tr>
            <th>Month</th>
            <th>Quarter</th>
            <th>Prospect</th>
            <th>Geo</th>
            <th>LOB</th>
            <th>Call 1 Checked</th>
            <th>Call 1 Notes</th>
            <th>Call 2 Checked</th>
            <th>Call 2 Notes</th>
            <th>Call 3 Checked</th>
            <th>Call 3 Notes</th>
            <th>Core Offerings</th>
            <th>Primary Need</th>
            <th>Secondary Need</th>
            <th>Trace</th>
            <th>Sales Spoc</th>
            <th>Opp ID</th>
            <th>Opp Details</th>
            <th>Deck</th>
            <th>RAG</th>
            <th>Remark</th>
          </tr> */}

          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.prospect}</td>
              <td>{row.geo}</td>
              <td>{row.month}</td>
              <td>{row.quarter}</td>
              <td>{row.lob}</td>
              {/* <td>
                <span className={row.call1.checked ? "badge-yes" : "badge-no"}>
                  {row.call1.checked ? "Yes" : "No"}
                </span>
              </td> */}
              <td>{row.call1.notes}</td>
              {/* <td>
                <span className={row.call2.checked ? "badge-yes" : "badge-no"}>
                  {row.call1.checked ? "Yes" : "No"}
                </span>
              </td> */}
              <td>{row.call2.notes}</td>
              {/* <td>
                <span className={row.call3.checked ? "badge-yes" : "badge-no"}>
                  {row.call1.checked ? "Yes" : "No"}
                </span>
              </td> */}
              <td>{row.call3.notes}</td>
              <td>{row.coreOfferings}</td>
              <td>{row.primaryNeed}</td>
              <td>{row.secondaryNeed}</td>
              <td>{row.trace}</td>
              <td>{row.salesSpoc}</td>
              <td>{row.oppId}</td>
              <td>{row.oppDetails}</td>
              <td>{row.deck}</td>
              <td>{row.rag}</td>
              <td>{row.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProspectDetailsTable;
