import { JarvisTelemetry, JarvisAlert, JarvisMessage } from '../types';

export const initialJarvisTelemetry: JarvisTelemetry = {
  status: 'ACTIVE_MONITORING',
  detectedPatterns: [
    'Liquidity Pool Sweep (Asian Low @ 4315.00)',
    'Bullish FVG Displacement (M15 Void 4324-4328)',
    'Order Block Mitigation (Active)',
    'SMT Divergence (EUR vs DXY)'
  ],
  activePair: 'XAU/USD',
  confidence: 98.4,
  voiceState: 'idle',
  fps: 60,
  vramUsage: '1.8 GB / 16 GB (Neural Vision Core)',
};

export const jarvisAlerts: JarvisAlert[] = [
  {
    id: 'ALT-301',
    timestamp: '11:41 AM',
    priority: 'CRITICAL',
    title: 'Institutional Liquidity Raid Complete',
    description: 'Gold cleanly swept 4315.00 liquidity with swift 21-point displacement. High probability OTE long setup forming above 4330.',
    pair: 'XAU/USD',
  },
  {
    id: 'ALT-302',
    timestamp: '11:28 AM',
    priority: 'HIGH',
    title: 'SMT Divergence Confirmed',
    description: 'EUR/USD made higher low at 1.1432 while DXY failed to create lower low. Bearish exhaustion on US Dollar.',
    pair: 'EUR/USD',
  },
  {
    id: 'ALT-303',
    timestamp: '11:05 AM',
    priority: 'INFO',
    title: 'Discipline Audit Passed',
    description: 'Zero revenge trades detected over last 4 sessions. Risk per trade strictly maintained below 1.25%.',
    pair: 'SYSTEM',
  },
];

export const initialJarvisMessages: JarvisMessage[] = [
  {
    id: 'MSG-1',
    sender: 'jarvis',
    text: "Greetings. ASHFX Jarvis AI is online and actively tracking your terminal screen at 60 FPS. I have verified 3 institutional setups across Gold ($4,336.30), Euro (1.14710), and Bitcoin ($85,604). What would you like me to analyze?",
    timestamp: '11:30 AM',
    suggestions: [
      'Audit current risk & open positions',
      'Analyze XAU/USD M15 chart setup',
      'Check MT5 bridge latency & EA status',
      'Review today’s trading psychology'
    ],
  },
  {
    id: 'MSG-2',
    sender: 'user',
    text: "Jarvis, what's our current risk exposure on Gold and should I trail the stop?",
    timestamp: '11:32 AM',
  },
  {
    id: 'MSG-3',
    sender: 'jarvis',
    text: "Analyzing your open XAU/USD position: You entered at 4,324.20 with 2.0 lots. Current live price is 4,336.30 (+12.1 points, +$2,420.00 PnL). I recommend moving your stop to 4,330.00 (locking in +$1,160.00 profit) as price is approaching the 4,350.00 daily liquidity pool.",
    timestamp: '11:32 AM',
    metadata: {
      confidence: 97.8,
      recommendedAction: 'Trail Stop to 4,330.00',
      chartCoords: 'X: 1420, Y: 890 (M15 Breakout)',
    },
    suggestions: [
      'Execute stop move via MT5 EA',
      'Check macro news before London close',
      'View Journal equity trajectory'
    ],
  },
];
