import React, { useState } from "react";
import Demo from "./Demo";
import ProspectReport from "./ProspectReport";
import Sidebar from "./Sidebar";
import "./App.css";

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<"demo" | "report">("demo");

  return (
    <div className="app-wrapper">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="main-content">
        {activePage === "demo" && <Demo />}
        {activePage === "report" && <ProspectReport />}
      </main>
    </div>
  );
};

export default App;
