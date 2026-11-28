import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from './store/slices/themeSlice';
import { AppShell } from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import SubjectsPage from './pages/SubjectsPage';
import WorkspacePage from './pages/WorkspacePage';
import FlashcardsPage from './pages/FlashcardsPage';
import QuizzesPage from './pages/QuizzesPage';
import PlannerPage from './pages/PlannerPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import DesignShowroom from './pages/DesignShowroom';

export default function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    if (theme === 'midnight') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    dispatch(setTheme(theme === 'paper' ? 'midnight' : 'paper'));
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Design Showroom */}
        <Route
          path="/design"
          element={
            <DesignShowroom
              isDark={theme === 'midnight'}
              onToggleTheme={handleToggleTheme}
            />
          }
        />

        {/* App Shell Routes */}
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Redirect root to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
