import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { easeOut, fadeUp, staggerContainer } from '../lib/motionPresets.js';

const VB = { w: 400, h: 320 };
const C = { x: 200, y: 160 };
const satellites = [
  { id: 'hq', label: 'HeadcountIQ', x: 200, y: 44, stroke: '#7c3aed' },
  { id: 'sm', label: 'SkillMapper', x: 36, y: 160, stroke: '#0f766e' },
  { id: 'tx', label: 'TalentXRay', x: 364, y: 160, stroke: '#0f766e' },
  { id: 'ai', label: 'RetainIQ', x: 200, y: 276, stroke: '#b91c1c' },
];

export default function IntelligenceSection() {
  const wrapRef = useRef(null);
  const linesReady = useInView(wrapRef, { once: true, margin: '-10%', amount: 0.35 });
  const [hovered, setHovered] = useState(null);

  const lineOpacity = (id) => {
    if (!linesReady) return 0;
    if (!hovered) return 0.42;
    return hovered === id ? 1 : 0.12;
  };

  const lineStroke = (id) => {
    const sat = satellites.find((s) => s.id === id);
    const base = sat?.stroke ?? '#94a3b8';
    if (!hovered || hovered === id) return base;
    return '#e2e8f0';
  };

  return (
    <section id="intelligence-layer" className="relative overflow-hidden border-b border-slate-200 bg-slate-50 px-5 py-24 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/4 hidden h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-gradient-to-br from-purple-200/40 to-teal-200/35 blur-3xl md:block" />

      <div className="relative mx-auto max-w-[1200px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mx-auto max-w-[680px] text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Strategy stays coherent when context carries forward
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Plans, compensation benchmarks, automated sourcing grounded in required skills, and retention economics stay wired together—so
            operators aren’t re-explaining assumptions every week.
          </motion.p>
        </motion.div>

        <div ref={wrapRef} className="relative mx-auto mt-14 max-w-[min(92vw,480px)] md:max-w-[560px]">
          <motion.div
            className="relative mx-auto mt-12 aspect-[400/320] w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: easeOut }}
            onMouseLeave={() => setHovered(null)}
          >
            <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${VB.w} ${VB.h}`} fill="none" aria-hidden>
              {satellites.map((n, i) => (
                <motion.path
                  key={n.id}
                  d={`M ${C.x} ${C.y} L ${n.x} ${n.y}`}
                  strokeLinecap="round"
                  strokeWidth={2}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: linesReady ? 1 : 0,
                    opacity: lineOpacity(n.id),
                    stroke: lineStroke(n.id),
                  }}
                  transition={{
                    pathLength: { duration: 0.55, ease: easeOut, delay: 0.06 + i * 0.08 },
                    opacity: { duration: 0.28 },
                    stroke: { duration: 0.22 },
                  }}
                />
              ))}
            </svg>

            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="relative flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full bg-gradient-to-br from-purple-700 via-purple-600 to-teal-700 shadow-2xl shadow-purple-900/30 md:h-[5.25rem] md:w-[5.25rem]"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="relative text-[10px] font-semibold uppercase leading-tight tracking-wider text-white">Layer</span>
              </motion.div>
            </div>

            {satellites.map((n) => (
              <div
                key={n.id}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(n.x / VB.w) * 100}%`, top: `${(n.y / VB.h) * 100}%` }}
              >
                <motion.button
                  type="button"
                  className="block whitespace-nowrap rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-left text-sm font-semibold text-slate-900 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl"
                  style={{
                    boxShadow: hovered === n.id ? `0 12px 40px -8px ${n.stroke}33` : undefined,
                  }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setHovered(n.id)}
                >
                  {n.label}
                </motion.button>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
