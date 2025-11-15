import "./ProspectDetailsTable.css";

export const columns = [
  { key: "prospect", label: "Prospect" },
  { key: "geo", label: "Geo" },
  { key: "month", label: "Month" },
  { key: "quarter", label: "Quarter" },
  { key: "lob", label: "LOB" },

  { key: "call1.notes", label: "Call 1 Notes" },
  { key: "call2.notes", label: "Call 2 Notes" },
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

export type ProspectDetailsTableProps = {
  data: any[];
  selectedColumns: string[];
};

const getNestedValue = (obj: any, path: string) =>
  path.split(".").reduce((acc, key) => acc?.[key], obj);

const ProspectDetailsTable = ({
  data,
  selectedColumns,
}: ProspectDetailsTableProps) => {
  return (
    <div className="table-container">
      <table className="opportunity-table">
        <thead>
          <tr>
            {columns
              .filter((col) => selectedColumns.includes(col.key))
              .map((col) => (
                <th className="col-name" key={col.key}>{col.label}</th>
              ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns
                .filter((col) => selectedColumns.includes(col.key))
                .map((col) => (
                  <td key={col.key}>
                    {getNestedValue(row, col.key) ?? ""}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProspectDetailsTable;





// import "./ProspectDetailsTable.css";

// const columns = [
//   { key: "prospect", label: "Prospect" },
//   { key: "geo", label: "Geo" },
//   { key: "month", label: "Month" },
//   { key: "quarter", label: "Quarter" },
//   { key: "lob", label: "LOB" },

//   { key: "call1.notes", label: "Call 1 Notes" },
//   { key: "call2.notes", label: "Call 2 Notes" },
//   { key: "call3.notes", label: "Call 3 Notes" },

//   { key: "coreOfferings", label: "Core Offerings" },
//   { key: "primaryNeed", label: "Primary Need" },
//   { key: "secondaryNeed", label: "Secondary Need" },
//   { key: "trace", label: "Trace" },
//   { key: "salesSpoc", label: "Sales Spoc" },
//   { key: "oppId", label: "Opp ID" },
//   { key: "oppDetails", label: "Opp Details" },
//   { key: "deck", label: "Deck" },
//   { key: "rag", label: "RAG" },
//   { key: "remark", label: "Remark" },
// ];

// export type FormValues = {
//   month: string;
//   quarter: string;
//   prospect: string;
//   geo: string;
//   lob: string;
//   call1: { checked: boolean; notes: string };
//   call2: { checked: boolean; notes: string };
//   call3: { checked: boolean; notes: string };
//   coreOfferings: string;
//   primaryNeed: string;
//   secondaryNeed: string;
//   trace: string;
//   salesSpoc: string;
//   oppId: string;
//   oppDetails: string;
//   deck: string;
//   rag: string;
//   remark: string;
// };

// type ProspectDetailsProps = {
//   data: FormValues[];
// };

// // --- Helper to get nested values like "call1.notes"
// const getNestedValue = (obj: any, path: string) =>
//   path.split(".").reduce((acc, key) => acc?.[key], obj);

// const ProspectDetailsTable = ({ data }: ProspectDetailsProps) => {
//   return (
//     <div className="table-container">
//       <table className="opportunity-table">
//         <thead>
//           <tr>
//             {columns.map((col) => (
//               <th key={col.key}>{col.label}</th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((row, index) => (
//             <tr key={index}>
//               {columns.map((col) => (
//                 <td key={col.key}>{getNestedValue(row, col.key) ?? ""}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProspectDetailsTable;
