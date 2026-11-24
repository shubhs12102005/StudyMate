import React, { useState } from 'react';
import { RotateCw, Sparkles, Check, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * FlashcardPreview - Physical 3D index card with ruled lines, red margin, and realistic stack depth
 */
export function FlashcardPreview({
  front = "What is the primary rate-limiting enzyme in glycolysis?",
  back = "Phosphofructokinase-1 (PFK-1). It catalyzes the irreversible conversion of fructose-6-phosphate to fructose-1,6-bisphosphate.",
  topic = "Biochemistry • Ch. 8",
  cardIndex = 3,
  totalCards = 28,
  onFlip,
  className,
}) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
    if (onFlip) onFlip(!flipped);
  };

  return (
    <div className={cn('relative w-full max-w-md mx-auto select-none', className)}>
      {/* Visual Stack of physical cards behind to show deck depth */}
      <div className="absolute inset-0 translate-y-3 translate-x-1.5 rounded-2xl bg-desk-card/40 border border-desk-border shadow-desk-sm rotate-[1.5deg] pointer-events-none" />
      <div className="absolute inset-0 translate-y-1.5 -translate-x-1 rounded-2xl bg-desk-card/70 border border-desk-border shadow-desk-sm rotate-[-1deg] pointer-events-none" />

      {/* 3D Card Container */}
      <div
        onClick={handleFlip}
        style={{ perspective: 1200 }}
        className="relative cursor-pointer group"
      >
        <div
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
          className="relative min-h-[240px] w-full rounded-2xl transition-transform duration-500 ease-out shadow-desk-lg"
        >
          {/* FRONT OF INDEX CARD */}
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute inset-0 rounded-2xl border border-desk-border bg-desk-card p-6 flex flex-col justify-between ruled-lines"
          >
            {/* Top metadata */}
            <div className="flex items-center justify-between text-xs text-desk-muted font-mono pl-4">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-tangerine inline-block" />
                {topic}
              </span>
              <span>
                {cardIndex} / {totalCards}
              </span>
            </div>

            {/* Question Text */}
            <div className="my-auto pl-4 pr-2">
              <span className="text-[10px] font-mono tracking-wider uppercase text-desk-muted block mb-1">
                Prompt / Question
              </span>
              <p className="font-serif text-lg md:text-xl font-medium text-desk-ink leading-relaxed">
                {front}
              </p>
            </div>

            {/* Bottom helper */}
            <div className="flex items-center justify-between text-[11px] text-desk-muted pl-4 pt-2 border-t border-desk-border/40">
              <span className="flex items-center gap-1">
                <RotateCw className="h-3 w-3 text-tangerine group-hover:rotate-180 transition-transform duration-500" />
                Click card or press <kbd className="px-1.5 py-0.5 rounded bg-desk-sub font-mono text-[10px]">Space</kbd> to flip
              </span>
              <span className="text-tangerine font-mono font-medium">Front</span>
            </div>
          </div>

          {/* BACK OF INDEX CARD */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
            className="absolute inset-0 rounded-2xl border border-desk-border bg-desk-card p-6 flex flex-col justify-between ruled-lines"
          >
            {/* Top metadata */}
            <div className="flex items-center justify-between text-xs text-desk-muted font-mono pl-4">
              <span className="flex items-center gap-1.5 text-mint font-semibold">
                <Sparkles className="h-3.5 w-3.5" /> Answer & Rationale
              </span>
              <span>{cardIndex} / {totalCards}</span>
            </div>

            {/* Answer Text */}
            <div className="my-auto pl-4 pr-2">
              <p className="text-sm md:text-base text-desk-ink leading-relaxed font-sans">
                {back}
              </p>
            </div>

            {/* SM-2 rating bar preview */}
            <div className="flex items-center justify-between gap-1.5 pl-4 pt-2 border-t border-desk-border/40">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); alert('Again (1d)'); }}
                className="flex-1 py-1 rounded-lg text-xs font-mono font-medium text-rose bg-rose/10 hover:bg-rose/20 transition-colors"
              >
                1 Again
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); alert('Hard (3d)'); }}
                className="flex-1 py-1 rounded-lg text-xs font-mono font-medium text-amber-glow bg-amber-glow/10 hover:bg-amber-glow/20 transition-colors"
              >
                2 Hard
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); alert('Good (6d)'); }}
                className="flex-1 py-1 rounded-lg text-xs font-mono font-medium text-tangerine bg-tangerine/10 hover:bg-tangerine/20 transition-colors"
              >
                3 Good
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); alert('Easy (12d)'); }}
                className="flex-1 py-1 rounded-lg text-xs font-mono font-medium text-mint bg-mint/10 hover:bg-mint/20 transition-colors"
              >
                4 Easy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
