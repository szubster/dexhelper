import { Sparkles } from 'lucide-react';

interface ShinyBadgeProps {
  isShiny: boolean;
  isShinyCarrier: boolean;
  size?: 'sm' | 'md';
}

export function ShinyBadge({ isShiny, isShinyCarrier, size = 'sm' }: ShinyBadgeProps) {
  if (!isShiny && !isShinyCarrier) return null;

  const iconSize = size === 'md' ? 18 : 14;
  const padding = size === 'md' ? 'p-2' : 'p-1';

  if (isShiny) {
    return (
      <div
        className={`absolute -top-3 -right-3 z-20 animate-[pulse_3s_ease-in-out_infinite] rounded-none border border-amber-500/50 bg-amber-500/20 ${padding} text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)] backdrop-blur-sm`}
      >
        <Sparkles size={iconSize} className="drop-shadow-sm" />
      </div>
    );
  }

  return (
    <div
      className={`absolute -top-3 -right-3 z-20 animate-[pulse_3s_ease-in-out_infinite] rounded-none border border-cyan-500/50 border-dashed bg-cyan-500/20 ${padding} text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] backdrop-blur-sm`}
    >
      <Sparkles size={iconSize} className="drop-shadow-sm" />
    </div>
  );
}
