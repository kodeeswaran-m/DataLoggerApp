import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="content-wrapper">
        <div className="content-card">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
};

export default App;

// App Logo
{
  /* <Shredder /> */
}
{
  /* <PanelRightClose /> */
}
{
  /* <PanelRightClose /> */
}