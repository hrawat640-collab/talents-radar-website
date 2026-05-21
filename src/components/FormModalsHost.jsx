import DemoModal from './forms/DemoModal.jsx';
import ContactModal from './forms/ContactModal.jsx';
import EarlyAccessModal from './forms/EarlyAccessModal.jsx';
import { useFormModals } from '../context/FormModalsContext.jsx';

export default function FormModalsHost() {
  const { demoOpen, contactOpen, earlyAccessOpen, earlyAccessProduct, closeDemo, closeContact, closeEarlyAccess } =
    useFormModals();

  return (
    <>
      <DemoModal open={demoOpen} onClose={closeDemo} />
      <ContactModal open={contactOpen} onClose={closeContact} />
      <EarlyAccessModal
        open={earlyAccessOpen}
        onClose={closeEarlyAccess}
        productInterest={earlyAccessProduct}
      />
    </>
  );
}
