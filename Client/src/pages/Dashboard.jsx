import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Flame,
  BookOpen,
  ArrowRight,
  Layers,
  Sparkles,
  CalendarDays,
  FileText,
  Clock,
  TrendingUp,
  RotateCw,
} from 'lucide-react';
import { useGetSubjectsQuery, useGetStudyPlanQuery, useGetAnalyticsQuery, useGetDueFlashcardsQuery } from '../store/api/apiSlice';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { StreakStamps } from '../components/ui/StreakStamps';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { InkProgressBar } from '../components/ui/ProgressRibbon';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const { data: subjects = [], isLoading: loadingSubjects } = useGetSubjectsQuery();
  const { data: plan } = useGetStudyPlanQuery();
  const { data: analytics } = useGetAnalyticsQuery();
  const { data: dueCards = [] } = useGetDueFlashcardsQuery();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* GREETING HERO & STREAK BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-desk-border pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-tangerine/10 px-3 py-1 text-xs font-mono text-tangerine border border-tangerine/20 mb-1">
            <Flame className="h-3.5 w-3.5" /> 14-Day Study Streak
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-desk-ink">
            Good morning, Alex.
          </h1>
          <p className="text-sm text-desk-muted font-sans">
            Your study desk is prepared. 3 flashcards are due for review, and midterm exams are in 21 days.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <NavLink to="/flashcards">
            <Button variant="primary" className="gap-2">
              <Layers className="h-4 w-4" />
              <span>Review Due ({dueCards.length || 3})</span>
            </Button>
          </NavLink>
          <NavLink to="/workspace">
            <Button variant="secondary" className="gap-2">
              <Sparkles className="h-4 w-4 text-violet" />
              <span>Ask AI Assistant</span>
            </Button>
          </NavLink>
        </div>
      </div>

      {/* BENTO GRID ROW 1: STREAK STAMPS & QUICK CONTINUE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Streak Stamp Tile */}
        <div className="lg:col-span-2">
          <StreakStamps />
        </div>

        {/* Quick Continue Card */}
        <Card variant="elevated" className="flex flex-col justify-between p-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Badge variant="tangerine">Continue Reading</Badge>
              <span className="text-[11px] font-mono text-desk-muted">p. 14 / 42</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-desk-ink leading-snug">
              Reaction Mechanisms: Nucleophilic Substitution
            </h3>
            <p className="text-xs text-desk-muted mt-1">
              Organic Chemistry II • Chapter 4
            </p>
          </div>

          <div className="pt-4 border-t border-desk-border/60">
            <InkProgressBar
              progress={65}
              label="Reading Progress"
              sublabel="Last active: Yesterday"
              color="tangerine"
            />
            <NavLink to="/workspace" className="block mt-4">
              <Button size="sm" variant="secondary" className="w-full justify-between">
                <span>Resume in Workspace</span>
                <ArrowRight className="h-4 w-4 text-tangerine" />
              </Button>
            </NavLink>
          </div>
        </Card>
      </div>

      {/* BENTO GRID ROW 2: SUBJECTS OVERVIEW & TODAY'S TASKS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subjects Notebook Stack */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-desk-ink">
              Your Study Notebooks
            </h2>
            <NavLink to="/subjects" className="text-xs font-mono text-tangerine hover:underline flex items-center gap-1">
              <span>View all notebooks</span>
              <ArrowRight className="h-3 w-3" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {subjects.map((subj) => (
              <Card
                key={subj.id}
                className="group relative overflow-hidden border border-desk-border hover:shadow-desk-md transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Colored Notebook Spine Accent */}
                <div
                  style={{ backgroundColor: subj.color }}
                  className="absolute top-0 left-0 bottom-0 w-2.5"
                />

                <div className="pl-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-desk-muted">
                      {subj.code}
                    </span>
                    <span className="text-xs font-mono font-semibold" style={{ color: subj.color }}>
                      {subj.mastery_percentage}%
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-desk-ink group-hover:text-tangerine transition-colors">
                    {subj.name}
                  </h4>
                  <p className="text-xs text-desk-muted line-clamp-2">
                    {subj.description}
                  </p>
                </div>

                <div className="pl-2 pt-3 mt-3 border-t border-desk-border/50 flex items-center justify-between text-[11px] font-mono text-desk-muted">
                  <span>{subj.document_count} docs</span>
                  <span>{subj.flashcard_count} cards</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Today's Planner Tasks Checklist */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between border-b border-desk-border pb-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-tangerine" />
              <CardTitle className="text-base">Today's Study Plan</CardTitle>
            </div>
            <span className="text-[11px] font-mono text-desk-muted">
              Nov 24
            </span>
          </div>

          <div className="space-y-2.5">
            {plan?.tasks?.map((task) => (
              <div
                key={task.id}
                className={cn(
                  'flex items-start gap-3 p-2.5 rounded-xl border transition-colors select-none',
                  task.is_completed
                    ? 'bg-mint/10 border-mint/30 text-desk-muted'
                    : 'bg-desk-sub/40 border-desk-border text-desk-ink'
                )}
              >
                <div className="mt-0.5">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.is_completed}
                    className="h-4 w-4 rounded text-tangerine focus:ring-tangerine cursor-pointer"
                  />
                </div>
                <div className="flex-1 text-xs">
                  <div className={cn('font-medium', task.is_completed && 'line-through')}>
                    {task.title}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-desk-muted mt-0.5">
                    <Clock className="h-3 w-3" />
                    <span>{task.duration_minutes} mins</span>
                    <span className="uppercase tracking-wider">• {task.task_type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
