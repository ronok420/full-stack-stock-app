import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import DashboardLayout from "./components/DashboardLayout";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load pages
const HomePage = lazy(() => import("./pages/HomePage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const DataTablePage = lazy(() => import("./pages/DataTablePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/table" element={<DataTablePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Suspense>
      </DashboardLayout>
    </Router>
  );
}

export default App;
