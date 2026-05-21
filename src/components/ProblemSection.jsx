import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { easePremium, fadeUp, staggerContainer } from '../lib/motionPresets.js';
import RadarLogo from './RadarLogo.jsx';

const signals = [
  { label: 'Revenue Targets', accent: 'text-purple-700', ring: 'ring-purple-100/80' },
  { label: 'Hiring Capacity', accent: 'text-slate-800', ring: 'ring-slate-200/80' },
  { label: 'Compensation Movement', accent: 'text-teal-800', ring: 'ring-teal-100/80' },
  { label: 'Attrition Risk', accent: 'text-red-700', ring: 'ring-red-100/80' },
];

/** Interrupted vertical link — fragmented, not flowing */
function BrokenLink({ index, active }) {
  return (
    <motion.svg
      width="20"
      height="36"
      viewBox="0 0 20 36"
      fill="none"
      className="text-slate-300/90"
      aria-hidden
    >
      <motion.line
        x1="10"
        y1="2"
        x2="10"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="3 4"
        animate={active ? { strokeDashoffset: [0, 14] } : {}}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', delay: index * 0.18 }}
      />
      <motion.line
        x1="7"
        y1="16"
        x2="13"
        y2="20"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
        animate={active ? { opacity: [0.35, 0.65, 0.35] } : {}}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.12 }}
      />
      <motion.line
        x1="10"
        y1="24"
        x2="10"
        y2="34"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="3 4"
        animate={active ? { strokeDashoffset: [14, 0] } : {}}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', delay: index * 0.18 + 0.4 }}
      />
    </motion.svg>
  );
}

/** Lines converge — fragmentation resolves */
function ConvergenceLink({ active }) {
  return (
    <motion.svg
      width="120"
      height="48"
      viewBox="0 0 120 48"
      fill="none"
      className="text-slate-300"
      aria-hidden
    >
      <motion.path
        d="M 20 4 L 60 40"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.25 }}
        animate={active ? { pathLength: 1, opacity: 0.55 } : {}}
        transition={{ duration: 0.9, ease: easePremium, delay: 0.05 }}
      />
      <motion.path
        d="M 60 4 L 60 40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.35 }}
        animate={active ? { pathLength: 1, opacity: 0.85 } : {}}
        transition={{ duration: 0.75, ease: easePremium }}
      />
      <motion.path
        d="M 100 4 L 60 40"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.25 }}
        animate={active ? { pathLength: 1, opacity: 0.55 } : {}}
        transition={{ duration: 0.9, ease: easePremium, delay: 0.1 }}
      />
      <motion.circle
        cx="60"
        cy="40"
        r="2.5"
        fill="#a78bfa"
        initial={{ scale: 0, opacity: 0 }}
        animate={active ? { scale: 1, opacity: 0.9 } : {}}
        transition={{ duration: 0.4, ease: easePremium, delay: 0.55 }}
      />
    </motion.svg>
  );
}

function SignalCard({ label, accent, ring, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-6%' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.48, ease: easePremium }}
      className={`mx-auto flex w-full max-w-sm items-center justify-center rounded-xl border border-slate-100/90 bg-white px-6 py-4 shadow-sm ring-1 ${ring}`}
    >
      <p className={`text-center text-[15px] font-semibold tracking-tight ${accent}`}>{label}</p>
    </motion.div>
  );
}

export default function ProblemSection() {
  const flowRef = useRef(null);
  const flowInView = useInView(flowRef, { once: true, margin: '-8%' });
  const payoffRef = useRef(null);
  const payoffInView = useInView(payoffRef, { once: true, margin: '-8%' });

  return (
    <section id="questions" className="border-t border-slate-100/80 bg-white px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-72px' }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
            The disconnect
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl"
          >
            Business-critical workforce decisions run on{' '}
            <span className="text-purple-700">disconnected information.</span>
          </motion.h2>

          <motion.div
            ref={flowRef}
            variants={fadeUp}
            className="mx-auto mt-14 flex max-w-sm flex-col items-center md:mt-16"
          >
            {signals.map((item, i) => (
              <div key={item.label} className="flex w-full flex-col items-center">
                <SignalCard {...item} index={i} />
                {i < signals.length - 1 ? (
                  <div className="flex items-center justify-center py-1">
                    <BrokenLink index={i} active={flowInView} />
                  </div>
                ) : null}
              </div>
            ))}

            <div className="flex flex-col items-center pt-2">
              <ConvergenceLink active={flowInView} />
            </div>

            <motion.div
              ref={payoffRef}
              initial={{ opacity: 0, y: 14 }}
              animate={payoffInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: easePremium, delay: 0.12 }}
              className="mt-2 flex w-full max-w-sm flex-col items-center"
            >
              <div className="w-full rounded-2xl border border-purple-200/60 bg-gradient-to-b from-purple-50/90 via-white to-white px-6 py-6 shadow-soft ring-1 ring-purple-100/80">
                <div className="flex flex-col items-center gap-3">
                  <RadarLogo className="h-9 w-9" />
                  <div className="text-center">
                    <p className="text-base font-semibold tracking-tight text-slate-900">Talents Radar</p>
                    <p className="mt-1 text-sm font-medium text-purple-800">Connected Workforce Context</p>
                  </div>
                </div>
              </div>
              <p className="mt-10 max-w-lg text-center text-[15px] leading-relaxed text-slate-500 md:mt-11">
                Talents Radar connects workforce signals into one clear operational view.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
