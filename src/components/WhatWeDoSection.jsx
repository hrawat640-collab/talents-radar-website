export default function WhatWeDoSection() {
  const pillars = [
    {
      title: 'Protect Runway.',
      body: 'Dynamically track burn-rate and capital efficiency before making a single offer.',
    },
    {
      title: 'Close Faster.',
      body: 'Hit an 85% Offer-to-Join ratio by sourcing precision-matched talent across LinkedIn and GitHub.',
    },
    {
      title: 'Stop Churn.',
      body: 'Save 1.5x replacement costs by fixing structural attrition risks before resignations land.',
    },
  ];

  return (
    <section id="business-impact" className="border-t border-slate-100/90 bg-white px-5 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Business impact</h2>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8 md:divide-x md:divide-slate-100/90">
          {pillars.map((p) => (
            <div key={p.title} className="text-center md:px-8 md:first:pl-0 md:last:pr-0">
              <h3 className="text-xl font-bold tracking-tight text-slate-900 md:text-[1.35rem]">{p.title}</h3>
              <p className="mx-auto mt-5 max-w-[280px] text-sm leading-relaxed text-slate-500">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
