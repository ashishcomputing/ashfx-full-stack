// ───────────────────────────────────────────────────────────
// ASHFX FULL STACK — Unified Data Models
// ───────────────────────────────────────────────────────────

export type EcosystemModuleId = 
  | 'broker' 
  | 'journal' 
  | 'indicators' 
  | 'mt5' 
  | 'jarvis' 
  | 'intelligence';

export interface EcosystemModuleMeta {
  id: EcosystemModuleId;
  title: string;
  badge: string;
  subtitle: string;
  accentColor: string;
  secondaryColor: string;
  iconName: string;
  summary: string;
  keyMetrics: { label: string; value: string; change?: string }[];
}

// 1. BROKER
export interface Instrument {
  symbol: string;
  name: string;
  category: 'Forex' | 'Metals' | 'Crypto' | 'Indices' | 'Energies';
  bid: number;
  ask: number;
  spread: number;
  change24h: number;
  high24h: number;
  low24h: number;
  leverage: string;
  decimals: number;
}

export interface Position {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  lots: number;
  openPrice: number;
  currentPrice: number;
  sl?: number;
  tp?: number;
  pnl: number;
  openTime: string;
}

export interface AccountSummary {
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  marginLevel: number;
  leverage: string;
  server: string;
  currency: string;
}

// 2. JOURNAL
export interface JournalTrade {
  id: string;
  symbol: string;
  type: 'LONG' | 'SHORT';
  entryDate: string;
  entryPrice: number;
  exitPrice: number;
  size: number;
  pnl: number;
  pnlPercent: number;
  rMultiple: number;
  outcome: 'WIN' | 'LOSS' | 'BE';
  session: 'London' | 'New York' | 'Asian';
  setup: string;
  emotionalState: 'Calm' | 'Disciplined' | 'Excited' | 'Anxious' | 'FOMO' | 'Revenge';
  notes: string;
}

export interface PerformanceStats {
  winRate: number;
  profitFactor: number;
  netPnl: number;
  totalTrades: number;
  avgWin: number;
  avgLoss: number;
  maxDrawdown: number;
  expectancy: number;
}

// 3. INDICATORS & QUANT CONFLUX
export interface ConfluxSignal {
  symbol: string;
  timeframe: string;
  bias: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  score: number;
  state: 'POI_HUNT' | 'SWEEP_DETECTED' | 'MSS_CONFIRMED' | 'OTE_IN_ZONE' | 'TRIGGERED';
  fvgLevel: string;
  sweepLevel: string;
  oteZone: string;
  targetTP: number;
  targetSL: number;
  currentPrice: number;
  updatedAt: string;
}

export interface FsmStage {
  id: number;
  name: string;
  status: 'completed' | 'active' | 'pending';
  desc: string;
  badge: string;
}

// 4. MT5 EA & BRIDGE
export interface BridgeStatus {
  connected: boolean;
  pingMs: number;
  bridgeProtocol: 'ZeroMQ IPC / WebSockets';
  activeEaCount: number;
  totalOrdersRouted: number;
  executionLatencyMs: number;
  lastHeartbeat: string;
  terminalVersion: string;
  slippageAverage: string;
}

export interface EaParameter {
  name: string;
  value: string | number | boolean;
  desc: string;
  category: 'Risk' | 'Execution' | 'Filters' | 'General';
}

export interface BridgeLog {
  id: string;
  timestamp: string;
  type: 'ORDER_EXECUTION' | 'HEARTBEAT' | 'SLIPPAGE_GUARD' | 'RISK_CAP' | 'SYNC';
  message: string;
  status: 'success' | 'warning' | 'info';
}

// 5. JARVIS AI
export interface JarvisTelemetry {
  status: 'ACTIVE_MONITORING' | 'ANALYZING_SCREEN' | 'SYNTHESIZING';
  detectedPatterns: string[];
  activePair: string;
  confidence: number;
  voiceState: 'idle' | 'listening' | 'speaking';
  fps: number;
  vramUsage: string;
}

export interface JarvisAlert {
  id: string;
  timestamp: string;
  priority: 'CRITICAL' | 'HIGH' | 'INFO';
  title: string;
  description: string;
  pair: string;
}

export interface JarvisMessage {
  id: string;
  sender: 'user' | 'jarvis';
  text: string;
  timestamp: string;
  suggestions?: string[];
  metadata?: {
    confidence?: number;
    recommendedAction?: string;
    chartCoords?: string;
  };
}

// 6. INTELLIGENCE AI SWARMS
export type AgentRole = 
  | 'Macro Economist' 
  | 'Sentiment Swarm' 
  | 'Technical Quant' 
  | 'Adversarial Risk' 
  | 'Execution Arbiter';

export interface AgentDebateMessage {
  id: string;
  agent: AgentRole;
  avatarColor: string;
  verdict: 'BULLISH' | 'BEARISH' | 'CAUTION' | 'NEUTRAL';
  confidence: number;
  rationale: string;
  timestamp: string;
  metrics?: { label: string; value: string }[];
}

export interface SwarmConsensus {
  symbol: string;
  timeframe: string;
  consensusVerdict: 'STRONG BUY' | 'BUY' | 'NEUTRAL' | 'SELL' | 'STRONG SELL';
  overallConfidence: number;
  aggregateRiskScore: number;
  recommendedLotSize: number;
  adversarialVeto: boolean;
  timestamp: string;
}
