import React, { useState } from 'react';
import { 
  Bot, 
  Eye, 
  Mic, 
  Send, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  Volume2, 
  Maximize2,
  Terminal,
  Activity
} from 'lucide-react';
import { JarvisTelemetry, JarvisAlert, JarvisMessage } from '../../types';
import { initialJarvisTelemetry, jarvisAlerts, initialJarvisMessages } from '../../data/mockJarvis';

export const JarvisAiSection: React.FC = () => {
  const [telemetry, setTelemetry] = useState<JarvisTelemetry>(initialJarvisTelemetry);
  const [alerts, setAlerts] = useState<JarvisAlert[]>(jarvisAlerts);
  const [messages, setMessages] = useState<JarvisMessage[]>(initialJarvisMessages);
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim()) return;

    const userMsg: JarvisMessage = {
      id: `MSG-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsAnalyzing(true);

    setTimeout(() => {
      let jarvisReplyText = "I have analyzed your request against live order flow and screen telemetry.";
      let recAction = undefined;

      if (text.toLowerCase().includes('risk') || text.toLowerCase().includes('position')) {
        jarvisReplyText = "Your current portfolio risk is well within limits (0.94% equity). You have 3 open positions (XAU/USD, EUR/USD, BTC/USD). Gold is currently in +$1,660 profit. I suggest keeping trailing stop active at 2,638.00.";
        recAction = "Hold and Trail Stop";
      } else if (text.toLowerCase().includes('gold') || text.toLowerCase().includes('xau')) {
        jarvisReplyText = "On XAU/USD M15: Liquidity sweep of Asian low (2,624.10) is fully confirmed. Price has mitigated the 2,636.50 FVG. Institutional order flow shows +4,200 positive delta contracts. High probability continuation toward 2,660.00.";
        recAction = "Long Bias (Target 2660.00)";
      } else if (text.toLowerCase().includes('psychology') || text.toLowerCase().includes('tilt')) {
        jarvisReplyText = "Psychological audit is clean. Discipline score is 96/100, zero revenge trades detected over the past 4 sessions. You are trading strictly inside your designated London/NY killzones.";
        recAction = "Optimal State (Keep Trading)";
      } else {
        jarvisReplyText = `Screen Telemetry confirms active alignment on ${telemetry.activePair}. Neural confidence is ${telemetry.confidence}%. No adverse structural shifts detected on lower timeframes.`;
      }

      const jarvisReply: JarvisMessage = {
        id: `MSG-${Date.now() + 1}`,
        sender: 'jarvis',
        text: jarvisReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: {
          confidence: 98.2,
          recommendedAction: recAction,
        },
        suggestions: [
          'Audit current risk & open positions',
          'Analyze XAU/USD M15 chart setup',
          'Review today’s trading psychology'
        ]
      };

      setMessages((prev) => [...prev, jarvisReply]);
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <section id="jarvis" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-3">
            <Bot className="w-3.5 h-3.5" />
            <span>MODULE 05 • SCREEN-AWARE DESKTOP CO-PILOT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ASHFX Jarvis Multimodal AI
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
            Real-time computer vision scans your desktop trading screen at 60 FPS, recognizing institutional setups, fair value gaps, and liquidity sweeps instantly.
          </p>
        </div>

        <div className="liquid-glass-pill px-4 py-2 border border-blue-500/30 flex items-center gap-3 text-xs self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          <span className="text-slate-300 font-medium">Vision Stream:</span>
          <span className="font-mono text-blue-400 font-bold">60 FPS • 98.4% Confidence</span>
        </div>
      </div>

      {/* Main Grid: Screen Vision HUD + Interactive Co-pilot Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left: Screen Vision Simulated HUD (5 cols) */}
        <div className="lg:col-span-5 liquid-glass-card p-5 border border-blue-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span>Multimodal Screen Vision HUD</span>
              </span>
              <span className="text-[10px] font-mono text-blue-300 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30">
                LIVE CAPTURE
              </span>
            </div>

            {/* Simulated Desktop Chart Screen Capture with Bounding Boxes */}
            <div className="relative rounded-xl overflow-hidden bg-[#030612] border border-white/15 p-3 min-h-[240px] flex flex-col justify-between">
              {/* Top HUD Overlay */}
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span className="text-blue-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  RESOLUTION: 2560x1440 @ 60HZ
                </span>
                <span>VRAM: {telemetry.vramUsage}</span>
              </div>

              {/* Simulated Candlestick backdrop */}
              <div className="my-3 relative h-32 w-full flex items-center justify-center">
                <div className="absolute inset-0 opacity-30 flex items-end justify-between px-4">
                  {[40, 65, 30, 85, 45, 95, 70, 110, 80, 130].map((h, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-0.5 bg-cyan-400" style={{ height: `${h + 20}px` }} />
                      <div className="w-3 bg-cyan-500 rounded-sm -mt-2" style={{ height: `${h}px` }} />
                    </div>
                  ))}
                </div>

                {/* Detected Bounding Box 1 (Liquidity Sweep) */}
                <div className="absolute left-6 top-8 border-2 border-emerald-400/80 bg-emerald-400/10 rounded-lg p-1.5 backdrop-blur-xs text-[10px] font-mono animate-pulse">
                  <span className="text-emerald-300 font-bold block">LIQUIDITY SWEEP</span>
                  <span className="text-slate-300 text-[9px]">Conf: 99.1% • Asian Low</span>
                </div>

                {/* Detected Bounding Box 2 (FVG Void) */}
                <div className="absolute right-8 bottom-4 border-2 border-cyan-400/80 bg-cyan-400/10 rounded-lg p-1.5 backdrop-blur-xs text-[10px] font-mono">
                  <span className="text-cyan-300 font-bold block">FVG VOID (M15)</span>
                  <span className="text-slate-300 text-[9px]">2636.20 - 2638.50</span>
                </div>
              </div>

              {/* Bottom HUD bar */}
              <div className="flex items-center justify-between text-[11px] border-t border-white/10 pt-2 text-slate-300">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Target Setup: Institutional Long
                </span>
                <span className="font-mono text-cyan-300">Coords: [X:1420 Y:890]</span>
              </div>
            </div>

            {/* Audio Waveform Simulator */}
            <div className="mt-4 p-3 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Volume2 className="w-4 h-4 text-blue-400" />
                <span>Voice Neural Synthesizer:</span>
              </div>
              <div className="flex items-center gap-1 h-5">
                {[12, 18, 8, 22, 16, 26, 14, 20, 10, 16].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full animate-pulse"
                    style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Proactive Alerts List */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Proactive HUD Alerts
            </h4>
            <div className="space-y-2">
              {alerts.slice(0, 2).map((a) => (
                <div key={a.id} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {a.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{a.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Interactive Co-pilot Chat Terminal (7 cols) */}
        <div className="lg:col-span-7 liquid-glass-card p-5 border border-white/10 flex flex-col justify-between min-h-[480px]">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Jarvis Neural Co-pilot</h3>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Online & Context-Aware
                  </span>
                </div>
              </div>

              <span className="text-[11px] font-mono text-slate-400">Model: Gemini 1.5 Flash Vision</span>
            </div>

            {/* Chat Thread */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                        : 'bg-white/[0.05] border border-white/10 text-slate-200 rounded-bl-none shadow-inner'
                    }`}
                  >
                    <p>{m.text}</p>

                    {m.metadata?.recommendedAction && (
                      <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-2 text-[11px]">
                        <span className="text-blue-300 font-semibold">Recommended Action:</span>
                        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-200 font-bold font-mono">
                          {m.metadata.recommendedAction}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 mt-1 px-1">{m.timestamp}</span>
                </div>
              ))}

              {isAnalyzing && (
                <div className="flex items-center gap-2 text-xs text-blue-400 font-mono py-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  Jarvis is analyzing screen buffer & order flow...
                </div>
              )}
            </div>
          </div>

          {/* Bottom Prompt Controls */}
          <div className="mt-4 pt-3 border-t border-white/10">
            {/* Quick Suggestion Pills */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {[
                'Audit current risk & open positions',
                'Analyze XAU/USD M15 chart setup',
                'Review today’s trading psychology'
              ].map((sugg) => (
                <button
                  key={sugg}
                  onClick={() => handleSendMessage(sugg)}
                  className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] text-slate-300 transition-colors cursor-pointer"
                >
                  {sugg}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask Jarvis to audit risk, analyze chart, or verify setup..."
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
              />
              <button
                onClick={() => handleSendMessage()}
                className="btn-liquid-primary !bg-blue-500 text-white !py-2.5 !px-4 text-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
