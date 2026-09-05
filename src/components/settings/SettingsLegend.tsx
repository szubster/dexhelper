import { Check, CircleDot, Ghost, Info, Monitor } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { TacticalLed } from '../TacticalLed';

export function SettingsLegend() {
  return (
    <div className="space-y-4">
      <SectionHeader className="tracking-widest" title="SYS.LEGEND" icon={<Info size={12} />} />
      <div className="relative grid grid-cols-2 gap-3 border-2 border-zinc-900 bg-zinc-950 p-4 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
        <div className="absolute top-0 right-0 p-1 font-mono text-[8px] text-zinc-600">LED_MATRIX_ONLINE</div>
        {[
          { icon: <CircleDot size={12} className="text-rose-500" />, label: 'In Party', ledVariant: 'red' as const },
          { icon: <Monitor size={12} className="text-blue-400" />, label: 'In PC', ledVariant: 'blue' as const },
          { icon: <Check size={12} className="text-emerald-400" />, label: 'Owned', ledVariant: 'emerald' as const },
          { icon: <Ghost size={12} className="text-purple-400" />, label: 'Lost', ledVariant: 'purple' as const },
        ].map((item) => (
          <div
            key={item.label}
            className="group relative flex items-center gap-3 border border-zinc-800 border-dashed bg-zinc-900/40 px-6 py-2.5 font-bold font-mono text-[10px] uppercase tracking-widest transition-colors hover:bg-zinc-800/60"
          >
            <TacticalLed variant={item.ledVariant} position="top-1/2" pipe={true} />
            <div className="flex items-center justify-center border border-zinc-700/50 bg-black/50 p-1">
              {item.icon}
            </div>
            <span className="text-zinc-300 group-hover:text-white">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
