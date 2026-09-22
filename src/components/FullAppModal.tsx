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
    { id: 'broker', label: 'Broker Terminal', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'journal', label: 'Liquid Journal', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'indicators', label: 'Quant Indicators', icon: <Activity className="w-4 h-4" /> },
    { id: 'mt5', label: 'MT5 EA Bridge', icon: <Cpu className="w-4 h-4" /> },
    { id: 'jarvis', label: 'Jarvis Co-pilot', icon: <Bot className="w-4 h-4" /> },
    { id: 'intelligence', label: 'Intelligence Swarm', icon: <Brain className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="liquid-glass-card w-full max-w-6xl max-h-[92vh] flex flex-col border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-white/10 flex items-center justify-between bg-[#070b1a]/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#070b1a] rounded-[10px] flex items-center justify-center font-bold text-xs text-white">
                <span className="text-cyan-400">A</span>FX
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white">ASHFX FULL STACK</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  INTERACTIVE SUITE
                </span>
              </div>
              <span className="text-[10px] text-slate-400 hidden sm:block">
                Direct Operational Cockpit • Zero Latency Sandbox
              </span>
            </div>
          </div>

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
