import React from 'react';
import { useGetFlashcardsQuery } from '../store/api/apiSlice';
import { FlashcardPreview } from '../components/ui/FlashcardPreview';
import { Button } from '../components/ui/Button';
import { Layers, RotateCw } from 'lucide-react';

export default function FlashcardsPage() {
  const { data: cards = [] } = useGetFlashcardsQuery();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-desk-border pb-5">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-desk-ink">
            Spaced Repetition Deck
          </h1>
          <p className="text-xs sm:text-sm text-desk-muted">
            SM-2 algorithm scheduled reviews. Flip the physical index card to reveal answers.
          </p>
        </div>
        <div className="text-xs font-mono text-tangerine bg-tangerine/10 px-3 py-1.5 rounded-xl border border-tangerine/25">
          {cards.length} Total Cards in Library
        </div>
      </div>

      <div className="py-6">
        <FlashcardPreview />
      </div>
    </div>
  );
}
