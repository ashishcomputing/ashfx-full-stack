import React, { useState } from 'react';
import { 
  Brain, 
  ShieldAlert, 
  TrendingUp, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Play, 
  ArrowRight,
  Scale
} from 'lucide-react';
import { AgentDebateMessage, SwarmConsensus } from '../../types';
import { agentProfiles, liveDebateMessages, swarmConsensusData } from '../../data/mockIntelligence';
import confetti from 'canvas-confetti';

export const IntelligenceAiSection: React.FC = () => {
  const [messages, setMessages] = useState<AgentDebateMessage[]>(liveDebateMessages);
  const [consensus, setConsensus] = useState<SwarmConsensus>(swarmConsensusData);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const handleRunDebate = () => {
    setIsSimulating(true);
    setMessages([]);

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < liveDebateMessages.length) {
        const nextMsg = liveDebateMessages[currentStep];
        setMessages((prev) => [...prev, nextMsg]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#f43f5e', '#00f2fe', '#00f5a0', '#a855f7']
        });
      }
    }, 800);
  };

  return (
    <section id="intelligence" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-3">
            <Brain className="w-3.5 h-3.5" />
            <span>PRODUCT 06 • AUTONOMOUS MULTI-AGENT SWARM DESK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Institutional Quantitative Intelligence Swarm
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
            5 specialized LLM quant agents engage in adversarial research debate (Macro, Quant Tech, Stat-Arb, Risk Gatekeeper, Execution Router) to stress-test setups before capital allocation.
          </p>
        </div>

        <button
          onClick={handleRunDebate}
          disabled={isSimulating}
          className="btn-liquid-primary !bg-gradient-to-r !from-rose-500 !via-purple-500 !to-cyan-400 text-white text-xs !py-2.5 !px-5 flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Agents Debating Live...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Live Debate Simulation</span>
            </>
          )}
        </button>
      </div>

      {/* 5 Agent Personas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {agentProfiles.map((agent) => (
          <div
            key={agent.role}
            className={`p-4 rounded-2xl liquid-glass-card border ${agent.borderColor} flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-tr ${agent.avatarColor}`} />
                <span className="text-xs font-bold text-white">{agent.role}</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium mb-2 leading-snug">
                {agent.title}
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 text-[10px] text-slate-400">
              <span className="text-slate-500 block">SPECIALTY:</span>
              <span>{agent.specialty}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Live Adversarial Debate Feed (8 cols) + Final Consensus Card (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left: Debate Feed (8 cols) */}
        <div className="lg:col-span-8 liquid-glass-card p-5 sm:p-6 border border-white/10 flex flex-col justify-between min-h-[480px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-400" />
                <span>Live Adversarial Deliberation Thread</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Pair: XAU/USD (Gold) • M15</span>
            </div>

            {/* Messages */}
            <div className="space-y-4 max-h-[440px] overflow-y-auto pr-2">
              {messages.map((msg) => (
                <div key={msg.id} className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: msg.avatarColor }} />
                      <strong className="text-white font-sans text-sm">{msg.agent}</strong>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        msg.verdict === 'BULLISH'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : msg.verdict === 'CAUTION'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {msg.verdict}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="text-slate-400">Confidence: <strong className="text-cyan-400">{msg.confidence}%</strong></span>
                      <span className="text-slate-500">{msg.timestamp}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed text-xs mb-3 font-sans">
                    {msg.rationale}
                  </p>

                  {/* Quantitative metrics breakdown */}
                  {msg.metrics && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-white/10 font-mono text-[11px]">
                      {msg.metrics.map((met) => (
                        <div key={met.label} className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                          <span className="text-slate-400 block text-[10px]">{met.label}:</span>
                          <span className="text-white font-semibold">{met.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isSimulating && (
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-dashed border-rose-400/40 text-xs text-rose-300 flex items-center gap-3 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                  Next agent synthesizing real-time order flow and stress-testing assumptions...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Swarm Consensus Engine (4 cols) */}
        <div className="lg:col-span-4 liquid-glass-card p-5 sm:p-6 border border-rose-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>Consensus Engine</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                RATIFIED
              </span>
            </div>

            {/* Verdict Box */}
            <div className="bg-black/40 rounded-2xl p-5 border border-emerald-500/30 text-center mb-5">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Final Institutional Decision
              </div>
              <div className="text-3xl font-black text-emerald-400 font-mono tracking-tight">
                {consensus.consensusVerdict}
              </div>
              <div className="text-xs text-slate-300 mt-1 font-mono">
                Overall Swarm Confidence: <strong className="text-cyan-400">{consensus.overallConfidence}%</strong>
              </div>
            </div>

            {/* Risk & Sizing Breakdown */}
            <div className="space-y-3 text-xs mb-4">
              <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                <span className="text-slate-400">Target Asset:</span>
                <span className="font-mono text-white font-bold">{consensus.symbol} ({consensus.timeframe})</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                <span className="text-slate-400">Approved Position Sizing:</span>
                <span className="font-mono text-emerald-400 font-bold">{consensus.recommendedLotSize} Lots</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                <span className="text-slate-400">Aggregate Risk Index:</span>
                <span className="font-mono text-cyan-400 font-bold">{consensus.aggregateRiskScore} / 100 (Safe)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Adversarial Veto:</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {consensus.adversarialVeto ? 'TRIGGERED' : 'CLEAR (Approved)'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Bridge Ready</span>
            </div>
            Execution Arbiter has signed the trade order. Ready for 1-click dispatch to MT5 EA Bridge.
          </div>
        </div>
      </div>
    </section>
  );
};
