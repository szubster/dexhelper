import { useLocation } from '@tanstack/react-router';
import { Database, GitGraph, LayoutGrid, Settings2, Sparkles, Swords } from 'lucide-react';
import { useStore } from '../store';
import { NavButton } from './NavButton';
import { TelemetryDecoration } from './TelemetryDecoration';

export function BottomNav() {
  const saveData = useStore((s) => s.saveData);
  const setIsSettingsOpen = useStore((s) => s.setIsSettingsOpen);
  const isSettingsOpen = useStore((s) => s.isSettingsOpen);
  const location = useLocation();

  if (!saveData) return null;

  const isDex = location.pathname === '/' || location.pathname.startsWith('/pokemon');
  const isStorage = location.pathname === '/storage';
  const isAssistant = location.pathname === '/assistant';
  const isDag = location.pathname === '/dag';
  const isFrontier = location.pathname === '/dashboard';

  const activeIndex = isDex ? 0 : isStorage ? 1 : isAssistant ? 2 : isDag ? 3 : isFrontier ? 4 : -1;

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-[var(--theme-primary)]/50 border-t-[4px] border-dashed bg-zinc-950 pb-[env(safe-area-inset-bottom,0px)] font-mono shadow-[0_-20px_50px_rgba(0,0,0,0.9)] sm:hidden">
      {/* Hazard stripes lip */}
      <div
        className="absolute top-0 right-0 left-0 h-1.5 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, var(--theme-primary) 25%, transparent 25%, transparent 50%, var(--theme-primary) 50%, var(--theme-primary) 75%, transparent 75%, transparent)',
          backgroundSize: '10px 10px',
        }}
      />
      {/* Hardware top lip */}
      <div className="absolute top-1.5 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Telemetry decoration */}
      <TelemetryDecoration
        label="TERMINAL_LINK_ACTIVE"
        className="-top-[21px] left-4 rounded-none border-t border-b-0 bg-zinc-950 text-[10px] text-[var(--theme-primary)]"
        dotClassName="text-[var(--theme-primary)]"
      />

      <div className="relative flex h-[72px] w-full items-stretch gap-0 rounded-none border-zinc-800 border-t-[2px] bg-zinc-900 shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]">
        {/* Active Indicator Hardware Frame */}
        {activeIndex !== -1 && (
          <div
            className="pointer-events-none absolute z-20 h-full w-[16.666%] transition-transform duration-300 ease-[cubic-bezier(0.2,1,0.2,1)]"
            style={{ transform: `translateX(calc(${activeIndex * 100}%))` }}
          >
            {/* Top illuminated bracket */}
            <div className="absolute top-0 right-0 left-0 h-[3px] bg-[var(--theme-primary)] drop-shadow-[0_0_8px_var(--theme-primary)]" />
            {/* Sliding Bracket Corners */}
            <div className="absolute -top-1 -left-1 h-3 w-3 border-[var(--theme-primary)] border-t-[4px] border-l-[4px] drop-shadow-[0_0_5px_var(--theme-primary)]" />
            <div className="absolute -top-1 -right-1 h-3 w-3 border-[var(--theme-primary)] border-t-[4px] border-r-[4px] drop-shadow-[0_0_5px_var(--theme-primary)]" />
            <div className="absolute -bottom-1 -left-1 h-3 w-3 border-[var(--theme-primary)] border-b-[4px] border-l-[4px] drop-shadow-[0_0_5px_var(--theme-primary)]" />
            <div className="absolute -right-1 -bottom-1 h-3 w-3 border-[var(--theme-primary)] border-r-[4px] border-b-[4px] drop-shadow-[0_0_5px_var(--theme-primary)]" />
          </div>
        )}

        <div className="h-full flex-1">
          <NavButton to="/" ariaLabel="Pokedex" label="DEX" activeLabel="DEX" icon={LayoutGrid} isActive={isDex} />
        </div>

        <div className="h-full flex-1">
          <NavButton
            to="/storage"
            ariaLabel="Storage"
            label="STRG"
            activeLabel="STRG"
            icon={Database}
            isActive={isStorage}
          />
        </div>

        <div className="h-full flex-1">
          <NavButton
            to="/assistant"
            ariaLabel="Assistant"
            label="ASST"
            activeLabel="ASST"
            icon={Sparkles}
            isActive={isAssistant}
          />
        </div>

        <div className="h-full flex-1">
          <NavButton to="/dag" ariaLabel="DAG" label="DAG" activeLabel="DAG" icon={GitGraph} isActive={isDag} />
        </div>

        <div className="h-full flex-1">
          <NavButton
            to="/dashboard"
            ariaLabel="Dashboard"
            label="DASH"
            activeLabel="DASH"
            icon={Swords}
            isActive={isFrontier}
          />
        </div>

        <div className="h-full flex-1">
          <NavButton
            onClick={() => setIsSettingsOpen(true)}
            ariaLabel="Open settings menu"
            label="MENU"
            activeLabel="MENU"
            icon={Settings2}
            isActive={isSettingsOpen}
          />
        </div>
      </div>
    </nav>
  );
}
