import React from 'react';
import { 
  BarChart3, 
  BookOpen, 
  Activity, 
  Cpu, 
  Bot, 
  Brain, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Shield, 
  Layers
} from 'lucide-react';
import { EcosystemModuleId } from '../types';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenQuickTrade: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenQuickTrade,
}) => {
  const ecosystemNodes: {
    id: EcosystemModuleId;
    name: string;
    tagline: string;
    metric: string;
    icon: React.ReactNode;
    glowColor: string;
    borderColor: string;
  }[] = [
    {
      id: 'broker',
      name: 'ASHFX Broker',
      tagline: 'Next-Gen Multi-Asset ECN',
      metric: '0.0 Raw Pips • 11.8ms',
      icon: <BarChart3 className="w-5 h-5 text-cyan-400" />,
      glowColor: 'group-hover:shadow-[0_0_25px_rgba(0,242,254,0.35)]',
      borderColor: 'border-cyan-500/30',
    },
    {
      id: 'journal',
      name: 'ASHFX Journal',
      tagline: 'Liquid Glass Behavioral AI',
      metric: '68.4% Win Rate • +$38.4K',
      icon: <BookOpen className="w-5 h-5 text-purple-400" />,
      glowColor: 'group-hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]',
      borderColor: 'border-purple-500/30',
    },
    {
      id: 'indicators',
      name: 'ASHFX Indicators',
      tagline: 'Conflux Quant FSM Engine',
      metric: '5-Stage Scanner • POI Hunt',
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
      glowColor: 'group-hover:shadow-[0_0_25px_rgba(0,245,160,0.35)]',
      borderColor: 'border-emerald-500/30',
    },
    {
      id: 'mt5',
      name: 'ASHFX MT5 EA',
      tagline: 'Zero-Latency IPC Bridge',
      metric: '0.42ms Ping • ZeroMQ Core',
      icon: <Cpu className="w-5 h-5 text-amber-400" />,
      glowColor: 'group-hover:shadow-[0_0_25px_rgba(245,166,35,0.35)]',
      borderColor: 'border-amber-500/30',
    },
    {
      id: 'jarvis',
      name: 'ASHFX Jarvis AI',
      tagline: 'Screen-Aware Desktop Co-pilot',
      metric: '60 FPS Vision • Real-Time HUD',
      icon: <Bot className="w-5 h-5 text-blue-400" />,
      glowColor: 'group-hover:shadow-[0_0_25px_rgba(79,172,254,0.35)]',
      borderColor: 'border-blue-500/30',
    },
    {
      id: 'intelligence',
      name: 'ASHFX Intelligence',
      tagline: '5-Stage Swarm Debate Desk',
      metric: '92.4% Consensus • Macro/Risk',
      icon: <Brain className="w-5 h-5 text-rose-400" />,
      glowColor: 'group-hover:shadow-[0_0_25px_rgba(244,63,94,0.35)]',
      borderColor: 'border-rose-500/30',
    },
  ];

  return (
    <section id="hero" className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 max-w-7xl mx-auto z-10">
      {/* Top pill badge */}
      <div className="flex justify-center mb-6">
        <div className="liquid-glass-pill px-4 py-1.5 flex items-center gap-2 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,242,254,0.15)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-cyan-300">
            LIQUID GLASS QUANTITATIVE ARCHITECTURE
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-xs text-slate-300 hidden sm:inline">6 Core Systems Unified</span>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          ASHFX{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,242,254,0.3)]">
            FULL STACK
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
          The unified next-generation trading ecosystem. Bridging the{' '}
          <span className="text-cyan-300 font-medium">ASHFX Broker</span>,{' '}
          <span className="text-purple-300 font-medium">Smart Liquid Journal</span>,{' '}
          <span className="text-emerald-300 font-medium">Conflux Indicators</span>,{' '}
          <span className="text-amber-300 font-medium">MT5 EA Bridge</span>,{' '}
          <span className="text-blue-300 font-medium">Jarvis Desktop AI</span>, and{' '}
          <span className="text-rose-300 font-medium">5-Stage Intelligence Swarms</span>{' '}
          into a single, high-performance liquid glass web stack.
        </p>

        {/* Hero CTA buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate('broker')}
            className="btn-liquid-primary text-sm !py-3 !px-6 flex items-center gap-2"
          >
            <span>Explore Ecosystem</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenQuickTrade}
            className="btn-liquid-secondary text-sm !py-3 !px-6 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Interactive Terminal</span>
          </button>
          <button
            onClick={() => onNavigate('ecosystem-map')}
            className="btn-liquid-secondary text-sm !py-3 !px-5 hidden sm:flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>System Pipeline</span>
          </button>
        </div>
      </div>

      {/* 6 Unified Ecosystem Nodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-10">
        {ecosystemNodes.map((node) => (
          <div
            key={node.id}
            onClick={() => onNavigate(node.id)}
            className={`group liquid-glass-card p-5 sm:p-6 cursor-pointer border ${node.borderColor} transition-all duration-300 hover:-translate-y-1 ${node.glowColor}`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10 group-hover:scale-105 transition-transform duration-200">
                {node.icon}
              </div>
              <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-white/[0.06] text-slate-300 border border-white/10">
                {node.metric}
              </span>
            </div>

            {/* Title & Tagline */}
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
              {node.name}
              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-cyan-400" />
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              {node.tagline}
            </p>

            {/* Liquid specular edge */}
            <div className="glass-specular-edge" />
          </div>
        ))}
      </div>

      {/* Bottom Live Telemetry Strip */}
      <div className="mt-12 liquid-glass rounded-2xl p-4 sm:p-5 border border-white/10 shadow-xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          <div className="pt-2 sm:pt-0">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">ECN Spread</div>
            <div className="text-lg sm:text-xl font-extrabold text-cyan-400 font-mono mt-0.5">0.0 Pips</div>
            <div className="text-[10px] text-slate-400">Raw Liquidity</div>
          </div>
          <div className="pt-2 sm:pt-0 sm:pl-4">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Order Fill</div>
            <div className="text-lg sm:text-xl font-extrabold text-emerald-400 font-mono mt-0.5">11.8 ms</div>
            <div className="text-[10px] text-slate-400">Ultra-Low Latency</div>
          </div>
          <div className="pt-2 sm:pt-0 sm:pl-4">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">MT5 IPC Ping</div>
            <div className="text-lg sm:text-xl font-extrabold text-amber-400 font-mono mt-0.5">0.42 ms</div>
            <div className="text-[10px] text-slate-400">ZeroMQ Socket</div>
          </div>
          <div className="pt-2 sm:pt-0 sm:pl-4">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Jarvis Vision</div>
            <div className="text-lg sm:text-xl font-extrabold text-blue-400 font-mono mt-0.5">60 FPS</div>
            <div className="text-[10px] text-slate-400">Multimodal Neural</div>
          </div>
          <div className="pt-2 sm:pt-0 sm:pl-4">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Swarm Consensus</div>
            <div className="text-lg sm:text-xl font-extrabold text-rose-400 font-mono mt-0.5">92.4%</div>
            <div className="text-[10px] text-slate-400">5-Agent Debate</div>
          </div>
          <div className="pt-2 sm:pt-0 sm:pl-4">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Journal PnL</div>
            <div className="text-lg sm:text-xl font-extrabold text-purple-400 font-mono mt-0.5">+$38.4K</div>
            <div className="text-[10px] text-slate-400">2.42 Profit Factor</div>
          </div>
        </div>
      </div>
    </section>
  );
};
