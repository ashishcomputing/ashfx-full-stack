import React, { useState } from 'react';
import { 
  BookOpen, 
  TrendingUp, 
  Brain, 
  Plus, 
  CheckCircle2, 
  Calendar, 
  Filter, 
  ArrowUpRight, 
  ShieldAlert, 
  Sparkles,
  Zap
} from 'lucide-react';
import { JournalTrade, PerformanceStats } from '../../types';
import { initialTrades, initialPerformanceStats, equityCurve, behavioralAudit } from '../../data/mockJournal';
import confetti from 'canvas-confetti';

export const JournalSection: React.FC = () => {
  const [trades, setTrades] = useState<JournalTrade[]>(initialTrades);
  const [stats, setStats] = useState<PerformanceStats>(initialPerformanceStats);
  const [filterSession, setFilterSession] = useState<string>('ALL');
  const [showLogModal, setShowLogModal] = useState<boolean>(false);

  // New trade form state
  const [newSymbol, setNewSymbol] = useState('XAU/USD');
  const [newType, setNewType] = useState<'LONG' | 'SHORT'>('LONG');
  const [newPnl, setNewPnl] = useState('1850.00');
  const [newSetup, setNewSetup] = useState('London Low Sweep + FVG');
  const [newSession, setNewSession] = useState<'London' | 'New York' | 'Asian'>('London');

  const filteredTrades = filterSession === 'ALL' 
    ? trades 
    : trades.filter((t) => t.session === filterSession);

  const handleAddTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const pnlNum = parseFloat(newPnl) || 0;
    const isWin = pnlNum > 0;
    const newTradeObj: JournalTrade = {
      id: `TRD-${Math.floor(1000 + Math.random() * 9000)}`,
      symbol: newSymbol,
      type: newType,
      entryDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
      entryPrice: newSymbol === 'XAU/USD' ? 2640.0 : 1.0840,
      exitPrice: newSymbol === 'XAU/USD' ? 2649.0 : 1.0875,
      size: 2.0,
      pnl: pnlNum,
      pnlPercent: parseFloat((pnlNum / 1000).toFixed(2)),
      rMultiple: parseFloat((pnlNum / 600).toFixed(1)),
      outcome: isWin ? 'WIN' : pnlNum === 0 ? 'BE' : 'LOSS',
      session: newSession,
      setup: newSetup,
      emotionalState: 'Disciplined',
      notes: 'Logged via ASHFX Liquid Glass Unified Stack.',
    };

    setTrades([newTradeObj, ...trades]);
    setStats((prev) => ({
      ...prev,
      netPnl: prev.netPnl + pnlNum,
      totalTrades: prev.totalTrades + 1,
    }));

    setShowLogModal(false);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#00f2fe', '#00f5a0']
    });
  };

  return (
    <section id="journal" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>MODULE 02 • SMART LIQUID JOURNAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Behavioral AI & Quantitative Analytics
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
            Real-time equity curves, psychometric tilt auditing, and session attribution powered by liquid glass.
          </p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="btn-liquid-primary !bg-gradient-to-r !from-purple-500 !via-indigo-500 !to-cyan-400 text-white text-xs !py-2.5 !px-5 flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Trade</span>
        </button>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="liquid-glass-card p-4 sm:p-5 border border-purple-500/20">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Net Cumulative PnL</div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono mt-1">
            +${stats.netPnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" /> +28.4% Return On Equity
          </div>
        </div>

        <div className="liquid-glass-card p-4 sm:p-5 border border-purple-500/20">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Win Rate (48 Trades)</div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono mt-1">
            {stats.winRate}%
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Avg Win: <span className="text-white font-mono">${stats.avgWin}</span> • Avg Loss: <span className="text-white font-mono">${stats.avgLoss}</span>
          </div>
        </div>

        <div className="liquid-glass-card p-4 sm:p-5 border border-purple-500/20">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Profit Factor</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">
            {stats.profitFactor}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Expectancy: <span className="text-white font-mono">{stats.expectancy}R</span> per setup
          </div>
        </div>

        <div className="liquid-glass-card p-4 sm:p-5 border border-purple-500/20">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Max Drawdown</div>
          <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono mt-1">
            {stats.maxDrawdown}%
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Institutional Risk Threshold: <span className="text-white font-mono">-5.0%</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Equity Chart + Behavioral Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Equity Curve SVG (2 cols) */}
        <div className="lg:col-span-2 liquid-glass-card p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span>Capital Growth Trajectory (USD)</span>
            </h3>
            <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/30">
              High-Water Mark: $138,420
            </span>
          </div>

          {/* Simulated Equity Curve SVG */}
          <div className="h-56 w-full relative my-2">
            <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,180 L80,165 L160,140 L240,150 L320,110 L400,80 L480,65 L600,20 L600,200 L0,200 Z"
                fill="url(#equityGrad)"
              />
              <path
                d="M0,180 L80,165 L160,140 L240,150 L320,110 L400,80 L480,65 L600,20"
                fill="none"
                stroke="#a855f7"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Data points */}
              {[
                { cx: 0, cy: 180 },
                { cx: 80, cy: 165 },
                { cx: 160, cy: 140 },
                { cx: 240, cy: 150 },
                { cx: 320, cy: 110 },
                { cx: 400, cy: 80 },
                { cx: 480, cy: 65 },
                { cx: 600, cy: 20 },
              ].map((pt, i) => (
                <circle key={i} cx={pt.cx} cy={pt.cy} r="4.5" fill="#ffffff" stroke="#a855f7" strokeWidth="2.5" />
              ))}
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-3">
            <span>Starting: <strong className="text-white font-mono">$100,000</strong></span>
            <span>Current: <strong className="text-purple-400 font-mono">$138,420</strong></span>
            <span>Sharpe Ratio: <strong className="text-emerald-400 font-mono">2.86</strong></span>
          </div>
        </div>

        {/* Behavioral AI Tilt Audit Card (1 col) */}
        <div className="liquid-glass-card p-5 border border-purple-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-purple-400" />
                <span>Behavioral AI Audit</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {behavioralAudit.tiltStatus}
              </span>
            </div>

            {/* Tilt score meter */}
            <div className="bg-black/30 rounded-xl p-4 border border-white/10 mb-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-400">Tilt Risk Index</span>
                <span className="font-mono font-bold text-emerald-400">{behavioralAudit.tiltScore} / 100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" style={{ width: `${behavioralAudit.tiltScore}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>0 (Calm)</span>
                <span>50 (Caution)</span>
                <span>100 (Tilt)</span>
              </div>
            </div>

            {/* Behavioral stats */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span className="text-slate-400">Discipline Score:</span>
                <span className="font-mono text-cyan-400 font-semibold">{behavioralAudit.disciplineScore}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span className="text-slate-400">FOMO Incidents:</span>
                <span className="font-mono text-emerald-400 font-semibold">{behavioralAudit.fomoIncidents} (None)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span className="text-slate-400">Revenge Trade Risk:</span>
                <span className="font-mono text-emerald-400 font-semibold">{behavioralAudit.revengeTradeRisk}%</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Rule Adherence:</span>
                <span className="font-mono text-purple-300 font-semibold">{behavioralAudit.ruleAdherence}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[11px] text-slate-300">
            <strong className="text-purple-300 block mb-1">AI Recommendation:</strong>
            {behavioralAudit.aiRecommendation}
          </div>
        </div>
      </div>

      {/* Trade Log Table */}
      <div className="liquid-glass-card p-5 border border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>Quantitative Execution Log ({filteredTrades.length} Trades)</span>
          </h3>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Session:
            </span>
            {['ALL', 'London', 'New York', 'Asian'].map((sess) => (
              <button
                key={sess}
                onClick={() => setFilterSession(sess)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  filterSession === sess
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                {sess}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400 font-semibold">
                <th className="pb-2">ID</th>
                <th className="pb-2">Symbol</th>
                <th className="pb-2">Setup</th>
                <th className="pb-2">Session</th>
                <th className="pb-2">Outcome</th>
                <th className="pb-2">R:R</th>
                <th className="pb-2 text-right">Net PnL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredTrades.map((t) => (
                <tr key={t.id} className="hover:bg-white/[0.02] transition-colors font-mono">
                  <td className="py-3 text-slate-400 font-normal">{t.id}</td>
                  <td className="py-3 font-bold text-white font-sans">{t.symbol}</td>
                  <td className="py-3 text-slate-300 font-sans text-[11px] max-w-xs truncate">{t.setup}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 text-[10px] font-sans">
                      {t.session}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      t.outcome === 'WIN' 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : t.outcome === 'LOSS'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                    }`}>
                      {t.outcome}
                    </span>
                  </td>
                  <td className="py-3 text-cyan-400 font-semibold">+{t.rMultiple}R</td>
                  <td className={`py-3 text-right font-bold ${t.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {t.pnl >= 0 ? '+' : ''}${t.pnl.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Trade Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="liquid-glass-card max-w-md w-full p-6 border border-purple-500/30 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-400" />
              <span>Log New Trade Entry</span>
            </h3>

            <form onSubmit={handleAddTrade} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Symbol</label>
                  <input
                    type="text"
                    value={newSymbol}
                    onChange={(e) => setNewSymbol(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white font-mono focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Direction</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as 'LONG' | 'SHORT')}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-purple-400 focus:outline-none"
                  >
                    <option value="LONG">LONG (Buy)</option>
                    <option value="SHORT">SHORT (Sell)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Net PnL ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newPnl}
                    onChange={(e) => setNewPnl(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-emerald-400 font-mono font-bold focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Session</label>
                  <select
                    value={newSession}
                    onChange={(e) => setNewSession(e.target.value as any)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-purple-400 focus:outline-none"
                  >
                    <option value="London">London</option>
                    <option value="New York">New York</option>
                    <option value="Asian">Asian</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Setup Type</label>
                <input
                  type="text"
                  value={newSetup}
                  onChange={(e) => setNewSetup(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 rounded-full text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-liquid-primary !bg-purple-600 text-white text-xs !py-2 !px-5"
                >
                  Save to Journal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
