// src/components/ProspectTable/ProspectDetailsTable.config.ts
export const columns = [
  { key: "prospect", label: "Prospect" },
  { key: "geo", label: "Geo" },
  { key: "month", label: "Month" },
  { key: "quarter", label: "Quarter" },
  { key: "lob", label: "LOB" },

  // nested call fields (Option B)
  { key: "call1.notes", label: "Call 1 - Discovery / Solutions" },
  { key: "call2.notes", label: "Call 2 - Solutions / Offerings" },
  { key: "call3.notes", label: "Call 3 - POC/Proposal" },

  { key: "coreOfferings", label: "Core Offerings" },
  { key: "primaryNeed", label: "Primary Need" },
  { key: "secondaryNeed", label: "Secondary Need" },
  { key: "category", label: "Category" },

  { key: "trace", label: "Trace" },
  { key: "salesSpoc", label: "Sales Spoc" },
  { key: "oppId", label: "Opp ID" },
  { key: "oppDetails", label: "Opp Details" },
  { key: "deck", label: "Deck" },
  { key: "rag", label: "RAG" },
  { key: "remark", label: "Remark" },

  { key: "actions", label: "Actions" },
];

export type ProspectDetailsTableProps = {
  data: any[];
  selectedColumns: string[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
};
