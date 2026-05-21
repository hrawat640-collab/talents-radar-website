import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import AIReasoningPanel from './AIReasoningPanel.jsx';
import RadarLogo from './RadarLogo.jsx';
import { easePremium, fadeUp, staggerContainer } from '../lib/motionPresets.js';

const workforceSignals = [
  { label: 'Revenue targets', x: '4%', y: '8%', drift: { x: [0, 6, 0], y: [0, -4, 0] } },
  { label: 'Hiring capacity', x: '2%', y: '28%', drift: { x: [0, 8, 0], y: [0, 5, 0] } },
  { label: 'Compensation movement', x: '6%', y: '48%', drift: { x: [0, 5, 0], y: [0, -6, 0] } },
  { label: 'Skills demand', x: '3%', y: '68%', drift: { x: [0, 7, 0], y: [0, 4, 0] } },
  { label: 'Attrition risk', x: '8%', y: '86%', drift: { x: [0, 4, 0], y: [0, -5, 0] } },
];

const intelligenceOutputs = [
  'Attrition risk identified',
  'Compensation gap detected',
  'Hiring demand increasing',
  'Skills shortage identified',
  'Capacity imbalance detected',
  'Market competitiveness declining',
];

const decisionOutcomes = [
  'Hiring priorities updated',
  'Compensation adjustments recommended',
  'Workforce gaps surfaced',
  'Retention actions prioritized',
];

/** Ambient drift lines converging toward center — no hard pipeline */
function ConvergenceAtmosphere({ active }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden>
      <motion.div
        className="absolute left-1/2 top-1/2 h-[min(100%,420px)] w-[min(100%,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.14)_0%,transparent_62%)]"
        animate={active ? { scale: [1, 1.06, 1], opacity: [0.6, 0.95, 0.6] } : {}}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" fill="none">
        {[
          'M 60 80 Q 200 120 300 200',
          'M 50 200 Q 180 200 300 200',
          'M 70 300 Q 210 240 300 200',
          'M 540 100 Q 400 140 300 200',
          'M 550 220 Q 420 210 300 200',
          'M 530 320 Q 400 260 300 200',
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="#c4b5fd"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeDasharray="4 8"
            initial={{ opacity: 0.08 }}
            animate={active ? { opacity: [0.08, 0.28, 0.08], strokeDashoffset: [0, 24] } : {}}
            transition={{
              opacity: { duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 },
              strokeDashoffset: { duration: 5, repeat: Infinity, ease: 'linear', delay: i * 0.35 },
            }}
          />
        ))}
      </svg>
    </div>
  );
}

const DEFAULT_DRIFT = { x: [0, 0, 0], y: [0, 0, 0] };

/** Normalize signal coords — supports `position` object or top-level x/y */
function normalizeSignal(signal) {
  if (!signal || typeof signal !== 'object') return null;

  const label = signal.label;
  if (!label) return null;

  const posX = signal.position?.x ?? signal.x ?? '4%';
  const posY = signal.position?.y ?? signal.y ?? '10%';

  const driftIn = signal.drift;
  const driftX = Array.isArray(driftIn?.x) ? driftIn.x : DEFAULT_DRIFT.x;
  const driftY = Array.isArray(driftIn?.y) ? driftIn.y : DEFAULT_DRIFT.y;

  return {
    label,
    left: String(posX),
    top: String(posY),
    driftX,
    driftY,
  };
}

