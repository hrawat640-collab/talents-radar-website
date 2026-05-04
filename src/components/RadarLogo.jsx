/** Logo mark — purple + teal accent rings */
export default function RadarLogo({ className = 'h-9 w-9' }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="20" cy="20" r="17.5" className="stroke-slate-300" strokeWidth="1.25" />
      <circle cx="20" cy="20" r="12" className="stroke-purple-400" strokeOpacity="0.75" strokeWidth="1.25" />
      <circle cx="20" cy="20" r="6.5" className="stroke-teal-600" strokeOpacity="0.95" strokeWidth="1.35" />
      <circle cx="20" cy="20" r="2.75" className="fill-purple-700" />
    </svg>
  );
}
