import { Check, CircleDot, Ghost, Info, Monitor } from 'lucide-react';

export function SettingsLegend() {
  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 font-black font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
        <Info size={12} /> SYS.LEGEND
      </h3>
      <div className="grid grid-cols-2 gap-px border border-zinc-800 border-dashed bg-zinc-800">
        {[
          { icon: <CircleDot size={14} className="text-rose-500" />, label: 'In Party' },
          { icon: <Monitor size={14} className="text-blue-400" />, label: 'In PC' },
          { icon: <Check size={14} className="text-emerald-400" />, label: 'Owned' },
          { icon: <Ghost size={14} className="text-purple-400" />, label: 'Lost' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 bg-zinc-950 p-3 font-black font-mono text-[9px] text-zinc-300 uppercase tracking-widest"
          >
            {item.icon} [ {item.label} ]
          </div>
        ))}
      </div>
    </div>
  );
}
