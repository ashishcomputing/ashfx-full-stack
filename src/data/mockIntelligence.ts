import { AgentDebateMessage, SwarmConsensus } from '../types';

export const agentProfiles = [
  {
    role: 'Macro Economist',
    title: 'Dr. Evelyn Vance — Global Macro & Rates Desk',
    avatarColor: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500/30',
    specialty: 'Yield Curves, CPI, FOMC FedWatch, Geopolitics',
    model: 'Gemini 1.5 Pro (Deep Macro)',
  },
  {
    role: 'Sentiment Swarm',
    title: 'Nexus-7 — Crowd Psychology & Liquidation Radar',
    avatarColor: 'from-pink-500 to-rose-600',
    borderColor: 'border-pink-500/30',
    specialty: 'X/Twitter Sentiment, Order Book Heatmaps, Funding Rates',
    model: 'Swarm Cluster (100+ Micro-LLMs)',
  },
  {
    role: 'Technical Quant',
    title: 'Cipher-K — Algorithmic Market Structure',
    avatarColor: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500/30',
    specialty: 'Order Flow Delta, Fair Value Gaps, POI Registry, Footprint',
    model: 'ASHFX Quant Neural Net v4',
  },
  {
    role: 'Adversarial Risk',
    title: 'Marcus Thorne — Chief Risk Governor & Devil’s Advocate',
    avatarColor: 'from-purple-500 to-indigo-600',
    borderColor: 'border-purple-500/30',
    specialty: 'Stress Testing, Black Swans, Correlation Spikes, VaR',
    model: 'Adversarial Red Team Model',
  },
  {
    role: 'Execution Arbiter',
    title: 'Aegis Core — Institutional Consensus Engine',
    avatarColor: 'from-emerald-400 to-teal-600',
    borderColor: 'border-emerald-400/30',
    specialty: 'Synthesis, Mathematical Expectancy, Dynamic Kelly Sizing',
    model: 'Multi-Agent Weighted Arbiter',
  },
];

export const liveDebateMessages: AgentDebateMessage[] = [
  {
    id: 'DBT-01',
    agent: 'Macro Economist',
    avatarColor: '#f59e0b',
    verdict: 'BULLISH',
    confidence: 89,
    timestamp: '11:35:10',
    rationale: 'US 10-Year Treasury Yields retreated 4 bps following cooler-than-expected PPI print. Real yields declining provides strong fundamental tailwind for Gold and EUR upside. Macro environment is decisively risk-on for precious metals.',
    metrics: [
      { label: 'US10Y Yield', value: '3.68% (-4 bps)' },
      { label: 'DXY Index', value: '100.42 (-0.35%)' },
      { label: 'Rate Cut Odds', value: '87.5% for 50 bps' },
    ],
  },
  {
    id: 'DBT-02',
    agent: 'Sentiment Swarm',
    avatarColor: '#f43f5e',
    verdict: 'BULLISH',
    confidence: 93,
    timestamp: '11:35:32',
    rationale: 'Retail positioning on Gold currently sits at 76% short across top broker feeds. Liquidation cluster above 4,360.00 represents $142M in short stop-loss orders. Market makers have massive liquidity incentive to squeeze shorts higher.',
    metrics: [
      { label: 'Retail Ratio', value: '76% Short / 24% Long' },
      { label: 'Short Liquidations', value: '$142.4M at 4360.0' },
      { label: 'Sentiment Index', value: 'Extreme Fear (Shorts trapped)' },
    ],
  },
  {
    id: 'DBT-03',
    agent: 'Technical Quant',
    avatarColor: '#00f2fe',
    verdict: 'BULLISH',
    confidence: 95,
    timestamp: '11:36:01',
    rationale: 'Confirmed clean liquidity sweep of Asian session low (4,315.00) followed by 5M/15M Market Structure Shift. Clear Fair Value Gap imbalance printed between 4,324.50 - 4,328.00 with heavy positive delta (+4,200 contracts). Conflux score 96/100.',
    metrics: [
      { label: 'Conflux Score', value: '96 / 100 (Exceptional)' },
      { label: 'Cumulative Delta', value: '+4,210 Bullish Imbalance' },
      { label: 'OTE Discount', value: '0.705 Golden Pocket Hit' },
    ],
  },
  {
    id: 'DBT-04',
    agent: 'Adversarial Risk',
    avatarColor: '#a855f7',
    verdict: 'CAUTION',
    confidence: 84,
    timestamp: '11:36:45',
    rationale: 'Adversarial check: 1) London fixing at 15:00 UTC could cause brief 8-point whipsaw. 2) Correlation between XAU and US30 is temporarily elevated (0.82). If we execute, max risk must not exceed 1.0% equity ($1,250) and stop loss must strictly remain below 4,305.00 sweep low.',
    metrics: [
      { label: 'Max VaR (99%)', value: '$1,250 (1.0% Equity)' },
      { label: 'Correlation Risk', value: 'Elevated (0.82 vs US30)' },
      { label: 'Veto Status', value: 'PASSED WITH SIZING RESTRICTION' },
    ],
  },
  {
    id: 'DBT-05',
    agent: 'Execution Arbiter',
    avatarColor: '#00f5a0',
    verdict: 'BULLISH',
    confidence: 92,
    timestamp: '11:37:12',
    rationale: 'CONSENSUS REACHED: 4-to-1 Strong Bullish alignment. Macro tailwind confirmed, retail liquidity squeeze ripe, institutional order flow validated. Adversarial risk constraints incorporated: Recommended position size adjusted to 2.0 Lots with 4,305.00 Stop Loss and 4,375.00 Take Profit (1:3.4 R:R). Routing to MT5 Bridge.',
    metrics: [
      { label: 'Final Consensus', value: '92.4% STRONG BUY' },
      { label: 'Approved Size', value: '2.00 Lots ($1,250 Risk)' },
      { label: 'Projected Expectancy', value: '+3.4 R ($4,250 Profit)' },
    ],
  },
];

export const swarmConsensusData: SwarmConsensus = {
  symbol: 'XAU/USD',
  timeframe: 'M15',
  consensusVerdict: 'STRONG BUY',
  overallConfidence: 92.4,
  aggregateRiskScore: 18.5, // 0-100 (lower is safer)
  recommendedLotSize: 2.0,
  adversarialVeto: false,
  timestamp: 'Just now',
};
