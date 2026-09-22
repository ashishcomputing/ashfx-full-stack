import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sliders, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  RefreshCw,
  Clock,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Instrument, Position, AccountSummary } from '../../types';
import { initialPositions, initialAccount } from '../../data/mockBroker';
import { useLivePrices } from '../../context/LivePriceContext';

export const BrokerSection: React.FC = () => {
  const { instruments, getInstrument } = useLivePrices();
  const [selectedSymbol, setSelectedSymbol] = useState<string>('XAU/USD');
  const [timeframe, setTimeframe] = useState<string>('15M');
  const [positions, setPositions] = useState<Position[]>(initialPositions);
  const [account, setAccount] = useState<AccountSummary>(initialAccount);
  const [lots, setLots] = useState<number>(1.0);
  const [orderNotification, setOrderNotification] = useState<string | null>(null);

  const currentInstrument = instruments.find((i) => i.symbol === selectedSymbol) || instruments[0];

  // Dynamically calculate live PnL for each open position based on real-time market prices
  const livePositions = positions.map((pos) => {
    const inst = getInstrument(pos.symbol);
    if (!inst) return pos;
    const currentPrice = pos.type === 'BUY' ? inst.bid : inst.ask;
    let pnl = 0;
    if (pos.symbol === 'XAU/USD') {
      pnl = (currentPrice - pos.openPrice) * pos.lots * 100 * (pos.type === 'BUY' ? 1 : -1);
    } else if (pos.symbol === 'EUR/USD' || pos.symbol === 'GBP/USD') {
      pnl = (currentPrice - pos.openPrice) * pos.lots * 100000 * (pos.type === 'BUY' ? 1 : -1);
    } else {
      pnl = (currentPrice - pos.openPrice) * pos.lots * (pos.type === 'BUY' ? 1 : -1);
    }
    return { ...pos, currentPrice, pnl: parseFloat(pnl.toFixed(2)) };
  });

  const totalFloatingPnl = livePositions.reduce((acc, p) => acc + p.pnl, 0);
  const currentEquity = account.balance + totalFloatingPnl;

  const handlePlaceOrder = (type: 'BUY' | 'SELL') => {
    const executionPrice = type === 'BUY' ? currentInstrument.ask : currentInstrument.bid;
    const newPosition: Position = {
      id: `POS-${Math.floor(1000 + Math.random() * 9000)}`,
      symbol: currentInstrument.symbol,
      type,
      lots,
      openPrice: executionPrice,
      currentPrice: executionPrice,
      sl: type === 'BUY' ? executionPrice * 0.995 : executionPrice * 1.005,
      tp: type === 'BUY' ? executionPrice * 1.015 : executionPrice * 0.985,
      pnl: 0,
      openTime: new Date().toLocaleTimeString(),
    };

    setPositions([newPosition, ...positions]);

    // Deduct margin
    const marginRequired = (executionPrice * lots * 100) / 2000;
    setAccount((prev) => ({
      ...prev,
      margin: prev.margin + marginRequired,
      freeMargin: prev.freeMargin - marginRequired,
    }));

    // Trigger celebratory confetti
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: type === 'BUY' ? ['#00f2fe', '#00f5a0', '#ffffff'] : ['#f43f5e', '#fb7185', '#ffffff']
    });

    setOrderNotification(`Executed ${type} ${lots} Lots on ${currentInstrument.symbol} @ ${executionPrice} (Fill: 11.4ms)`);
    setTimeout(() => setOrderNotification(null), 4000);
  };

  const handleClosePosition = (id: string) => {
    const pos = positions.find((p) => p.id === id);
    if (!pos) return;

    setPositions(positions.filter((p) => p.id !== id));
    setAccount((prev) => ({
      ...prev,
      balance: prev.balance + pos.pnl,
      equity: prev.equity + pos.pnl,
      margin: Math.max(0, prev.margin - 800),
      freeMargin: prev.freeMargin + 800 + pos.pnl,
    }));
  };

  return (
    <section id="broker" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>PRODUCT 01 • RAW 0.0 ECN PRIME BROKERAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Institutional ECN Prime Brokerage Platform
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
            Direct Tier-1 bank liquidity aggregation with raw 0.0 pip spreads, ultra-low 11.8ms execution, zero requotes, and institutional market depth across 600+ instruments.
          </p>
        </div>

        {/* Account Quick Status Badge */}
        <div className="liquid-glass-pill px-4 py-2 border border-white/10 flex items-center gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">BALANCE</span>
            <span className="font-mono font-bold text-white">${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div>
            <span className="text-slate-400 block text-[10px]">LIVE EQUITY</span>
            <span className={`font-mono font-bold ${totalFloatingPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              ${currentEquity.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div>
            <span className="text-slate-400 block text-[10px]">LEVERAGE</span>
            <span className="font-mono font-semibold text-cyan-400">{account.leverage}</span>
          </div>
        </div>
      </div>

      {/* Main Terminal Liquid Glass Frame */}
      <div className="liquid-glass-card p-4 sm:p-6 border border-cyan-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {/* Top bar: Asset selector + Timeframe pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {instruments.map((inst) => (
              <button
                key={inst.symbol}
                onClick={() => setSelectedSymbol(inst.symbol)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  selectedSymbol === inst.symbol
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                    : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                <span>{inst.symbol}</span>
                <span className={`text-[10px] font-mono ${inst.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {inst.change24h >= 0 ? '+' : ''}{inst.change24h}%
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
            {['1M', '5M', '15M', '1H', '4H', '1D'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                  timeframe === tf
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(0,242,254,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Middle: Interactive Chart + Order Placement Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
          {/* Chart Display (2 cols) */}
          <div className="lg:col-span-2 bg-[#050816]/90 rounded-2xl p-4 sm:p-5 border border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[320px]">
            {/* Chart Top Info */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-white font-mono">{currentInstrument.symbol}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/[0.08] text-slate-300 font-mono">
                    Spread: {currentInstrument.spread} pips
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-2xl font-bold font-mono transition-colors duration-200 ${
                    currentInstrument.tickDirection === 'up'
                      ? 'text-emerald-400'
                      : currentInstrument.tickDirection === 'down'
                      ? 'text-rose-400'
                      : 'text-cyan-400'
                  }`}>
                    ${currentInstrument.bid.toLocaleString(undefined, {
                      minimumFractionDigits: currentInstrument.decimals,
                      maximumFractionDigits: currentInstrument.decimals,
                    })}
                  </span>
                  {currentInstrument.tickDirection === 'up' && (
                    <span className="text-emerald-400 text-xs font-mono font-bold flex items-center">▲</span>
                  )}
                  {currentInstrument.tickDirection === 'down' && (
                    <span className="text-rose-400 text-xs font-mono font-bold flex items-center">▼</span>
                  )}
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    REAL-TIME
                  </span>
                </div>
              </div>
              <div className="text-right text-xs text-slate-400">
                <div>24h High: <span className="text-white font-mono">${currentInstrument.high24h.toLocaleString(undefined, { minimumFractionDigits: currentInstrument.decimals })}</span></div>
                <div>24h Low: <span className="text-white font-mono">${currentInstrument.low24h.toLocaleString(undefined, { minimumFractionDigits: currentInstrument.decimals })}</span></div>
              </div>
            </div>

            {/* Simulated Live SVG Interactive Candlestick / Area Chart */}
            <div className="h-44 w-full my-4 relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area under curve */}
                <path
                  d="M0,85 Q60,40 120,65 T240,30 T360,50 T440,20 T500,35 L500,120 L0,120 Z"
                  fill="url(#chartGrad)"
                />
                {/* Main line curve */}
                <path
                  d="M0,85 Q60,40 120,65 T240,30 T360,50 T440,20 T500,35"
                  fill="none"
                  stroke="#00f2fe"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Simulated candlesticks */}
                <g opacity="0.8">
                  <line x1="80" y1="45" x2="80" y2="85" stroke="#00f5a0" strokeWidth="1" />
                  <rect x="76" y="55" width="8" height="20" fill="#00f5a0" rx="1" />

                  <line x1="160" y1="35" x2="160" y2="75" stroke="#f43f5e" strokeWidth="1" />
                  <rect x="156" y="45" width="8" height="18" fill="#f43f5e" rx="1" />

                  <line x1="240" y1="20" x2="240" y2="60" stroke="#00f5a0" strokeWidth="1" />
                  <rect x="236" y="25" width="8" height="22" fill="#00f5a0" rx="1" />

                  <line x1="320" y1="30" x2="320" y2="70" stroke="#00f5a0" strokeWidth="1" />
                  <rect x="316" y="38" width="8" height="15" fill="#00f5a0" rx="1" />

                  <line x1="400" y1="15" x2="400" y2="55" stroke="#00f5a0" strokeWidth="1" />
                  <rect x="396" y="20" width="8" height="25" fill="#00f5a0" rx="1" />
                </g>
                {/* Current price marker dot */}
                <circle cx="500" cy="35" r="4" fill="#00f2fe" className="animate-ping" />
                <circle cx="500" cy="35" r="4" fill="#ffffff" />
              </svg>

              {/* Price Crosshair level */}
              <div className="absolute top-[35px] inset-x-0 border-b border-dashed border-cyan-400/40 pointer-events-none flex justify-end">
                <span className="bg-cyan-500 text-black text-[10px] font-mono font-bold px-1.5 py-0.5 rounded -translate-y-1/2">
                  ${currentInstrument.bid}
                </span>
              </div>
            </div>

            {/* Chart footer */}
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-3">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live LD4 Equinix Datafeed
              </span>
              <span className="font-mono">Timezone: UTC+0 • Volume: 142.8M</span>
            </div>
          </div>

          {/* Order Placement Box (1 col) */}
          <div className="liquid-glass rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Instant ECN Execution
                </span>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                  12ms Fill
                </span>
              </div>

              {/* Lot size selector */}
              <div className="mb-4">
                <label className="text-xs text-slate-400 flex items-center justify-between mb-1.5">
                  <span>Order Volume (Lots)</span>
                  <span className="font-mono text-white font-semibold">{lots} Lots</span>
                </label>
                <div className="grid grid-cols-4 gap-1.5 mb-2">
                  {[0.1, 0.5, 1.0, 2.0].map((val) => (
                    <button
                      key={val}
                      onClick={() => setLots(val)}
                      className={`py-1 rounded-lg text-xs font-mono transition-all ${
                        lots === val
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold'
                          : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/10'
                      }`}
                    >
                      {val} L
                    </button>
                  ))}
                </div>
              </div>

              {/* Target SL / TP estimations */}
              <div className="bg-black/30 rounded-xl p-3 border border-white/10 mb-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Est. Margin Required:</span>
                  <span className="font-mono text-white font-medium">${((currentInstrument.bid * lots * 100) / 2000).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Pip Value (1.0 Pip):</span>
                  <span className="font-mono text-white font-medium">${(lots * 10).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Slippage Protection:</span>
                  <span className="font-mono text-emerald-400 font-medium">Active (0.8 pips max)</span>
                </div>
              </div>

              {/* Notification Banner if order placed */}
              {orderNotification && (
                <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span className="font-medium">{orderNotification}</span>
                </div>
              )}
            </div>

            {/* Buy & Sell Execution Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handlePlaceOrder('SELL')}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-500 text-white font-bold text-sm shadow-[0_4px_16px_rgba(244,63,94,0.4)] hover:brightness-110 active:scale-98 transition-all flex flex-col items-center justify-center cursor-pointer"
              >
                <span className="text-[11px] font-medium text-rose-200 uppercase tracking-wider">SELL (Bid)</span>
                <span className="font-mono text-base font-extrabold">${currentInstrument.bid}</span>
              </button>

              <button
                onClick={() => handlePlaceOrder('BUY')}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-black font-bold text-sm shadow-[0_4px_16px_rgba(0,242,254,0.4)] hover:brightness-110 active:scale-98 transition-all flex flex-col items-center justify-center cursor-pointer"
              >
                <span className="text-[11px] font-medium text-slate-900 uppercase tracking-wider">BUY (Ask)</span>
                <span className="font-mono text-base font-extrabold">${currentInstrument.ask}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom: Open Positions Table */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Live Open Positions ({livePositions.length})</span>
            </h4>
            <span className="text-xs text-slate-400 font-mono">
              Total Unrealized PnL:{' '}
              <strong className={totalFloatingPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {totalFloatingPnl >= 0 ? '+' : ''}${totalFloatingPnl.toFixed(2)}
              </strong>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-slate-400 font-semibold">
                  <th className="pb-2">ID</th>
                  <th className="pb-2">Symbol</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Lots</th>
                  <th className="pb-2">Open Price</th>
                  <th className="pb-2">Live Price</th>
                  <th className="pb-2">Floating PnL</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] font-mono">
                {livePositions.map((pos) => {
                  const inst = getInstrument(pos.symbol);
                  const decimals = inst?.decimals ?? 2;
                  return (
                    <tr key={pos.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-2.5 text-slate-400 font-normal">{pos.id}</td>
                      <td className="py-2.5 font-bold text-white font-sans">{pos.symbol}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          pos.type === 'BUY' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}>
                          {pos.type}
                        </span>
                      </td>
                      <td className="py-2.5 text-slate-300">{pos.lots.toFixed(2)}</td>
                      <td className="py-2.5 text-slate-300">
                        ${pos.openPrice.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
                      </td>
                      <td className="py-2.5 text-white font-bold">
                        ${pos.currentPrice.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
                      </td>
                      <td className={`py-2.5 font-bold ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toFixed(2)}
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          onClick={() => handleClosePosition(pos.id)}
                          className="px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors text-[11px] cursor-pointer"
                        >
                          Close
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
