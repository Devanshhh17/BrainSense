import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import InputFormPage from "./pages/InputFormPage";
import PredictionResultPage from "./pages/PredictionResultPage";
import HistoryPage from "./pages/HistoryPage";
import AboutResearchPage from "./pages/AboutResearchPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutResearchPage />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/input" element={<InputFormPage />} />
          <Route path="/results" element={<PredictionResultPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>

        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
