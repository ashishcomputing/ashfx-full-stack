import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  badgeText?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showBadge = true,
  badgeText = 'FULL STACK',
}) => {
  const sizeStyles = {
    sm: 'h-6',
    md: 'h-8 sm:h-9',
    lg: 'h-10 sm:h-12',
    xl: 'h-14 sm:h-18',
  };

  return (
    <div className={`group relative inline-flex items-center gap-2.5 cursor-pointer select-none ${className}`}>
      {/* Ambient Liquid Glow Aura Behind Logo */}
      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-purple-500/0 blur-xl opacity-0 group-hover:opacity-100 group-hover:from-cyan-500/30 group-hover:via-blue-500/25 group-hover:to-purple-500/30 transition-all duration-500 pointer-events-none" />

      {/* Official ASHFX Wordmark Logo Image */}
      <div className="relative overflow-hidden flex items-center">
        <img
          src="/ashfx-logo.png"
          alt="ASHFX®"
          className={`${sizeStyles[size]} w-auto object-contain mix-blend-screen transition-all duration-300 transform group-hover:scale-105 group-hover:brightness-125 filter group-hover:drop-shadow-[0_0_15px_rgba(0,242,254,0.7)] group-hover:drop-shadow-[0_0_30px_rgba(79,172,254,0.5)] group-hover:drop-shadow-[0_0_45px_rgba(168,85,247,0.35)]`}
        />

        {/* Liquid Shimmer Light Sweep on Hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100" />
      </div>

      {/* Optional Badge */}
      {showBadge && (
        <span className="text-[10px] font-bold font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 group-hover:border-cyan-400/60 group-hover:bg-cyan-500/25 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all duration-300">
          {badgeText}
        </span>
      )}
    </div>
  );
};
