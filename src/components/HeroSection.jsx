import { motion } from 'framer-motion';
import { useFormModals } from '../context/FormModalsContext.jsx';
import { easePremium } from '../lib/motionPresets.js';

export default function HeroSection() {
  const { openDemo } = useFormModals();

  return (
    <section id="hero" className="bg-white px-5 pb-16 pt-12 md:pb-24 md:pt-20">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easePremium }}
          className="text-[1.75rem] font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl md:text-[3rem] md:leading-[1.06]"
        >
          Connect workforce decisions to business growth.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easePremium, delay: 0.06 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:mt-8 md:text-lg"
        >
          Talents Radar is a predictive AI decision engine that bridges planning, hiring, and retention into one
          connected intelligence layer. Eliminate fragmented spreadsheets and guesswork.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easePremium, delay: 0.12 }}
          className="mt-8 flex flex-col items-center md:mt-10"
        >
          <button
            type="button"
            onClick={openDemo}
            className="w-full max-w-xs rounded-xl bg-slate-900 px-8 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-all duration-300 ease-premium hover:-translate-y-px hover:bg-slate-800 hover:shadow-card-hover active:translate-y-0 sm:w-auto"
          >
            Book a Demo
          </button>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: easePremium, delay: 0.18 }}
            className="mt-3 text-xs text-slate-400 md:mt-3.5"
          >
            Used by 600+ leaders across the US and India.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
