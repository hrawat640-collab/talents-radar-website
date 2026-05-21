import { useFormModals } from '../../context/FormModalsContext.jsx';

const base =
  'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 ease-premium';

const variants = {
  dark: `${base} bg-slate-900 px-6 py-3 text-white shadow-sm hover:-translate-y-px hover:bg-slate-800`,
  subtle: `${base} border border-slate-200/90 bg-white px-5 py-2.5 text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50`,
  inline: `${base} rounded-lg bg-slate-900 px-4 py-2 text-xs text-white shadow-sm hover:bg-slate-800`,
  text: `${base} px-0 py-0 text-slate-700 underline-offset-4 hover:text-slate-900 hover:underline`,
};

/**
 * @param {{ product: 'Radar AI' | 'RetainIQ', variant?: 'dark' | 'subtle' | 'inline' | 'text', showArrow?: boolean, className?: string }} props
 */
export default function RegisterEarlyAccessButton({ product, variant = 'dark', showArrow = false, className = '' }) {
  const { openEarlyAccess } = useFormModals();

  return (
    <button type="button" onClick={() => openEarlyAccess(product)} className={`${variants[variant]} ${className}`}>
      Register for Early Access
      {showArrow ? <span aria-hidden> →</span> : null}
    </button>
  );
}
