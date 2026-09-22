import React, { useEffect, useRef } from 'react';

interface Candle {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  isBullish: boolean;
}

export const LiquidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for quant crosshair & subtle spotlight
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    // Generate initial procedural candlestick series
    const candleWidth = 9;
    const candleSpacing = 16;
    const candleCount = Math.ceil(width / candleSpacing) + 30;
    
    let basePrice = 85200;
    const candles: Candle[] = [];

    // Pre-populate realistic price action
    for (let i = 0; i < candleCount; i++) {
      const delta = (Math.random() - 0.48) * 85;
      const open = basePrice;
      const close = open + delta;
      const high = Math.max(open, close) + Math.random() * 45;
      const low = Math.min(open, close) - Math.random() * 45;
      const volume = 20 + Math.random() * 80;
      const isBullish = close >= open;

      candles.push({
        x: i * candleSpacing,
        open,
        close,
        high,
        low,
        volume,
        isBullish,
      });

      basePrice = close;
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        spotlightRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Financial horizontal support & resistance levels
    const levels = [
      { price: '85,850.00', label: 'RESISTANCE [R2]', yRatio: 0.22, color: 'rgba(244, 63, 94, 0.18)' },
      { price: '85,420.00', label: 'INSTITUTIONAL POI [VWAP]', yRatio: 0.45, color: 'rgba(0, 242, 254, 0.22)' },
      { price: '85,050.00', label: 'SUPPORT [S1]', yRatio: 0.68, color: 'rgba(16, 185, 129, 0.18)' },
    ];

    let scrollOffset = 0;
    const scrollSpeed = 0.25; // Gentle, soothing drifting speed

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // 1. Draw subtle financial Cartesian grid (TradingView / Bloomberg terminal style)
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;

      // Vertical grid lines (time intervals)
      const gridSpacingX = 80;
      for (let x = 0; x < width; x += gridSpacingX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal grid lines (price intervals)
      const gridSpacingY = 70;
      for (let y = 0; y < height; y += gridSpacingY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Draw Horizontal S/R Quant Levels with subtle labels
      ctx.save();
      for (const lvl of levels) {
        const y = height * lvl.yRatio;

        // Dashed level line
        ctx.strokeStyle = lvl.color;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Price badge on right margin
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = lvl.color.replace('0.18', '0.45').replace('0.22', '0.55');
        ctx.textAlign = 'right';
        ctx.fillText(`${lvl.label} • ${lvl.price}`, width - 24, y - 6);
      }
      ctx.restore();

      // 3. Render Subtle Procedural Candlesticks & Volume
      if (!prefersReducedMotion) {
        scrollOffset += scrollSpeed;
      }

      // Find min and max price to scale cleanly into middle third of viewport
      let minPrice = Infinity;
      let maxPrice = -Infinity;
      for (const c of candles) {
        if (c.low < minPrice) minPrice = c.low;
        if (c.high > maxPrice) maxPrice = c.high;
      }
      const priceRange = Math.max(100, maxPrice - minPrice);
      const chartTop = height * 0.22;
      const chartHeight = height * 0.52;

      const priceToY = (price: number) => {
        return chartTop + (1 - (price - minPrice) / priceRange) * chartHeight;
      };

      // Moving Average line points
      const maPoints: { x: number; y: number }[] = [];

      ctx.save();
      for (let i = 0; i < candles.length; i++) {
        const c = candles[i];
        const screenX = c.x - (scrollOffset % (candleCount * candleSpacing));
        
        // Wrap around seamlessly
        const adjustedX = screenX < -candleSpacing ? screenX + candleCount * candleSpacing : screenX;
        if (adjustedX < -candleSpacing || adjustedX > width + candleSpacing) continue;

        const openY = priceToY(c.open);
        const closeY = priceToY(c.close);
        const highY = priceToY(c.high);
        const lowY = priceToY(c.low);

        const isBull = c.isBullish;
        const color = isBull ? 'rgba(16, 185, 129, ' : 'rgba(244, 63, 94, ';
        const candleOpacity = 0.14; // Subtle, elegant, non-distracting

        // 3a. Draw High/Low Wick
        ctx.strokeStyle = `${color}${candleOpacity * 1.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(adjustedX, highY);
        ctx.lineTo(adjustedX, lowY);
        ctx.stroke();

        // 3b. Draw Candle Body
        const topY = Math.min(openY, closeY);
        const bodyHeight = Math.max(2, Math.abs(closeY - openY));

        ctx.fillStyle = `${color}${candleOpacity})`;
        ctx.fillRect(adjustedX - candleWidth / 2, topY, candleWidth, bodyHeight);

        // Candle border for crisp definition
        ctx.strokeStyle = `${color}${candleOpacity * 1.5})`;
        ctx.strokeRect(adjustedX - candleWidth / 2, topY, candleWidth, bodyHeight);

        // 3c. Draw Faint Volume Bars at bottom
        const volHeight = (c.volume / 100) * 48;
        ctx.fillStyle = `${color}${candleOpacity * 0.5})`;
        ctx.fillRect(adjustedX - candleWidth / 2, height - volHeight - 20, candleWidth, volHeight);

        // Store for Moving Average
        if (i % 2 === 0) {
          maPoints.push({ x: adjustedX, y: (openY + closeY) / 2 });
        }
      }

      // 3d. Draw Subtle Fast Trend Curve (EMA)
      if (maPoints.length > 2) {
        maPoints.sort((a, b) => a.x - b.x);
        ctx.beginPath();
        ctx.moveTo(maPoints[0].x, maPoints[0].y);
        for (let i = 1; i < maPoints.length; i++) {
          ctx.lineTo(maPoints[i].x, maPoints[i].y);
        }
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.12)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.restore();

      // 4. Draw Quant Cursor Crosshairs & Coordinate Chip
      if (mouse.active && mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
        ctx.save();

        // Hairline Crosshair (horizontal & vertical)
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.16)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);

        // Horizontal Line
        ctx.beginPath();
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(width, mouse.y);
        ctx.stroke();

        // Vertical Line
        ctx.beginPath();
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, height);
        ctx.stroke();

        ctx.setLineDash([]);

        // Small Quant Coordinate Chip near cursor
        const chipX = Math.min(width - 140, mouse.x + 14);
        const chipY = Math.max(25, mouse.y - 12);
        
        ctx.fillStyle = 'rgba(7, 11, 25, 0.85)';
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.3)';
        ctx.lineWidth = 1;
        
        // Chip background
        ctx.beginPath();
        ctx.roundRect(chipX, chipY - 14, 115, 20, 4);
        ctx.fill();
        ctx.stroke();

        // Chip coordinate text
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = '#00f2fe';
        ctx.textAlign = 'left';
        const simulatedPrice = (85000 + (1 - mouse.y / height) * 1000).toFixed(2);
        ctx.fillText(`PX: $${simulatedPrice}`, chipX + 8, chipY);

        ctx.restore();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030611]">
      {/* Stock Market Candlestick & Financial Grid Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle Quant Spotlight (Smooth cursor follower for high-end feel) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 -ml-72 -mt-72 w-[576px] h-[576px] rounded-full pointer-events-none transition-opacity duration-300 opacity-0 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.06) 0%, rgba(16, 185, 129, 0.03) 45%, transparent 70%)',
          filter: 'blur(40px)',
          willChange: 'transform',
        }}
      />

      {/* Ambient Vignette Overlay to ensure text readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(3, 6, 17, 0.75) 100%)'
        }}
      />

      {/* Subtle Top & Bottom Gradient Dimmers */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#030611] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#030611] to-transparent pointer-events-none" />
    </div>
  );
};
