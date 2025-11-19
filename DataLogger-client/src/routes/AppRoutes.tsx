<<<<<<< HEAD
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProspectDetailForm from "../pages/ProspectDetailForm/ProspectDetailForm";
import ProspectDetailsSummary from "../pages/ProspectDetailsSummary/ProspectDetailsSummary";
=======
import { Routes, Route } from "react-router-dom";
import ProspectDetailsSummary from "../pages/ProspectDetailsSummary/ProspectDetailsSummary";
import ProspectDetailForm from "../pages/ProspectDetailForm/ProspectDetailForm";
import ProspectCharts from "../pages/ProspectCharts/ProspectCharts";
>>>>>>> edcc113ceb9efe23fd06c2534e3c67c5378efc78

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Summary page */}
      <Route path="/" element={<ProspectDetailsSummary />} />
<<<<<<< HEAD
      <Route path="/summary" element={<ProspectDetailsSummary />} />

      {/* Form creation */}
=======
      <Route path="/summary" element={<ProspectCharts/>} />
>>>>>>> edcc113ceb9efe23fd06c2534e3c67c5378efc78
      <Route path="/form" element={<ProspectDetailForm />} />

      {/* Form edit */}
      <Route path="/form/:id" element={<ProspectDetailForm />} />

      {/* Fallback: redirect unknown to summary */}
      <Route path="*" element={<Navigate to="/summary" replace />} />
    </Routes>
  );
};

export default AppRoutes;
