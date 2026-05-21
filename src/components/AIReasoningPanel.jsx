import { AnimatePresence, motion, useInView } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AI_SCENARIOS } from '../data/aiScenarios.js';
import RegisterEarlyAccessButton from './ui/RegisterEarlyAccessButton.jsx';
import { easePremium } from '../lib/motionPresets.js';

const DEFAULT_INDEX = 0;
const TYPE_MS = 22;
const PONDER_MS = 1750;
const CHAT_MIN_HEIGHT = 'min-h-[300px] md:min-h-[340px]';

const SECTION_LABEL = 'text-[11px] font-bold uppercase tracking-[0.14em]';
const LIST_ITEM = 'flex items-start gap-2 text-[13px] font-medium leading-snug text-slate-700 md:text-[14px]';

/** @typedef {'idle' | 'typing' | 'pondering' | 'answered'} AnimationState */

function RadarAIIcon({ className = 'h-5 w-5 shrink-0 text-indigo-600' }) {
  return <BrainCircuit className={className} strokeWidth={2} aria-hidden />;
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function useTypewriter(text, runKey, enabled) {
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;
    setDisplay('');
    setDone(false);
    if (!text) return undefined;

    if (prefersReducedMotion()) {
      setDisplay(text);
      setDone(true);
      return undefined;
    }

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, TYPE_MS);

    return () => window.clearInterval(id);
  }, [text, runKey, enabled]);

  return { display, done };
}

function ThinkingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25, ease: easePremium }}
      className="flex items-start gap-3"
      aria-live="polite"
      aria-label="Radar AI is thinking"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100">
        <RadarAIIcon className="h-5 w-5 text-indigo-600" />
      </div>
      <div className="rounded-2xl rounded-bl-sm border border-slate-200/90 bg-white px-4 py-3 shadow-sm">
        <p className="text-xs font-medium text-slate-500">Radar AI is thinking…</p>
        <div className="mt-2 flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-indigo-500"
              animate={{ y: [0, -5, 0], opacity: [0.35, 1, 0.35] }}
              transition={{
                duration: 0.55,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.14,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StructuredAnswer({ scenario }) {
  return (
    <div>
      <p className={`${SECTION_LABEL} text-slate-500`}>Insights</p>
      <ul className="mt-1.5 space-y-1">
        {scenario.insights.map((item) => (
          <li key={item} className={LIST_ITEM}>
            <span className="mt-1 text-slate-400" aria-hidden>
              •
            </span>
            {item}
          </li>
        ))}
      </ul>

      <p className={`mt-3 ${SECTION_LABEL} text-indigo-600/90`}>{scenario.actionLabel}</p>
      <ul className="mt-1.5 space-y-1">
        {scenario.actions.map((item) => (
          <li key={item} className={LIST_ITEM}>
            <span className="mt-1 text-slate-400" aria-hidden>
              •
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function startSequence(setRunKey, setAnimationState) {
  setRunKey((k) => k + 1);
  if (prefersReducedMotion()) {
    setAnimationState('answered');
    return;
  }
  setAnimationState('typing');
}

export default function AIReasoningPanel() {
  const panelRef = useRef(null);
  const chatRef = useRef(null);
  const hasAutoPlayed = useRef(false);
  const panelInView = useInView(panelRef, { once: true, margin: '-10%', amount: 0.15 });
  const chatInView = useInView(chatRef, { once: true, amount: 0.4 });
  const [activeId, setActiveId] = useState(AI_SCENARIOS[DEFAULT_INDEX].id);
  const [runKey, setRunKey] = useState(0);
  /** @type {[AnimationState, import('react').Dispatch<import('react').SetStateAction<AnimationState>>]} */
  const [animationState, setAnimationState] = useState('idle');

  const active = AI_SCENARIOS.find((s) => s.id === activeId) ?? AI_SCENARIOS[0];
  const isTyping = animationState === 'typing';
  const { display: typedQuestion, done: questionDone } = useTypewriter(
    active.question,
    runKey,
    isTyping,
  );

  const selectScenario = useCallback((id) => {
    setActiveId(id);
    startSequence(setRunKey, setAnimationState);
  }, []);

  useEffect(() => {
    if (!chatInView || hasAutoPlayed.current) return undefined;
    hasAutoPlayed.current = true;
    setActiveId(AI_SCENARIOS[DEFAULT_INDEX].id);
    startSequence(setRunKey, setAnimationState);
    return undefined;
  }, [chatInView]);

  useEffect(() => {
    if (animationState !== 'typing' || !questionDone) return undefined;
    setAnimationState('pondering');
    return undefined;
  }, [animationState, questionDone, runKey]);

  useEffect(() => {
    if (animationState !== 'pondering') return undefined;
    const t = window.setTimeout(() => setAnimationState('answered'), PONDER_MS);
    return () => window.clearTimeout(t);
  }, [animationState, runKey]);

  const showUserBubble =
    animationState === 'typing' || animationState === 'pondering' || animationState === 'answered';
  const userQuestionText =
    animationState === 'typing' ? typedQuestion : animationState === 'answered' || animationState === 'pondering'
      ? active.question
      : '';

  return (
    <div ref={panelRef} className="mt-8 w-full md:mt-10">
      <motion.div
        ref={chatRef}
        initial={{ opacity: 0, y: 10 }}
        animate={panelInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easePremium }}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-indigo-500/10"
        aria-label="Radar AI chat"
      >
        <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50/90 px-4 py-3 md:px-5">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-2 sm:justify-start">
            <RadarAIIcon className="h-5 w-5 text-indigo-600" />
            <p className="text-sm font-semibold text-slate-900 md:text-[15px]">Radar AI</p>
          </div>
        </div>

        <div className="border-b border-slate-100 bg-white px-4 py-3 md:px-5 md:py-4">
          <p className={`${SECTION_LABEL} text-slate-400`}>Try a question</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {AI_SCENARIOS.map((scenario) => {
              const isActive = scenario.id === activeId;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => selectScenario(scenario.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 ease-premium sm:text-[13px] ${
                    isActive
                      ? 'border-indigo-300 bg-indigo-600 text-white shadow-sm shadow-indigo-900/15'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-900'
                  }`}
                >
                  {scenario.chip}
                </button>
              );
            })}
          </div>
        </div>

        <div className={`${CHAT_MIN_HEIGHT} flex flex-col gap-4 bg-slate-50/30 px-4 py-4 md:px-5 md:py-5`}>
          <AnimatePresence mode="wait">
            {showUserBubble && (
              <motion.div
                key={`user-${activeId}-${runKey}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: easePremium }}
                className="flex min-h-[52px] justify-end"
              >
                <div className="max-w-[92%] rounded-2xl rounded-tr-sm bg-slate-900 px-4 py-2.5 text-sm leading-relaxed text-white shadow-md md:max-w-[85%]">
                  <span>{userQuestionText}</span>
                  {isTyping && !questionDone && (
                    <span
                      className="ml-0.5 inline-block h-[1.1em] w-[2px] animate-pulse bg-white/90 align-middle"
                      aria-hidden
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="min-h-[140px] flex-1">
            <AnimatePresence mode="wait">
              {animationState === 'pondering' && <ThinkingBubble key={`think-${activeId}-${runKey}`} />}
              {animationState === 'answered' && (
                <motion.div
                  key={`answer-${activeId}-${runKey}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.32, ease: easePremium }}
                  className="flex gap-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100 md:h-10 md:w-10">
                    <RadarAIIcon className="h-5 w-5 text-indigo-600 md:h-[22px] md:w-[22px]" />
                  </div>
                  <div className="min-w-0 flex-1 rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-3 shadow-sm md:py-4">
                    <p className={`${SECTION_LABEL} text-indigo-600`}>Radar AI</p>
                    <StructuredAnswer scenario={active} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between md:px-5">
          <p className="text-xs text-slate-500">Connected workforce intelligence retrieval</p>
          <RegisterEarlyAccessButton
            product="Radar AI"
            variant="text"
            showArrow
            className="shrink-0 self-start text-indigo-600 sm:self-auto"
          />
        </div>
      </motion.div>
    </div>
  );
}
