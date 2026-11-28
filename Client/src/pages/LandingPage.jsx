import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  ChevronDown,
  ChevronUp,
  FileText,
  Flame,
  RotateCw,
  Sun,
  Moon,
  ExternalLink,
  ShieldCheck,
  Check,
  HelpCircle,
  Quote,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/slices/themeSlice';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardTitle } from '../components/ui/Card';
import { FlashcardPreview } from '../components/ui/FlashcardPreview';
import { CitationChip } from '../components/ui/CitationChip';
import {
  UnderlineScribble,
  CircleScribble,
  HandDrawnArrow,
} from '../components/ui/SvgFlourishes';
import { cn } from '../lib/utils';

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.mode);

  // Live Hero Mockup State
  const [heroCitationActive, setHeroCitationActive] = useState(true);
  const [heroStreaming, setHeroStreaming] = useState(false);
  const [heroChatText, setHeroChatText] = useState(
    'In an SN2 mechanism, the nucleophile attacks from the backside directly opposite to the leaving group, producing a complete inversion of stereochemistry (Walden Inversion) [p. 14].'
  );

  // Interactive Mini-Demo States
  const [demoActiveCitation, setDemoActiveCitation] = useState(14);
  const [demoTasks, setDemoTasks] = useState([
    { id: 1, title: 'Review SN2 Stereochemistry Notes (p. 10-20)', completed: true, type: 'Read' },
    { id: 2, title: 'Practice 15 Due Flashcards in Spaced Repetition deck', completed: false, type: 'Flashcards' },
    { id: 3, title: 'Take Practice Quiz: Balanced Trees & Heaps', completed: false, type: 'Quiz' },
  ]);

  // Pricing Interval Toggle
  const [billingAnnual, setBillingAnnual] = useState(true);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  const simulateHeroStream = () => {
    setHeroStreaming(true);
    setHeroChatText('');
    const full =
      'In an SN2 mechanism, the nucleophile attacks from the backside directly opposite to the leaving group, producing a complete inversion of stereochemistry (Walden Inversion) [p. 14]. This requires a polar aprotic solvent to keep the nucleophile uncaged.';
    let i = 0;
    const interval = setInterval(() => {
      if (i < full.length) {
        setHeroChatText(full.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setHeroStreaming(false);
      }
    }, 20);
  };

  const toggleDemoTask = (id) => {
    setDemoTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const faqs = [
    {
      q: 'How does StudyMate find the exact citations in my PDFs?',
      a: 'StudyMate reads and semantically indexes every paragraph and diagram in your course syllabi and lecture slides. Every AI answer cites the exact page number ([p. 14]). Clicking that citation chip jumps the document viewer straight to that page and flashes a yellow highlighter pass over the source passage.',
    },
    {
      q: 'What is the SM-2 Spaced Repetition engine and how does it help me?',
      a: 'Based on the scientifically validated SuperMemo-2 algorithm, StudyMate schedules review intervals based on how easily you recalled the answer (Again, Hard, Good, Easy). Difficult concepts reappear tomorrow; mastered cards scale from 6 days to months so you never forget before final exams.',
    },
    {
      q: 'Can I upload complex STEM documents with chemical structures and math equations?',
      a: 'Yes! StudyMate parses complex textbooks, formulas, chemical reaction mechanisms, and code snippets with full LaTeX math ($E = mc^2$) and syntax-highlighted code blocks.',
    },
    {
      q: 'Is there a free plan for students?',
      a: 'Absolutely. The Scholar Free plan includes up to 3 subjects, 50 AI queries every single day, and full access to SM-2 flashcard scheduling with no credit card required.',
    },
    {
      q: 'Can I use StudyMate on my phone or tablet during lectures?',
      a: 'StudyMate is fully responsive across desktop, iPad/tablet, and mobile phones with an intuitive mobile bottom tab bar and bottom-sheet study chat drawer.',
    },
  ];

  const testimonials = [
    {
      quote:
        'Instead of hallucinating answers, StudyMate marked the exact paragraph on Page 42 of my Organic Chem syllabus. I aced my synthesis midterm.',
      author: 'Elena Rostova',
      credential: 'Pre-Med & Biochemistry • Johns Hopkins University',
      avatar: 'ER',
    },
    {
      quote:
        'The 3D flashcards and vintage ink streak stamps make studying addictive. I have kept a 42-day study streak and mastered Red-Black tree rotations in 3 days.',
      author: 'Marcus Chen',
      credential: 'Computer Science • UC Berkeley',
      avatar: 'MC',
    },
    {
      quote:
        'The Study Desk aesthetic is breathtaking. No harsh corporate gradients. It genuinely feels like sitting at a warm library desk at midnight with highlighters and notebooks.',
      author: 'Sophia Al-Mansoor',
      credential: 'PPE & Macroeconomics • Oxford University',
      avatar: 'SA',
    },
  ];

  return (
    <div className="min-h-screen bg-desk-bg text-desk-ink font-sans transition-colors duration-200">
      {/* 1. TOP EDITORIAL NAVIGATION BAR */}
      <header className="sticky top-0 z-50 border-b border-desk-border bg-desk-card/90 backdrop-blur-md px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tangerine text-white shadow-desk-sm">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-desk-ink block leading-tight">
                StudyMate
              </span>
              <span className="text-[10px] font-mono text-desk-muted uppercase tracking-wider">
                The Study Desk
              </span>
            </div>
          </NavLink>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-desk-muted">
            <a href="#how-it-works" className="hover:text-desk-ink transition-colors">How It Works</a>
            <a href="#mini-demos" className="hover:text-desk-ink transition-colors">Interactive Demos</a>
            <a href="#pricing" className="hover:text-desk-ink transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-desk-ink transition-colors">FAQ</a>
            <NavLink to="/design" className="text-xs font-mono text-violet hover:underline flex items-center gap-1">
              <span>/design showroom</span>
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              id="landing-theme-toggle"
              variant="secondary"
              size="icon-sm"
              onClick={() => dispatch(toggleTheme())}
              aria-label="Toggle theme"
            >
              {theme === 'paper' ? <Moon className="h-4 w-4 text-violet" /> : <Sun className="h-4 w-4 text-highlighter" />}
            </Button>

            <NavLink to="/login" className="hidden sm:inline-block">
              <Button variant="ghost" size="sm">Sign In</Button>
            </NavLink>

            <NavLink to="/register">
              <Button variant="primary" size="sm" className="gap-1.5">
                <span>Start Studying</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </NavLink>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION WITH ASYMMETRICAL EDITORIAL COPY & LIVE WORKSPACE MOCKUP */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Bold Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-tangerine/10 px-3.5 py-1 text-xs font-mono text-tangerine border border-tangerine/25">
              <Sparkles className="h-3.5 w-3.5" /> An AI Assistant for Real Scholars
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-desk-ink leading-[1.12]">
              Master any subject in{' '}
              <span className="relative inline-block text-tangerine">
                half the time
                <UnderlineScribble color="#FF6B35" className="absolute -bottom-2 left-0 w-full" />
              </span>{' '}
              — with your desk, reimagined.
            </h1>

            <p className="text-base sm:text-lg text-desk-muted leading-relaxed font-sans max-w-xl">
              Drop your course notes onto a tactile study desk. Converse with documents that cite their exact
              page numbers with real yellow highlighter wipes, and stamp knowledge into long-term memory
              using physical 3D index cards.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <NavLink to="/register">
                <Button size="lg" variant="primary" className="gap-2 shadow-desk-md">
                  <span>Open Your Study Desk</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </NavLink>
              <NavLink to="/dashboard">
                <Button size="lg" variant="secondary" className="gap-2">
                  <span>Explore Demo Workspace</span>
                </Button>
              </NavLink>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs font-mono text-desk-muted">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-mint" /> No credit card needed
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-mint" /> SM-2 spaced repetition
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-mint" /> 100% cited answers
              </div>
            </div>
          </div>

          {/* Right Column: Live Working Mini-Workspace Mockup */}
          <div className="lg:col-span-5 relative">
            {/* Hand-drawn scribble arrow indicator */}
            <div className="hidden xl:block absolute -top-8 -left-12 text-xs font-mono text-tangerine rotate-[-12deg]">
              <span className="block mb-1">Click citation to jump!</span>
              <HandDrawnArrow color="#FF6B35" className="w-16 h-8" />
            </div>

            <Card variant="elevated" className="border-desk-border shadow-desk-lg overflow-hidden p-0">
              {/* Mock Window Title Bar */}
              <div className="h-10 px-4 border-b border-desk-border bg-desk-sub/60 flex items-center justify-between text-xs font-mono text-desk-muted">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-highlighter" />
                  <span className="h-2.5 w-2.5 rounded-full bg-mint" />
                </div>
                <span className="text-[11px] font-serif font-medium text-desk-ink truncate">
                  Organic_Chem_Ch4.pdf • p. 14
                </span>
                <span className="text-[10px] text-tangerine">Live Preview</span>
              </div>

              {/* Split Mini Workspace Preview */}
              <div className="p-4 space-y-4">
                {/* Simulated Document Viewer Pane with Highlight */}
                <div className="rounded-xl border border-desk-border bg-desk-card p-3 space-y-1.5 text-xs text-desk-ink ruled-lines">
                  <div className="flex items-center justify-between text-[10px] font-mono text-desk-muted mb-1">
                    <span>Page 14 • Reaction Mechanisms</span>
                    <span className="text-mint font-semibold">Active PDF View</span>
                  </div>
                  <p className="text-[11px] text-desk-muted">
                    ...alkene hydration proceeds via Markonikov addition...
                  </p>
                  {/* The highlighted paragraph */}
                  <div
                    className={cn(
                      'p-2 rounded-lg transition-all duration-300',
                      heroCitationActive
                        ? 'bg-highlighter/35 border border-highlighter shadow-[0_1px_8px_rgba(255,216,77,0.4)]'
                        : 'bg-transparent'
                    )}
                  >
                    <span className="font-semibold text-desk-ink">
                      "Inversion of stereochemistry occurs because the nucleophile approaches the electrophilic carbon exactly 180° opposite to the leaving group."
                    </span>
                  </div>
                </div>

                {/* Simulated AI Chat Answer */}
                <div className="rounded-xl border border-desk-border bg-desk-sub/40 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-desk-ink">
                      <Sparkles className="h-3.5 w-3.5 text-violet" />
                      <span>StudyMate Assistant</span>
                    </div>
                    <button
                      type="button"
                      onClick={simulateHeroStream}
                      disabled={heroStreaming}
                      className="text-[10px] font-mono text-violet hover:underline flex items-center gap-1"
                    >
                      <RotateCw className={heroStreaming ? 'animate-spin h-3 w-3' : 'h-3 w-3'} />
                      Replay
                    </button>
                  </div>

                  <p className="text-xs text-desk-ink leading-relaxed font-sans">
                    {heroChatText}
                    {heroStreaming && (
                      <span className="inline-block h-3.5 w-1 bg-violet ml-1 animate-pulse align-middle" />
                    )}
                  </p>

                  <div className="pt-2 border-t border-desk-border/50 flex items-center justify-between text-[11px]">
                    <span className="text-desk-muted">Found in Chapter 4:</span>
                    <CitationChip
                      page={14}
                      active={heroCitationActive}
                      onClick={() => setHeroCitationActive(!heroCitationActive)}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. "HOW IT WORKS" — 3 TACTILE STATIONERY STEPS */}
      <section id="how-it-works" className="py-16 sm:py-24 border-t border-desk-border bg-desk-card/50 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="tangerine">The 3-Step Study Method</Badge>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-desk-ink">
              From chaotic slides to permanent mastery.
            </h2>
            <p className="text-sm sm:text-base text-desk-muted">
              Built around proven cognitive psychology: dual coding, generative questioning, and spaced retrieval.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <Card className="relative overflow-hidden p-6 space-y-4 border border-desk-border shadow-desk-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tangerine/15 text-tangerine font-serif text-xl font-bold">
                1
              </div>
              <h3 className="font-serif text-xl font-bold text-desk-ink">
                Drop your notes onto the desk
              </h3>
              <p className="text-xs sm:text-sm text-desk-muted leading-relaxed">
                Upload PDFs, textbooks, lecture slide decks, and lab handouts. StudyMate instantly indexes
                every theorem, reaction mechanism, and graph into your dedicated course notebook.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-tangerine">
                <span>Supports multi-page PDFs</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Card>

            {/* Step 2 */}
            <Card className="relative overflow-hidden p-6 space-y-4 border border-desk-border shadow-desk-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet/15 text-violet font-serif text-xl font-bold">
                2
              </div>
              <h3 className="font-serif text-xl font-bold text-desk-ink">
                Converse with citations
              </h3>
              <p className="text-xs sm:text-sm text-desk-muted leading-relaxed">
                Ask targeted exam questions in the split-pane workspace. The AI streams real answers with
                highlighter citation chips. Click any chip to jump straight to the source passage in your PDF.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-violet">
                <span>Zero hallucination guarantee</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Card>

            {/* Step 3 */}
            <Card className="relative overflow-hidden p-6 space-y-4 border border-desk-border shadow-desk-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint/15 text-mint font-serif text-xl font-bold">
                3
              </div>
              <h3 className="font-serif text-xl font-bold text-desk-ink">
                Stamp into long-term memory
              </h3>
              <p className="text-xs sm:text-sm text-desk-muted leading-relaxed">
                Review auto-generated 3D index flashcards using the SM-2 algorithm. Complete active recall
                quizzes and track your daily study streak with authentic vintage ink stamps.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-mint">
                <span>SM-2 spaced retention</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. FEATURE SHOWCASE WITH INTERACTIVE MINI-DEMOS */}
      <section id="mini-demos" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="violet">Tactile Tools</Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-desk-ink">
            Try the desk tools right now.
          </h2>
          <p className="text-sm sm:text-base text-desk-muted">
            Interactive micro-demos designed for physical intimacy on your digital screen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Demo 1: 3D Index Card Flip */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-tangerine block font-semibold">
              Interactive Micro-Demo #1
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-desk-ink">
              Physical 3D Index Flashcards
            </h3>
            <p className="text-sm text-desk-muted leading-relaxed">
              Real ruled lines, red margin rules, and true 3D spring flip physics. Notice the physical
              stack of cards peeking underneath to show deck depth. Click the card below or press spacebar
              to test the flip:
            </p>
            <div className="pt-2">
              <FlashcardPreview />
            </div>
          </div>

          {/* Demo 2: Interactive Study Checklist & Streak Stamps */}
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-mint block font-semibold">
              Interactive Micro-Demo #2
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-desk-ink">
              Daily Study Planner & Task Stamping
            </h3>
            <p className="text-sm text-desk-muted leading-relaxed">
              Check off tasks below to experience tactile task completion. Tasks recalculate your estimated
              study time in real time:
            </p>

            <Card className="p-5 space-y-3 border border-desk-border shadow-desk-md">
              <div className="flex items-center justify-between pb-2 border-b border-desk-border">
                <span className="font-serif text-base font-bold text-desk-ink">
                  Today's Study Checklist
                </span>
                <span className="text-xs font-mono text-tangerine">
                  {demoTasks.filter((t) => t.completed).length} / {demoTasks.length} Completed
                </span>
              </div>

              {demoTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => toggleDemoTask(t.id)}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none',
                    t.completed
                      ? 'bg-mint/10 border-mint/40 text-desk-muted'
                      : 'bg-desk-card hover:bg-desk-sub/60 border-desk-border text-desk-ink'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-5 w-5 items-center justify-center rounded-md border transition-colors',
                        t.completed ? 'bg-mint text-white border-mint' : 'border-desk-border'
                      )}
                    >
                      {t.completed && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                    <span className={cn('text-xs font-medium', t.completed && 'line-through')}>
                      {t.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-desk-muted uppercase tracking-wider">
                    {t.type}
                  </span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="py-16 sm:py-24 border-t border-desk-border bg-desk-card/30 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="highlighter">Academic Testimonials</Badge>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-desk-ink">
              Endorsed by serious students.
            </h2>
            <p className="text-sm text-desk-muted">
              Here is how students from top universities prepare for midterms with StudyMate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <Card key={idx} variant="elevated" className="p-6 flex flex-col justify-between space-y-4 border border-desk-border">
                <div className="space-y-3">
                  <Quote className="h-6 w-6 text-tangerine/60" />
                  <p className="font-serif text-sm text-desk-ink leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-desk-border/60 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-tangerine/15 text-tangerine font-serif text-xs font-bold border border-tangerine/30">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-desk-ink">{t.author}</h4>
                    <p className="text-[11px] text-desk-muted">{t.credential}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRICING SECTION — PAPER-EMBOSSED CARDS */}
      <section id="pricing" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="tangerine">Transparent Pricing</Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-desk-ink">
            A simple plan for every academic ambition.
          </h2>
          <p className="text-sm text-desk-muted">
            Start free today. Upgrade when your exam schedule requires limitless queries and OCR diagrams.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="inline-flex items-center gap-2 p-1 rounded-xl border border-desk-border bg-desk-card text-xs font-mono mt-4">
            <button
              type="button"
              onClick={() => setBillingAnnual(false)}
              className={cn(
                'px-3 py-1.5 rounded-lg transition-colors',
                !billingAnnual ? 'bg-tangerine text-white font-semibold' : 'text-desk-muted hover:text-desk-ink'
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingAnnual(true)}
              className={cn(
                'px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5',
                billingAnnual ? 'bg-tangerine text-white font-semibold' : 'text-desk-muted hover:text-desk-ink'
              )}
            >
              <span>Annual</span>
              <span className="text-[10px] bg-white/25 px-1 py-0.2 rounded text-white">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-8">
          {/* Tier 1: Scholar (Free) */}
          <Card className="p-8 space-y-6 flex flex-col justify-between border border-desk-border shadow-desk-sm">
            <div className="space-y-4">
              <Badge variant="default">Scholar Tier</Badge>
              <h3 className="font-serif text-2xl font-bold text-desk-ink">Free Forever</h3>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-4xl font-bold text-desk-ink">$0</span>
                <span className="text-xs text-desk-muted font-mono">/ month</span>
              </div>
              <p className="text-xs text-desk-muted leading-relaxed">
                Everything essential for high-yield study sessions across your top courses.
              </p>

              <ul className="space-y-2.5 pt-2 text-xs text-desk-ink">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-mint flex-shrink-0" />
                  <span>3 Active Course Notebooks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-mint flex-shrink-0" />
                  <span>50 AI study queries per day</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-mint flex-shrink-0" />
                  <span>100% Citation page jumps</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-mint flex-shrink-0" />
                  <span>SM-2 Spaced repetition flashcards</span>
                </li>
              </ul>
            </div>

            <NavLink to="/register" className="block pt-4">
              <Button variant="secondary" className="w-full">
                Get Started Free
              </Button>
            </NavLink>
          </Card>

          {/* Tier 2: Academic Fellow (Pro) */}
          <Card
            variant="elevated"
            className="p-8 space-y-6 flex flex-col justify-between border-2 border-tangerine relative shadow-desk-md"
          >
            <div className="absolute -top-3 right-6 bg-tangerine text-white px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
              Most Popular
            </div>

            <div className="space-y-4">
              <Badge variant="tangerine">Academic Fellow</Badge>
              <h3 className="font-serif text-2xl font-bold text-desk-ink">Unlimited Mastery</h3>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-4xl font-bold text-desk-ink">
                  {billingAnnual ? '$9.60' : '$12'}
                </span>
                <span className="text-xs text-desk-muted font-mono">/ month</span>
              </div>
              <p className="text-xs text-desk-muted leading-relaxed">
                For demanding degrees requiring unlimited document indexing, equations, and priority AI streaming.
              </p>

              <ul className="space-y-2.5 pt-2 text-xs text-desk-ink">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-tangerine flex-shrink-0" />
                  <span><strong>Unlimited</strong> Course Notebooks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-tangerine flex-shrink-0" />
                  <span><strong>Unlimited</strong> AI Queries & Summaries</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-tangerine flex-shrink-0" />
                  <span>Complex LaTeX & Chemical Reaction OCR</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-tangerine flex-shrink-0" />
                  <span>AI Practice Quiz Generator with Weak-Topic Retry</span>
                </li>
              </ul>
            </div>

            <NavLink to="/register" className="block pt-4">
              <Button variant="primary" className="w-full shadow-desk-sm">
                Start 14-Day Free Trial
              </Button>
            </NavLink>
          </Card>
        </div>
      </section>

      {/* 7. FAQ ACCORDION SECTION */}
      <section id="faq" className="py-16 sm:py-24 border-t border-desk-border bg-desk-card/40 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <Badge variant="violet">Frequently Asked Questions</Badge>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-desk-ink">
              Everything you need to know.
            </h2>
          </div>

          <div className="space-y-3 pt-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-desk-border bg-desk-card overflow-hidden transition-all shadow-desk-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-serif font-bold text-desk-ink select-none hover:text-tangerine transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="h-4 w-4 text-tangerine flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-desk-muted flex-shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-desk-muted leading-relaxed font-sans border-t border-desk-border/50 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. STRONG FOOTER CTA & FOOTER LINKS */}
      <footer className="border-t border-desk-border bg-desk-card py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Big CTA Banner */}
          <div className="rounded-3xl border border-desk-border bg-desk-sub/60 p-8 sm:p-12 text-center space-y-6 max-w-4xl mx-auto shadow-desk-md">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-desk-ink">
              Set up your study desk today.
            </h2>
            <p className="text-sm sm:text-base text-desk-muted max-w-xl mx-auto font-sans">
              Join thousands of students turning overwhelming syllabi into structured, high-yield academic retention.
            </p>
            <NavLink to="/register" className="inline-block">
              <Button size="lg" variant="primary" className="gap-2 shadow-desk-md">
                <span>Start Studying for Free</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </NavLink>
          </div>

          {/* Footer Metadata */}
          <div className="pt-8 border-t border-desk-border flex flex-col sm:flex-row items-center justify-between text-xs text-desk-muted gap-4 font-mono">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-mint" />
              <span>StudyMate • The Tactile Study Desk</span>
            </div>
            <div>
              Built for serious academic retention. Zero stock gradients.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
