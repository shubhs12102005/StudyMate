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
  CheckCircle2,
  AlertCircle,
  RotateCw,
  ExternalLink,
} from 'lucide-react';
import {
  useGetSubjectsQuery,
  useGetStudyPlanQuery,
  useToggleStudyTaskMutation,
  useGetAnalyticsQuery,
  useGetDueFlashcardsQuery,
  useGetDocumentsQuery,
} from '../store/api/apiSlice';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StreakStamps } from '../components/ui/StreakStamps';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { InkProgressBar } from '../components/ui/ProgressRibbon';
import QuizTrendChart from '../components/dashboard/QuizTrendChart';
import WeeklyStudyChart from '../components/dashboard/WeeklyStudyChart';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const { data: subjects = [] } = useGetSubjectsQuery();
  const { data: plan } = useGetStudyPlanQuery();
  const { data: analytics } = useGetAnalyticsQuery();
  const { data: dueCards = [] } = useGetDueFlashcardsQuery();
  const { data: documents = [] } = useGetDocumentsQuery();
  const [toggleStudyTask] = useToggleStudyTaskMutation();

  const handleToggleTask = async (taskId) => {
    try {
      await toggleStudyTask(taskId).unwrap();
    } catch (err) {
      console.error('Failed to toggle study task:', err);
    }
  };

  const recentDocs = documents.slice(0, 4);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* 1. GREETING HERO & STREAK BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-desk-border pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-tangerine/10 px-3 py-1 text-xs font-mono text-tangerine border border-tangerine/20 mb-1">
            <Flame className="h-3.5 w-3.5" /> 14-Day Study Streak Active
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-desk-ink">
            Good morning, Alex.
          </h1>
          <p className="text-sm text-desk-muted font-sans">
            Your study desk is prepared. {dueCards.length || 3} flashcards are due for review today, and midterm exams begin in 21 days.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <NavLink to="/flashcards">
            <Button variant="primary" className="gap-2 shadow-desk-md">
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

      {/* 2. BENTO ROW 1: STREAK STAMPS & "CONTINUE READING" */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Streak Stamp Tile (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <StreakStamps />
        </div>

        {/* Quick Continue Card (5 cols) */}
        <Card variant="elevated" className="lg:col-span-5 flex flex-col justify-between p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="tangerine">Continue Reading</Badge>
              <span className="text-[11px] font-mono text-desk-muted">p. 14 of 42</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-desk-ink leading-snug">
              Reaction Mechanisms: Nucleophilic Substitution
            </h3>
            <p className="text-xs text-desk-muted font-sans">
              Organic Chemistry II • Chapter 4 (SN1 vs SN2 Walden Inversion)
            </p>
          </div>

          <div className="pt-4 border-t border-desk-border/60 space-y-4">
            <InkProgressBar
              progress={65}
              label="Reading Progress"
              sublabel="Last active: 2 hours ago"
              color="tangerine"
            />
            <NavLink to="/workspace" className="block">
              <Button size="sm" variant="secondary" className="w-full justify-between">
                <span>Resume in Workspace</span>
                <ArrowRight className="h-4 w-4 text-tangerine" />
              </Button>
            </NavLink>
          </div>
        </Card>
      </div>

      {/* 3. BENTO ROW 2: STUDY CHARTS (QUIZ TREND & WEEKLY STUDY TIME) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5 border border-desk-border shadow-desk-sm">
          <QuizTrendChart data={analytics?.quiz_trends} />
        </Card>

        <Card className="p-5 border border-desk-border shadow-desk-sm">
          <WeeklyStudyChart data={analytics?.weekly_study_time} />
        </Card>
      </div>

      {/* 4. BENTO ROW 3: TODAY'S STUDY TASKS & FLASHCARDS DUE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Today's Planner Tasks (7 cols) */}
        <Card className="lg:col-span-7 p-6 space-y-4 border border-desk-border shadow-desk-sm">
          <div className="flex items-center justify-between border-b border-desk-border pb-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-tangerine" />
              <CardTitle className="text-base font-serif">Today's Study Plan</CardTitle>
            </div>
            <span className="text-xs font-mono text-desk-muted">
              Interactive Checklist
            </span>
          </div>

          <div className="space-y-2.5">
            {plan?.tasks?.map((task) => (
              <div
                key={task.id}
                onClick={() => handleToggleTask(task.id)}
                className={cn(
                  'flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none group',
                  task.is_completed
                    ? 'bg-mint/10 border-mint/30 text-desk-muted'
                    : 'bg-desk-sub/40 hover:bg-desk-sub border-desk-border text-desk-ink'
                )}
              >
                <div className="mt-0.5">
                  <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={() => {}} // handled by parent onClick
                    className="h-4 w-4 rounded text-tangerine focus:ring-tangerine cursor-pointer accent-tangerine"
                  />
                </div>
                <div className="flex-1 text-xs">
                  <div
                    className={cn(
                      'font-medium transition-all',
                      task.is_completed && 'line-through text-desk-muted'
                    )}
                  >
                    {task.title}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-desk-muted mt-1">
                    <Clock className="h-3 w-3" />
                    <span>{task.duration_minutes} mins</span>
                    <span className="uppercase tracking-wider">• {task.task_type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Due Flashcards Preview Card (5 cols) */}
        <Card className="lg:col-span-5 p-6 space-y-4 border border-desk-border shadow-desk-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-desk-border pb-3">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-violet" />
                <CardTitle className="text-base font-serif">SM-2 Spaced Repetition</CardTitle>
              </div>
              <Badge variant="violet" className="text-[10px]">
                {dueCards.length} Cards Due
              </Badge>
            </div>

            <p className="text-xs text-desk-muted font-sans leading-relaxed">
              SuperMemo-2 algorithm prioritizes cards nearing memory decay. Reviewing now strengthens synapse connection by up to 2.4×.
            </p>

            {/* Ruled Card Mini Preview */}
            <div className="p-3.5 rounded-xl border border-desk-border bg-desk-card ruled-lines space-y-1 text-xs">
              <div className="flex items-center justify-between text-[10px] font-mono text-desk-muted">
                <span>Organic Chemistry II</span>
                <span className="text-tangerine font-semibold">Repetition #3</span>
              </div>
              <p className="font-serif font-bold text-desk-ink">
                "What is Walden Inversion, and in which mechanism does it occur?"
              </p>
            </div>
          </div>

          <NavLink to="/flashcards" className="block pt-2">
            <Button variant="primary" className="w-full gap-2 shadow-desk-sm">
              <Layers className="h-4 w-4" />
              <span>Review Due Cards Now</span>
            </Button>
          </NavLink>
        </Card>
      </div>

      {/* 5. BENTO ROW 4: RECENT COURSE DOCUMENTS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-tangerine" />
            <h3 className="font-serif text-lg font-bold text-desk-ink">
              Recent Course Readings
            </h3>
          </div>
          <NavLink
            to="/subjects"
            className="text-xs font-mono text-tangerine hover:underline flex items-center gap-1"
          >
            <span>View all in Notebooks</span>
            <ArrowRight className="h-3 w-3" />
          </NavLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentDocs.map((doc) => {
            const subject = subjects.find((s) => s.id === doc.subject_id);
            return (
              <NavLink
                to="/workspace"
                key={doc.id}
                className="group block"
              >
                <Card className="p-4 h-full border border-desk-border hover:border-tangerine/50 shadow-desk-sm hover:shadow-desk-md transition-all flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      {doc.status === 'ready' && (
                        <Badge variant="mint" className="text-[10px] gap-1">
                          <CheckCircle2 className="h-2.5 w-2.5" /> Ready
                        </Badge>
                      )}
                      {doc.status === 'processing' && (
                        <Badge variant="violet" className="text-[10px] gap-1">
                          <RotateCw className="h-2.5 w-2.5 animate-spin" /> Indexing
                        </Badge>
                      )}
                      {doc.status === 'queued' && (
                        <Badge variant="amber" className="text-[10px] gap-1">
                          <Clock className="h-2.5 w-2.5" /> Queued
                        </Badge>
                      )}
                      {doc.status === 'failed' && (
                        <Badge variant="rose" className="text-[10px] gap-1">
                          <AlertCircle className="h-2.5 w-2.5" /> Failed
                        </Badge>
                      )}

                      <span className="text-[10px] font-mono text-desk-muted">
                        {doc.page_count}p
                      </span>
                    </div>

                    <h4 className="font-serif text-sm font-bold text-desk-ink group-hover:text-tangerine transition-colors line-clamp-2">
                      {doc.title}
                    </h4>

                    {subject && (
                      <span
                        style={{ color: subject.color }}
                        className="text-[11px] font-mono block font-semibold"
                      >
                        {subject.code} • {subject.name}
                      </span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-desk-border/50 flex items-center justify-between text-[11px] font-mono text-desk-muted">
                    <span>{(doc.file_size_bytes / 1024 / 1024).toFixed(1)} MB</span>
                    <span className="text-tangerine group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Open <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </Card>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
