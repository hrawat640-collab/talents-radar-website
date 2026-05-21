import { motion } from 'framer-motion';
import { BarChart2, BrainCircuit, Heart, Search, Users } from 'lucide-react';
import { useCallback, useState } from 'react';
import RadarLogo from './RadarLogo.jsx';

/** Satellite node ids — use in parent for sidebar sync */
export const ARCHITECTURE_NODE_IDS = {
  headcount: 'headcount',
  skillmapper: 'skillmapper',
  talentxray: 'talentxray',
  retainiq: 'retainiq',
  radar: 'radar',
};

const HUB_CENTER = { x: 50, y: 50 };
/** Matches outer edge of the circular Talents Radar hub (viewBox units) */
const HUB_RADIUS = 9;
const SAT_RADIUS = 11.5;
const PENTAGON_R = 35;

function pentagonPoint(index) {
  const rad = ((-90 + index * 72) * Math.PI) / 180;
  return {
    x: Math.round((HUB_CENTER.x + PENTAGON_R * Math.cos(rad)) * 10) / 10,
    y: Math.round((HUB_CENTER.y + PENTAGON_R * Math.sin(rad)) * 10) / 10,
  };
}

/** Top → upper-right → lower-right → lower-left → upper-left */
const [top, upperRight, lowerRight, lowerLeft, upperLeft] = [0, 1, 2, 3, 4].map(pentagonPoint);

/** HeadcountIQ — fixed vertical line anchors (hub top edge → satellite bottom edge) */
const HEADCOUNT_LINE = { x1: 50, y1: 41, x2: 50, y2: 26.5 };

/**
 * @type {Array<{ id: string, title: string, label?: string, Icon: import('lucide-react').LucideIcon, x: number, y: number, line: { x1: number, y1: number, x2: number, y2: number } }>}
 */
export const ARCHITECTURE_SATELLITES = [
  satellite({
    id: ARCHITECTURE_NODE_IDS.headcount,
    title: 'HeadcountIQ',
    label: 'PLAN',
    Icon: Users,
    x: top.x,
    y: top.y,
    line: HEADCOUNT_LINE,
  }),
  satellite({
    id: ARCHITECTURE_NODE_IDS.skillmapper,
    title: 'SkillMapper',
    label: 'BENCHMARK',
    Icon: BarChart2,
    x: upperLeft.x,
    y: upperLeft.y,
  }),
  satellite({
    id: ARCHITECTURE_NODE_IDS.talentxray,
    title: 'TalentXRay',
    label: 'HIRE',
    Icon: Search,
    x: upperRight.x,
    y: upperRight.y,
  }),
  satellite({
    id: ARCHITECTURE_NODE_IDS.retainiq,
    title: 'RetainIQ',
    label: 'RETAIN',
    Icon: Heart,
    x: lowerRight.x,
    y: lowerRight.y,
  }),
  satellite({ id: ARCHITECTURE_NODE_IDS.radar, title: 'Radar AI', Icon: BrainCircuit, x: lowerLeft.x, y: lowerLeft.y }),
];

const spring = { type: 'spring', stiffness: 380, damping: 28 };
const IDLE_HUB_SHADOW = [
  '0 8px 32px -8px rgba(99, 102, 241, 0.2)',
  '0 20px 52px -6px rgba(99, 102, 241, 0.45)',
  '0 8px 32px -8px rgba(99, 102, 241, 0.2)',
];
const IDLE_HUB_TRANSITION = { duration: 3, repeat: Infinity, ease: 'easeInOut' };

const BADGE =
  'cursor-default rounded-2xl border border-slate-200/90 bg-white px-4 py-3 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.1)] backdrop-blur-sm min-w-[7.75rem]';

const SATELLITE_ANCHOR = 'absolute z-20 -translate-x-1/2 -translate-y-1/2';

function perimeterPoint(fromX, fromY, toX, toY, radius) {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const len = Math.hypot(dx, dy) || 1;
  return {
    x: fromX + (dx / len) * radius,
    y: fromY + (dy / len) * radius,
  };
}

function computeLineEndpoints(x, y) {
  const hubEdge = perimeterPoint(HUB_CENTER.x, HUB_CENTER.y, x, y, HUB_RADIUS);
  const satEdge = perimeterPoint(x, y, HUB_CENTER.x, HUB_CENTER.y, SAT_RADIUS);
  return {
    x1: Math.round(hubEdge.x * 100) / 100,
    y1: Math.round(hubEdge.y * 100) / 100,
    x2: Math.round(satEdge.x * 100) / 100,
    y2: Math.round(satEdge.y * 100) / 100,
  };
}

function satellite(base) {
  const line = base.line ?? computeLineEndpoints(base.x, base.y);
  return { ...base, line };
}

const DORMANT_LINE = {
  stroke: '#E2E8F0',
  strokeWidth: 1.5,
  strokeDasharray: '4 4',
  opacity: 0.6,
};

