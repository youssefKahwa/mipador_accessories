import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import LanguageLayout from "./features/i18n/LanguageLayout";
import { CustomCursor } from "./components/CustomCursor";

const App: React.FC = () => {
  return (
    <MotionConfig reducedMotion="user">
    <CustomCursor />
    <Router>
      <Routes>
        {/* Redirect root → default language */}
        <Route path="/" element={<Navigate to="/fr" replace />} />

        {/* All languages handled here */}
        <Route path="/:lang/*" element={<LanguageLayout />} />
      </Routes>
    </Router>
    </MotionConfig>
  );
};

export default App;