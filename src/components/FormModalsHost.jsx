import DemoModal from './forms/DemoModal.jsx';
import ContactModal from './forms/ContactModal.jsx';
import { useFormModals } from '../context/FormModalsContext.jsx';

export default function FormModalsHost() {
  const { demoOpen, contactOpen, closeDemo, closeContact } = useFormModals();
  return (
    <>
      <DemoModal open={demoOpen} onClose={closeDemo} />
      <ContactModal open={contactOpen} onClose={closeContact} />
    </>
  );
}
