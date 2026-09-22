import React, { useState } from 'react';
import { 
  X, 
  BarChart3, 
  BookOpen, 
  Activity, 
  Cpu, 
  Bot, 
  Brain, 
  Sparkles, 
  Maximize2,
  CheckCircle2
} from 'lucide-react';
import { EcosystemModuleId } from '../types';
import { BrokerSection } from './sections/BrokerSection';
import { JournalSection } from './sections/JournalSection';
import { IndicatorsSection } from './sections/IndicatorsSection';
import { Mt5EaSection } from './sections/Mt5EaSection';
import { JarvisAiSection } from './sections/JarvisAiSection';
import { IntelligenceAiSection } from './sections/IntelligenceAiSection';
import { Logo } from './Logo';

interface FullAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialModule?: EcosystemModuleId;
}

export const FullAppModal: React.FC<FullAppModalProps> = ({
  isOpen,
  onClose,
  initialModule = 'broker',
}) => {
  const [activeModule, setActiveModule] = useState<EcosystemModuleId>(initialModule);

  if (!isOpen) return null;

  const tabs: { id: EcosystemModuleId; label: string; icon: React.ReactNode }[] = [
    { id: 'broker', label: 'P-01 Broker', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'journal', label: 'P-02 Journal', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'indicators', label: 'P-03 Indicators', icon: <Activity className="w-4 h-4" /> },
    { id: 'mt5', label: 'P-04 MT5 EA', icon: <Cpu className="w-4 h-4" /> },
    { id: 'jarvis', label: 'P-05 Jarvis AI', icon: <Bot className="w-4 h-4" /> },
    { id: 'intelligence', label: 'P-06 Swarm Desk', icon: <Brain className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="liquid-glass-card w-full max-w-6xl max-h-[92vh] flex flex-col border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-white/10 flex items-center justify-between bg-[#070b1a]/90">
          <Logo size="sm" badgeText="QUANT SUITE" />

          {/* Module Switcher Tabs (Desktop) */}
          <div className="hidden md:flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveModule(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeModule === tab.id
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Module Selector Bar */}
        <div className="md:hidden px-3 py-2 border-b border-white/10 flex items-center gap-1 overflow-x-auto bg-black/30">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveModule(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap flex items-center gap-1 transition-all ${
                activeModule === tab.id
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'text-slate-400 bg-white/[0.04]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-6 bg-[#04060e]/95">
          {activeModule === 'broker' && <BrokerSection />}
          {activeModule === 'journal' && <JournalSection />}
          {activeModule === 'indicators' && <IndicatorsSection />}
          {activeModule === 'mt5' && <Mt5EaSection />}
          {activeModule === 'jarvis' && <JarvisAiSection />}
          {activeModule === 'intelligence' && <IntelligenceAiSection />}
        </div>
      </div>
    </div>
  );
};
