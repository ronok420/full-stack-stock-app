import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import HomePage from "./pages/HomePage"; // Dashboard
import AnalyticsPage from "./pages/AnalyticsPage";
import DataTablePage from "./pages/DataTablePage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/table" element={<DataTablePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
