import { useState } from 'react';
import { motion } from 'framer-motion';
import { insertWebsiteFormSubmission, leadMetadata, validateEmail } from '../../lib/websiteForms.js';

const easeOut = [0, 0, 0.2, 1];

const inputCls = (err) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 ${
    err ? 'border-red-400 ring-2 ring-red-500/15' : 'border-slate-200'
  }`;

export default function EarlyAccessForm() {
  const [step, setStep] = useState('form');
  const [form, setForm] = useState({ first: '', email: '', company: '', role: '' });
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
      const { ok, status, error } = await insertWebsiteFormSubmission({
        form_type: 'early_access',
        first_name: form.first.trim(),
        email: form.email.trim(),
        company: form.company.trim() || null,
        role: form.role.trim() || null,
        source: 'homepage_attrition_early_access',
        metadata: leadMetadata(),
      });
      if (!ok) {
        console.error('[EarlyAccessForm] submit failed', { status, error });
        setSubmitErr('Something went wrong. Please try again in a moment.');
        return;
      }
      setStep('ok');
    } catch {
      setSubmitErr('Something went wrong. Please try again in a moment.');
    }
  };

  if (step === 'ok') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-6 text-center ring-1 ring-emerald-100"
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-emerald-600 shadow-sm ring-1 ring-emerald-200">
          ✓
        </div>
        <h4 className="text-lg font-bold text-slate-900">You&apos;re on the list.</h4>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
          We&apos;ll reach out before launch. Founder pricing is locked in for you — no payment now.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl border border-violet-200/70 bg-white/90 p-6 shadow-lg backdrop-blur-sm md:p-7">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-violet-700">Early access</p>
      <p className="mt-2 text-[15px] leading-snug text-slate-600">
        Share your details if you&apos;d like quiet updates as RetainIQ opens to early partners — no spam, unsubscribe anytime.
      </p>
      <div className="mt-5 flex flex-col gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className={inputCls(errs.first)}
            placeholder="First name *"
            value={form.first}
            onChange={(ev) => setForm({ ...form, first: ev.target.value })}
            autoComplete="given-name"
          />
          <input
            className={inputCls()}
            placeholder="Company"
            value={form.company}
            onChange={(ev) => setForm({ ...form, company: ev.target.value })}
            autoComplete="organization"
          />
        </div>
        <input
          className={inputCls(errs.email)}
          placeholder="Work email *"
          type="email"
          value={form.email}
          onChange={(ev) => setForm({ ...form, email: ev.target.value })}
          autoComplete="email"
        />
        <select
          className={`${inputCls()} ${form.role ? 'text-slate-800' : 'text-slate-400'}`}
          value={form.role}
          onChange={(ev) => setForm({ ...form, role: ev.target.value })}
        >
          <option value="" disabled>
            Your role
          </option>
          <option>CEO / Founder</option>
          <option>CFO</option>
          <option>CHRO / VP People</option>
          <option>HRBP / HR Manager</option>
          <option>Other</option>
        </select>
        {submitErr ? <p className="text-sm text-red-600">{submitErr}</p> : null}
        <motion.button
          type="button"
          onClick={submit}
          className="btn-primary-premium mt-1 w-full py-3.5"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={{ duration: 0.35, ease: easeOut }}
        >
          Request early access →
        </motion.button>
        <p className="text-center text-xs text-slate-500">No payment now · Founder pricing locked · Priority onboarding</p>
      </div>
    </div>
  );
}
