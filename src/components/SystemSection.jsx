import { motion } from 'framer-motion';
import { easeOut } from '../lib/motionPresets.js';

const cards = [
  {
    product: 'HeadcountIQ',
    line: 'Model revenue commitments → funded roles → ₹ runway · board-ready exports',
    href: 'https://headcountiq.talentsradar.com',
    soon: false,
    ring: 'ring-purple-200 hover:ring-purple-300',
    link: 'text-purple-700 hover:text-purple-800',
  },
  {
    product: 'SkillMapper',
    line: 'Define required skills · ₹ benchmarks · ladders from junior to lead',
    href: 'https://skillmapper.talentsradar.com',
    soon: false,
    ring: 'ring-teal-200 hover:ring-teal-300',
    link: 'text-teal-800 hover:text-teal-900',
  },
  {
    product: 'TalentXRay',
    line: 'Automated sourcing · required skills · LinkedIn / GitHub / Behance',
    href: 'https://talentxray.talentsradar.com',
    soon: false,
    ring: 'ring-teal-200 hover:ring-teal-300',
    link: 'text-teal-800 hover:text-teal-900',
  },
  {
    product: 'Attrition AI',
    line: 'Spot retention risk early · prioritized signals · exec-ready actions',
    href: '#product-flow',
    soon: true,
    ring: 'ring-red-200 hover:ring-red-300',
    link: 'text-red-700 hover:text-red-800',
  },
];

const cardBase =
  'flex flex-col rounded-xl border border-slate-200 bg-white p-7 shadow-xl ring-1 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl';

export default function SystemSection() {
  return (
    <section id="system-flow" className="border-b border-slate-200 bg-white px-5 py-24 md:py-28">
      <div className="relative mx-auto max-w-[1200px]">
        <motion.h2
          className="mb-4 text-center text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          One integrated suite for workforce ROI
        </motion.h2>
        <motion.p
          className="mx-auto mb-14 max-w-2xl text-center text-lg text-slate-600"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: easeOut, delay: 0.05 }}
        >
          Purple-branded planning, teal-tinted benchmarking and execution, and retention surfaces that read like operating metrics—not
          slideware.
        </motion.p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
          {cards.map((c, idx) => (
            <motion.article
              key={c.product}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, ease: easeOut, delay: idx * 0.06 }}
              className={`${cardBase} ${c.ring} ${c.soon ? 'relative bg-gradient-to-b from-white to-slate-50/80 pt-12' : ''}`}
            >
              {c.soon ? (
                <span className="absolute left-7 top-5 rounded-full bg-red-700 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-md">
                  Coming Soon
                </span>
              ) : null}
              <h3 className="text-lg font-semibold text-slate-900">{c.product}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-600">{c.line}</p>
              <a
                href={c.href}
                {...(c.soon ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                className={`group mt-6 inline-flex items-center gap-1 text-sm font-semibold ${c.link}`}
              >
                {c.soon ? 'See in flow' : 'Open'}
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                  →
                </span>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
