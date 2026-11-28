import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  MessageSquareText,
  Layers,
  Sparkles,
  CalendarDays,
  BarChart3,
  Settings,
  Sun,
  Moon,
  Search,
  Menu,
  ChevronLeft,
  ChevronRight,
  Flame,
  User,
  Palette,
  ExternalLink,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import { CommandPalette } from './CommandPalette';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Global Ctrl+K / Cmd+K shortcut listener
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Subjects', path: '/subjects', icon: BookOpen },
    { label: 'Workspace', path: '/workspace', icon: MessageSquareText },
    { label: 'Flashcards', path: '/flashcards', icon: Layers, badge: '3 Due' },
    { label: 'Quizzes', path: '/quizzes', icon: Sparkles },
    { label: 'Study Planner', path: '/planner', icon: CalendarDays },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-desk-bg text-desk-ink font-sans transition-colors duration-200">
      <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />

      {/* DESKTOP SIDEBAR */}
      <aside
        className={cn(
          'hidden md:flex flex-col border-r border-desk-border bg-desk-card transition-all duration-300 z-30 select-none',
          collapsed ? 'w-[76px]' : 'w-[260px]'
        )}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-desk-border">
          <NavLink to="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-tangerine text-white shadow-desk-sm">
              <BookOpen className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div className="animate-in fade-in duration-200">
                <span className="font-serif text-lg font-bold text-desk-ink tracking-tight block leading-tight">
                  StudyMate
                </span>
                <span className="text-[10px] font-mono text-desk-muted uppercase tracking-wider">
                  The Study Desk
                </span>
              </div>
            )}
          </NavLink>

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg border border-desk-border bg-desk-sub text-desk-muted hover:text-desk-ink hover:bg-desk-card transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle sidebar collapse"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-tangerine text-white shadow-desk-sm'
                    : 'text-desk-muted hover:text-desk-ink hover:bg-desk-sub/70'
                )}
              >
                <Icon className={cn('h-5 w-5 flex-shrink-0', isActive ? 'text-white' : 'text-desk-muted')} />
                {!collapsed && (
                  <div className="flex flex-1 items-center justify-between">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={cn(
                          'text-[10px] font-mono px-1.5 py-0.2 rounded-full font-semibold',
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-highlighter/50 text-[#16141F]'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Quick Design Showroom Link */}
        <div className="px-3 pb-2">
          <NavLink
            to="/design"
            className={cn(
              'flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono text-desk-muted hover:text-desk-ink hover:bg-desk-sub border border-dashed border-desk-border/80 transition-colors',
              collapsed && 'justify-center px-0'
            )}
            title="Design Showroom (/design)"
          >
            <Palette className="h-4 w-4 text-violet" />
            {!collapsed && <span>/design Showroom</span>}
          </NavLink>
        </div>

        {/* User Desk Footer Pill */}
        <div className="p-3 border-t border-desk-border bg-desk-card">
          <div
            className={cn(
              'flex items-center rounded-xl p-2 bg-desk-sub/60 border border-desk-border',
              collapsed ? 'justify-center' : 'justify-between'
            )}
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-desk-card text-xs font-serif font-bold text-desk-ink border border-desk-border">
                {user?.full_name ? user.full_name.charAt(0) : 'A'}
              </div>
              {!collapsed && (
                <div className="truncate">
                  <div className="text-xs font-medium text-desk-ink truncate">
                    {user?.full_name || 'Alex Vance'}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-tangerine">
                    <Flame className="h-3 w-3" />
                    <span>{user?.study_streak_days || 14}d streak</span>
                  </div>
                </div>
              )}
            </div>

            {!collapsed && (
              <button
                type="button"
                onClick={() => dispatch(toggleTheme())}
                className="p-1.5 rounded-lg text-desk-muted hover:text-desk-ink hover:bg-desk-card transition-colors"
                title={`Switch to ${theme === 'paper' ? 'Midnight Library' : 'Paper'}`}
                aria-label="Toggle theme"
              >
                {theme === 'paper' ? <Moon className="h-4 w-4 text-violet" /> : <Sun className="h-4 w-4 text-highlighter" />}
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 pb-24 md:pb-6">
        {/* TOP BAR */}
        <header className="h-16 sticky top-0 z-20 border-b border-desk-border bg-desk-card/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Brand Button */}
            <div className="flex md:hidden items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-tangerine text-white">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="font-serif text-base font-bold text-desk-ink">
                StudyMate
              </span>
            </div>

            {/* Breadcrumb / Page Title */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-desk-muted">
              <span>Desk</span>
              <span>/</span>
              <span className="text-desk-ink capitalize font-medium">
                {location.pathname.replace('/', '') || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Command Palette Launcher */}
            <button
              type="button"
              id="cmd-palette-btn"
              onClick={() => setIsCmdOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-desk-border bg-desk-sub/60 hover:bg-desk-sub text-xs text-desk-muted hover:text-desk-ink transition-all shadow-desk-sm"
              aria-label="Open command palette"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search study desk...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded bg-desk-card px-1.5 py-0.2 text-[10px] font-mono border border-desk-border">
                Ctrl K
              </kbd>
            </button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              id="theme-toggle-btn"
              onClick={() => dispatch(toggleTheme())}
              className="inline-flex items-center justify-center rounded-xl border border-desk-border bg-desk-card text-desk-ink shadow-desk-sm hover:bg-desk-sub hover:border-desk-ink/20 h-8 w-8 p-0 transition-all active:scale-95"
              aria-label="Toggle day/night theme"
            >
              {theme === 'paper' ? <Moon className="h-4 w-4 text-violet" /> : <Sun className="h-4 w-4 text-highlighter" />}
            </button>
          </div>
        </header>

        {/* OUTLET PAGE CONTAINER */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

        {/* MOBILE BOTTOM TAB BAR */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-desk-border bg-desk-card/95 backdrop-blur-md px-2 flex items-center justify-around z-40 select-none shadow-desk-lg">
          {[
            { label: 'Desk', path: '/dashboard', icon: LayoutDashboard },
            { label: 'Subjects', path: '/subjects', icon: BookOpen },
            { label: 'Chat', path: '/workspace', icon: MessageSquareText },
            { label: 'Cards', path: '/flashcards', icon: Layers, badge: '3' },
            { label: 'Planner', path: '/planner', icon: CalendarDays },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname.startsWith(tab.path);
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={cn(
                  'flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] font-medium transition-colors relative',
                  isActive ? 'text-tangerine' : 'text-desk-muted hover:text-desk-ink'
                )}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {tab.badge && (
                    <span className="absolute -top-1 -right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-tangerine text-[8px] font-mono text-white">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="mt-0.5">{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-1 w-4 h-0.5 rounded-full bg-tangerine" />
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
