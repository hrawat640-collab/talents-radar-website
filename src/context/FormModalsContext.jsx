import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const FormModalsContext = createContext(null);

/** @typedef {'Radar AI' | 'RetainIQ'} ProductInterest */

export function FormModalsProvider({ children }) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);
  /** @type {ProductInterest | null} */
  const [earlyAccessProduct, setEarlyAccessProduct] = useState(null);

  const openDemo = useCallback(() => {
    setContactOpen(false);
    setEarlyAccessOpen(false);
    setDemoOpen(true);
  }, []);

  const openContact = useCallback(() => {
    setDemoOpen(false);
    setEarlyAccessOpen(false);
    setContactOpen(true);
  }, []);

  /** @param {ProductInterest} productInterest */
  const openEarlyAccess = useCallback((productInterest) => {
    setDemoOpen(false);
    setContactOpen(false);
    setEarlyAccessProduct(productInterest);
    setEarlyAccessOpen(true);
  }, []);

  const closeDemo = useCallback(() => setDemoOpen(false), []);
  const closeContact = useCallback(() => setContactOpen(false), []);
  const closeEarlyAccess = useCallback(() => {
    setEarlyAccessOpen(false);
    setEarlyAccessProduct(null);
  }, []);

  const value = useMemo(
    () => ({
      demoOpen,
      contactOpen,
      earlyAccessOpen,
      earlyAccessProduct,
      openDemo,
      openContact,
      openEarlyAccess,
      closeDemo,
      closeContact,
      closeEarlyAccess,
    }),
    [
      demoOpen,
      contactOpen,
      earlyAccessOpen,
      earlyAccessProduct,
      openDemo,
      openContact,
      openEarlyAccess,
      closeDemo,
      closeContact,
      closeEarlyAccess,
    ],
  );

  return <FormModalsContext.Provider value={value}>{children}</FormModalsContext.Provider>;
}

export function useFormModals() {
  const ctx = useContext(FormModalsContext);
  if (!ctx) {
    throw new Error('useFormModals must be used within FormModalsProvider');
  }
  return ctx;
}
