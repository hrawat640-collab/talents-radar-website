import { useFormModals } from '../context/FormModalsContext.jsx';
import {
  HeadcountIQSnapshot,
  RetainIQSnapshot,
  SkillMapperSnapshot,
  TalentXRaySnapshot,
} from './product/ProductSnapshots.jsx';

const PRODUCT_CTA =
  'mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold underline-offset-2 transition-colors duration-300 ease-premium hover:underline';

export default function ProductFlowSection() {
  const { openEarlyAccess } = useFormModals();

  const cards = [
    {
      title: 'HeadcountIQ',
      role: 'Workforce planning',
      line: 'AI-powered workforce planning tied directly to your revenue goals and operational capacity.',
      titleClass: 'text-purple-700',
      ctaLabel: 'Explore HeadcountIQ',
      href: 'https://headcountiq.talentsradar.com',
      external: true,
      Snapshot: HeadcountIQSnapshot,
    },
    {
      title: 'SkillMapper',
      role: 'Compensation & roles',
      line: 'Salary benchmarks and skill maps for 200+ roles',
      titleClass: 'text-teal-800',
      ctaLabel: 'Explore SkillMapper',
      href: 'https://skillmapper.talentsradar.com',
      external: true,
      Snapshot: SkillMapperSnapshot,
    },
    {
      title: 'TalentXRay',
      role: 'Hiring',
      line: 'Automated sourcing from required skills — instantly',
      titleClass: 'text-teal-800',
      ctaLabel: 'Explore TalentXRay',
      href: 'https://talentxray.talentsradar.com',
      external: true,
      Snapshot: TalentXRaySnapshot,
    },
    {
      title: 'RetainIQ',
      role: 'Retention intelligence',
      line: 'Predictive flight-risk indicators updated in real-time.',
      titleClass: 'text-red-800',
      ctaLabel: 'Request Early Access',
      external: false,
      Snapshot: RetainIQSnapshot,
    },
  ];

  const cardShell =
    'card-premium group relative flex flex-col rounded-xl border border-slate-100/90 bg-white p-5 shadow-sm transition-shadow duration-300 hover:-translate-y-0.5 hover:border-slate-200/70 hover:shadow-soft md:min-h-[360px] md:p-6';

  return (
    <section id="four-tools" className="border-t border-slate-100/90 bg-white px-4 pb-14 pt-8 md:px-6 md:pb-20 md:pt-10">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-indigo-600">Products</p>
        <h2 className="mb-10 text-3xl font-extrabold text-slate-900 md:text-4xl">
          A unified platform for workforce decisions.
        </h2>

        <div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
            {cards.map((c) => {
              const { Snapshot } = c;
              const cta = (
                <span className={`${PRODUCT_CTA} ${c.titleClass}`}>
                  {c.ctaLabel}
                  <span aria-hidden> →</span>
                </span>
              );

              const body = (
                <>
                  <h3 className={`text-lg font-semibold ${c.titleClass}`}>{c.title}</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">{c.role}</p>
                  <p className="mt-2 text-sm text-slate-600">{c.line}</p>
                  <Snapshot />
                  {cta}
                </>
              );

              if (c.external) {
                return (
                  <a
                    key={c.title}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cardShell} block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600`}
                  >
                    {body}
                  </a>
                );
              }

              return (
                <button
                  key={c.title}
                  type="button"
                  onClick={() => openEarlyAccess('RetainIQ')}
                  className={`${cardShell} w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700`}
                >
                  {body}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
