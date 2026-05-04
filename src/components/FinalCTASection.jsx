import { motion } from 'framer-motion';
import { easeOut, fadeUp, staggerContainer } from '../lib/motionPresets.js';

export default function FinalCTASection() {
  const explore = () => document.getElementById('product-flow')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 px-5 py-24 md:py-28">
      <motion.div
        className="relative mx-auto max-w-[1200px] text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Bring revenue, hiring, and retention into one executive view
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
          Scroll back to the interactive Plan → Retain sequence—the same accents and density as the live console aesthetic.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-12 flex justify-center">
          <motion.button
            type="button"
            onClick={explore}
            className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-12 py-4 text-sm font-semibold text-white shadow-xl shadow-purple-900/25 transition-colors hover:bg-purple-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: easeOut }}
          >
            Explore Plan → Retain
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
