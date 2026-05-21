import NavBar from './components/NavBar.jsx';
import HeroSection from './components/HeroSection.jsx';
import ConnectedIntelligenceSection from './components/ConnectedIntelligenceSection.jsx';
import ProductFlowSection from './components/ProductFlowSection.jsx';
import RadarAISection from './components/RadarAISection.jsx';
import FinalCTASection from './components/FinalCTASection.jsx';
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
          <ConnectedIntelligenceSection />
          <ProductFlowSection />
          <RadarAISection />
          <FinalCTASection />
        </main>
        <Footer />
        <FormModalsHost />
      </div>
    </FormModalsProvider>
  );
}
