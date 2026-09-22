import React, { useState } from 'react';

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
  badgeText = 'QUANT FIRM',
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const sizeStyles = {
    sm: 'h-6 sm:h-7',
    md: 'h-8 sm:h-9',
    lg: 'h-11 sm:h-13',
    xl: 'h-14 sm:h-18',
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative inline-flex items-center gap-3 cursor-pointer select-none ${className}`}
    >
      {/* Subtle Quant Ambient Aura Behind Logo */}
      <div 
        className="absolute -inset-2.5 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-400/0 to-emerald-400/0 blur-xl opacity-0 group-hover:opacity-100 group-hover:from-cyan-500/25 group-hover:via-blue-500/20 group-hover:to-emerald-500/25 transition-all duration-300 pointer-events-none" 
      />

      {/* Official ASHFX Wordmark with True 100% Transparent Background */}
      <div className="relative flex items-center">
        <img
          src="/ashfx-logo-transparent.png"
          alt="ASHFX® Quantitative Trading"
          className={`${sizeStyles[size]} w-auto object-contain transition-all duration-300 transform group-hover:scale-102 filter group-hover:drop-shadow-[0_0_16px_rgba(0,242,254,0.7)] group-hover:drop-shadow-[0_0_28px_rgba(16,185,129,0.35)]`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/ashfx-logo.png';
          }}
        />

        {/* Quant Laser Sheen sweep effect on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none opacity-0 group-hover:opacity-100" />
      </div>

      {/* Quant Firm Badge */}
      {showBadge && (
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 group-hover:border-cyan-400/60 group-hover:bg-cyan-500/20 group-hover:text-white group-hover:shadow-[0_0_12px_rgba(0,242,254,0.35)] transition-all duration-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {badgeText}
        </span>
      )}
    </div>
  );
};

