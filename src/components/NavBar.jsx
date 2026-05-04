import { useFormModals } from '../context/FormModalsContext.jsx';
import RadarLogo from './RadarLogo.jsx';

export default function NavBar() {
  const { openDemo } = useFormModals();
  const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <button type="button" onClick={go('hero')} className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
          <RadarLogo className="h-7 w-7" />
          Talents Radar
        </button>
        <div className="flex items-center gap-6">
          <button type="button" onClick={go('product-flow')} className="hidden text-sm font-medium text-slate-500 hover:text-slate-900 sm:inline">
            Demo
          </button>
          <button
            type="button"
            onClick={openDemo}
            className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
          >
            Book a Demo
          </button>
        </div>
      </nav>
    </header>
  );
}
