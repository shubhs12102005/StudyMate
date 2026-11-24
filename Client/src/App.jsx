import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DesignShowroom from './pages/DesignShowroom';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('studymate_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('studymate_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('studymate_theme', 'paper');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/design"
          element={
            <DesignShowroom isDark={isDark} onToggleTheme={toggleTheme} />
          }
        />
        {/* For Phase 0, default route redirects to /design showroom */}
        <Route path="/" element={<Navigate to="/design" replace />} />
        <Route path="*" element={<Navigate to="/design" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
