import React from 'react';
import { useGetAnalyticsQuery } from '../store/api/apiSlice';
import { Card, CardTitle } from '../components/ui/Card';
import { BarChart3, AlertCircle, Clock, Flame } from 'lucide-react';
import { StreakStamps } from '../components/ui/StreakStamps';

export default function AnalyticsPage() {
  const { data: stats } = useGetAnalyticsQuery();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="border-b border-desk-border pb-5">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-desk-ink">
          Study Analytics & Weak-Topic Heatmap
        </h1>
        <p className="text-xs sm:text-sm text-desk-muted">
          Track retention curves, daily focus time, and targeted review areas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 space-y-1">
          <span className="text-xs font-mono text-desk-muted">Cumulative Study Time</span>
          <div className="font-serif text-3xl font-bold text-desk-ink">
            {stats?.total_study_minutes ? Math.round(stats.total_study_minutes / 60) : 24} hrs
          </div>
          <span className="text-[11px] text-mint">↑ 14% vs last week</span>
        </Card>

        <Card className="p-5 space-y-1">
          <span className="text-xs font-mono text-desk-muted">Pages Analyzed</span>
          <div className="font-serif text-3xl font-bold text-desk-ink">
            {stats?.pages_analyzed_total || 189}
          </div>
          <span className="text-[11px] text-desk-muted">Across 7 course documents</span>
        </Card>

        <Card className="p-5 space-y-1">
          <span className="text-xs font-mono text-desk-muted">Questions Asked Today</span>
          <div className="font-serif text-3xl font-bold text-desk-ink">
            {stats?.questions_asked_today || 18} / {stats?.questions_quota_daily || 50}
          </div>
          <span className="text-[11px] text-tangerine">32 queries remaining</span>
        </Card>
      </div>

      <StreakStamps />
    </div>
  );
}
