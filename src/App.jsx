import NavBar from './components/NavBar.jsx';
import HeroSection from './components/HeroSection.jsx';
import WhatWeDoSection from './components/WhatWeDoSection.jsx';
import ProductFlowSection from './components/ProductFlowSection.jsx';
import Footer from './components/Footer.jsx';
import FormModalsHost from './components/FormModalsHost.jsx';
import { FormModalsProvider } from './context/FormModalsContext.jsx';

export default function App() {
  return (
    <FormModalsProvider>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        <NavBar />
        <main>
          <HeroSection />
          <ProductFlowSection />
          <WhatWeDoSection />
        </main>
        <Footer />
        <FormModalsHost />
      </div>
    </FormModalsProvider>
  );
}
