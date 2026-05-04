import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

/** Auto-advance interval; resets on manual tab click (via `step` change) */
const STEP_MS = 40_000;

const L = 'text-[11px] font-semibold uppercase tracking-wider text-slate-500';

/** Shared mock chrome — crisp product surface */
const mockChrome = 'rounded-xl border border-slate-200 bg-white shadow-2xl';

function PlanMock() {
  const MetricCard = ({ label, children, className = '' }) => (
    <div className={`rounded-xl border border-slate-100 bg-slate-50/80 p-4 shadow-sm ${className}`}>
      <p className={L}>{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );

  return (
    <div className={`${mockChrome} overflow-hidden p-5 md:p-7`}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">Rocketship Technologies</h3>
        <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-800 ring-1 ring-green-200/80">
          100% Confidence
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard label="New hires needed" className="bg-white ring-1 ring-purple-100 sm:col-span-2 lg:col-span-1">
          <p className="text-4xl font-bold tabular-nums tracking-tight text-slate-900">31</p>
          <p className="mt-2 text-sm font-medium text-purple-700">18 growth + 13 backfill</p>
        </MetricCard>
        <MetricCard label="Target revenue">
          <p className="text-2xl font-bold tabular-nums text-purple-700 md:text-3xl">₹27.0Cr</p>
        </MetricCard>
        <MetricCard label="Total monthly growth cost">
          <p className="text-2xl font-bold tabular-nums text-slate-900 md:text-3xl">₹70.8L/mo</p>
        </MetricCard>
        <MetricCard label="Runway">
          <p className="text-2xl font-bold tabular-nums text-slate-900 md:text-3xl">24+ mo</p>
        </MetricCard>
        <MetricCard label="Burn multiple">
          <p className="text-2xl font-bold tabular-nums text-slate-900 md:text-3xl">0.5x</p>
        </MetricCard>
      </div>

      <div className="mt-6 rounded-xl border border-purple-200 bg-purple-50/90 p-4 shadow-inner md:p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-purple-800">Insight</p>
        <p className="mt-2 text-sm leading-relaxed text-purple-900 md:text-[15px]">
          Leadership span is widening post-hire (1:10 manager-to-IC). Consider promoting 1-2 senior ICs before this exceeds healthy
          bounds.
        </p>
      </div>
    </div>
  );
}

function BenchmarkMock() {
  const levels = [
    { id: 'junior', label: 'Junior', sub: '0–2 yrs', band: '₹3–8L | $52–72k', active: true },
    { id: 'mid', label: 'Mid', sub: '', band: '', active: false },
    { id: 'senior', label: 'Senior', sub: '', band: '', active: false },
    { id: 'lead', label: 'Lead', sub: '', band: '', active: false },
  ];

  return (
    <div className={`${mockChrome} overflow-hidden border-l-4 border-l-teal-600 p-5 md:p-7`}>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-teal-100 pb-5">
        <div>
          <p className={`${L} text-teal-700`}>SkillMapper · Benchmark</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">Product Analyst</h3>
        </div>
        <span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-semibold text-teal-800">Live bands</span>
      </div>

      <div className="mt-6">
        <p className={L}>Experience & salary</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {levels.map((lv) =>
            lv.active ? (
              <div
                key={lv.id}
                className="rounded-xl bg-teal-700 px-4 py-3 text-white shadow-lg shadow-teal-900/15 ring-2 ring-teal-600/40"
              >
                <p className="text-sm font-semibold">{lv.label}</p>
                <p className="mt-0.5 text-xs font-medium text-teal-100">{lv.sub}</p>
                <p className="mt-2 font-mono text-sm font-bold tabular-nums">{lv.band}</p>
              </div>
            ) : (
              <button
                key={lv.id}
                type="button"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-500 shadow-sm transition-colors hover:border-teal-200 hover:text-slate-700"
              >
                {lv.label}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="mt-8 space-y-5 border-t border-slate-100 pt-6">
        <div>
          <p className={L}>Required skills</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {['SQL', 'Python'].map((s) => (
              <span key={s} className="rounded-full bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className={L}>Nice to have</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {['Tableau', 'Power BI', 'BigQuery'].map((s) => (
              <span key={s} className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExecuteMock() {
  const StepShell = ({ n, children }) => (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white shadow-md">
        {n}
      </div>
      <div className="min-w-0 flex-1 pb-6">{children}</div>
    </div>
  );

  return (
    <div className={`${mockChrome} overflow-hidden p-5 md:p-7`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <p className={`${L} text-teal-700`}>TalentXRay · Execute</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">Automated sourcing</h3>
        </div>
      </div>

      <div className="relative mt-6 space-y-0 pl-1 md:pl-2">
        <div className="absolute bottom-8 left-[17px] top-10 w-px bg-gradient-to-b from-teal-200 via-teal-100 to-transparent md:left-[21px]" aria-hidden />

        <StepShell n={1}>
          <p className="text-sm font-semibold text-slate-900">Where to search</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-900/20 ring-2 ring-purple-500">
              LinkedIn
            </span>
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">Region</span>
              <span className="text-sm font-semibold text-slate-800">India</span>
              <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </StepShell>

        <StepShell n={2}>
          <p className="text-sm font-semibold text-slate-900">Role keywords</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {['Data Analyst', 'Product Analyst'].map((r) => (
              <span key={r} className="rounded-full bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                {r}
              </span>
            ))}
          </div>
        </StepShell>

        <StepShell n={3}>
          <p className="text-sm font-semibold text-slate-900">Must-have skills</p>
          <p className="mt-1 text-xs text-slate-500">Grounded in required skills from your benchmark profile.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {['SQL', 'Python'].map((s) => (
              <span key={s} className="rounded-full bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                {s}
              </span>
            ))}
          </div>
        </StepShell>
      </div>

      <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-center md:text-left">
        <p className="text-xs leading-relaxed text-slate-600 md:text-sm">
          <span className="font-semibold text-teal-800">Forecasted Offer-to-Join ratio</span> based on market parameters:{' '}
          <span className="font-mono font-bold tabular-nums text-slate-900">85%</span>
        </p>
      </div>
    </div>
  );
}

function RetainMock() {
  return (
    <div className={`${mockChrome} overflow-hidden ring-1 ring-red-100`}>
      <div className="bg-red-100 px-5 py-4 md:px-7">
        <p className="text-sm font-bold uppercase tracking-wide text-red-900 md:text-base">
          Critical · Backend Engineering
        </p>
      </div>
      <div className="space-y-5 px-5 py-6 md:px-7">
        <div>
          <p className={L}>Pattern</p>
          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-800 md:text-[15px]">
            Compensation Risk + Exit Risk.
          </p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className={L}>Confirmed signals</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-[15px]">
            Salary gap 18% below peer avg. Leave Variance Ratio &gt; 1.5.
          </p>
        </div>
        <div className="rounded-xl border-2 border-teal-600 bg-teal-50/80 p-4 shadow-inner md:p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-teal-900">Fix-it</p>
          <p className="mt-3 text-sm leading-relaxed text-teal-950 md:text-[15px]">
            <span className="font-semibold">Action:</span> Give 10% market correction to L4 Engineers.{' '}
            <span className="mt-2 block font-mono text-[13px] text-teal-900 md:inline md:mt-0">
              Cost: ₹8.4L/year | Saves: ₹88L replacement | ROI: 10.5x
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const steps = [
  {
    tab: 'Plan',
    caption: 'HeadcountIQ',
    accent: 'purple',
    ui: <PlanMock />,
  },
  {
    tab: 'Benchmark',
    caption: 'SkillMapper',
    accent: 'teal',
    ui: <BenchmarkMock />,
  },
  {
    tab: 'Execute',
    caption: 'TalentXRay',
    accent: 'teal',
    ui: <ExecuteMock />,
  },
  {
    tab: 'Retain',
    caption: 'Attrition AI',
    accent: 'rose',
    ui: <RetainMock />,
  },
];

function tabActiveClasses(accent) {
  switch (accent) {
    case 'purple':
      return 'bg-purple-600 text-white shadow-lg shadow-purple-900/25 ring-2 ring-purple-500/50';
    case 'teal':
      return 'bg-teal-700 text-white shadow-lg shadow-teal-900/20 ring-2 ring-teal-600/40';
    case 'rose':
      return 'bg-red-700 text-white shadow-lg shadow-red-900/25 ring-2 ring-red-600/40';
    default:
      return 'bg-slate-900 text-white';
  }
}

function progressFillClass(accent) {
  switch (accent) {
    case 'purple':
      return 'bg-purple-600';
    case 'teal':
      return 'bg-teal-700';
    case 'rose':
      return 'bg-red-600';
    default:
      return 'bg-slate-800';
  }
}

const mockTransition = { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] };

function FourToolsGrid({ onSeeRetain }) {
  const cards = [
    {
      title: 'HeadcountIQ',
      titleClass: 'text-purple-700',
      line: 'Revenue → roles → burn → exportable plan',
      href: 'https://headcountiq.talentsradar.com',
      cta: 'Open →',
      external: true,
    },
    {
      title: 'SkillMapper',
      titleClass: 'text-teal-800',
      line: 'Real-time market bands and required skills',
      href: 'https://skillmapper.talentsradar.com',
      cta: 'Open →',
      external: true,
    },
    {
      title: 'TalentXRay',
      titleClass: 'text-teal-800',
      line: 'Automated sourcing across LinkedIn & GitHub',
      href: 'https://talentxray.talentsradar.com',
      cta: 'Open →',
      external: true,
    },
    {
      title: 'Attrition AI',
      titleClass: 'text-red-800',
      line: 'Team risk % · signals · costed actions',
      cta: 'See in flow →',
      external: false,
    },
  ];

  const cardShell =
    'flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md';

  return (
    <section id="four-tools" className="border-t border-slate-100 bg-slate-50 px-4 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-sm font-medium tracking-wide text-slate-500">Four tools · one workflow</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) =>
            c.external ? (
              <a
                key={c.title}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardShell} block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600`}
              >
                <h3 className={`text-lg font-semibold ${c.titleClass}`}>{c.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{c.line}</p>
                <span className={`mt-6 text-sm font-semibold ${c.titleClass}`}>{c.cta}</span>
              </a>
            ) : (
              <button
                key={c.title}
                type="button"
                onClick={onSeeRetain}
                className={`${cardShell} text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700`}
              >
                <h3 className={`text-lg font-semibold ${c.titleClass}`}>{c.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{c.line}</p>
                <span className={`mt-6 text-sm font-semibold ${c.titleClass}`}>{c.cta}</span>
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export default function ProductFlowSection() {
  const [step, setStep] = useState(0);
  const rootRef = useRef(null);
  const advanceTimerRef = useRef(null);
  const inView = useInView(rootRef, { amount: 0.15 });

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current !== null) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  /** Schedule next auto-advance; clears any pending timeout first */
  useEffect(() => {
    clearAdvanceTimer();

    if (!inView) return undefined;

    advanceTimerRef.current = window.setTimeout(() => {
      advanceTimerRef.current = null;
      setStep((s) => (s + 1) % steps.length);
    }, STEP_MS);

    return () => clearAdvanceTimer();
  }, [inView, step, clearAdvanceTimer]);

  const go = useCallback((i) => setStep(i), []);

  const focusRetainTab = useCallback(() => {
    setStep(3);
    window.requestAnimationFrame(() => {
      document.getElementById('product-flow')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  return (
    <>
      <section
        id="product-flow"
        ref={rootRef}
        className="bg-slate-50 px-4 pb-16 pt-8 md:min-h-[calc(100vh-4rem)] md:px-6 md:pb-24 md:pt-12"
      >
        <div className="mx-auto flex max-w-6xl flex-col md:min-h-[min(85vh,920px)]">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:mt-2">
            {steps.map((s, i) => (
              <button
                key={s.tab}
                type="button"
                onClick={() => go(i)}
                className={`rounded-xl px-5 py-3 text-sm font-semibold transition-colors duration-150 sm:min-w-[7.25rem] ${
                  step === i
                    ? tabActiveClasses(s.accent)
                    : 'border border-slate-200 bg-white text-slate-600 shadow-md hover:bg-slate-50'
                }`}
              >
                {s.tab}
              </button>
            ))}
          </div>

          <div className="mt-8 flex min-h-0 flex-1 flex-col md:mt-10">
            <div className="mb-6 flex justify-center text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={mockTransition}
                  className="flex flex-wrap items-center justify-center gap-3"
                >
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider ${
                      steps[step].accent === 'purple'
                        ? 'text-purple-700'
                        : steps[step].accent === 'rose'
                          ? 'text-red-700'
                          : 'text-teal-800'
                    }`}
                  >
                    {steps[step].caption}
                  </span>
                  <span className="text-[11px] font-medium text-slate-300">·</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{steps[step].tab}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={mockTransition}
                  className="flex flex-col"
                >
                  <div className="flex-1">{steps[step].ui}</div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex gap-2 md:mt-10">
              {steps.map((s, i) => (
                <button
                  key={`seg-${s.tab}`}
                  type="button"
                  aria-label={`Go to ${s.tab}`}
                  onClick={() => go(i)}
                  className="relative h-1.5 min-w-[48px] flex-1 overflow-hidden rounded-full bg-slate-200"
                >
                  <motion.div
                    className={`absolute inset-y-0 left-0 rounded-full ${progressFillClass(s.accent)}`}
                    initial={false}
                    animate={{ width: i <= step ? '100%' : '12%' }}
                    transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FourToolsGrid onSeeRetain={focusRetainTab} />
    </>
  );
}
