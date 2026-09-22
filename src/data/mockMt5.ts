import { BridgeStatus, EaParameter, BridgeLog } from '../types';

export const initialBridgeStatus: BridgeStatus = {
  connected: true,
  pingMs: 0.42,
  bridgeProtocol: 'ZeroMQ IPC / WebSockets',
  activeEaCount: 4,
  totalOrdersRouted: 1429,
  executionLatencyMs: 11.8,
  lastHeartbeat: '0.2s ago (Active)',
  terminalVersion: 'MetaTrader 5 Build 4450 (x64)',
  slippageAverage: '0.04 pips',
};

export const eaParameters: EaParameter[] = [
  {
    name: 'Auto Risk Lot Sizer',
    value: '1.0% Equity per trade',
    desc: 'Calculates exact lot size based on stop loss distance and live balance.',
    category: 'Risk',
  },
  {
    name: 'Max Daily Drawdown Cap',
    value: '4.0% ($5,019.22)',
    desc: 'Hard circuit breaker terminates all open orders and halts trading if reached.',
    category: 'Risk',
  },
  {
    name: 'Slippage Guard Threshold',
    value: '0.8 pips Max',
    desc: 'Rejects order fill if execution slippage exceeds institutional tolerance.',
    category: 'Execution',
  },
  {
    name: 'High-Impact News Blackout',
    value: 'Enabled (±15 min NFP/CPI/FOMC)',
    desc: 'Suspends new EA orders during red folder events and tightens protective stops.',
    category: 'Filters',
  },
  {
    name: 'Dynamic Breakeven & Trailing',
    value: 'Trigger at +1.5R, Trail at 0.5R',
    desc: 'Automatically moves stop loss into profit once initial target milestone is reached.',
    category: 'Execution',
  },
  {
    name: 'Magic Number Protocol',
    value: '892401',
    desc: 'Unique identifier tagging orders routed specifically by ASHFX Conflux Engine.',
    category: 'General',
  },
];

export const initialBridgeLogs: BridgeLog[] = [
  {
    id: 'LOG-551',
    timestamp: '11:42:01.402',
    type: 'ORDER_EXECUTION',
    message: 'ORDER_SEND BUY XAU/USD 2.00 Lots @ 2642.50 | Fill Latency: 11.2ms | Slippage: 0.00 pips',
    status: 'success',
  },
  {
    id: 'LOG-550',
    timestamp: '11:40:15.110',
    type: 'HEARTBEAT',
    message: 'IPC Ping [ZeroMQ:tcp://127.0.0.1:5555] -> Roundtrip: 0.38ms | Memory: 42MB | EA Alive',
    status: 'info',
  },
  {
    id: 'LOG-549',
    timestamp: '11:38:22.880',
    type: 'SLIPPAGE_GUARD',
    message: 'Slippage Check: EUR/USD Request 1.08420 vs Fill 1.08421 (Diff: +0.1 pip) -> PASSED',
    status: 'success',
  },
  {
    id: 'LOG-548',
    timestamp: '11:35:00.001',
    type: 'SYNC',
    message: 'Account Snapshot Synced: Equity $125,480.50 | Open Positions: 3 | Margin Level: 3679.7%',
    status: 'info',
  },
  {
    id: 'LOG-547',
    timestamp: '11:30:12.550',
    type: 'RISK_CAP',
    message: 'Daily Drawdown Monitor: Current -0.12% vs Max -4.00% Limit -> STATUS GREEN',
    status: 'success',
  },
];
