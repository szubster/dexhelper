import { useLocation } from '@tanstack/react-router';
import { Database, GitGraph, LayoutGrid, Settings2, Sparkles, Swords } from 'lucide-react';
import { useStore } from '../store';
import { NavButton } from './NavButton';
import { TelemetryDecoration } from './TelemetryDecoration';

export function BottomNav() {
  const setIsSettingsOpen = useStore((s) => s.setIsSettingsOpen);
  const isSettingsOpen = useStore((s) => s.isSettingsOpen);
  const location = useLocation();

  const isDex = location.pathname === '/' || location.pathname.startsWith('/pokemon');
  const isStorage = location.pathname === '/storage';
  const isAssistant = location.pathname === '/assistant';
  const isDag = location.pathname === '/dag';
  const isFrontier = location.pathname === '/dashboard';

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-zinc-900 border-t-[8px] border-b-[8px] bg-zinc-950 pb-[env(safe-area-inset-bottom,0px)] font-mono shadow-[0_-20px_50px_rgba(0,0,0,0.9)] sm:hidden">
      {/* Hazard stripes rim on the top bezel */}
      <div
        className="absolute -top-[8px] right-0 left-0 h-[8px] opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, var(--theme-primary) 25%, transparent 25%, transparent 50%, var(--theme-primary) 50%, var(--theme-primary) 75%, transparent 75%, transparent)',
          backgroundSize: '16px 16px',
        }}
      />
      {/* Heavy metallic top bezel edge */}
      <div className="absolute -top-[8px] right-0 left-0 h-[2px] bg-white/20 shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
      <div className="absolute -top-[1px] right-0 left-0 h-[1px] bg-black" />

      {/* Mounting Screws in the top bezel */}
      <div className="absolute -top-[6px] left-4 flex h-[4px] w-[4px] items-center justify-center rounded-full border border-black bg-zinc-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
        <div className="h-[1px] w-[3px] rotate-45 bg-black" />
      </div>
      <div className="absolute -top-[6px] right-4 flex h-[4px] w-[4px] items-center justify-center rounded-full border border-black bg-zinc-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
        <div className="h-[1px] w-[3px] -rotate-12 bg-black" />
      </div>

      {/* Telemetry decoration */}
      <TelemetryDecoration
        label="SYS.CONTROL_ARRAY"
        className="-top-[24px] left-2 rounded-none border-zinc-900 border-t-2 border-r-2 border-b-0 border-l-2 bg-zinc-950 px-2 py-0.5 text-[9px] text-[var(--theme-primary)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
        dotClassName="text-[var(--theme-primary)]"
      />

      {/* Hardware Panel Enclosure */}
      <div className="relative mx-1 mt-1 mb-1 flex h-[76px] items-stretch gap-1 rounded-none border-2 border-zinc-900 bg-zinc-900/50 p-1 shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]">
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

      {/* Bottom Bezel Edge Detail */}
      <div className="absolute right-0 -bottom-[8px] left-0 h-[8px] border-black border-t-2 bg-zinc-900 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.5)]" />
    </nav>
  );
}
