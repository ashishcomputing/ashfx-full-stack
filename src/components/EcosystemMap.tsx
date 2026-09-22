import React from 'react';
import { 
  Layers, 
  ArrowRight, 
  Cpu, 
  BarChart3, 
  BookOpen, 
  Activity, 
  Bot, 
  Brain, 
  Zap, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { EcosystemModuleId } from '../types';

interface EcosystemMapProps {
  onNavigate: (sectionId: string) => void;
}

export const EcosystemMap: React.FC<EcosystemMapProps> = ({ onNavigate }) => {
  const pipelineSteps = [
    {
      step: '01',
      title: 'Swarm Intelligence',
      productCode: 'PRODUCT 06',
      subtitle: 'Adversarial Quantitative Debate',
      tech: '5 LLM Quant Agents • Macro & Risk Consensus',
      id: 'intelligence',
      icon: <Brain className="w-5 h-5 text-rose-400" />,
      color: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
    },
    {
      step: '02',
      title: 'Conflux Quant Engine',
      productCode: 'PRODUCT 03',
      subtitle: '5-Stage FSM & Order Flow Radar',
      tech: 'Sweep • MSS • FVG • OTE 0.705 Matrix',
      id: 'indicators',
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    },
    {
      step: '03',
      title: 'Jarvis Desktop Vision',
      productCode: 'PRODUCT 05',
      subtitle: 'Multimodal Screen AI & HUD',
      tech: '60 FPS Chart Vision • Real-Time Voice Audio',
      id: 'jarvis',
      icon: <Bot className="w-5 h-5 text-blue-400" />,
      color: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    },
    {
      step: '04',
      title: 'MT5 EA Bridge Core',
      productCode: 'PRODUCT 04',
      subtitle: 'ZeroMQ High-Frequency IPC',
      tech: '0.42ms Socket • MetaTrader 5 Build 4450+',
      id: 'mt5',
      icon: <Cpu className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    },
    {
      step: '05',
      title: 'ECN Prime Brokerage',
      productCode: 'PRODUCT 01',
      subtitle: 'Tier-1 Bank Liquidity Aggregation',
      tech: '11.8ms Fill • 0.0 Raw Spread • Zero Requotes',
      id: 'broker',
      icon: <BarChart3 className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
    },
    {
      step: '06',
      title: 'Quant Journal & Risk AI',
      productCode: 'PRODUCT 02',
      subtitle: 'Behavioral & Equity Telemetry',
      tech: 'Tilt Lockout • Monte Carlo • 2.42 PF',
      id: 'journal',
      icon: <BookOpen className="w-5 h-5 text-purple-400" />,
      color: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
    },
  ];

  return (
    <section id="ecosystem-map" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>INSTITUTIONAL QUANT PIPELINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          How All 6 Quant Products Execute in Sync
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          From multi-agent adversarial debate and mathematical order flow down to sub-millisecond MT5 execution and post-trade behavioral risk audits.
        </p>
      </div>

      {/* Interactive Horizontal / Vertical Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative">
        {pipelineSteps.map((step, idx) => (
          <div
            key={step.step}
            onClick={() => onNavigate(step.id)}
            className="group liquid-glass-card p-5 sm:p-6 border border-white/10 hover:border-cyan-400/40 cursor-pointer transition-all duration-300 hover:-translate-y-1 relative"
          >
            {/* Step Number & Icon */}
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${step.color}`}>
                STEP {step.step}
              </span>
              <div className="p-2 rounded-xl bg-white/[0.06] border border-white/10 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              {step.title}
            </h3>
            <div className="text-xs text-slate-300 font-medium mt-0.5">
              {step.subtitle}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px]">{step.tech}</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </div>

            {/* Specular highlight */}
            <div className="glass-specular-edge" />
          </div>
        ))}
      </div>

      {/* Quantitative Summary Banner */}
      <div className="mt-12 liquid-glass rounded-2xl p-6 border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-lg shrink-0">
            <div className="w-full h-full bg-[#070b1a] rounded-[14px] flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Full Stack Institutional Guarantee</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Strict mathematical expectancy, zero conflicting orders, automated drawdown breakers, and zero requotes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-[11px] uppercase text-slate-400 font-semibold">Total Ecosystem Latency</div>
            <div className="text-lg font-black font-mono text-emerald-400">12.22 ms Tick-to-Fill</div>
          </div>
          <button
            onClick={() => onNavigate('broker')}
            className="btn-liquid-primary text-xs !py-2.5 !px-5"
          >
            Launch Ecosystem
          </button>
        </div>
      </div>
    </section>
  );
};
