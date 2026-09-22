import React, { useState } from 'react';
import { 
  Cpu, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  Settings, 
  RefreshCw, 
  CheckCircle2, 
  Sliders, 
  Code, 
  FileCode,
  Lock,
  ArrowRight
} from 'lucide-react';
import { BridgeStatus, EaParameter, BridgeLog } from '../../types';
import { initialBridgeStatus, eaParameters, initialBridgeLogs } from '../../data/mockMt5';

export const Mt5EaSection: React.FC = () => {
  const [bridgeStatus, setBridgeStatus] = useState<BridgeStatus>(initialBridgeStatus);
  const [parameters, setParameters] = useState<EaParameter[]>(eaParameters);
  const [logs, setLogs] = useState<BridgeLog[]>(initialBridgeLogs);
  const [activeTab, setActiveTab] = useState<'monitor' | 'params' | 'code'>('monitor');
  const [riskPercent, setRiskPercent] = useState<number>(1.0);

  const handleSimulatePing = () => {
    const newPing = parseFloat((0.35 + Math.random() * 0.15).toFixed(2));
    setBridgeStatus((prev) => ({
      ...prev,
      pingMs: newPing,
      lastHeartbeat: 'Just now (Active)',
    }));

    const newLog: BridgeLog = {
      id: `LOG-${Math.floor(600 + Math.random() * 400)}`,
      timestamp: new Date().toISOString().slice(11, 23),
      type: 'HEARTBEAT',
      message: `IPC Ping [ZeroMQ] -> Roundtrip: ${newPing}ms | MT5 Build 4450 Verified`,
      status: 'info',
    };
    setLogs([newLog, ...logs.slice(0, 7)]);
  };

  return (
    <section id="mt5" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>MODULE 04 • METATRADER 5 EA & IPC BRIDGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Institutional MQL5 Bridge & Execution Core
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
            Sub-millisecond IPC communication via ZeroMQ & Windows Named Pipes, linking Python Quant AI directly into MetaTrader 5 terminal.
          </p>
        </div>

        <button
          onClick={handleSimulatePing}
          className="liquid-glass-pill px-4 py-2 border border-amber-500/30 flex items-center gap-2 text-xs hover:border-amber-400 transition-colors cursor-pointer self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span className="text-slate-300">Ping IPC Socket:</span>
          <span className="font-mono text-amber-400 font-bold">{bridgeStatus.pingMs} ms</span>
        </button>
      </div>

      {/* Top Status Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="liquid-glass-card p-4 sm:p-5 border border-amber-500/20">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Bridge Connection</div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            ONLINE (IPC)
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Protocol: <span className="text-white font-mono">{bridgeStatus.bridgeProtocol}</span>
          </div>
        </div>

        <div className="liquid-glass-card p-4 sm:p-5 border border-amber-500/20">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Execution Latency</div>
          <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-1">
            {bridgeStatus.executionLatencyMs} ms
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Tick-to-fill speed • LD4 Cross-Connect
          </div>
        </div>

        <div className="liquid-glass-card p-4 sm:p-5 border border-amber-500/20">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Orders Routed</div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
            {bridgeStatus.totalOrdersRouted.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" /> 100% Fill Rate (Zero Requotes)
          </div>
        </div>

        <div className="liquid-glass-card p-4 sm:p-5 border border-amber-500/20">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Average Slippage</div>
          <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono mt-1">
            {bridgeStatus.slippageAverage}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Max Guard Tolerance: <span className="text-white font-mono">0.8 pips</span>
          </div>
        </div>
      </div>

      {/* Main Terminal Frame */}
      <div className="liquid-glass-card p-5 sm:p-6 border border-white/10">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pb-4 border-b border-white/10 mb-6">
          <button
            onClick={() => setActiveTab('monitor')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'monitor'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,166,35,0.2)]'
                : 'text-slate-400 hover:text-white bg-white/[0.04]'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Live Bridge Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab('params')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'params'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,166,35,0.2)]'
                : 'text-slate-400 hover:text-white bg-white/[0.04]'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>EA Parameters</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,166,35,0.2)]'
                : 'text-slate-400 hover:text-white bg-white/[0.04]'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>MQL5 Architecture</span>
          </button>
        </div>

        {/* Tab 1: Live Telemetry Terminal */}
        {activeTab === 'monitor' && (
          <div className="space-y-4">
            <div className="bg-[#03060f] rounded-2xl p-4 sm:p-5 border border-white/10 font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-slate-400">
                <span className="flex items-center gap-2 text-amber-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  IPC BRIDGE SOCKET [ZeroMQ:tcp://127.0.0.1:5555]
                </span>
                <span className="text-[11px]">Heartbeat: {bridgeStatus.lastHeartbeat}</span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
                {logs.map((log) => (
                  <div key={log.id} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 py-1.5 border-b border-white/[0.03]">
                    <span className="text-slate-500 shrink-0 text-[11px]">{log.timestamp}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 w-fit ${
                      log.type === 'ORDER_EXECUTION' 
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                        : log.type === 'HEARTBEAT'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {log.type}
                    </span>
                    <span className="text-slate-200 text-[11.5px] leading-relaxed">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                <span className="text-slate-400 block text-[10px]">ATTACHED EXPERT ADVISOR:</span>
                <span className="font-mono text-white font-bold">ASHFX_Bridge.mq5 (v4.2.1)</span>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                <span className="text-slate-400 block text-[10px]">SECURITY HASH:</span>
                <span className="font-mono text-emerald-400">SHA-256 Verified (Institutional)</span>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                <span className="text-slate-400 block text-[10px]">CIRCUIT BREAKER:</span>
                <span className="font-mono text-cyan-400">ARMED (Auto-Close at -4.0%)</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: EA Parameters */}
        {activeTab === 'params' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parameters.map((param) => (
              <div key={param.name} className="p-4 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white">{param.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                      {param.category}
                    </span>
                  </div>
                  <div className="font-mono text-sm font-bold text-amber-400 mb-2">
                    {param.value}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {param.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: MQL5 Code View */}
        {activeTab === 'code' && (
          <div className="bg-[#03060f] rounded-2xl p-4 sm:p-5 border border-white/10 font-mono text-xs overflow-x-auto">
            <div className="text-slate-400 mb-3 flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-amber-400 font-bold flex items-center gap-2">
                <FileCode className="w-4 h-4" />
                ASHFX_Bridge.mq5 (Zero-Latency IPC Protocol)
              </span>
              <span className="text-[11px] text-slate-500">MQL5 Build 4450</span>
            </div>
            <pre className="text-slate-300 leading-relaxed">
{`//+------------------------------------------------------------------+
//|                                                ASHFX_Bridge.mq5  |
//|                   Copyright 2026, ASHFX Quantitative Technologies |
//+------------------------------------------------------------------+
#property copyright "ASHFX Quant"
#property version   "4.20"
#property strict

#include <Trade\\Trade.mqh>
#include <Zmq\\ZmqContext.mqh>

input double InpRiskPercent      = 1.0;    // Risk % Equity
input double InpMaxDailyDD       = 4.0;    // Max Daily Drawdown Cap %
input double InpMaxSlippagePips  = 0.8;    // Max Slippage Tolerance
input ulong  InpMagicNumber      = 892401; // ASHFX Conflux Magic

CTrade trade;
CZmqContext context;
CZmqSocket socket(context, ZMQ_SUB);

int OnInit() {
   Print("[ASHFX] Initializing ZeroMQ IPC Bridge on tcp://127.0.0.1:5555");
   socket.connect("tcp://127.0.0.1:5555");
   socket.subscribe("");
   trade.SetExpertMagicNumber(InpMagicNumber);
   return(INIT_SUCCEEDED);
}

void OnTick() {
   // Low-latency non-blocking message poll
   string payload;
   if(socket.recv(payload, ZMQ_DONTWAIT)) {
      ParseAndExecutePayload(payload);
   }
}`}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
};
