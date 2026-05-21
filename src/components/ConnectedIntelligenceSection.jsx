import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import ArchitectureMap, { ARCHITECTURE_NODE_IDS } from './ArchitectureMap.jsx';
import { easePremium } from '../lib/motionPresets.js';

const PANEL_TITLE = 'text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400';
const SIDE_PANEL = 'flex w-full max-w-[280px] flex-col justify-center lg:min-h-[480px]';

const QUESTIONS = [
  { id: ARCHITECTURE_NODE_IDS.headcount, text: 'Is our hiring plan actively aligned with revenue goals?' },
  { id: ARCHITECTURE_NODE_IDS.skillmapper, text: 'Are compensation gaps affecting retention?' },
  { id: ARCHITECTURE_NODE_IDS.talentxray, text: 'How do we instantly uncover passive talent for hard-to-fill roles?' },
  { id: ARCHITECTURE_NODE_IDS.retainiq, text: 'Which critical teams are at flight risk this quarter?' },
  { id: ARCHITECTURE_NODE_IDS.radar, text: 'What workforce risks need attention this quarter?' },
];

const OUTCOMES = [
  { id: ARCHITECTURE_NODE_IDS.headcount, text: 'Hiring aligned to growth goals' },
  { id: ARCHITECTURE_NODE_IDS.skillmapper, text: 'Market-aligned compensation' },
  { id: ARCHITECTURE_NODE_IDS.talentxray, text: 'Faster time-to-hire' },
  { id: ARCHITECTURE_NODE_IDS.retainiq, text: 'Attrition risks surfaced early' },
  { id: ARCHITECTURE_NODE_IDS.radar, text: 'AI-driven insights across the org' },
];

function itemHighlightClass(activeNode, itemNodeId) {
  const highlighted = activeNode === null || activeNode === itemNodeId;
  return highlighted
    ? 'opacity-100 text-slate-600 transition-opacity duration-300 ease-out'
    : 'opacity-30 text-slate-300 transition-opacity duration-300 ease-out';
}

function outcomeHighlightClass(activeNode, itemNodeId) {
  const highlighted = activeNode === null || activeNode === itemNodeId;
  return highlighted
    ? 'opacity-100 transition-opacity duration-300 ease-out'
    : 'opacity-30 transition-opacity duration-300 ease-out';
}

function QuestionsPanel({ activeNode }) {
  return (
    <div className={SIDE_PANEL}>
      <p className={PANEL_TITLE}>Complex decisions, answered instantly</p>
      <ul className="mt-4 flex flex-col justify-center gap-3 lg:mt-5 lg:gap-3.5">
        {QUESTIONS.map((item) => (
          <li
            key={item.id}
            className={`border-l-[3px] py-0.5 pl-3 text-[14px] font-normal leading-snug md:text-[15px] ${
              activeNode === item.id ? 'border-indigo-400' : 'border-transparent'
            } ${itemHighlightClass(activeNode, item.id)}`}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function OutcomesPanel({ activeNode, inView }) {
  return (
    <div className={SIDE_PANEL}>
      <p className={PANEL_TITLE}>Organizational outcomes</p>
      <ul className="mt-4 flex flex-col justify-center gap-3 lg:mt-5 lg:gap-3.5">
        {OUTCOMES.map((item, i) => (
          <motion.li
            key={item.id}
            initial={inView ? { y: 6 } : false}
            animate={inView ? { y: 0 } : false}
            transition={{ delay: 0.04 + i * 0.03, duration: 0.35, ease: easePremium }}
            className={`flex items-start gap-2.5 ${outcomeHighlightClass(activeNode, item.id)}`}
          >
            <span
              className={`mt-0.5 shrink-0 text-sm font-bold transition-colors duration-300 ${
                activeNode === null || activeNode === item.id ? 'text-emerald-500' : 'text-slate-300'
              }`}
              aria-hidden
            >
              ✓
            </span>
            <span
              className={`text-[14px] leading-snug transition-colors duration-300 md:text-[15px] ${
                activeNode === null || activeNode === item.id ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {item.text}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function IntelligenceField({ inView, activeNode, onActiveNodeChange }) {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 lg:grid-cols-12 lg:gap-8">
      <div className="flex w-full justify-center lg:col-span-3 lg:justify-start">
        <QuestionsPanel activeNode={activeNode} />
      </div>

      <div className="flex items-center justify-center lg:col-span-6">
        <ArchitectureMap
          activeNode={activeNode}
          onActiveNodeChange={onActiveNodeChange}
          className="aspect-square w-full max-w-[min(100%,520px)]"
        />
      </div>

      <div className="flex w-full justify-center lg:col-span-3 lg:justify-end">
        <OutcomesPanel activeNode={activeNode} inView={inView} />
      </div>
    </div>
  );
}

export default function ConnectedIntelligenceSection() {
  const [activeNode, setActiveNode] = useState(null);
  const fieldRef = useRef(null);
  const fieldInView = useInView(fieldRef, { once: true, margin: '-8%' });

  return (
    <section
      id="connected-intelligence"
      className="overflow-hidden border-t border-slate-100/80 bg-gradient-to-b from-slate-50/50 to-white px-5 py-10 pb-8 md:py-12 md:pb-10"
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-48px' }}
          transition={{ duration: 0.45, ease: easePremium }}
          className="mb-8 text-center text-3xl font-extrabold text-slate-900 md:text-4xl"
        >
          Connected Workforce Intelligence
        </motion.h2>

        <motion.div
          ref={fieldRef}
          initial={{ opacity: 0 }}
          animate={fieldInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.55, ease: easePremium }}
        >
          <IntelligenceField
            inView={fieldInView}
            activeNode={activeNode}
            onActiveNodeChange={setActiveNode}
          />
        </motion.div>
      </div>
    </section>
  );
}
