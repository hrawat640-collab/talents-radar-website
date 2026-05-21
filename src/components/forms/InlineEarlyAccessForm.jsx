import { useState } from 'react';
import { motion } from 'framer-motion';
import { insertBetaSignup, validateEmail } from '../../lib/websiteForms.js';
import { easePremium } from '../../lib/motionPresets.js';

const inputCls = (err) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-slate-800 placeholder:text-slate-400 outline-none transition duration-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/15 ${
    err ? 'border-red-300 ring-2 ring-red-400/15' : 'border-slate-200'
  }`;

/**
 * @param {{ productInterest: 'Radar AI' | 'RetainIQ', sourcePage?: string, compact?: boolean }} props
 */
export default function InlineEarlyAccessForm({
  productInterest,
  sourcePage = '/',
  compact = false,
}) {
  const [step, setStep] = useState('form');
  const [form, setForm] = useState({ first: '', last: '', company: '', email: '' });
  const [errs, setErrs] = useState({});
  const [submitErr, setSubmitErr] = useState('');

  const validate = () => {
    const e = {};
    if (!form.first.trim()) e.first = true;
    if (!validateEmail(form.email)) e.email = true;
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrs(e);
      return;
    }
    setSubmitErr('');
    try {
      const { ok, error } = await insertBetaSignup({
        first_name: form.first.trim(),
        last_name: form.last.trim() || null,
        company: form.company.trim() || null,
        email: form.email.trim(),
        product_interest: productInterest,
        source_page: sourcePage,
      });
      if (!ok) {
        console.error('[InlineEarlyAccessForm]', productInterest, error);
        setSubmitErr('Something went wrong. Please try again.');
        return;
      }
      setStep('ok');
    } catch {
      setSubmitErr('Something went wrong. Please try again.');
    }
  };

  if (step === 'ok') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easePremium }}
        className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-6 text-center md:p-7"
      >
        <p className="text-lg font-semibold text-slate-900">Request received</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          We&apos;ll reach out about {productInterest} early access. No payment required now.
        </p>
      </motion.div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white shadow-soft ${compact ? 'p-5 md:p-6' : 'p-6 md:p-8'}`}
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Request Early Access</p>
      <p className="mt-2 text-sm text-slate-600">{productInterest}</p>

      <div className={`mt-5 grid gap-3 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <input
          className={inputCls(errs.first)}
          placeholder="First name *"
          value={form.first}
          onChange={(ev) => setForm({ ...form, first: ev.target.value })}
          autoComplete="given-name"
        />
        <input
          className={inputCls()}
          placeholder="Last name"
          value={form.last}
          onChange={(ev) => setForm({ ...form, last: ev.target.value })}
          autoComplete="family-name"
        />
        <input
          className={inputCls()}
          placeholder="Company"
          value={form.company}
          onChange={(ev) => setForm({ ...form, company: ev.target.value })}
          autoComplete="organization"
        />
        <input
          className={inputCls(errs.email)}
          placeholder="Work email *"
          type="email"
          value={form.email}
          onChange={(ev) => setForm({ ...form, email: ev.target.value })}
          autoComplete="email"
        />
      </div>

      {submitErr ? <p className="mt-3 text-sm text-red-600">{submitErr}</p> : null}

      <button
        type="button"
        onClick={submit}
        className="mt-4 w-full rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-premium hover:bg-slate-800"
      >
        Request Early Access
      </button>
    </div>
  );
}
