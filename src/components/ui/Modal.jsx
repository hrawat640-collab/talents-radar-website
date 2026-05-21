import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';

const easeOut = [0, 0, 0.2, 1];

export default function Modal({ open, onClose, children, labelledBy }) {
  const genId = useId();
  const titleId = labelledBy || genId;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-slate-900/65 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-[101] max-h-[min(92vh,720px)] w-full max-w-[440px] overflow-y-auto rounded-2xl border border-slate-200/90 bg-white p-6 shadow-glow-purple sm:p-8"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: easeOut }}
            onClick={(e) => e.stopPropagation()}
          >
            {typeof children === 'function' ? children({ titleId }) : children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
