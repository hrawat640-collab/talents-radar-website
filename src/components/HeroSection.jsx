import { motion } from 'framer-motion';
import { useFormModals } from '../context/FormModalsContext.jsx';

export default function HeroSection() {
  const { openDemo } = useFormModals();

  return (
    <section id="hero" className="bg-white px-5 pb-16 pt-14 md:pb-20 md:pt-20">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-[2rem] font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl md:text-6xl md:leading-[1.05]"
        >
          Predictive AI for revenue-aligned hiring and retention.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-snug text-slate-500 md:text-xl md:leading-snug"
        >
          Stop guessing. Connect your revenue targets directly to headcount planning, market sourcing, and predictive attrition
          warnings.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mt-12 flex justify-center"
        >
          <button
            type="button"
            onClick={openDemo}
            className="rounded-xl bg-slate-900 px-10 py-4 text-[15px] font-semibold text-white shadow-xl shadow-slate-900/25 transition-transform hover:bg-slate-800 active:scale-[0.98]"
          >
            Book a Demo
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="mt-10 text-sm text-slate-400"
        >
          Powering decisions for 600+ leaders across the US and India.
        </motion.p>
      </div>
    </section>
  );
}
