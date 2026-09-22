import React, { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  opacity: number;
  color: string;
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

    // Mouse tracking with spring interpolation
    const mouse = {
      targetX: width / 2,
      targetY: height / 2,
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0,
      isMoving: false,
    };

    let lastMouseX = width / 2;
    let lastMouseY = height / 2;
    let ripples: Ripple[] = [];
    let lastRippleTime = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isMoving = true;

      // Update spotlight position
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        spotlightRef.current.style.opacity = '1';
      }

      // Spawn liquid ripples on mouse movement
      const now = performance.now();
      const dist = Math.hypot(e.clientX - lastMouseX, e.clientY - lastMouseY);
      if (now - lastRippleTime > 60 && dist > 15 && ripples.length < 25) {
        lastRippleTime = now;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        const colors = [
          'rgba(0, 242, 254, ',
          'rgba(79, 172, 254, ',
          'rgba(168, 85, 247, ',
          'rgba(0, 245, 160, ',
        ];
        const chosenColor = colors[Math.floor(Math.random() * colors.length)];

        ripples.push({
          x: e.clientX,
          y: e.clientY,
          r: 8,
          maxR: 90 + Math.random() * 50,
          opacity: 0.35,
          color: chosenColor,
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Create concentrated droplet splash wave
      for (let i = 0; i < 3; i++) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          r: 5 + i * 15,
          maxR: 180 + i * 40,
          opacity: 0.5 - i * 0.1,
          color: i === 0 ? 'rgba(0, 242, 254, ' : i === 1 ? 'rgba(168, 85, 247, ' : 'rgba(0, 245, 160, ',
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);

    // Liquid glowing blobs with viscosity
    const blobs = [
      { x: width * 0.2, y: height * 0.25, baseR: 280, r: 280, dx: 0.35, dy: 0.25, color: 'rgba(0, 242, 254, 0.14)', pullWeight: 0.015 },
      { x: width * 0.8, y: height * 0.35, baseR: 340, r: 340, dx: -0.28, dy: 0.3, color: 'rgba(168, 85, 247, 0.12)', pullWeight: 0.012 },
      { x: width * 0.5, y: height * 0.7, baseR: 380, r: 380, dx: 0.2, dy: -0.25, color: 'rgba(0, 114, 255, 0.13)', pullWeight: 0.018 },
      { x: width * 0.15, y: height * 0.85, baseR: 260, r: 260, dx: 0.3, dy: -0.2, color: 'rgba(0, 245, 160, 0.10)', pullWeight: 0.014 },
    ];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth spring interpolation for mouse
      mouse.vx = (mouse.targetX - mouse.x) * 0.08;
      mouse.vy = (mouse.targetY - mouse.y) * 0.08;
      mouse.x += mouse.vx;
      mouse.y += mouse.vy;

      // Render liquid ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 2.2;
        rp.opacity *= 0.94;

        if (rp.opacity < 0.01 || rp.r > rp.maxR) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `${rp.color}${rp.opacity})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Inner soft glow
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `${rp.color}${rp.opacity * 0.15})`;
        ctx.fill();
        ctx.restore();
      }

      // Render interactive fluid blobs
      for (const b of blobs) {
        if (!prefersReducedMotion) {
          // Autonomous drift
          b.x += b.dx;
          b.y += b.dy;

          // Magnetic liquid pull towards mouse cursor
          const distToMouse = Math.hypot(mouse.x - b.x, mouse.y - b.y);
          if (distToMouse < 600) {
            b.x += (mouse.x - b.x) * b.pullWeight;
            b.y += (mouse.y - b.y) * b.pullWeight;
            // Viscous liquid bulging when close to mouse
            b.r = b.baseR + (1 - distToMouse / 600) * 60;
          } else {
            b.r += (b.baseR - b.r) * 0.05;
          }

          if (b.x < -100 || b.x > width + 100) b.dx *= -1;
          if (b.y < -100 || b.y > height + 100) b.dy *= -1;
        }

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, b.color);
        grad.addColorStop(0.5, b.color.replace('0.', '0.0'));
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Liquid Ripple & Ferrofluid Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />

      {/* Interactive Liquid Glass Spotlight (Smooth cursor follower) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 -ml-64 -mt-64 w-[512px] h-[512px] rounded-full pointer-events-none transition-opacity duration-500 opacity-0 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.12) 0%, rgba(168, 85, 247, 0.08) 40%, transparent 70%)',
          filter: 'blur(30px)',
          willChange: 'transform',
        }}
      />

      {/* Subtle Liquid Glass Perspective Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035]" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Top Ambient Highlight */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#00f2fe]/[0.08] via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
