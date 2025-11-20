import { Routes, Route, Navigate} from "react-router-dom";
import ProspectDetailsSummary from "../pages/ProspectDetailsSummary/ProspectDetailsSummary";
import ProspectDetailForm from "../pages/ProspectDetailForm/ProspectDetailForm";
import ProspectCharts from "../pages/ProspectCharts/ProspectCharts";
 
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Summary page */}
      <Route path="/" element={<ProspectDetailsSummary />} />
 
      <Route path="/summary" element={<ProspectCharts/>} />
      <Route path="/form" element={<ProspectDetailForm />} />
 
      {/* Form edit */}
      <Route path="/form/:id" element={<ProspectDetailForm />} />
 
      {/* Fallback: redirect unknown to summary */}
      <Route path="*" element={<Navigate to="/summary" replace />} />
    </Routes>
  );
};
 
export default AppRoutes;