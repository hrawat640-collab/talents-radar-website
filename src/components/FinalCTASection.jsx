import { motion } from 'framer-motion';
import { useFormModals } from '../context/FormModalsContext.jsx';
import { fadeUp, staggerContainer } from '../lib/motionPresets.js';

export default function FinalCTASection() {
  const { openDemo } = useFormModals();

  return (
    <section id="cta" className="border-t border-slate-100/80 bg-white px-5 py-16 md:py-24">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-72px' }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeUp} className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          See connected workforce intelligence on a demo
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-sm leading-relaxed text-slate-500 md:text-base">
          Walk through HeadcountIQ, SkillMapper, TalentXRay, RetainIQ, and Radar AI with your leadership team.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 flex justify-center md:mt-10">
          <button
            type="button"
            onClick={openDemo}
            className="w-full max-w-xs rounded-xl bg-slate-900 px-10 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-all duration-300 ease-premium hover:-translate-y-px hover:bg-slate-800 hover:shadow-card-hover sm:w-auto"
          >
            Book a Demo
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
