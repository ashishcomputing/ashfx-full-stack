import React, { useState } from 'react';
import { 
  Activity, 
  Target, 
  Layers, 
  Sliders, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  ArrowUpRight,
  RefreshCw,
  Eye
} from 'lucide-react';
import { ConfluxSignal, FsmStage } from '../../types';
import { initialSignals, fsmStages, indicatorWeights } from '../../data/mockIndicators';

export const IndicatorsSection: React.FC = () => {
  const [signals, setSignals] = useState<ConfluxSignal[]>(initialSignals);
  const [selectedSignal, setSelectedSignal] = useState<ConfluxSignal>(initialSignals[0]);
  const [weights, setWeights] = useState(indicatorWeights);

  const handleWeightChange = (index: number, newWeight: number) => {
    const updated = [...weights];
    updated[index].weight = newWeight;
    setWeights(updated);
  };

  return (
    <section id="indicators" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>PRODUCT 03 • CONFLUX QUANT FSM RADAR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mathematical 5-Stage FSM Order Flow Engine
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
            Autonomous algorithmic setup detection: Institutional Liquidity Sweeps, Market Structure Shifts (MSS), Fair Value Gap (FVG) mitigations, and Optimal Trade Entry (OTE 0.705).
          </p>
        </div>

        <div className="liquid-glass-pill px-4 py-2 border border-emerald-500/30 flex items-center gap-3 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-medium">Scanner Status:</span>
          <span className="font-mono text-emerald-400 font-bold">5 Pairs Monitored @ 100ms</span>
        </div>
      </div>

      {/* 5-Stage Conflux FSM Visualizer */}
      <div className="liquid-glass-card p-5 sm:p-6 border border-emerald-500/20 mb-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Conflux Setup Finite State Machine (FSM Pipeline)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {fsmStages.map((stage) => {
            const isDone = stage.status === 'completed';
            const isActive = stage.status === 'active';
            return (
              <div
                key={stage.id}
                className={`p-4 rounded-xl border transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 border-emerald-400/50 shadow-[0_0_20px_rgba(0,245,160,0.2)]'
                    : isDone
                    ? 'bg-white/[0.04] border-white/10'
                    : 'bg-black/30 border-white/5 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                    isActive ? 'bg-emerald-400 text-black font-extrabold' : isDone ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-slate-400'
                  }`}>
                    {stage.badge}
                  </span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  {isActive && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
                </div>

                <div className="text-xs font-bold text-white mb-1">{stage.name}</div>
                <div className="text-[11px] text-slate-400 leading-relaxed">{stage.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Live Conflux Radar + Signal Deep Dive + Weight Tuning */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Signals Table (2 cols) */}
        <div className="lg:col-span-2 liquid-glass-card p-5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>Active Conflux Signals Matrix</span>
              </h3>
              <span className="text-xs text-slate-400">Click row to inspect POI</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08] text-slate-400 font-semibold">
                    <th className="pb-2">Asset</th>
                    <th className="pb-2">TF</th>
                    <th className="pb-2">Bias</th>
                    <th className="pb-2">Conflux Score</th>
                    <th className="pb-2">State</th>
                    <th className="pb-2 text-right">Target TP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] font-mono">
                  {signals.map((sig) => {
                    const isSelected = selectedSignal.symbol === sig.symbol;
                    return (
                      <tr
                        key={sig.symbol}
                        onClick={() => setSelectedSignal(sig)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-emerald-500/15' : 'hover:bg-white/[0.03]'
                        }`}
                      >
                        <td className="py-3 font-bold text-white font-sans">{sig.symbol}</td>
                        <td className="py-3 text-slate-300">{sig.timeframe}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            sig.bias === 'BULLISH' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {sig.bias}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-emerald-400">{sig.score}%</span>
                            <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden hidden sm:block">
                              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${sig.score}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-slate-300 text-[11px]">{sig.state}</td>
                        <td className="py-3 text-right font-bold text-white">${sig.targetTP.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Signal Detail Box */}
          <div className="mt-4 p-4 rounded-xl bg-black/40 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>POI Deep Dive: {selectedSignal.symbol} ({selectedSignal.timeframe})</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Updated {selectedSignal.updatedAt}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">FVG ZONE:</span>
                <span className="font-mono text-white font-medium">{selectedSignal.fvgLevel}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">LIQUIDITY SWEEP:</span>
                <span className="font-mono text-white font-medium">{selectedSignal.sweepLevel}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">OTE 62-79%:</span>
                <span className="font-mono text-emerald-400 font-medium">{selectedSignal.oteZone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">PROJECTED R:R:</span>
                <span className="font-mono text-cyan-400 font-bold">1 : 3.4 Expectancy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Weight Tuning Deck (1 col) */}
        <div className="liquid-glass-card p-5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Algorithm Weight Matrix</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Total: 100%</span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Adjust the algorithmic importance of institutional parameters in real-time:
            </p>

            <div className="space-y-4">
              {weights.map((w, idx) => (
                <div key={w.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">{w.name}</span>
                    <span className="font-mono font-bold text-white">{w.weight}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={w.weight}
                    onChange={(e) => handleWeightChange(idx, parseInt(e.target.value))}
                    className="w-full accent-emerald-400 bg-white/10 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Conflux Model v4.2 Active</span>
            </div>
            Weights are dynamically synced with the low-latency Python Quant Core and MT5 EA Bridge.
          </div>
        </div>
      </div>
    </section>
  );
};
