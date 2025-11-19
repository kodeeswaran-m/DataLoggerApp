import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProspectDetailForm from "../pages/ProspectDetailForm/ProspectDetailForm";
import ProspectDetailsSummary from "../pages/ProspectDetailsSummary/ProspectDetailsSummary";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Summary page */}
      <Route path="/" element={<ProspectDetailsSummary />} />
      <Route path="/summary" element={<ProspectDetailsSummary />} />

      {/* Form creation */}
      <Route path="/form" element={<ProspectDetailForm />} />

      {/* Form edit */}
      <Route path="/form/:id" element={<ProspectDetailForm />} />

      {/* Fallback: redirect unknown to summary */}
      <Route path="*" element={<Navigate to="/summary" replace />} />
    </Routes>
  );
};

export default AppRoutes;
