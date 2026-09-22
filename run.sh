#!/usr/bin/env bash
# ───────────────────────────────────────────────────────────
# ASHFX FULL STACK — Quick Launch Script
# ───────────────────────────────────────────────────────────

set -e
PORT=${PORT:-5178}

echo ""
echo "  ╔═════════════════════════════════════════════════════════════════════╗"
echo "  ║                     ASHFX FULL STACK v1.0.0                         ║"
echo "  ║      Unified Liquid Glass Quantitative Web Architecture             ║"
echo "  ╚═════════════════════════════════════════════════════════════════════╝"
echo ""
echo "  📦 Integrated Modules:"
echo "     1. 🏛️  ASHFX Broker (Next-Gen Multi-Asset ECN)"
echo "     2. 📓  ASHFX Journal (Liquid Glass Behavioral AI & Equity)"
echo "     3. 📊  ASHFX Indicators (Conflux Quant 5-Stage FSM Matrix)"
echo "     4. ⚡  ASHFX MT5 EA (0.42ms ZeroMQ IPC Bridge & Build 4450)"
echo "     5. 🤖  ASHFX Jarvis AI (Screen-Aware 60 FPS Desktop Vision HUD)"
echo "     6. 🧠  ASHFX Intelligence AI (Autonomous 5-Stage Debate Swarm)"
echo ""
echo "  🌐 Launching development server on http://localhost:${PORT}"
echo ""

pnpm run dev -- --port "$PORT" --host
