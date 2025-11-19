// src/components/ProspectTable/ProspectDetailsTable.tsx

import "./ProspectDetailsTable.css";
import LinkIcon from "@mui/icons-material/Link";
import { columns, type ProspectDetailsTableProps } from "./ProspectDetailsTable.config";
import { Skeleton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const getNestedValue = (obj: any, path: string) =>
  path.split(".").reduce((acc: any, key: string) => (acc ? acc[key] : undefined), obj);

const isValidURL = (str: string) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

export default function ProspectDetailsTable({ data, selectedColumns, onEdit, onDelete }: ProspectDetailsTableProps) {
  return (
    <div className="custom-table-container">
      <table className="custom-table">
        <thead>
          <tr className="table-header-row">
            {columns.filter((col) => selectedColumns.includes(col.key)).map((col) => (
              <th key={col.key} className="table-header-cell">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length !== 0 ? (
            data.map((row, rowIndex) => (
              <tr key={row._id || rowIndex} className="table-body-row">
                {columns.filter((col) => selectedColumns.includes(col.key)).map((col) => {
                  if (col.key === "actions") {
                    return (
                      <td key="actions" className="table-body-cell">
                        <div className="actions-wrapper">
                          <EditIcon className="action-icon edit-icon" onClick={() => onEdit?.(row)} />
                          <DeleteIcon className="action-icon delete-icon" onClick={() => onDelete?.(row)} />
                        </div>
                      </td>
                    );
                  }

                  const value = getNestedValue(row, col.key) ?? "";

                  if (col.key === "deck" && typeof value === "string") {
                    return (
                      <td key={col.key} className="table-body-cell deck-cell">
                        {isValidURL(value) ? (
                          <a href={value} target="_blank" rel="noopener noreferrer" className="deck-icon-wrapper" title="Open Deck">
                            <LinkIcon className="deck-icon" />
                          </a>
                        ) : (
                          "--"
                        )}
                      </td>
                    );
                  }

                  // for category array show first value or join
                  if (col.key === "category") {
                    const cat = Array.isArray(row.category) ? row.category.join(", ") : row.category || "";
                    return <td key={col.key} className="table-body-cell">{cat}</td>;
                  }

                  return <td key={col.key} className="table-body-cell">{value}</td>;
                })}
              </tr>
            ))
          ) : (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <tr key={`sk-${i}`} className="skeleton-row">
                  <td
                    colSpan={columns.filter((col) => selectedColumns.includes(col.key)).length}
                    className="table-body-cell"
                  >
                    <Skeleton variant="rectangular" height={35} animation="wave" />
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
