import { useEffect, useRef, useState } from 'react';

/**
 * Calm typewriter + phased reveal. Resets when resetKey changes (scenario cycle).
 */
export function useConversationalFlow({ enabled, phases, resetKey = 0 }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const timers = useRef([]);

  const phase = phases[phaseIndex]?.id ?? 'done';
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    clearTimers();
    setPhaseIndex(0);
    setTyped('');
  }, [resetKey]);

  useEffect(() => {
    if (!enabled) {
      clearTimers();
      return undefined;
    }

    if (reduced) {
      setPhaseIndex(phases.length - 1);
      setTyped('');
      return undefined;
    }

    clearTimers();
    const current = phases[phaseIndex];
    if (!current) return undefined;

    if (current.type === 'type') {
      setTyped('');
      let i = 0;
      const tick = () => {
        i += 1;
        setTyped(current.text.slice(0, i));
        if (i < current.text.length) {
          timers.current.push(setTimeout(tick, current.speed ?? 34));
        } else {
          timers.current.push(
            setTimeout(() => setPhaseIndex((p) => Math.min(p + 1, phases.length - 1)), current.pauseAfter ?? 480),
          );
        }
      };
      timers.current.push(setTimeout(tick, current.delay ?? 100));
      return clearTimers;
    }

    if (current.type === 'hold') {
      timers.current.push(
        setTimeout(() => setPhaseIndex((p) => Math.min(p + 1, phases.length - 1)), current.duration ?? 1200),
      );
      return clearTimers;
    }

    if (current.type === 'terminal') {
      return clearTimers;
    }

    return clearTimers;
  }, [enabled, phaseIndex, phases, reduced]);

  useEffect(() => () => clearTimers(), []);

  return { phase, typed, phaseIndex, reduced };
}

export function buildScenarioPhases(scenario) {
  return [
    { id: 'question', type: 'type', text: scenario.question, speed: 38, pauseAfter: 520 },
    { id: 'analyzing', type: 'hold', duration: 1700 },
    { id: 'answer', type: 'type', text: scenario.answer, speed: 26, pauseAfter: 480 },
    { id: 'contextLine', type: 'hold', duration: 900 },
    { id: 'sources', type: 'terminal' },
  ];
}
