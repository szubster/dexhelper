import { Check, CircleDot, Ghost, Info, Monitor } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';

export function SettingsLegend() {
  return (
    <div className="space-y-4">
      <SectionHeader className="tracking-widest" title="SYS.LEGEND" icon={<Info size={12} />} />
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: <CircleDot size={14} className="text-rose-500" />, label: 'In Party' },
          { icon: <Monitor size={14} className="text-blue-400" />, label: 'In PC' },
          { icon: <Check size={14} className="text-emerald-400" />, label: 'Owned' },
          { icon: <Ghost size={14} className="text-purple-400" />, label: 'Lost' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 border border-zinc-800 border-dashed bg-zinc-900/50 p-3 font-bold font-mono text-[10px] uppercase tracking-wider"
          >
            {item.icon} {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
