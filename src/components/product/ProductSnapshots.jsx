import { useEffect, useRef, useState } from 'react';

const SNAPSHOT_SHELL =
  'mt-3 flex min-h-[160px] flex-1 flex-col overflow-hidden rounded-lg border border-slate-100 bg-slate-50/90 p-3 md:mt-4 md:min-h-[180px] md:p-4';

function useSnapshotReveal(threshold = 0.25) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setOn(true);
      return undefined;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, on };
}

const SM_SKILLS = ['Python', 'React', 'SQL', 'Figma', 'AWS', 'Node.js', 'TypeScript', 'Power BI'];

export function SkillMapperSnapshot() {
  const { ref, on } = useSnapshotReveal();
  const [hiIdx, setHiIdx] = useState([2, 5, 7]);
  const [pct, setPct] = useState('68');
  const salTxt = '₹32–60L · $168–225k';

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !on) return undefined;
    const id = window.setInterval(() => {
      setHiIdx((prev) => prev.map((c) => (c + 3) % SM_SKILLS.length));
    }, 2000);
    return () => window.clearInterval(id);
  }, [on]);

  useEffect(() => {
    if (on) setPct('68');
  }, [on]);

  const chipCls = (i) => {
    if (hiIdx.includes(i)) return 'border-purple-300 bg-purple-50 font-semibold text-purple-800';
    if ([0, 4].includes(i)) return 'border-purple-200 bg-purple-50/60 text-purple-700';
    return 'border-slate-200 bg-white text-slate-500';
  };

  return (
    <div ref={ref} className={SNAPSHOT_SHELL}>
      <div className="flex flex-wrap gap-1.5" aria-hidden>
        {SM_SKILLS.map((s, i) => (
          <span key={s} className={`rounded-md border px-2 py-0.5 font-mono text-[9px] transition-colors duration-300 ${chipCls(i)}`}>
            {s}
          </span>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
        <p className="text-[11px] font-semibold text-slate-900">Senior Data Engineer · Bengaluru</p>
        <p className="mt-0.5 text-[10px] text-slate-500">Data Engineering</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {['Junior', 'Senior', 'Lead'].map((lv) => (
            <span
              key={lv}
              className={`rounded px-2 py-0.5 text-[9px] font-semibold ${
                lv === 'Senior' ? 'border border-purple-300 bg-purple-50 text-purple-700' : 'border border-slate-200 text-slate-500'
              }`}
            >
              {lv}
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-300 transition-[width] duration-500 ease-out"
              style={{ width: on ? `${pct}%` : '0%' }}
            />
          </div>
          <span className="shrink-0 text-[10px] font-semibold tabular-nums text-slate-800">{salTxt}</span>
        </div>
      </div>
    </div>
  );
}

const TX_SEARCH =
  'site:linkedin.com/in AND ("Product Manager" OR "Product Owner") AND ("Agile" OR "Roadmap")';

export function TalentXRaySnapshot() {
  const { ref, on } = useSnapshotReveal();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!on) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setN(TX_SEARCH.length);
      return undefined;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setN(i);
      if (i >= TX_SEARCH.length) window.clearInterval(id);
    }, 18);
    return () => window.clearInterval(id);
  }, [on]);

  const typed = on ? TX_SEARCH.slice(0, n) : '';

  return (
    <div ref={ref} className={SNAPSHOT_SHELL}>
      <div className="flex gap-3">
        <div className="flex w-3 shrink-0 flex-col items-center pt-1" aria-hidden>
          <div className="h-2 w-2 rounded-full border-2 border-teal-500 bg-white" />
          <div className="mt-1 w-px flex-1 min-h-[52px] bg-gradient-to-b from-teal-400 via-teal-300 to-teal-200" />
          <div className="h-2 w-2 rounded-full border-2 border-teal-400 bg-teal-50" />
          <div className="mt-1 w-px flex-1 min-h-[28px] bg-gradient-to-b from-teal-300 to-teal-200" />
          <div className="h-2 w-2 rounded-full border-2 border-teal-400 bg-teal-50" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[9px] leading-relaxed text-slate-700 break-all">
            {typed}
            {on && n < TX_SEARCH.length && (
              <span className="ml-px inline-block h-[10px] w-[2px] animate-pulse bg-teal-600 align-middle" />
            )}
          </p>
          <div className="mt-3 space-y-2">
            <p className="flex items-center gap-1.5 text-[10px] font-medium text-teal-800">
              <span className="text-teal-600" aria-hidden>
                ✓
              </span>
              LinkedIn string ready
            </p>
            <p className="flex items-center gap-1.5 text-[10px] font-medium text-teal-800">
              <span className="text-teal-600" aria-hidden>
                ✓
              </span>
              GitHub string ready
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const HQ_BARS = [
  { lbl: 'Engineering', w: '72%', col: '#d97706', val: '4 roles' },
  { lbl: 'Sales', w: '50%', col: '#7c3aed', val: '3 roles' },
  { lbl: 'Growth', w: '28%', col: '#15803d', val: '2 roles' },
];

export function HeadcountIQSnapshot() {
  const { ref, on } = useSnapshotReveal();

  return (
    <div ref={ref} className={SNAPSHOT_SHELL}>
      <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3">
        <div className="flex justify-between gap-2 text-[10px]">
          <span className="text-slate-500">Company stage</span>
          <span className="font-semibold text-slate-800">Series A · 40 people</span>
        </div>
        <div className="flex justify-between gap-2 text-[10px]">
          <span className="text-slate-500">Revenue target</span>
          <span className="font-semibold text-slate-800">$2M ARR · 12 mo</span>
        </div>
        <div className="h-px bg-slate-100" />
        <p className="text-[9px] font-medium uppercase tracking-wide text-slate-500">Recommended hires — next 6 months</p>
        <div className="flex flex-col gap-2">
          {HQ_BARS.map((b, i) => (
            <div key={b.lbl} className="flex items-center gap-2">
              <span className="w-[72px] shrink-0 text-[9px] text-slate-500">{b.lbl}</span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-[width] duration-700 ease-out"
                  style={{
                    width: on ? b.w : '0%',
                    background: b.col,
                    transitionDelay: on ? `${i * 0.1}s` : '0s',
                  }}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-[9px] font-semibold" style={{ color: b.col }}>
                {b.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const RIQ_BARS = [
  { lbl: 'Survey + leave', w: '82%', col: '#dc2626', val: 'High' },
  { lbl: 'Appraisal trend', w: '52%', col: '#d97706', val: 'Med' },
  { lbl: 'Comp gap', w: '26%', col: '#15803d', val: 'Low' },
];

export function RetainIQSnapshot() {
  const { ref, on } = useSnapshotReveal();

  return (
    <div ref={ref} className={SNAPSHOT_SHELL}>
      <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3">
        <p className="text-[9px] font-medium uppercase tracking-wide text-slate-500">Attrition risk — multi-signal view</p>
        <div className="flex flex-col gap-2">
          {RIQ_BARS.map((b, i) => (
            <div key={b.lbl} className="flex items-center gap-2">
              <span className="w-[84px] shrink-0 text-[9px] text-slate-500">{b.lbl}</span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-[width] duration-700 ease-out"
                  style={{
                    width: on ? b.w : '0%',
                    background: b.col,
                    transitionDelay: on ? `${i * 0.1}s` : '0s',
                  }}
                />
              </div>
              <span className="w-8 shrink-0 text-right text-[9px] font-semibold" style={{ color: b.col }}>
                {b.val}
              </span>
            </div>
          ))}
        </div>
        <p className="rounded-md border border-amber-200 bg-amber-50 px-2 py-1.5 text-[10px] leading-snug text-amber-900">
          Schedule retention touchpoint · clarify growth path this cycle.
        </p>
      </div>
    </div>
  );
}