function FloatingSignal({ signal, active, delay = 0 }) {
  const normalized = normalizeSignal(signal);
  if (!normalized) return null;

  const { label, left, top, driftX, driftY } = normalized;
  const safeDelay = Number.isFinite(delay) ? delay : 0;

  return (
    <motion.div
      className="absolute z-10 hidden max-w-[140px] md:block"
      style={{ left, top }}
      initial={{ opacity: 0 }}
      animate={
        active
          ? {
              opacity: [0.55, 0.82, 0.55],
              x: driftX,
              y: driftY,
            }
          : {}
      }
      transition={{
        opacity: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: safeDelay },
        x: { duration: 5 + safeDelay, repeat: Infinity, ease: 'easeInOut' },
        y: { duration: 5.5 + safeDelay, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <span className="block rounded-full border border-slate-200/60 bg-white/70 px-3 py-1.5 text-[11px] font-medium text-slate-600 shadow-sm backdrop-blur-sm">
        {label}
      </span>
    </motion.div>
  );
}

function IntelligenceHub({ active }) {
  const [outputIndex, setOutputIndex] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    const id = setInterval(() => setOutputIndex((i) => (i + 1) % intelligenceOutputs.length), 3400);
    return () => clearInterval(id);
  }, [active]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={active ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: easePremium }}
      className="relative z-20 mx-auto w-full max-w-[360px] md:max-w-[400px]"
    >
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-purple-200/55 bg-gradient-to-b from-purple-50/95 via-white to-white px-8 py-9 shadow-[0_8px_40px_-12px_rgba(109,94,243,0.22)] ring-1 ring-purple-100/80 md:px-10 md:py-11"
        animate={active ? { y: [0, -4, 0] } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(167,139,250,0.18),transparent_55%)]"
          animate={active ? { opacity: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />

        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-purple-400/50"
            style={{
              left: `${28 + i * 22}%`,
              top: `${18 + (i % 2) * 8}%`,
            }}
            animate={active ? { opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.2, 0.8] } : {}}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            aria-hidden
          />
        ))}

        <div className="relative flex flex-col items-center text-center">
          <RadarLogo className="h-11 w-11" />
          <p className="mt-4 text-base font-semibold tracking-tight text-slate-900">Talents Radar</p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-purple-700/70">
            Connected workforce intelligence
          </p>

          <div className="relative mt-8 flex min-h-[3.5rem] w-full items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={outputIndex}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.55, ease: easePremium }}
                className="text-[15px] font-medium leading-snug text-purple-900 md:text-base"
              >
                {intelligenceOutputs[outputIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MobileSignalCloud({ active }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:hidden">
      {workforceSignals.filter((s) => s?.label).map((s, i) => (
        <motion.span
          key={s.label}
          initial={{ opacity: 0, y: 6 }}
          animate={active ? { opacity: 0.75, y: [0, -2, 0] } : {}}
          transition={{
            opacity: { delay: i * 0.05, duration: 0.4 },
            y: { duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 },
          }}
          className="rounded-full border border-slate-200/50 bg-white/80 px-3 py-1 text-[11px] font-medium text-slate-600 backdrop-blur-sm"
        >
          {s.label}
        </motion.span>
      ))}
    </div>
  );
}

function DecisionOutcomes({ active, variant = 'desktop' }) {
  const isDesktop = variant === 'desktop';

  if (isDesktop) {
    return (
      <div className="absolute right-[2%] top-1/2 z-10 hidden w-[max(120px,16%)] -translate-y-1/2 flex-col gap-4 md:flex">
        {decisionOutcomes.map((label, i) => (
          <motion.p
            key={label}
            initial={{ opacity: 0, x: 8 }}
            animate={active ? { opacity: [0.45, 0.75, 0.45], x: 0 } : {}}
            transition={{
              opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 + i * 0.25 },
              x: { delay: 0.15 + i * 0.08, duration: 0.45, ease: easePremium },
            }}
            className="flex items-center gap-2 text-[11px] font-medium leading-snug text-slate-600"
          >
            <span className="h-1 w-1 shrink-0 rounded-full bg-slate-400/70" aria-hidden />
            {label}
          </motion.p>
        ))}
      </div>
    );
  }

  return (
    <ul className="mx-auto mt-8 flex max-w-xs flex-col gap-3 md:hidden">
      {decisionOutcomes.map((label, i) => (
        <motion.li
          key={label}
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease: easePremium }}
          className="flex items-center gap-2.5 text-[13px] font-medium text-slate-700"
        >
          <span className="h-1 w-1 rounded-full bg-purple-400/60" aria-hidden />
          {label}
        </motion.li>
      ))}
    </ul>
  );
}

function ConnectionPayoff() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: easePremium }}
      className="mx-auto mt-14 max-w-md text-center md:mt-16"
    >
      <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-100/90 bg-white px-4 py-2 shadow-sm">
        <RadarLogo className="h-6 w-6" />
        <span className="text-sm font-semibold text-slate-900">Talents Radar</span>
      </div>
      <p className="mt-6 text-[15px] leading-relaxed text-slate-500">
        Talents Radar connects workforce signals into one clear operational view.
      </p>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  const fieldRef = useRef(null);
  const fieldInView = useInView(fieldRef, { once: true, margin: '-10%' });

  return (
    <section id="how-it-works" className="border-t border-slate-100/80 bg-slate-50/35 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-72px' }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
            How it works
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 md:text-[2.35rem] md:leading-[1.12]"
          >
            Every growth decision is a workforce decision.
          </motion.h2>
        </motion.div>

        <motion.div
          ref={fieldRef}
          initial={{ opacity: 0 }}
          animate={fieldInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: easePremium }}
          className="relative mx-auto mt-14 min-h-[380px] max-w-5xl md:mt-16 md:min-h-[440px]"
        >
          <ConvergenceAtmosphere active={fieldInView} />

          {workforceSignals.map((s, i) => (
            <FloatingSignal key={s?.label ?? `signal-${i}`} signal={s} active={fieldInView} delay={i * 0.2} />
          ))}

          <DecisionOutcomes active={fieldInView} variant="desktop" />

          <div className="relative flex flex-col items-center justify-center px-2 pt-6 md:absolute md:inset-0 md:px-0 md:pt-0">
            <MobileSignalCloud active={fieldInView} />
            <div className="mt-6 w-full md:mt-0">
              <IntelligenceHub active={fieldInView} />
            </div>
            <DecisionOutcomes active={fieldInView} variant="mobile" />
          </div>
        </motion.div>

        <ConnectionPayoff />

        <AIReasoningPanel />
      </div>
    </section>
  );
}
