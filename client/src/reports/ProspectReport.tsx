import React from "react";
import "./ProspectReport.css";

const ProspectReport: React.FC = () => {
  const dummyData = [
    { month: "Jan", prospect: "ABC Corp", geo: "USA", lob: "Health", status: "Open" },
    { month: "Feb", prospect: "XYZ Ltd", geo: "India", lob: "Life Insurance", status: "Closed" },
    { month: "Mar", prospect: "Acme Inc", geo: "APAC", lob: "General", status: "In Progress" },
  ];

  return (
    <div className="report-card">
      <h1>Prospect Report</h1>
      <table className="report-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Prospect</th>
            <th>Geo</th>
            <th>LOB</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((row, index) => (
            <tr key={index}>
              <td>{row.month}</td>
              <td>{row.prospect}</td>
              <td>{row.geo}</td>
              <td>{row.lob}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProspectReport;
