import React from 'react';
import { useGetQuizzesQuery } from '../store/api/apiSlice';
import { Card, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function QuizzesPage() {
  const { data: quizzes = [] } = useGetQuizzesQuery();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="border-b border-desk-border pb-5">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-desk-ink">
          Practice Quizzes
        </h1>
        <p className="text-xs sm:text-sm text-desk-muted">
          Auto-generated active recall tests with animated option feedback and explanations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="p-6 space-y-4 border border-desk-border shadow-desk-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-tangerine bg-tangerine/10 px-2 py-0.5 rounded border border-tangerine/25">
                {quiz.difficulty}
              </span>
              <span className="text-xs font-mono font-semibold text-mint flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Best: {quiz.best_score_percentage}%
              </span>
            </div>
            <CardTitle className="text-lg">{quiz.title}</CardTitle>
            <p className="text-xs text-desk-muted">
              {quiz.questions?.length || 5} Questions based on your uploaded syllabus.
            </p>
            <div className="pt-2">
              <Button size="sm" variant="primary">Start Practice Quiz</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
