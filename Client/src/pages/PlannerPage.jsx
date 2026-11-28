import React from 'react';
import { useGetStudyPlanQuery } from '../store/api/apiSlice';
import { Card, CardTitle } from '../components/ui/Card';
import { CalendarDays, Clock, Check } from 'lucide-react';
import { cn } from '../lib/utils';

export default function PlannerPage() {
  const { data: plan } = useGetStudyPlanQuery();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-desk-border pb-5">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-desk-ink">
            Study Planner & Exam Countdown
          </h1>
          <p className="text-xs sm:text-sm text-desk-muted">
            Daily structured tasks tuned to your target exam date ({plan?.exam_date || 'Dec 15'}).
          </p>
        </div>
        <div className="text-xs font-mono text-desk-muted bg-desk-card px-3 py-1.5 rounded-xl border border-desk-border">
          Target: {plan?.daily_target_hours || 2.5} hrs / day
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plan?.tasks?.map((task) => (
          <Card key={task.id} className="p-4 flex items-start gap-3 border border-desk-border shadow-desk-sm">
            <div className={cn('flex h-5 w-5 items-center justify-center rounded-md border mt-0.5', task.is_completed ? 'bg-mint text-white border-mint' : 'border-desk-border')}>
              {task.is_completed && <Check className="h-3.5 w-3.5 stroke-[3]" />}
            </div>
            <div className="flex-1 text-xs space-y-1">
              <span className={cn('font-semibold text-sm text-desk-ink block', task.is_completed && 'line-through text-desk-muted')}>
                {task.title}
              </span>
              <div className="flex items-center gap-3 text-[10px] font-mono text-desk-muted">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {task.duration_minutes} mins</span>
                <span className="uppercase tracking-wider">• {task.task_type}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
