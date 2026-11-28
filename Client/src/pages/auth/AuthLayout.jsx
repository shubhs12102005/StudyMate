import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Sparkles, Sun, Moon, CheckCircle2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import { Button } from '../../components/ui/Button';
import { UnderlineScribble, HandDrawnArrow } from '../../components/ui/SvgFlourishes';

export default function AuthLayout({ children, title, subtitle }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className="min-h-screen bg-desk-bg text-desk-ink flex flex-col justify-between transition-colors duration-200">
      {/* Top Bar with brand and theme toggle */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-desk-border bg-desk-card/80 backdrop-blur-sm z-20">
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-tangerine text-white shadow-desk-sm transition-transform group-hover:scale-105">
            <BookOpen className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="font-serif text-lg font-bold tracking-tight text-desk-ink block leading-tight">
              StudyMate
            </span>
            <span className="text-[10px] font-mono text-desk-muted uppercase tracking-wider">
              The Study Desk
            </span>
          </div>
        </NavLink>

        <div className="flex items-center gap-3">
          <Button
            id="auth-theme-toggle"
            variant="secondary"
            size="icon-sm"
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
          >
            {theme === 'paper' ? (
              <Moon className="h-4 w-4 text-violet" />
            ) : (
              <Sun className="h-4 w-4 text-highlighter" />
            )}
          </Button>

          <NavLink to="/">
            <Button variant="ghost" size="sm" className="text-xs font-mono">
              Back to Home
            </Button>
          </NavLink>
        </div>
      </header>

      {/* Main Split Layout Container */}
      <main className="flex-1 flex items-stretch max-w-7xl w-full mx-auto p-4 sm:p-8 lg:p-12">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-desk-border bg-desk-card shadow-desk-lg overflow-hidden">
          {/* Left Hero Pane (Hidden on small mobile, visible on lg+) */}
          <div className="hidden lg:flex lg:col-span-5 bg-desk-sub/60 p-10 flex-col justify-between border-r border-desk-border relative overflow-hidden">
            {/* Subtle decorative stamp / background watermark */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border-4 border-dashed border-desk-border/40 pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-tangerine/10 px-3.5 py-1 text-xs font-mono text-tangerine border border-tangerine/25">
                <Sparkles className="h-3.5 w-3.5" />
                The Mindful Study System
              </div>

              <h2 className="font-serif text-3xl xl:text-4xl font-bold tracking-tight text-desk-ink leading-snug">
                Your tactile study desk,{' '}
                <span className="relative inline-block text-tangerine">
                  always open.
                  <UnderlineScribble color="#FF6B35" className="absolute -bottom-1 left-0 w-full" />
                </span>
              </h2>

              <p className="text-sm text-desk-muted leading-relaxed font-sans">
                Review notes with real yellow marker page citations, flip 3D SM-2 flashcards, and stamp your daily study streak into long-term retention.
              </p>

              {/* Tilted Sticky Note Stationery Touch */}
              <div className="mt-8 p-4 rounded-xl bg-highlighter/15 border border-highlighter/40 shadow-desk-sm rotate-[-2deg] transition-transform hover:rotate-0 duration-200">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-desk-ink mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-tangerine" />
                  Study Desk Axiom
                </div>
                <p className="text-xs text-desk-ink/90 font-serif italic">
                  "Active retrieval with spaced repetition produces up to 2.4× higher retention on final exams than re-reading notes."
                </p>
                <span className="block text-[10px] font-mono text-desk-muted mt-2 text-right">
                  — Cognitive Psychology Review
                </span>
              </div>
            </div>

            {/* Bottom Benefit Highlights */}
            <div className="space-y-2.5 pt-8 border-t border-desk-border/70 relative z-10">
              <div className="flex items-center gap-2 text-xs font-mono text-desk-muted">
                <CheckCircle2 className="h-3.5 w-3.5 text-mint" />
                Zero hallucinations: answers cite PDF page numbers
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-desk-muted">
                <CheckCircle2 className="h-3.5 w-3.5 text-mint" />
                SuperMemo SM-2 spaced repetition built in
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-desk-muted">
                <CheckCircle2 className="h-3.5 w-3.5 text-mint" />
                Light 'Paper' and Dark 'Midnight Library' themes
              </div>
            </div>
          </div>

          {/* Right Form Pane */}
          <div className="lg:col-span-7 p-6 sm:p-10 xl:p-12 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto space-y-6">
              <div className="space-y-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-desk-ink">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-sm text-desk-muted font-sans">
                    {subtitle}
                  </p>
                )}
              </div>

              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="w-full py-4 text-center text-xs font-mono text-desk-muted border-t border-desk-border bg-desk-card/50">
        StudyMate © {new Date().getFullYear()} • Crafted for focused scholars
      </footer>
    </div>
  );
}
