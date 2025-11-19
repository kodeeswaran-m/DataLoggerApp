import { Routes, Route } from "react-router-dom";
import ProspectDetailsSummary from "../pages/ProspectDetailsSummary/ProspectDetailsSummary";
import ProspectDetailForm from "../pages/ProspectDetailForm/ProspectDetailForm";
import ProspectCharts from "../pages/ProspectCharts/ProspectCharts";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProspectDetailsSummary />} />
      <Route path="/summary" element={<ProspectCharts/>} />
      <Route path="/form" element={<ProspectDetailForm />} />
    </Routes>
  );
};

export default AppRoutes;
