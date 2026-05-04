import { useEffect, useState } from 'react';
import Modal from '../ui/Modal.jsx';
import { insertWebsiteFormSubmission, leadMetadata, validateEmail } from '../../lib/websiteForms.js';

const inputCls = (err) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 ${
    err ? 'border-red-400 ring-2 ring-red-500/15' : 'border-slate-200'
  }`;

export default function ContactModal({ open, onClose }) {
  const [step, setStep] = useState('form');
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [errs, setErrs] = useState({});
  const [submitErr, setSubmitErr] = useState('');

  useEffect(() => {
    if (!open) return;
    setStep('form');
    setForm({ name: '', email: '', company: '', message: '' });
    setErrs({});
    setSubmitErr('');
  }, [open]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!validateEmail(form.email)) e.email = true;
    if (!form.company.trim()) e.company = true;
    if (!form.message.trim() || form.message.trim().length < 8) e.message = true;
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
      const { ok } = await insertWebsiteFormSubmission({
        form_type: 'contact',
        first_name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        message: form.message.trim(),
        source: 'footer_contact',
        metadata: leadMetadata(),
      });
      if (!ok) {
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
              Message sent
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              Thanks for reaching out — we&apos;ll get back to you shortly.
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
              Contact us
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">Tell us what you need — we read every message.</p>
            <div className="mt-6 flex flex-col gap-3">
              <input
                className={inputCls(errs.name)}
                placeholder="Your name *"
                value={form.name}
                onChange={(ev) => setForm({ ...form, name: ev.target.value })}
                autoComplete="name"
              />
              <input
                className={inputCls(errs.email)}
                placeholder="Work email *"
                type="email"
                value={form.email}
                onChange={(ev) => setForm({ ...form, email: ev.target.value })}
                autoComplete="email"
              />
              <input
                className={inputCls(errs.company)}
                placeholder="Company name *"
                value={form.company}
                onChange={(ev) => setForm({ ...form, company: ev.target.value })}
                autoComplete="organization"
              />
              <textarea
                className={`${inputCls(errs.message)} min-h-[120px] resize-y`}
                placeholder="How can we help? *"
                rows={4}
                value={form.message}
                onChange={(ev) => setForm({ ...form, message: ev.target.value })}
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
                  Send message →
                </button>
              </div>
            </div>
          </>
        )
      }
    </Modal>
  );
}
