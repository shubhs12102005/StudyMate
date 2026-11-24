import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Copy,
  Layers,
  Palette,
  Type,
  MousePointerClick,
  FileText,
  Bookmark,
  Share2,
  Trash2,
  RotateCw,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CitationChip } from '../components/ui/CitationChip';
import { FlashcardPreview } from '../components/ui/FlashcardPreview';
import { StreakStamps } from '../components/ui/StreakStamps';
import { InkProgressBar, RibbonBookmark } from '../components/ui/ProgressRibbon';
import { Toast } from '../components/ui/Toast';
import {
  UnderlineScribble,
  CircleScribble,
  HandDrawnArrow,
} from '../components/ui/SvgFlourishes';

export default function DesignShowroom({ isDark, onToggleTheme }) {
  const [activeCitation, setActiveCitation] = useState(null);
  const [toastDemo, setToastDemo] = useState(null);
  const [inputVal, setInputVal] = useState('Photosynthesis & Calvin Cycle');
  const [aiStreaming, setAiStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState(
    'RuBisCO fixes CO2 into 3-phosphoglycerate during the light-independent reactions...'
  );

  const simulateAiStream = () => {
    setAiStreaming(true);
    setStreamedText('');
    const fullText =
      'RuBisCO fixes atmospheric CO₂ into 3-PGA. Through ATP and NADPH consumption, G3P molecules are synthesized to regenerate ribulose-1,5-bisphosphate [p. 18].';
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < fullText.length) {
        setStreamedText(fullText.slice(0, idx + 1));
        idx++;
      } else {
        clearInterval(interval);
        setAiStreaming(false);
      }
    }, 25);
  };

  return (
    <div className="min-h-screen bg-desk-bg text-desk-ink transition-colors duration-200">
      {/* STICKY HEADER BAR */}
      <header className="sticky top-0 z-50 border-b border-desk-border bg-desk-card/90 backdrop-blur-md px-4 py-3 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tangerine text-white shadow-desk-sm">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg md:text-xl font-bold tracking-tight text-desk-ink">
                  StudyMate
                </h1>
                <Badge variant="tangerine">Design Showroom</Badge>
                <span className="hidden sm:inline-block text-xs font-mono text-desk-muted">
                  /design
                </span>
              </div>
              <p className="text-xs text-desk-muted">
                Direction: "The Study Desk" — {isDark ? 'Midnight Library' : 'Paper'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Breakpoint detector helper */}
            <div className="hidden lg:flex items-center text-xs font-mono text-desk-muted bg-desk-sub px-2.5 py-1 rounded-lg border border-desk-border">
              Desktop • 1440px
            </div>
            <div className="hidden md:max-lg:flex items-center text-xs font-mono text-desk-muted bg-desk-sub px-2.5 py-1 rounded-lg border border-desk-border">
              Tablet • 768px
            </div>
            <div className="flex md:hidden items-center text-xs font-mono text-desk-muted bg-desk-sub px-2.5 py-1 rounded-lg border border-desk-border">
              Mobile • 390px
            </div>

            {/* THEME TOGGLE */}
            <Button
              variant="secondary"
              size="sm"
              onClick={onToggleTheme}
              className="gap-2 border-desk-border"
              aria-label="Toggle between Paper and Midnight Library themes"
            >
              {isDark ? (
                <>
                  <Sun className="h-4 w-4 text-highlighter" />
                  <span className="text-xs font-serif font-medium">Switch to Paper</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-violet" />
                  <span className="text-xs font-serif font-medium">Switch to Midnight</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* TOAST NOTIFICATION CONTAINER */}
      {toastDemo && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast
            title={toastDemo.title}
            message={toastDemo.message}
            type={toastDemo.type}
            onClose={() => setToastDemo(null)}
          />
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 space-y-12">
        {/* HERO BANNER & DIRECTION OVERVIEW */}
        <div className="relative overflow-hidden rounded-3xl border border-desk-border bg-desk-card p-6 md:p-10 shadow-desk-md">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-tangerine/10 px-3 py-1 text-xs font-mono text-tangerine border border-tangerine/25">
              <Sparkles className="h-3.5 w-3.5" /> Phase 0 Aesthetic Verification
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-desk-ink leading-tight">
              An editorial, tactile desk{' '}
              <span className="relative inline-block text-tangerine">
                by day,
                <UnderlineScribble
                  color="#FF6B35"
                  className="absolute left-0 -bottom-2 w-full"
                />
              </span>{' '}
              a midnight library{' '}
              <span className="relative inline-block text-violet">
                by night.
              </span>
            </h2>
            <p className="text-sm md:text-base text-desk-muted leading-relaxed font-sans pt-1">
              No generic purple gradients or glass blobs. Every surface feels like warm paper stock,
              every citation is marked with an authentic highlighter swipe, and every flashcard flips
              like a real index card on a student's wooden study desk.
            </p>
          </div>

          {/* Decorative Corner Ribbon */}
          <div className="absolute top-0 right-8">
            <RibbonBookmark label="Phase 0" />
          </div>
        </div>

        {/* SECTION 1: COLOR PALETTE & DESIGN TOKENS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-desk-border pb-2">
            <Palette className="h-5 w-5 text-tangerine" />
            <h3 className="font-serif text-xl font-bold text-desk-ink">
              1. Color Tokens & Theme Architecture
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Paper Canvas */}
            <div className="rounded-xl border border-desk-border bg-desk-card p-3 shadow-desk-sm">
              <div className="h-14 rounded-lg bg-[#F6F1E7] border border-[#E3DCCB] mb-2 shadow-inner" />
              <div className="text-xs font-semibold text-desk-ink">Paper Canvas</div>
              <div className="text-[11px] font-mono text-desk-muted">#F6F1E7</div>
              <div className="text-[10px] text-desk-muted/80">Warm off-white</div>
            </div>

            {/* Midnight Navy */}
            <div className="rounded-xl border border-desk-border bg-desk-card p-3 shadow-desk-sm">
              <div className="h-14 rounded-lg bg-[#0E0F1A] border border-[#25283D] mb-2" />
              <div className="text-xs font-semibold text-desk-ink">Midnight Library</div>
              <div className="text-[11px] font-mono text-desk-muted">#0E0F1A</div>
              <div className="text-[10px] text-desk-muted/80">Deep ink-navy</div>
            </div>

            {/* Tangerine Action */}
            <div className="rounded-xl border border-desk-border bg-desk-card p-3 shadow-desk-sm">
              <div className="h-14 rounded-lg bg-tangerine mb-2 shadow-sm" />
              <div className="text-xs font-semibold text-tangerine">Tangerine Ink</div>
              <div className="text-[11px] font-mono text-desk-muted">#FF6B35</div>
              <div className="text-[10px] text-desk-muted/80">Primary actions</div>
            </div>

            {/* Highlighter Yellow */}
            <div className="rounded-xl border border-desk-border bg-desk-card p-3 shadow-desk-sm">
              <div className="h-14 rounded-lg bg-highlighter mb-2 border border-[#E5BE30]" />
              <div className="text-xs font-semibold text-desk-ink">Highlighter</div>
              <div className="text-[11px] font-mono text-desk-muted">#FFD84D</div>
              <div className="text-[10px] text-desk-muted/80">Citations & swipes</div>
            </div>

            {/* Electric Violet */}
            <div className="rounded-xl border border-desk-border bg-desk-card p-3 shadow-desk-sm">
              <div className="h-14 rounded-lg bg-violet mb-2" />
              <div className="text-xs font-semibold text-violet">Electric Violet</div>
              <div className="text-[11px] font-mono text-desk-muted">#6D4AFF</div>
              <div className="text-[10px] text-desk-muted/80">AI intelligence</div>
            </div>

            {/* Mint Stamp */}
            <div className="rounded-xl border border-desk-border bg-desk-card p-3 shadow-desk-sm">
              <div className="h-14 rounded-lg bg-mint mb-2" />
              <div className="text-xs font-semibold text-mint">Mint Stamp</div>
              <div className="text-[11px] font-mono text-desk-muted">#2EC4A0</div>
              <div className="text-[10px] text-desk-muted/80">Mastery & success</div>
            </div>
          </div>
        </section>

        {/* SECTION 2: TYPOGRAPHY HIERARCHY */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-desk-border pb-2">
            <Type className="h-5 w-5 text-tangerine" />
            <h3 className="font-serif text-xl font-bold text-desk-ink">
              2. Typography System (Fraunces • Inter • JetBrains Mono)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="space-y-2">
              <Badge variant="tangerine">Display Serif: Fraunces</Badge>
              <h2 className="font-serif text-3xl font-bold text-desk-ink">
                Academic Rigor & Editorial Polish
              </h2>
              <p className="text-xs text-desk-muted font-serif italic">
                Used for display titles, landing headlines, and chapter headers to evoke printed books.
              </p>
            </Card>

            <Card className="space-y-2">
              <Badge variant="violet">UI Body: Inter</Badge>
              <p className="font-sans text-sm text-desk-ink leading-relaxed">
                Clear, legible interface typography engineered for high-density document panes,
                interactive study checklists, and clean chat bubbles.
              </p>
              <p className="text-xs text-desk-muted">
                14px / 1.5 line-height / Clean neutral metrics.
              </p>
            </Card>

            <Card className="space-y-2">
              <Badge variant="highlighter">Micro & Code: JetBrains Mono</Badge>
              <div className="bg-desk-sub p-2.5 rounded-lg font-mono text-xs text-desk-ink space-y-1">
                <div>const ease = sm2(card, 4);</div>
                <div className="text-desk-muted">// interval_days: 6d, rep: 2</div>
              </div>
              <p className="text-xs text-desk-muted font-mono">
                Citations, timestamps, keyboard shortcuts [Space], page references.
              </p>
            </Card>
          </div>
        </section>

        {/* SECTION 3: BUTTONS & INTERACTIVE CONTROLS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-desk-border pb-2">
            <MousePointerClick className="h-5 w-5 text-tangerine" />
            <h3 className="font-serif text-xl font-bold text-desk-ink">
              3. Button Gallery & Tactile Actions
            </h3>
          </div>

          <Card className="space-y-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-desk-muted block mb-2">
                Color Variants & Special Purposes
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">
                  <span>Primary Tangerine</span>
                </Button>
                <Button variant="secondary">Secondary Paper</Button>
                <Button variant="outline">Outline Border</Button>
                <Button variant="ghost">Ghost Ink</Button>
                <Button variant="ai">
                  <Sparkles className="h-4 w-4" /> AI Spark
                </Button>
                <Button variant="highlighter">
                  <span>Mark Passage</span>
                </Button>
                <Button variant="mint">
                  <CheckCircle2 className="h-4 w-4" /> Complete Quiz
                </Button>
                <Button variant="rose">
                  <Trash2 className="h-4 w-4" /> Reset Deck
                </Button>
              </div>
            </div>

            <div className="pt-2 border-t border-desk-border">
              <span className="text-xs font-mono uppercase tracking-wider text-desk-muted block mb-2">
                Sizes & Touch Target Compliance
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg">Large CTA (48px)</Button>
                <Button size="md">Medium Standard (40px)</Button>
                <Button size="sm">Small Compact (32px)</Button>
                <Button size="icon" aria-label="Share">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="icon-sm" variant="secondary" aria-label="Copy">
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* SECTION 4: FORM INPUTS & DESK SURFACES */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-desk-border pb-2">
            <FileText className="h-5 w-5 text-tangerine" />
            <h3 className="font-serif text-xl font-bold text-desk-ink">
              4. Form Controls & Desk Surfaces
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="space-y-4">
              <CardHeader>
                <CardTitle>Study Workspace Inputs</CardTitle>
                <CardDescription>Warm desk focus ring and clean hairline borders</CardDescription>
              </CardHeader>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-desk-ink block mb-1">
                    Subject Name
                  </label>
                  <Input
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Enter subject or exam title..."
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-desk-ink block mb-1">
                    Prompt or Note Scratchpad
                  </label>
                  <Textarea placeholder="Type what you want StudyMate to explain from your uploaded syllabus..." />
                </div>

                <div>
                  <label className="text-xs font-medium text-rose block mb-1">
                    Error Validation State
                  </label>
                  <Input error defaultValue="Invalid exam date format" />
                  <span className="text-[11px] text-rose block mt-1">
                    Please provide a valid upcoming exam date.
                  </span>
                </div>
              </div>
            </Card>

            {/* Tactile Sticky Note Surface */}
            <div className="space-y-4">
              <Card variant="sticky">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#E8DE9E]/60 dark:border-[#3D3720]">
                  <span className="font-serif text-sm font-bold text-amber-900 dark:text-amber-200">
                    📌 Desk Sticky Note (Tactile Texture)
                  </span>
                  <span className="text-[10px] font-mono text-amber-800/70 dark:text-amber-300/70">
                    -1° Tilt
                  </span>
                </div>
                <p className="text-xs text-amber-950/80 dark:text-amber-100/80 leading-relaxed font-sans">
                  "Remember: In SN2 reactions, backside attack causes inversion of stereochemistry.
                  Review Chapter 4 before Wednesday's quiz!"
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-amber-900/60 dark:text-amber-300/60">
                  <span>Organic Chem II</span>
                  <span>Due in 2 days</span>
                </div>
              </Card>

              {/* Toast Triggers */}
              <Card className="space-y-3">
                <CardTitle className="text-sm">Toast Notification System</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="mint"
                    onClick={() =>
                      setToastDemo({
                        title: 'Quiz Finished!',
                        message: '92% score recorded on Cellular Respiration.',
                        type: 'success',
                      })
                    }
                  >
                    Trigger Success Toast
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      setToastDemo({
                        title: 'Weak Topic Flagged',
                        message: 'Krebs Cycle accuracy dropped below 60%. Review scheduled.',
                        type: 'warning',
                      })
                    }
                  >
                    Trigger Warning Toast
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 5: THE 7 SIGNATURE DETAILS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-desk-border pb-2">
            <Sparkles className="h-5 w-5 text-violet" />
            <h3 className="font-serif text-xl font-bold text-desk-ink">
              5. The 7 Signature Interactions (Live Interactive Atoms)
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SIGNATURE 1: CITATIONS WITH HIGHLIGHTER SWIPE */}
            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-highlighter text-xs font-mono font-bold text-[#16141F]">
                    1
                  </span>
                  <CardTitle className="text-base">Highlighter Citation Chips</CardTitle>
                </div>
                <Badge variant="highlighter">PDF Page Jump</Badge>
              </div>
              <p className="text-xs text-desk-muted">
                Clicking jumps the PDF directly to that page and flashes the yellow marker.
              </p>

              <div className="rounded-xl border border-desk-border bg-desk-sub/40 p-4 space-y-3">
                <p className="text-sm text-desk-ink leading-relaxed">
                  "Oxidative phosphorylation occurs at the inner mitochondrial membrane{' '}
                  <CitationChip
                    page={14}
                    documentTitle="Biology_Ch3.pdf"
                    snippet="Complex I through IV create a proton gradient."
                    active={activeCitation === 14}
                    onClick={() => setActiveCitation(14)}
                  />
                  , producing the majority of ATP through ATP synthase{' '}
                  <CitationChip
                    page={19}
                    documentTitle="Biology_Ch3.pdf"
                    snippet="Chemiosmosis drives ATP synthase rotor."
                    active={activeCitation === 19}
                    onClick={() => setActiveCitation(19)}
                  />
                  ."
                </p>

                {activeCitation && (
                  <div className="rounded-lg bg-highlighter/30 border border-highlighter/80 p-3 text-xs text-desk-ink animate-marker-swipe">
                    <span className="font-mono font-bold block mb-0.5">
                      ✓ Simulated PDF Jump to Page {activeCitation}:
                    </span>
                    "Protons flow down their electrochemical gradient into the matrix through ATP synthase..."
                  </div>
                )}
              </div>
            </Card>

            {/* SIGNATURE 2: HAND-DRAWN SVG ACCENTS */}
            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-tangerine text-xs font-mono font-bold text-white">
                    2
                  </span>
                  <CardTitle className="text-base">Hand-Drawn SVG Flourishes</CardTitle>
                </div>
                <Badge variant="tangerine">Organic Personality</Badge>
              </div>
              <p className="text-xs text-desk-muted">
                Editorial warmth used on key landing headings, milestones, and empty states.
              </p>

              <div className="rounded-xl border border-desk-border bg-desk-card p-5 space-y-4 text-center">
                <div className="relative inline-block mx-auto">
                  <span className="font-serif text-2xl font-bold text-desk-ink">
                    Retain knowledge{' '}
                    <span className="relative inline-block text-tangerine">
                      for lifetime
                      <UnderlineScribble color="#FF6B35" className="absolute -bottom-2 left-0 w-full" />
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-center gap-6 pt-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-desk-muted">
                    <HandDrawnArrow color="#FF6B35" />
                    <span>Drop your lecture notes here</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* SIGNATURE 3: 3D FLASHCARD PREVIEW */}
            <Card className="space-y-4 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint text-xs font-mono font-bold text-white">
                    3
                  </span>
                  <CardTitle className="text-base">Physical 3D Index Flashcard & Deck Stack</CardTitle>
                </div>
                <Badge variant="mint">SM-2 Spaced Repetition</Badge>
              </div>
              <p className="text-xs text-desk-muted">
                Ruled index card styling with red margin line, tactile 3-card stack depth, and spring 3D flip.
              </p>

              <div className="py-2">
                <FlashcardPreview />
              </div>
            </Card>

            {/* SIGNATURE 4: INK STAMP STUDY STREAK */}
            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-glow text-xs font-mono font-bold text-white">
                    4
                  </span>
                  <CardTitle className="text-base">Vintage Ink Streak Stamps</CardTitle>
                </div>
                <Badge variant="tangerine">Habit Stamping</Badge>
              </div>
              <p className="text-xs text-desk-muted">
                Physical stamp impressions replace boring numerical counters.
              </p>

              <StreakStamps />
            </Card>

            {/* SIGNATURE 5: PROGRESS RIBBONS & INK FLOW */}
            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-tangerine text-xs font-mono font-bold text-white">
                    5
                  </span>
                  <CardTitle className="text-base">Ribbons & Ink-Fill Progress</CardTitle>
                </div>
                <Badge variant="tangerine">Tactile Stationery</Badge>
              </div>
              <p className="text-xs text-desk-muted">
                Silk bookmarks and fountain-pen ink meters for chapter mastery.
              </p>

              <div className="rounded-2xl border border-desk-border bg-desk-card p-5 space-y-4">
                <InkProgressBar
                  progress={72}
                  label="Organic Chemistry • Reaction Mechanisms"
                  sublabel="18 of 25 mechanisms mastered"
                  color="tangerine"
                />
                <InkProgressBar
                  progress={90}
                  label="Data Structures • Red-Black Trees"
                  sublabel="9 of 10 quizzes passed"
                  color="mint"
                />
              </div>
            </Card>

            {/* SIGNATURE 6: AI INK WRITING & VIOLET SPARK */}
            <Card className="space-y-4 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet text-xs font-mono font-bold text-white">
                    6
                  </span>
                  <CardTitle className="text-base">AI Ink-Stream Writing & Violet Spark</CardTitle>
                </div>
                <Button
                  size="sm"
                  variant="ai"
                  onClick={simulateAiStream}
                  disabled={aiStreaming}
                  className="gap-1.5"
                >
                  <RotateCw className={aiStreaming ? "animate-spin h-3.5 w-3.5" : "h-3.5 w-3.5"} />
                  {aiStreaming ? "Streaming ink..." : "Test AI Stream"}
                </Button>
              </div>
              <p className="text-xs text-desk-muted">
                AI answers stream with ink-fade physics and an electric violet spark marker.
              </p>

              <div className="rounded-2xl border border-desk-border bg-desk-card p-5 shadow-desk-sm">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-desk-border">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet/20 text-violet">
                    <Sparkles className="h-3.5 w-3.5 animate-spark-pulse" />
                  </span>
                  <span className="font-serif text-sm font-semibold text-desk-ink">
                    StudyMate Assistant
                  </span>
                  <span className="text-[10px] font-mono text-violet bg-violet/10 px-2 py-0.5 rounded-full border border-violet/20">
                    Live Answer
                  </span>
                </div>

                <div className="min-h-[60px] font-sans text-sm text-desk-ink leading-relaxed">
                  {streamedText}
                  {aiStreaming && (
                    <span className="inline-block h-4 w-1.5 ml-1 bg-violet animate-pulse align-middle" />
                  )}
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* FOOTER NOTICE */}
        <div className="border-t border-desk-border pt-6 pb-12 flex flex-col sm:flex-row items-center justify-between text-xs text-desk-muted gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-mint" />
            <span>Phase 0 Ready for Visual Verification</span>
          </div>
          <div className="font-mono text-[11px]">
            StudyMate Frontend • Phase 0 Showroom
          </div>
        </div>
      </main>
    </div>
  );
}
