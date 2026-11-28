import React from 'react';
import { Card, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MessageSquareText, Sparkles, BookOpen } from 'lucide-react';

export default function WorkspacePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="border-b border-desk-border pb-5">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-desk-ink">
          Document Workspace & AI Chat
        </h1>
        <p className="text-xs sm:text-sm text-desk-muted">
          Split-pane study environment: PDF reader on the left, streaming AI with citation jumping on the right.
        </p>
      </div>

      <Card className="p-8 text-center space-y-4 max-w-xl mx-auto">
        <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-violet/15 text-violet border border-violet/30">
          <Sparkles className="h-7 w-7" />
        </div>
        <CardTitle className="text-xl">Hero Document Workspace (Phase 4 Deliverable)</CardTitle>
        <p className="text-xs text-desk-muted leading-relaxed">
          The full resizable split view with PDF page-jump highlighter citations will be built in Phase 4.
          You can test the interactive AI ink-stream and citation chips in the <a href="/design" className="text-tangerine underline">/design showroom</a> right now!
        </p>
      </Card>
    </div>
  );
}
