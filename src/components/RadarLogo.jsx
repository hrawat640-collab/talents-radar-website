/** Official Talents Radar mark — radar arches + accent dot (light backgrounds) */
export default function RadarLogo({ className = 'h-8 w-8 shrink-0' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5.5 21.5c0-6.35 4.7-11.5 10.5-11.5s10.5 5.15 10.5 11.5"
        stroke="#6B52D6"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M9 21.5c0-4.15 3.13-7.5 7-7.5s7 3.35 7 7.5"
        stroke="#4F35C8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="16" cy="22.25" r="3" fill="#166534" />
    </svg>
  );
}

/** Navbar / footer lockup */
export function BrandLockup({ className = '', markClassName = 'h-9 w-9', textClassName = 'text-[15px] font-semibold tracking-tight text-slate-900' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <RadarLogo className={markClassName} />
      <span className={textClassName}>Talents Radar</span>
    </span>
  );
}
