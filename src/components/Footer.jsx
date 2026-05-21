import { useFormModals } from '../context/FormModalsContext.jsx';
import { BrandLockup } from './RadarLogo.jsx';

export default function Footer() {
  const { openContact, openDemo } = useFormModals();
  const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const link =
    'text-xs text-slate-400 transition-colors duration-300 ease-premium hover:text-slate-600';

  return (
    <footer className="border-t border-slate-100/90 bg-slate-50/60 px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row sm:items-start">
        <BrandLockup markClassName="h-7 w-7" textClassName="text-sm font-semibold tracking-tight text-slate-800" />

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end">
          <button type="button" onClick={go('four-tools')} className={`cursor-pointer ${link}`}>
            Products
          </button>
          <button type="button" onClick={go('connected-intelligence')} className={`cursor-pointer ${link}`}>
            Intelligence
          </button>
          <button type="button" onClick={go('radar-ai')} className={`cursor-pointer ${link}`}>
            Radar AI
          </button>
          <button type="button" onClick={openContact} className={`cursor-pointer ${link}`}>
            Contact
          </button>
          <button type="button" onClick={openDemo} className={`cursor-pointer ${link}`}>
            Book Demo
          </button>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-6xl text-center text-[11px] text-slate-400 sm:text-left">
        © {new Date().getFullYear()} Talents Radar
      </p>
    </footer>
  );
}
