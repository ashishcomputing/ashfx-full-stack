import React, { useState, useEffect } from 'react';
import { LiquidBackground } from './components/LiquidBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrokerSection } from './components/sections/BrokerSection';
import { JournalSection } from './components/sections/JournalSection';
import { IndicatorsSection } from './components/sections/IndicatorsSection';
import { Mt5EaSection } from './components/sections/Mt5EaSection';
import { JarvisAiSection } from './components/sections/JarvisAiSection';
import { IntelligenceAiSection } from './components/sections/IntelligenceAiSection';
import { EcosystemMap } from './components/EcosystemMap';
import { FullAppModal } from './components/FullAppModal';
import { Footer } from './components/Footer';
import { 
  BarChart3, 
  BookOpen, 
  Activity, 
  Cpu, 
  Bot, 
  Brain, 
  Layers,
  Sparkles
} from 'lucide-react';
import { EcosystemModuleId } from './types';
import { LivePriceProvider } from './context/LivePriceContext';

function AppContent() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalModule, setModalModule] = useState<EcosystemModuleId>('broker');

  // Scroll spy to update active section
  useEffect(() => {
    const sections = ['hero', 'broker', 'journal', 'indicators', 'mt5', 'jarvis', 'intelligence', 'ecosystem-map'];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuickTrade = () => {
    setModalModule('broker');
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#04060e] text-[#f1f5f9] relative selection:bg-cyan-500/30 selection:text-white">
      {/* Liquid Canvas Dynamic Mesh Background */}
      <LiquidBackground />

      {/* Main Liquid Glass Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenQuickTrade={handleOpenQuickTrade}
      />

      {/* Main Single Stack Webpage Flow */}
      <main className="relative z-10">
        <HeroSection
          onNavigate={handleNavigate}
          onOpenQuickTrade={handleOpenQuickTrade}
        />

        {/* Section 1: Broker */}
        <BrokerSection />

        {/* Section 2: Journal */}
        <JournalSection />

        {/* Section 3: Indicators */}
        <IndicatorsSection />

        {/* Section 4: MT5 EA Bridge */}
        <Mt5EaSection />

        {/* Section 5: Jarvis AI */}
        <JarvisAiSection />

        {/* Section 6: Intelligence AI */}
        <IntelligenceAiSection />

        {/* Interlinked Architecture Map */}
        <EcosystemMap onNavigate={handleNavigate} />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Suite Modal */}
      <FullAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialModule={modalModule}
      />

      {/* Mobile Floating Liquid Dock (Bottom on small screens) */}
      <div className="md:hidden fixed bottom-3 inset-x-3 z-40">
        <div className="liquid-glass rounded-2xl px-3 py-2 flex items-center justify-around border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
          <button
            onClick={() => handleNavigate('broker')}
            className={`p-2 rounded-xl flex flex-col items-center gap-0.5 ${
              activeSection === 'broker' ? 'text-cyan-400 font-bold' : 'text-slate-400'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-[9px]">Broker</span>
          </button>

          <button
            onClick={() => handleNavigate('journal')}
            className={`p-2 rounded-xl flex flex-col items-center gap-0.5 ${
              activeSection === 'journal' ? 'text-purple-400 font-bold' : 'text-slate-400'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[9px]">Journal</span>
          </button>

          <button
            onClick={handleOpenQuickTrade}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 p-0.5 shadow-[0_0_15px_rgba(0,242,254,0.6)] flex items-center justify-center -translate-y-2 cursor-pointer active:scale-95 transition-transform"
          >
            <div className="w-full h-full bg-[#070b1a] rounded-full flex items-center justify-center text-cyan-300">
              <Sparkles className="w-5 h-5" />
            </div>
          </button>

          <button
            onClick={() => handleNavigate('mt5')}
            className={`p-2 rounded-xl flex flex-col items-center gap-0.5 ${
              activeSection === 'mt5' ? 'text-amber-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span className="text-[9px]">MT5</span>
          </button>

          <button
            onClick={() => handleNavigate('jarvis')}
            className={`p-2 rounded-xl flex flex-col items-center gap-0.5 ${
              activeSection === 'jarvis' ? 'text-blue-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span className="text-[9px]">Jarvis</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function App() {
  return (
    <LivePriceProvider>
      <AppContent />
    </LivePriceProvider>
  );
}

export default App;
