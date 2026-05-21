import { useEffect, useState } from 'react';
import Modal from '../ui/Modal.jsx';
import { insertBetaSignup, validateEmail } from '../../lib/websiteForms.js';

const inputCls = (err) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-slate-800 placeholder:text-slate-400 outline-none transition duration-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/15 ${
    err ? 'border-red-300 ring-2 ring-red-400/15' : 'border-slate-200'
  }`;

/**
 * @param {{ open: boolean, onClose: () => void, productInterest: 'Radar AI' | 'RetainIQ' | null }} props
 */
export default function EarlyAccessModal({ open, onClose, productInterest }) {
  const [step, setStep] = useState('form');
  const [form, setForm] = useState({ first: '', last: '', company: '', email: '' });
  const [errs, setErrs] = useState({});
  const [submitErr, setSubmitErr] = useState('');

  useEffect(() => {
    if (!open) return;
    setStep('form');
    setForm({ first: '', last: '', company: '', email: '' });
    setErrs({});
    setSubmitErr('');
  }, [open, productInterest]);

  const validate = () => {
    const e = {};
    if (!form.first.trim()) e.first = true;
    if (!validateEmail(form.email)) e.email = true;
    return e;
  };

  const submit = async () => {
    if (!productInterest) return;
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
      });
      if (!ok) {
        console.error('[EarlyAccessModal]', productInterest, error);
        setSubmitErr('Something went wrong. Please try again.');
        return;
      }
      setStep('ok');
    } catch {
      setSubmitErr('Something went wrong. Please try again.');
    }
  };

  const productLabel = productInterest ?? 'Talents Radar';

  return (
    <Modal open={open && !!productInterest} onClose={onClose}>
      {({ titleId }) =>
        step === 'ok' ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-2xl text-emerald-600 ring-1 ring-emerald-200">
              ✓
            </div>
            <h3 id={titleId} className="text-xl font-semibold tracking-tight text-slate-900">
              You&apos;re on the list
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              We&apos;ll reach out about {productLabel} early access. No payment required now.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 w-full rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Early access</p>
            <h3 id={titleId} className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
              Register for {productLabel}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Join the early access list — we&apos;ll follow up when your spot opens.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
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
                className={`${inputCls()} sm:col-span-2`}
                placeholder="Company"
                value={form.company}
                onChange={(ev) => setForm({ ...form, company: ev.target.value })}
                autoComplete="organization"
              />
              <input
                className={`${inputCls(errs.email)} sm:col-span-2`}
                placeholder="Work email *"
                type="email"
                value={form.email}
                onChange={(ev) => setForm({ ...form, email: ev.target.value })}
                autoComplete="email"
              />
            </div>

            {submitErr ? <p className="mt-3 text-sm text-red-600">{submitErr}</p> : null}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submit}
                className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Register for Early Access
              </button>
            </div>
          </>
        )
      }
    </Modal>
  );
}
