import { useState } from 'react';
import { useFormModals } from '../context/FormModalsContext.jsx';
import { BrandLockup } from './RadarLogo.jsx';

const navLink =
  'block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition-colors duration-300 ease-premium hover:bg-slate-50 hover:text-slate-900 sm:inline-block sm:w-auto sm:py-2';

export default function NavBar() {
  const { openDemo } = useFormModals();
  const [menuOpen, setMenuOpen] = useState(false);
  const go = (id) => () => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative z-40 border-b border-slate-100/90 bg-white">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:gap-6 sm:px-5">
        <button
          type="button"
          onClick={go('hero')}
          className="group -ml-1 shrink-0 rounded-lg px-1 py-1 transition-opacity duration-300 ease-premium hover:opacity-90"
        >
          <BrandLockup markClassName="h-8 w-8 sm:h-9 sm:w-9 transition-transform duration-300 ease-premium group-hover:scale-[1.02]" />
        </button>

        <ul className="hidden items-center gap-1 sm:flex sm:gap-2">
          <li>
            <button type="button" onClick={go('connected-intelligence')} className={navLink}>
              Intelligence
            </button>
          </li>
          <li>
            <button type="button" onClick={go('four-tools')} className={navLink}>
              Products
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={openDemo}
              className="ml-1 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-slate-900/10 transition-all duration-300 ease-premium hover:-translate-y-px hover:bg-slate-800 hover:shadow-md active:translate-y-0"
            >
              Book Demo
            </button>
          </li>
        </ul>

        <div className="flex items-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={openDemo}
            className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm"
          >
            Book Demo
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <span className="text-lg leading-none" aria-hidden>
                ×
              </span>
            ) : (
              <span className="flex flex-col gap-1" aria-hidden>
                <span className="block h-0.5 w-4 rounded-full bg-current" />
                <span className="block h-0.5 w-4 rounded-full bg-current" />
                <span className="block h-0.5 w-4 rounded-full bg-current" />
              </span>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-nav" className="border-t border-slate-100 bg-white px-4 py-3 sm:hidden">
          <ul className="flex flex-col gap-1">
            <li>
              <button type="button" onClick={go('connected-intelligence')} className={navLink}>
                Intelligence
              </button>
            </li>
            <li>
              <button type="button" onClick={go('four-tools')} className={navLink}>
                Products
              </button>
            </li>
            <li>
              <button type="button" onClick={go('radar-ai')} className={navLink}>
                Radar AI
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
