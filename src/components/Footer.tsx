import React from 'react';
import { 
  BarChart3, 
  BookOpen, 
  Activity, 
  Cpu, 
  Bot, 
  Brain, 
  ShieldCheck, 
  ArrowUp,
  ExternalLink
} from 'lucide-react';

import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#03050c]/90 backdrop-blur-2xl text-slate-400 text-xs pt-16 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand (2 cols) */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo size="lg" badgeText="QUANT FIRM" />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-4">
              ASHFX is an elite quantitative trading and technology firm. We engineer high-frequency algorithmic infrastructure, mathematical order flow engines, behavioral AI risk models, and autonomous multi-agent consensus swarms for institutional funds and professional traders worldwide.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All 6 Institutional Products Operational • LD4 London Datacenter
            </div>
          </div>

          {/* Col 2: Ecosystem Products */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Trading Products
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('broker')} className="hover:text-cyan-300 transition-colors text-left">
                  P-01: ECN Prime Brokerage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-purple-300 transition-colors text-left">
                  P-02: Quant Journal & Risk AI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('indicators')} className="hover:text-emerald-300 transition-colors text-left">
                  P-03: Conflux FSM Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mt5')} className="hover:text-amber-300 transition-colors text-left">
                  P-04: MT5 IPC Execution Core
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jarvis')} className="hover:text-blue-300 transition-colors text-left">
                  P-05: Jarvis Vision Co-Pilot
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('intelligence')} className="hover:text-rose-300 transition-colors text-left">
                  P-06: Swarm Intelligence Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional Tech */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Infrastructure
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between">
                <span>Execution Speed</span>
                <span className="font-mono text-white">11.8ms</span>
              </li>
              <li className="flex items-center justify-between">
                <span>IPC Socket Ping</span>
                <span className="font-mono text-amber-400">0.42ms</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Computer Vision</span>
                <span className="font-mono text-blue-400">60 FPS</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Swarm Consensus</span>
                <span className="font-mono text-rose-400">92.4%</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Server Location</span>
                <span className="font-mono text-cyan-400">Equinix LD4</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Launch & Back to Top */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Navigation
            </h4>
            <div className="space-y-3">
              <button
                onClick={scrollToTop}
                className="w-full py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-white/10 text-white font-medium border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
              <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-[11px] text-slate-400 leading-normal">
                Designed with liquid glass optics, spring deceleration physics, and full reduced-motion accessibility.
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 ASHFX QUANTITATIVE TECHNOLOGIES. All rights reserved. Original standalone projects remain intact.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 hover:text-slate-300">Privacy Policy</span>
            <span className="text-white/20">|</span>
            <span className="text-slate-400 hover:text-slate-300">Risk Disclosure</span>
            <span className="text-white/20">|</span>
            <span className="text-slate-400 hover:text-slate-300">System Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
