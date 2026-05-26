import { useEffect, useState } from 'react';
import Modal from '../ui/Modal.jsx';
import { insertWebsiteFormSubmission, leadMetadata, validateEmail } from '../../lib/websiteForms.js';

const fieldBase = (err) =>
  `rounded-xl border bg-white text-[15px] text-slate-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 ${
    err ? 'border-red-400 ring-2 ring-red-500/15' : 'border-slate-200'
  }`;

const inputCls = (err) =>
  `${fieldBase(err)} w-full px-4 py-3 placeholder:text-slate-400`;

const countryCodeCls = (err) =>
  `${fieldBase(err)} min-w-0 px-3 py-3 placeholder:text-slate-400`;

const EMPTY_FORM = {
  first: '',
  last: '',
  email: '',
  countryCode: '+1',
  phoneNumber: '',
  company: '',
  role: '',
};

function normalizeCountryCode(code) {
  const trimmed = String(code).trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('+')) return `+${trimmed.slice(1).replace(/\D/g, '')}`;
  return `+${trimmed.replace(/\D/g, '')}`;
}

function formatPhone(countryCode, phoneNumber) {
  const code = normalizeCountryCode(countryCode);
  const digits = String(phoneNumber).replace(/\D/g, '');
  return `${code}${digits}`;
}

function onCountryCodeChange(value) {
  if (!value) return '';
  if (value === '+') return '+';
  if (value.startsWith('+')) return `+${value.slice(1).replace(/\D/g, '')}`;
  return `+${value.replace(/\D/g, '')}`;
}

export default function DemoModal({ open, onClose }) {
  const [step, setStep] = useState('form');
  const [form, setForm] = useState(EMPTY_FORM);
  const [errs, setErrs] = useState({});
  const [submitErr, setSubmitErr] = useState('');

  useEffect(() => {
    if (!open) return;
    setStep('form');
    setForm(EMPTY_FORM);
    setErrs({});
    setSubmitErr('');
  }, [open]);

  const validate = () => {
    const e = {};
    if (!form.first.trim()) e.first = true;
    if (!validateEmail(form.email)) e.email = true;
    const codeDigits = normalizeCountryCode(form.countryCode).replace(/\D/g, '');
    if (codeDigits.length < 1) e.phone = true;
    const digits = String(form.phoneNumber).replace(/\D/g, '');
    if (digits.length < 10) e.phone = true;
    if (!form.company.trim()) e.company = true;
    if (!form.role.trim()) e.role = true;
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrs(e);
      return;
    }
    setSubmitErr('');
    const phone = formatPhone(form.countryCode, form.phoneNumber);
    try {
      const { ok, status, error } = await insertWebsiteFormSubmission({
        form_type: 'demo_request',
        first_name: form.first.trim(),
        last_name: form.last.trim() || null,
        email: form.email.trim(),
        phone,
        company: form.company.trim(),
        role: form.role.trim(),
        source: 'homepage_book_demo',
        metadata: leadMetadata(),
      });
      if (!ok) {
        console.error('[DemoModal] submit failed', { status, error });
        setSubmitErr('Something went wrong. Please try again in a moment.');
        return;
      }
      setStep('ok');
    } catch {
      setSubmitErr('Something went wrong. Please try again in a moment.');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      {({ titleId }) =>
        step === 'ok' ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-2xl text-emerald-600 ring-1 ring-emerald-200">
              ✓
            </div>
            <h3 id={titleId} className="text-xl font-bold tracking-tight text-slate-900">
              Request received
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              We&apos;ll reach out within one business day to schedule your 30-minute walkthrough.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="btn-primary-premium mt-8 w-full py-3"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 id={titleId} className="text-xl font-bold tracking-tight text-slate-900">
              Book your demo
            </h3>
            <div className="mt-6 flex flex-col gap-3">
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
                  placeholder="Last name"
                  value={form.last}
                  onChange={(ev) => setForm({ ...form, last: ev.target.value })}
                  autoComplete="family-name"
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
              <div className="grid w-full grid-cols-[minmax(5.5rem,8.5rem)_minmax(0,1fr)] gap-3">
                <input
                  className={countryCodeCls(errs.phone)}
                  placeholder="+91"
                  type="text"
                  inputMode="tel"
                  value={form.countryCode}
                  onChange={(ev) =>
                    setForm({ ...form, countryCode: onCountryCodeChange(ev.target.value) })
                  }
                  onBlur={(ev) =>
                    setForm({ ...form, countryCode: normalizeCountryCode(ev.target.value) })
                  }
                  aria-label="Country code"
                  autoComplete="tel-country-code"
                />
                <input
                  className={inputCls(errs.phone)}
                  placeholder="Mobile number *"
                  type="tel"
                  inputMode="tel"
                  value={form.phoneNumber}
                  onChange={(ev) => setForm({ ...form, phoneNumber: ev.target.value })}
                  autoComplete="tel-national"
                />
              </div>
              <input
                className={inputCls(errs.company)}
                placeholder="Company name *"
                value={form.company}
                onChange={(ev) => setForm({ ...form, company: ev.target.value })}
                autoComplete="organization"
              />
              <input
                className={inputCls(errs.role)}
                placeholder="Your role *"
                value={form.role}
                onChange={(ev) => setForm({ ...form, role: ev.target.value })}
                autoComplete="organization-title"
              />
              {submitErr ? <p className="text-sm text-red-600">{submitErr}</p> : null}
              <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-[15px] font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submit}
                  className="btn-primary-premium px-6 py-3"
                >
                  Request demo →
                </button>
              </div>
            </div>
          </>
        )
      }
    </Modal>
  );
}
