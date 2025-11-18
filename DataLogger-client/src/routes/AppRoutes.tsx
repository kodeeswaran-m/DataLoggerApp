import { Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProspectDetailsSummary from "../pages/ProspectDetailsSummary/ProspectDetailsSummary";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProspectDetailsSummary />} />
      <Route path="/summary" element={<About />} />
      <Route path="/form" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;
