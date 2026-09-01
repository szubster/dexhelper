import {
  BookOpen,
  Briefcase,
  CheckSquare,
  Compass,
  Cpu,
  FlaskConical,
  Palette,
  ShieldCheck,
  Target,
  Terminal,
  User,
} from 'lucide-react';
import React from 'react';
import { cn } from '../../utils/cn';

export interface PersonaBadgeProps {
  persona: string;
  className?: string;
}

const PERSONA_CONFIG: Record<string, { icon: React.ElementType; colorClass: string; borderClass: string }> = {
  human: { icon: User, colorClass: 'text-zinc-300', borderClass: 'border-zinc-500/50' },
  coder: { icon: Terminal, colorClass: 'text-blue-400', borderClass: 'border-blue-500/50' },
  qa: { icon: ShieldCheck, colorClass: 'text-emerald-400', borderClass: 'border-emerald-500/50' },
  palette: { icon: Palette, colorClass: 'text-pink-400', borderClass: 'border-pink-500/50' },
  researcher: { icon: FlaskConical, colorClass: 'text-cyan-400', borderClass: 'border-cyan-500/50' },
  auditor: { icon: CheckSquare, colorClass: 'text-purple-400', borderClass: 'border-purple-500/50' },
  architect: { icon: BookOpen, colorClass: 'text-indigo-400', borderClass: 'border-indigo-500/50' },
  epic_planner: { icon: Compass, colorClass: 'text-orange-400', borderClass: 'border-orange-500/50' },
  product_manager: { icon: Briefcase, colorClass: 'text-amber-400', borderClass: 'border-amber-500/50' },
  story_owner: { icon: Target, colorClass: 'text-rose-400', borderClass: 'border-rose-500/50' },
  tech_lead: { icon: Cpu, colorClass: 'text-yellow-400', borderClass: 'border-yellow-500/50' },
};

const DEFAULT_CONFIG = { icon: User, colorClass: 'text-zinc-400', borderClass: 'border-zinc-500/50' };

export const PersonaBadge = React.memo(function PersonaBadge({ persona, className }: PersonaBadgeProps) {
  const normalizedPersona = (persona || '').toLowerCase();
  const config = PERSONA_CONFIG[normalizedPersona] || DEFAULT_CONFIG;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 rounded-none border border-dashed bg-zinc-950/50 px-1.5 py-0.5 font-mono',
        config.colorClass,
        config.borderClass,
        className,
      )}
      title={`Persona: ${persona}`}
      data-testid="persona-badge"
    >
      <Icon size={12} strokeWidth={2.5} data-testid={`persona-icon-${normalizedPersona}`} />
      <span className="font-bold text-[10px] uppercase tracking-widest">{persona}</span>
    </div>
  );
});
