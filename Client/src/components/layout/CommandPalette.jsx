import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  BookOpen,
  FileText,
  Layers,
  Sparkles,
  CalendarDays,
  Sun,
  Moon,
  RotateCw,
  ArrowRight,
  Palette,
  X,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import { api } from '../../api/index';
import { cn } from '../../lib/utils';

export function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Build searchable items
  useEffect(() => {
    const defaultActions = [
      {
        id: 'nav-dashboard',
        category: 'Navigation',
        title: 'Go to Dashboard',
        subtitle: 'Overview, study streak, and daily tasks',
        icon: Sparkles,
        action: () => navigate('/dashboard'),
      },
      {
        id: 'nav-subjects',
        category: 'Navigation',
        title: 'All Subjects',
        subtitle: '3 enrolled study notebooks',
        icon: BookOpen,
        action: () => navigate('/subjects'),
      },
      {
        id: 'nav-flashcards',
        category: 'Navigation',
        title: 'Review Due Flashcards',
        subtitle: '3 cards due for SM-2 spaced repetition',
        icon: Layers,
        badge: 'Due Today',
        action: () => navigate('/flashcards'),
      },
      {
        id: 'nav-quizzes',
        category: 'Navigation',
        title: 'Practice Quizzes',
        subtitle: 'Organic Chemistry & Balanced Trees',
        icon: Sparkles,
        action: () => navigate('/quizzes'),
      },
      {
        id: 'nav-planner',
        category: 'Navigation',
        title: 'Study Planner',
        subtitle: 'Weekly exam targets & checklist',
        icon: CalendarDays,
        action: () => navigate('/planner'),
      },
      {
        id: 'nav-design',
        category: 'Quick Action',
        title: 'Open Design Showroom',
        subtitle: 'Verify /design tokens, buttons, and atoms',
        icon: Palette,
        action: () => navigate('/design'),
      },
      {
        id: 'act-theme',
        category: 'Quick Action',
        title: `Switch Theme to ${theme === 'paper' ? 'Midnight Library' : 'Paper'}`,
        subtitle: 'Toggle tactile day/night palette',
        icon: theme === 'paper' ? Moon : Sun,
        action: () => dispatch(toggleTheme()),
      },
      {
        id: 'act-reset',
        category: 'Quick Action',
        title: 'Reset Demo Seed Data',
        subtitle: 'Restore pristine state in localStorage',
        icon: RotateCw,
        action: async () => {
          await api.resetSeeds();
          window.location.reload();
        },
      },
    ];

    if (!query.trim()) {
      setResults(defaultActions);
      return;
    }

    const q = query.toLowerCase();
    const filtered = defaultActions.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
    setResults(filtered);
    setSelectedIndex(0);
  }, [query, theme, navigate, dispatch]);

  // Keyboard navigation listener
  useEffect(() => {
    function handleKeyDown(e) {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          results[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-desk-ink/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl rounded-2xl border border-desk-border bg-desk-card shadow-desk-lg overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-desk-border bg-desk-card">
          <Search className="h-5 w-5 text-desk-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search subjects, flashcards, docs..."
            className="w-full bg-transparent text-sm text-desk-ink placeholder:text-desk-muted focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-desk-muted hover:text-desk-ink p-1 rounded-md"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-desk-sub px-2 py-0.5 text-[10px] font-mono text-desk-muted border border-desk-border">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="py-8 text-center text-xs text-desk-muted font-serif">
              No matching commands or study notes found for "{query}".
            </div>
          ) : (
            results.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-3 py-2.5 text-xs transition-colors cursor-pointer select-none',
                    isSelected
                      ? 'bg-tangerine/15 text-desk-ink font-medium'
                      : 'text-desk-ink hover:bg-desk-sub/60'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg border',
                        isSelected
                          ? 'bg-tangerine text-white border-tangerine'
                          : 'bg-desk-sub text-desk-muted border-desk-border'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{item.title}</span>
                        {item.badge && (
                          <span className="text-[10px] font-mono text-mint bg-mint/15 px-1.5 py-0.2 rounded border border-mint/30">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-desk-muted">{item.subtitle}</p>
                    </div>
                  </div>

                  <ArrowRight
                    className={cn(
                      'h-4 w-4 transition-transform',
                      isSelected ? 'translate-x-0.5 opacity-100 text-tangerine' : 'opacity-0'
                    )}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Keyboard Helper Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-desk-border bg-desk-sub/50 text-[11px] font-mono text-desk-muted">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-desk-card border border-desk-border">↑</kbd>{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-desk-card border border-desk-border">↓</kbd>{' '}
              Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-desk-card border border-desk-border">↵</kbd>{' '}
              Select
            </span>
          </div>
          <span>StudyMate Quick Desk</span>
        </div>
      </div>
    </div>
  );
}
