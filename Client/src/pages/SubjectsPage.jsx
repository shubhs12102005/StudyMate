import React from 'react';
import { useGetSubjectsQuery } from '../store/api/apiSlice';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Plus, BookOpen } from 'lucide-react';

export default function SubjectsPage() {
  const { data: subjects = [] } = useGetSubjectsQuery();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-desk-border pb-5">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-desk-ink">
            Study Notebooks
          </h1>
          <p className="text-xs sm:text-sm text-desk-muted">
            Organize documents, flashcards, and quizzes by academic discipline.
          </p>
        </div>
        <Button variant="primary" className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          <span>New Notebook</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map((subj) => (
          <Card key={subj.id} className="relative overflow-hidden border border-desk-border shadow-desk-sm p-6 space-y-4">
            <div style={{ backgroundColor: subj.color }} className="absolute top-0 left-0 bottom-0 w-3" />
            <div className="pl-3 space-y-2">
              <span className="text-xs font-mono text-desk-muted">{subj.code}</span>
              <h3 className="font-serif text-xl font-bold text-desk-ink">{subj.name}</h3>
              <p className="text-xs text-desk-muted leading-relaxed">{subj.description}</p>
            </div>
            <div className="pl-3 pt-3 border-t border-desk-border/60 flex items-center justify-between text-xs font-mono text-desk-muted">
              <span>{subj.document_count} Documents</span>
              <span>{subj.flashcard_count} Flashcards</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
