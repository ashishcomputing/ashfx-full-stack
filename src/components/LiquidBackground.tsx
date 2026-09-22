import React, { useEffect, useRef } from 'react';

export const LiquidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Liquid glowing blobs
    const blobs = [
      { x: width * 0.2, y: height * 0.25, r: 280, dx: 0.35, dy: 0.25, color: 'rgba(0, 242, 254, 0.12)' },
      { x: width * 0.8, y: height * 0.35, r: 340, dx: -0.28, dy: 0.3, color: 'rgba(168, 85, 247, 0.10)' },
      { x: width * 0.5, y: height * 0.7, r: 380, dx: 0.2, dy: -0.25, color: 'rgba(0, 114, 255, 0.11)' },
      { x: width * 0.15, y: height * 0.85, r: 260, dx: 0.3, dy: -0.2, color: 'rgba(0, 245, 160, 0.08)' },
    ];

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render each glowing blob with radial gradient
      for (const b of blobs) {
        if (!prefersReducedMotion) {
          b.x += b.dx;
          b.y += b.dy;

          if (b.x < -100 || b.x > width + 100) b.dx *= -1;
          if (b.y < -100 || b.y > height + 100) b.dy *= -1;
        }

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Canvas Blobs */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* Subtle Liquid Glass Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035]" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Top Ambient Highlight */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#00f2fe]/[0.07] via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
