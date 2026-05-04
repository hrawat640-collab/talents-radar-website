import { useFormModals } from '../context/FormModalsContext.jsx';

export default function Footer() {
  const { openContact } = useFormModals();

  const link = 'text-xs text-slate-400 hover:text-slate-700';

  return (
    <footer className="border-t border-slate-100 bg-slate-50 px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} Talents Radar</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a href="https://headcountiq.talentsradar.com" target="_blank" rel="noopener noreferrer" className={link}>
            HeadcountIQ
          </a>
          <a href="https://skillmapper.talentsradar.com" target="_blank" rel="noopener noreferrer" className={link}>
            SkillMapper
          </a>
          <a href="https://talentxray.talentsradar.com" target="_blank" rel="noopener noreferrer" className={link}>
            TalentXRay
          </a>
          <button type="button" onClick={openContact} className={`cursor-pointer ${link}`}>
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
}
