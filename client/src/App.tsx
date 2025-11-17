import React, { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Demo from "./pages/Demo";
import ProspectReport from "./reports/ProspectReport";
import "./App.css";
import ProspectDetailsSummary from "./pages/ProspectDetailsSummary";
import ProspectStackedChart from "./components/ProspectStackedChart";

const App: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("demo");

  return (
    <div className="app-wrapper">
      <Sidebar activeMenu={activeMenu} onMenuClick={setActiveMenu} />

      <main className="main-content">
        {activeMenu === "demo" && <Demo />}
        {activeMenu === "report" && (
          <ProspectStackedChart />
        )}
        {activeMenu === "summary" && (
          <ProspectDetailsSummary />
        )}
      </main>
    </div>
  );
};

export default App;
