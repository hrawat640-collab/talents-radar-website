import { motion } from 'framer-motion';
import AIReasoningPanel from './AIReasoningPanel.jsx';
import { fadeUp, staggerContainer } from '../lib/motionPresets.js';

export default function RadarAISection() {
  return (
    <section
      id="radar-ai"
      className="border-t border-slate-100/80 bg-gradient-to-b from-transparent to-indigo-50/30 px-5 py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-purple-200/70 bg-white p-5 shadow-[0_8px_40px_-16px_rgba(109,94,243,0.28)] ring-1 ring-purple-100/80 md:rounded-3xl md:p-8 lg:p-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-72px' }}
            variants={staggerContainer}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.p variants={fadeUp} className="mb-3 text-sm font-bold uppercase tracking-widest text-indigo-600">
              Radar AI
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mb-10 text-3xl font-extrabold text-slate-900 md:text-4xl"
            >
              Ask AI questions related to your organization.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm leading-relaxed text-slate-600 md:text-[15px]">
              Radar AI brings together planning, hiring, compensation, skills, and attrition intelligence into one
              reasoning interface.
            </motion.p>
          </motion.div>

          <AIReasoningPanel />
        </div>
      </div>
    </section>
  );
}
