import React, { useState, useEffect, useRef } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  badgeText?: string;
}

interface BubbleParticle {
  id: number;
  x: number; // percentage
  y: number; // percentage
  size: number; // px
  speedY: number;
  speedX: number;
  wobbleSpeed: number;
  wobblePhase: number;
  opacity: number;
  colorType: 'cyan' | 'purple' | 'prismatic' | 'emerald';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showBadge = true,
  badgeText = 'QUANT FIRM',
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [bubbles, setBubbles] = useState<BubbleParticle[]>([]);
  const nextBubbleId = useRef<number>(0);

  // Windows Theme Glass Bubble Generator on Mouse Hover
  useEffect(() => {
    if (!isHovered) {
      setBubbles([]);
      return;
    }

    // Spawn rich fleet of bubbles of varying sizes (tiny, small, medium, large)
    const initialBubbles: BubbleParticle[] = [];
    const sizes = [5, 8, 12, 16, 22, 28, 36, 48];
    const colorTypes: ('cyan' | 'purple' | 'prismatic' | 'emerald')[] = ['cyan', 'purple', 'prismatic', 'emerald'];

    for (let i = 0; i < 18; i++) {
      const chosenSize = sizes[Math.floor(Math.random() * sizes.length)];
      initialBubbles.push({
        id: nextBubbleId.current++,
        x: 5 + Math.random() * 90,
        y: 40 + Math.random() * 60,
        size: chosenSize,
        speedY: 0.7 + Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 0.9,
        wobbleSpeed: 0.04 + Math.random() * 0.06,
        wobblePhase: Math.random() * Math.PI * 2,
        opacity: 0.7 + Math.random() * 0.3,
        colorType: colorTypes[Math.floor(Math.random() * colorTypes.length)],
      });
    }
    setBubbles(initialBubbles);

    const interval = setInterval(() => {
      setBubbles((prev) => {
        // Move existing bubbles upward with smooth sway
        const moved = prev
          .map((b) => ({
            ...b,
            y: b.y - b.speedY,
            x: b.x + Math.sin(b.wobblePhase) * 0.6 + b.speedX * 0.4,
            wobblePhase: b.wobblePhase + b.wobbleSpeed,
            opacity: b.opacity - 0.012,
          }))
          .filter((b) => b.opacity > 0.04 && b.y > -30);

        // Replenish new multi-sized bubbles continuously while hovered
        if (moved.length < 24) {
          const chosenSize = sizes[Math.floor(Math.random() * sizes.length)];
          moved.push({
            id: nextBubbleId.current++,
            x: 5 + Math.random() * 90,
            y: 95 + Math.random() * 15,
            size: chosenSize,
            speedY: 0.8 + Math.random() * 1.6,
            speedX: (Math.random() - 0.5) * 0.8,
            wobbleSpeed: 0.04 + Math.random() * 0.06,
            wobblePhase: Math.random() * Math.PI * 2,
            opacity: 0.85,
            colorType: colorTypes[Math.floor(Math.random() * colorTypes.length)],
          });
        }

        return moved;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [isHovered]);

  const sizeStyles = {
    sm: 'h-6 sm:h-7',
    md: 'h-8 sm:h-9',
    lg: 'h-11 sm:h-13',
    xl: 'h-14 sm:h-18',
  };

  const getBubbleBackground = (colorType: 'cyan' | 'purple' | 'prismatic' | 'emerald') => {
    switch (colorType) {
      case 'cyan':
        return 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(0, 242, 254, 0.65) 30%, rgba(0, 114, 255, 0.25) 70%, rgba(255, 255, 255, 0.5) 100%)';
      case 'purple':
        return 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(168, 85, 247, 0.65) 30%, rgba(126, 34, 206, 0.25) 70%, rgba(255, 255, 255, 0.5) 100%)';
      case 'emerald':
        return 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(0, 245, 160, 0.65) 30%, rgba(16, 185, 129, 0.25) 70%, rgba(255, 255, 255, 0.5) 100%)';
      case 'prismatic':
      default:
        return 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.6) 25%, rgba(0, 242, 254, 0.4) 55%, rgba(168, 85, 247, 0.3) 80%, rgba(255, 255, 255, 0.7) 100%)';
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative inline-flex items-center gap-3 cursor-pointer select-none ${className}`}
    >
      {/* Windows Theme Liquid Glass Bubbles Container */}
      <div className="absolute -inset-x-8 -inset-y-12 overflow-visible pointer-events-none z-30">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-full transition-transform will-change-transform"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              opacity: b.opacity,
              transform: 'translate(-50%, -50%)',
              background: getBubbleBackground(b.colorType),
              boxShadow:
                'inset 1px 1px 3px rgba(255, 255, 255, 0.95), inset -1.5px -1.5px 3px rgba(0, 0, 0, 0.25), 0 2px 10px rgba(0, 242, 254, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.65)',
              backdropFilter: 'blur(3px)',
            }}
          >
            {/* Primary Specular Highlight (Windows Vista/7 signature upper-left glint) */}
            <div
              className="absolute top-[16%] left-[20%] rounded-full bg-white opacity-90 pointer-events-none shadow-[0_0_3px_#ffffff]"
              style={{
                width: `${Math.max(2, b.size * 0.28)}px`,
                height: `${Math.max(2, b.size * 0.28)}px`,
                filter: 'blur(0.3px)',
              }}
            />
            {/* Secondary Rim Reflection (bottom-right crescent glow) */}
            <div
              className="absolute bottom-[14%] right-[16%] rounded-full bg-cyan-200/60 pointer-events-none"
              style={{
                width: `${Math.max(1.5, b.size * 0.16)}px`,
                height: `${Math.max(1.5, b.size * 0.16)}px`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Ambient Liquid Glow Aura Behind Logo */}
      <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-purple-500/0 blur-2xl opacity-0 group-hover:opacity-100 group-hover:from-cyan-500/40 group-hover:via-blue-500/35 group-hover:to-purple-500/40 transition-all duration-500 pointer-events-none" />

      {/* Official ASHFX Wordmark with True 100% Transparent Background */}
      <div className="relative flex items-center">
        <img
          src="/ashfx-logo-transparent.png"
          alt="ASHFX® Quantitative Trading"
          className={`${sizeStyles[size]} w-auto object-contain transition-all duration-300 transform group-hover:scale-105 filter group-hover:drop-shadow-[0_0_18px_rgba(0,242,254,0.95)] group-hover:drop-shadow-[0_0_36px_rgba(79,172,254,0.65)] group-hover:drop-shadow-[0_0_55px_rgba(168,85,247,0.5)]`}
          onError={(e) => {
            // Fallback if needed
            (e.target as HTMLImageElement).src = '/ashfx-logo.png';
          }}
        />

        {/* Liquid Shimmer sweep effect on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100" />
      </div>

      {/* Quant Firm Badge */}
      {showBadge && (
        <span className="text-[10px] font-bold font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 group-hover:border-cyan-400/60 group-hover:bg-cyan-500/25 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(0,242,254,0.45)] transition-all duration-300">
          {badgeText}
        </span>
      )}
    </div>
  );
};
