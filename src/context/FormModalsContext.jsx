import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const FormModalsContext = createContext(null);

export function FormModalsProvider({ children }) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const openDemo = useCallback(() => {
    setContactOpen(false);
    setDemoOpen(true);
  }, []);

  const openContact = useCallback(() => {
    setDemoOpen(false);
    setContactOpen(true);
  }, []);

  const closeDemo = useCallback(() => setDemoOpen(false), []);
  const closeContact = useCallback(() => setContactOpen(false), []);

  const value = useMemo(
    () => ({
      demoOpen,
      contactOpen,
      openDemo,
      openContact,
      closeDemo,
      closeContact,
    }),
    [demoOpen, contactOpen, openDemo, openContact, closeDemo, closeContact]
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
