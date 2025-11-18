import { Routes, Route } from "react-router-dom";
import About from "../pages/About";
import ProspectDetailsSummary from "../pages/ProspectDetailsSummary/ProspectDetailsSummary";
import ProspectDetailForm from "../pages/ProspectDetailForm/ProspectDetailForm";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProspectDetailsSummary />} />
      <Route path="/summary" element={<About />} />
      <Route path="/form" element={<ProspectDetailForm />} />
    </Routes>
  );
};

export default AppRoutes;