/** One static line per satellite — styles transition on hover, never duplicated */
function ConnectionLine({ node, activeNode }) {
  const isActive = activeNode === node.id;
  const { x1, y1, x2, y2 } = node.line;

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      vectorEffect="non-scaling-stroke"
      strokeLinecap="round"
      stroke={isActive ? '#6366f1' : DORMANT_LINE.stroke}
      strokeWidth={isActive ? 2.25 : DORMANT_LINE.strokeWidth}
      strokeDasharray={isActive ? 'none' : DORMANT_LINE.strokeDasharray}
      opacity={isActive ? 1 : DORMANT_LINE.opacity}
      className="transition-all duration-300 ease-out"
      style={{
        filter: isActive ? 'drop-shadow(0 0 6px rgba(99, 102, 241, 0.55))' : 'none',
      }}
    />
  );
}

function NodeTypography({ node }) {
  const Icon = node.Icon;
  return (
    <div className={`flex flex-col items-center justify-center text-center ${node.label ? 'gap-1' : 'gap-1.5'}`}>
      <Icon className={`h-4 w-4 shrink-0 text-indigo-600 ${node.label ? 'mb-0.5' : ''}`} strokeWidth={2} aria-hidden />
      <p className="text-sm font-semibold leading-tight text-slate-900">{node.title}</p>
      {node.label ? (
        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 md:text-[11px]">{node.label}</p>
      ) : null}
    </div>
  );
}

function SatelliteNode({ node, activeNode, onEnter }) {
  const isActive = activeNode === node.id;

  return (
    <div
      role="presentation"
      className={SATELLITE_ANCHOR}
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      onMouseEnter={() => onEnter(node.id)}
    >
      <div
        className={`${BADGE} transition-shadow duration-300 ${
          isActive
            ? 'border-indigo-300/80 ring-2 ring-indigo-400/25 shadow-md shadow-indigo-500/15'
            : 'hover:border-indigo-200/80 hover:shadow-md hover:shadow-indigo-500/10'
        }`}
      >
        <NodeTypography node={node} />
      </div>
    </div>
  );
}

function CentralHub({ activeNode }) {
  const isIdle = activeNode === null;
  const hubActive = activeNode !== null;

  return (
    <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        className="origin-center rounded-full"
        animate={
          isIdle
            ? { scale: [1, 1.02, 1], boxShadow: IDLE_HUB_SHADOW }
            : { scale: hubActive ? 1.03 : 1, boxShadow: '0 10px 36px -10px rgba(79, 53, 200, 0.35)' }
        }
        transition={isIdle ? IDLE_HUB_TRANSITION : { duration: 0.15, ease: 'easeOut' }}
      >
        <div
          className={`relative flex flex-col items-center justify-center rounded-full border border-slate-200/90 bg-white px-4 py-4 ${
            hubActive ? 'ring-2 ring-indigo-400/30' : ''
          }`}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full"
            aria-hidden
            animate={
              hubActive
                ? { opacity: [0.45, 0.75, 0.45], scale: [1, 1.08, 1] }
                : isIdle
                  ? { opacity: [0.18, 0.38, 0.18], scale: [1, 1.04, 1] }
                  : { opacity: 0.25, scale: 1 }
            }
            transition={
              hubActive
                ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                : isIdle
                  ? IDLE_HUB_TRANSITION
                  : { duration: 0.15 }
            }
            style={{
              background:
                'radial-gradient(circle, rgba(129, 140, 248, 0.35) 0%, rgba(167, 139, 250, 0.12) 45%, transparent 70%)',
            }}
          />
          <RadarLogo className="relative h-9 w-9" />
          <p className="relative mt-1.5 max-w-[8.5rem] text-center text-[10px] font-semibold leading-snug tracking-tight text-slate-800">
            Talents Radar
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * @param {{
 *   activeNode?: string | null,
 *   onActiveNodeChange?: (id: string | null) => void,
 *   className?: string,
 * }} props
 */
export default function ArchitectureMap({
  activeNode: controlledActive,
  onActiveNodeChange,
  className = '',
}) {
  const [internalActive, setInternalActive] = useState(null);

  const isControlled = controlledActive !== undefined;
  const activeNode = isControlled ? controlledActive : internalActive;

  const setActiveNode = useCallback(
    (id) => {
      if (!isControlled) setInternalActive(id);
      onActiveNodeChange?.(id);
    },
    [isControlled, onActiveNodeChange],
  );

  const handleEnter = useCallback((id) => setActiveNode(id), [setActiveNode]);
  const handleLeave = useCallback(() => setActiveNode(null), [setActiveNode]);

  return (
    <div
      className={`relative mx-auto w-full ${className}`}
      onMouseLeave={handleLeave}
      aria-label="Talents Radar connected intelligence architecture"
    >
      <div className="relative aspect-square w-full">
        <CentralHub activeNode={activeNode} />

        <svg
          className="pointer-events-none absolute inset-0 z-[15] h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          {ARCHITECTURE_SATELLITES.map((node) => (
            <ConnectionLine key={node.id} node={node} activeNode={activeNode} />
          ))}
        </svg>

        {ARCHITECTURE_SATELLITES.map((node) => (
          <SatelliteNode key={node.id} node={node} activeNode={activeNode} onEnter={handleEnter} />
        ))}
      </div>
    </div>
  );
}
