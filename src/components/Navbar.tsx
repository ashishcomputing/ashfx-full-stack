import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  BookOpen, 
  Activity, 
  Cpu, 
  Bot, 
  Brain, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { EcosystemModuleId } from '../types';
import { useLivePrices } from '../context/LivePriceContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenQuickTrade: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenQuickTrade,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: EcosystemModuleId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'broker', label: 'Broker', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'journal', label: 'Journal', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'indicators', label: 'Indicators', icon: <Activity className="w-4 h-4" /> },
    { id: 'mt5', label: 'MT5 EA', icon: <Cpu className="w-4 h-4" /> },
    { id: 'jarvis', label: 'Jarvis AI', icon: <Bot className="w-4 h-4" /> },
    { id: 'intelligence', label: 'Intelligence AI', icon: <Brain className="w-4 h-4" />, badge: 'Swarm' },
  ];

  const { instruments, isLiveConnected } = useLivePrices();

  return (
    <>
      {/* Top Live Ticker Tape */}
      <div className="bg-[#050914]/90 backdrop-blur-md border-b border-white/[0.07] text-xs py-1.5 px-4 text-slate-300 relative z-50 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-semibold text-[11px] border ${
              isLiveConnected 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              {isLiveConnected ? 'LIVE FEED (WebSocket)' : 'RECONNECTING'}
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline text-slate-300 text-[11px]">
              Avg Execution: <strong className="text-white font-mono">11.8ms</strong>
            </span>
          </div>

          {/* Marquee ticker with real live streaming data */}
          <div className="overflow-hidden whitespace-nowrap flex-1 mx-2 sm:mx-4">
            <div className="inline-flex items-center gap-6 animate-marquee text-[11px] font-mono">
              {instruments.concat(instruments).map((inst, index) => (
                <span key={`${inst.symbol}-${index}`} className="inline-flex items-center gap-1.5">
                  <strong className="text-white font-sans font-semibold">{inst.symbol}</strong>
                  <span className={`transition-colors duration-300 font-bold ${
                    inst.tickDirection === 'up' 
                      ? 'text-emerald-400' 
                      : inst.tickDirection === 'down' 
                      ? 'text-rose-400' 
                      : 'text-slate-200'
                  }`}>
                    {inst.bid.toLocaleString(undefined, { 
                      minimumFractionDigits: inst.decimals, 
                      maximumFractionDigits: inst.decimals 
                    })}
                  </span>
                  <span className={`text-[10px] font-medium ${
                    inst.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {inst.change24h >= 0 ? '+' : ''}{inst.change24h}%
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0 text-[11px] text-slate-300">
            <span className="flex items-center gap-1 text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero Requotes</span>
            </span>
            <span className="text-white/30">|</span>
            <span className="font-mono text-white/90">0.0 Raw Spreads</span>
          </div>
        </div>
      </div>

      {/* Main Floating Liquid Glass Navbar */}
      <header 
        className={`fixed top-9 inset-x-0 z-40 px-3 sm:px-6 transition-all duration-300 ${
          isScrolled ? 'top-2.5' : 'top-9'
        }`}
      >
        <div className="max-w-7xl mx-auto liquid-glass rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-[0_12px_36px_rgba(0,0,0,0.5)] border border-white/10">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00f2fe] via-[#4facfe] to-[#0072ff] p-0.5 shadow-[0_0_20px_rgba(0,242,254,0.4)] group-hover:shadow-[0_0_28px_rgba(0,242,254,0.7)] transition-all">
              <div className="w-full h-full bg-[#070b1a] rounded-[10px] flex items-center justify-center font-bold text-base text-white tracking-wider">
                <span className="text-[#00f2fe]">A</span>FX
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                ASHFX
                <span className="text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  FULL STACK
                </span>
              </span>
              <span className="text-[9.5px] tracking-wider uppercase text-slate-400 font-medium hidden sm:inline">
                Unified Liquid Glass Ecosystem
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer select-none ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,242,254,0.25)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent'
                  }`}
                >
                  <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenQuickTrade}
              className="btn-liquid-primary text-xs !py-2 !px-3.5 sm:!px-4 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Terminal</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.06] border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 liquid-glass rounded-2xl p-4 border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1">
              ASHFX Full Stack Modules
            </div>
            <div className="flex flex-col gap-1 mt-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-200 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                MetaTrader 5 Connected
              </span>
              <span className="font-mono">Ping: 0.42ms</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
