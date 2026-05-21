import { motion } from 'framer-motion';
import AIReasoningPanel from './AIReasoningPanel.jsx';
import { fadeUp, staggerContainer } from '../lib/motionPresets.js';

export default function AIReasoningSection() {
  return (
    <section id="ask-talents-radar" className="border-t border-slate-100/80 bg-white px-5 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-72px' }}
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
            Workforce decision copilot
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Instead of switching across dashboards, ask Talents Radar.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-sm leading-relaxed text-slate-500 md:text-base">
            Ask organizational workforce questions directly. Talents Radar synthesizes planning, hiring, compensation,
            skills, and attrition context into clear, actionable answers.
          </motion.p>
        </motion.div>

        <AIReasoningPanel />
      </div>
    </section>
  );
}
