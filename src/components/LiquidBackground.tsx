import React, { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  opacity: number;
  color: string;
}

interface GlassBubble {
  x: number;
  y: number;
  r: number;
  baseR: number;
  vx: number;
  vy: number;
  wobbleSpeed: number;
  wobblePhase: number;
  wobbleAmp: number;
  opacity: number;
  colorTheme: 'cyan' | 'purple' | 'emerald' | 'prismatic';
  specularAngle: number;
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
      speed: 0,
      isMoving: false,
    };

    let lastMouseX = width / 2;
    let lastMouseY = height / 2;
    let lastMoveTime = performance.now();
    let ripples: Ripple[] = [];
    let lastRippleTime = 0;
    let lastBubbleSpawnTime = 0;

    // Initialize fleet of multi-sized Windows theme glass bubbles across the entire viewport
    const bubbles: GlassBubble[] = [];
    const bubbleCount = Math.min(38, Math.floor((width * height) / 38000));
    const sizeTiers = [
      { min: 7, max: 14, weight: 0.35 },    // Tiny
      { min: 18, max: 28, weight: 0.30 },   // Small
      { min: 35, max: 54, weight: 0.20 },   // Medium
      { min: 65, max: 96, weight: 0.12 },   // Large
      { min: 110, max: 145, weight: 0.03 }, // Giant
    ];

    const pickSize = () => {
      const rand = Math.random();
      let cumulative = 0;
      for (const tier of sizeTiers) {
        cumulative += tier.weight;
        if (rand <= cumulative) {
          return tier.min + Math.random() * (tier.max - tier.min);
        }
      }
      return 24;
    };

    const themes: ('cyan' | 'purple' | 'emerald' | 'prismatic')[] = ['cyan', 'purple', 'emerald', 'prismatic'];

    for (let i = 0; i < bubbleCount; i++) {
      const r = pickSize();
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r,
        baseR: r,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(0.35 + Math.random() * 0.85), // natural upward float
        wobbleSpeed: 0.015 + Math.random() * 0.025,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleAmp: 0.4 + Math.random() * 0.8,
        opacity: 0.55 + Math.random() * 0.35,
        colorTheme: themes[Math.floor(Math.random() * themes.length)],
        specularAngle: Math.PI * 1.25, // top-left highlight
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastMoveTime);
      lastMoveTime = now;

      const dist = Math.hypot(e.clientX - lastMouseX, e.clientY - lastMouseY);
      mouse.speed = dist / dt;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isMoving = true;

      // Update cursor follower spotlight position
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        spotlightRef.current.style.opacity = '1';
      }

      // 1. Spawn liquid ripples on fluid motion
      if (now - lastRippleTime > 55 && dist > 14 && ripples.length < 30) {
        lastRippleTime = now;
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
          r: 6,
          maxR: 85 + Math.random() * 55,
          opacity: 0.4,
          color: chosenColor,
        });
      }

      // 2. High-speed mouse trail creates rising micro-bubbles
      if (dist > 30 && now - lastBubbleSpawnTime > 80 && bubbles.length < 55) {
        lastBubbleSpawnTime = now;
        const r = 5 + Math.random() * 9;
        bubbles.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          r,
          baseR: r,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -(0.9 + Math.random() * 1.4),
          wobbleSpeed: 0.04 + Math.random() * 0.04,
          wobblePhase: Math.random() * Math.PI * 2,
          wobbleAmp: 0.8,
          opacity: 0.85,
          colorTheme: themes[Math.floor(Math.random() * themes.length)],
          specularAngle: Math.PI * 1.25,
        });
      }

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleClick = (e: MouseEvent) => {
      // 1. Concentrated droplet splash waves
      for (let i = 0; i < 3; i++) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          r: 5 + i * 15,
          maxR: 180 + i * 40,
          opacity: 0.55 - i * 0.1,
          color: i === 0 ? 'rgba(0, 242, 254, ' : i === 1 ? 'rgba(168, 85, 247, ' : 'rgba(0, 245, 160, ',
        });
      }

      // 2. Click bursts a fountain of multi-sized Windows bubbles
      const burstCount = 6 + Math.floor(Math.random() * 5);
      for (let i = 0; i < burstCount; i++) {
        const r = pickSize();
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3.5;
        bubbles.push({
          x: e.clientX + Math.cos(angle) * 15,
          y: e.clientY + Math.sin(angle) * 15,
          r,
          baseR: r,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5, // bias upwards
          wobbleSpeed: 0.03 + Math.random() * 0.04,
          wobblePhase: Math.random() * Math.PI * 2,
          wobbleAmp: 1.0,
          opacity: 0.9,
          colorTheme: themes[Math.floor(Math.random() * themes.length)],
          specularAngle: Math.PI * 1.25,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);

    // Liquid glowing blobs with viscosity
    const blobs = [
      { x: width * 0.2, y: height * 0.25, baseR: 280, r: 280, dx: 0.3, dy: 0.2, color: 'rgba(0, 242, 254, 0.12)', pullWeight: 0.012 },
      { x: width * 0.8, y: height * 0.35, baseR: 340, r: 340, dx: -0.25, dy: 0.25, color: 'rgba(168, 85, 247, 0.10)', pullWeight: 0.01 },
      { x: width * 0.5, y: height * 0.7, baseR: 380, r: 380, dx: 0.18, dy: -0.22, color: 'rgba(0, 114, 255, 0.11)', pullWeight: 0.015 },
      { x: width * 0.15, y: height * 0.85, baseR: 260, r: 260, dx: 0.25, dy: -0.18, color: 'rgba(0, 245, 160, 0.09)', pullWeight: 0.012 },
    ];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Windows Theme Bubble Renderer with Specular Gloss & Iridescent Rim
    const drawWindowsBubble = (b: GlassBubble) => {
      ctx.save();

      // Outer glassy shadow
      ctx.shadowColor = b.colorTheme === 'cyan' ? 'rgba(0, 242, 254, 0.35)' : b.colorTheme === 'purple' ? 'rgba(168, 85, 247, 0.35)' : 'rgba(0, 245, 160, 0.3)';
      ctx.shadowBlur = b.r * 0.35;

      // 1. Iridescent Spherical Body Gradient
      const grad = ctx.createRadialGradient(
        b.x - b.r * 0.32,
        b.y - b.r * 0.32,
        b.r * 0.05,
        b.x,
        b.y,
        b.r
      );

      if (b.colorTheme === 'cyan') {
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.92 * b.opacity})`);
        grad.addColorStop(0.35, `rgba(0, 242, 254, ${0.45 * b.opacity})`);
        grad.addColorStop(0.7, `rgba(0, 114, 255, ${0.15 * b.opacity})`);
        grad.addColorStop(0.95, `rgba(0, 242, 254, ${0.55 * b.opacity})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${0.75 * b.opacity})`);
      } else if (b.colorTheme === 'purple') {
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.92 * b.opacity})`);
        grad.addColorStop(0.35, `rgba(168, 85, 247, ${0.45 * b.opacity})`);
        grad.addColorStop(0.7, `rgba(126, 34, 206, ${0.15 * b.opacity})`);
        grad.addColorStop(0.95, `rgba(168, 85, 247, ${0.55 * b.opacity})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${0.75 * b.opacity})`);
      } else if (b.colorTheme === 'emerald') {
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.92 * b.opacity})`);
        grad.addColorStop(0.35, `rgba(0, 245, 160, ${0.45 * b.opacity})`);
        grad.addColorStop(0.7, `rgba(16, 185, 129, ${0.15 * b.opacity})`);
        grad.addColorStop(0.95, `rgba(0, 245, 160, ${0.55 * b.opacity})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${0.75 * b.opacity})`);
      } else {
        // Prismatic Windows iridescent rainbow shimmer
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * b.opacity})`);
        grad.addColorStop(0.25, `rgba(255, 255, 255, ${0.55 * b.opacity})`);
        grad.addColorStop(0.5, `rgba(0, 242, 254, ${0.35 * b.opacity})`);
        grad.addColorStop(0.75, `rgba(168, 85, 247, ${0.3 * b.opacity})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${0.8 * b.opacity})`);
      }

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // 2. Outer Glass Ring Border
      ctx.lineWidth = Math.max(0.8, b.r * 0.04);
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.75 * b.opacity})`;
      ctx.stroke();

      // 3. Primary Specular Highlight (The classic Windows Vista/7 top-left glossy glint)
      ctx.shadowColor = 'transparent';
      const specX = b.x - b.r * 0.35;
      const specY = b.y - b.r * 0.35;
      const specR = Math.max(1.5, b.r * 0.26);

      ctx.beginPath();
      ctx.arc(specX, specY, specR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.92 * b.opacity})`;
      ctx.fill();

      // 4. Secondary Rim Reflection (bottom-right crescent bounce)
      const bounceX = b.x + b.r * 0.32;
      const bounceY = b.y + b.r * 0.32;
      const bounceR = Math.max(1, b.r * 0.14);

      ctx.beginPath();
      ctx.arc(bounceX, bounceY, bounceR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.5 * b.opacity})`;
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth spring interpolation for mouse
      mouse.vx = (mouse.targetX - mouse.x) * 0.08;
      mouse.vy = (mouse.targetY - mouse.y) * 0.08;
      mouse.x += mouse.vx;
      mouse.y += mouse.vy;

      // 1. Render liquid ripples
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
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Inner soft liquid glow
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r * 0.65, 0, Math.PI * 2);
        ctx.fillStyle = `${rp.color}${rp.opacity * 0.12})`;
        ctx.fill();
        ctx.restore();
      }

      // 2. Render interactive fluid blobs
      for (const b of blobs) {
        if (!prefersReducedMotion) {
          b.x += b.dx;
          b.y += b.dy;

          // Magnetic liquid pull towards mouse cursor
          const distToMouse = Math.hypot(mouse.x - b.x, mouse.y - b.y);
          if (distToMouse < 600) {
            b.x += (mouse.x - b.x) * b.pullWeight;
            b.y += (mouse.y - b.y) * b.pullWeight;
            b.r = b.baseR + (1 - distToMouse / 600) * 55;
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

      // 3. Update & Render Windows Theme Glass Bubbles with Mouse Repulsion Physics
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];

        if (!prefersReducedMotion) {
          // Upward buoyancy
          b.y += b.vy;
          // Sinusoidal horizontal wobble
          b.wobblePhase += b.wobbleSpeed;
          b.x += b.vx + Math.sin(b.wobblePhase) * b.wobbleAmp;

          // Fluid Mouse Repulsion (bubbles smoothly push away when mouse approaches)
          const dx = b.x - mouse.x;
          const dy = b.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const pushRadius = 180 + b.r;

          if (dist < pushRadius && dist > 1) {
            const force = (1 - dist / pushRadius) * 4.5;
            const nx = dx / dist;
            const ny = dy / dist;
            b.x += nx * force;
            b.y += ny * force;
            // Viscous squish/bulge on interaction
            b.r = b.baseR * (1 + (1 - dist / pushRadius) * 0.22);
          } else {
            b.r += (b.baseR - b.r) * 0.1;
          }

          // Friction on extra burst velocity
          b.vx *= 0.98;

          // Screen wrap-around or recycle
          if (b.y < -b.r * 2) {
            b.y = height + b.r * 2;
            b.x = Math.random() * width;
          }
          if (b.x < -b.r * 2) b.x = width + b.r;
          if (b.x > width + b.r * 2) b.x = -b.r;
        }

        drawWindowsBubble(b);
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
      {/* Dynamic Liquid Ripple & Windows Glass Bubbles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />

      {/* Interactive Liquid Glass Spotlight (Smooth cursor follower) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 -ml-64 -mt-64 w-[512px] h-[512px] rounded-full pointer-events-none transition-opacity duration-500 opacity-0 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.14) 0%, rgba(168, 85, 247, 0.09) 40%, transparent 70%)',
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

