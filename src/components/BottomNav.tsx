import { useLocation } from '@tanstack/react-router';
import { Activity, Database, GitGraph, LayoutGrid, Settings2, Sparkles } from 'lucide-react';
import { useStore } from '../store';
import { NavButton } from './NavButton';
import { TelemetryDecoration } from './TelemetryDecoration';

export function BottomNav() {
  const saveData = useStore((s) => s.saveData);
  const setIsSettingsOpen = useStore((s) => s.setIsSettingsOpen);
  const isSettingsOpen = useStore((s) => s.isSettingsOpen);
  const isNuzlocke = useStore((s) => s.nuzlockeGraveyardBox !== null);
  const location = useLocation();

  if (!saveData) return null;

  const isDex = location.pathname === '/' || location.pathname.startsWith('/pokemon');
  const isStorage = location.pathname === '/storage';
  const isAssistant = location.pathname === '/assistant';
  const isDag = location.pathname === '/dag';
  const isRun = location.pathname === '/run';

  const activeIndex = isDex ? 0 : isStorage ? 1 : isAssistant ? 2 : isDag ? 3 : isNuzlocke && isRun ? 4 : -1;

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-zinc-800 border-t border-dashed bg-zinc-950 px-2 pt-2 pb-[env(safe-area-inset-bottom,16px)] font-mono shadow-[0_-20px_50px_rgba(0,0,0,0.8)] sm:hidden">
      {/* Hardware top lip */}
      <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50" />

      {/* Telemetry decoration */}
      <TelemetryDecoration
        label="LINK_ACTIVE"
        className="-top-[21px] left-4 rounded-none border-t border-b-0 bg-zinc-950"
      />

      <div className={`relative mx-auto grid max-w-md ${isNuzlocke ? 'grid-cols-6' : 'grid-cols-5'} items-center`}>
        {/* Active Indicator Hardware Frame */}
        {activeIndex !== -1 && (
          <div
            className="pointer-events-none absolute z-0 h-full w-[20%] transition-transform duration-300 ease-[cubic-bezier(0.2,1,0.2,1)]"
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          >
            <div className="absolute inset-x-1 inset-y-0.5 border border-[var(--theme-primary)]/50 border-dashed bg-[var(--theme-primary)]/10" />
            <div className="absolute top-0 left-1 h-2 w-2 border-[var(--theme-primary)] border-t-[3px] border-l-[3px]" />
            <div className="absolute top-0 right-1 h-2 w-2 border-[var(--theme-primary)] border-t-[3px] border-r-[3px]" />
            <div className="absolute bottom-0 left-1 h-2 w-2 border-[var(--theme-primary)] border-b-[3px] border-l-[3px]" />
            <div className="absolute right-1 bottom-0 h-2 w-2 border-[var(--theme-primary)] border-r-[3px] border-b-[3px]" />

            {/* Scanning Laser Line */}
            <div className="absolute inset-x-1 top-0 h-[1px] animate-[scan_2s_linear_infinite] bg-[var(--theme-primary)] opacity-50 shadow-[0_0_8px_var(--theme-primary)]" />
            <div className="scanline-overlay absolute inset-x-1 inset-y-0.5 opacity-30" />
          </div>
        )}

        <NavButton to="/" ariaLabel="Pokedex" label="DEX" activeLabel="[ DEX ]" icon={LayoutGrid} isActive={isDex} />

        <NavButton
          to="/storage"
          ariaLabel="Storage"
          label="STRG"
          activeLabel="[ STRG ]"
          icon={Database}
          isActive={isStorage}
        />

        <NavButton
          to="/assistant"
          ariaLabel="Assistant"
          label="ASST"
          activeLabel="[ ASST ]"
          icon={Sparkles}
          isActive={isAssistant}
        />

        <NavButton to="/dag" ariaLabel="DAG" label="DAG" activeLabel="[ DAG ]" icon={GitGraph} isActive={isDag} />

        {isNuzlocke && (
          <NavButton to="/run" ariaLabel="Run" label="RUN" activeLabel="[ RUN ]" icon={Activity} isActive={isRun} />
        )}

        <NavButton
          onClick={() => setIsSettingsOpen(true)}
          ariaLabel="Open settings menu"
          label="MENU"
          activeLabel="MENU"
          icon={Settings2}
          isActive={isSettingsOpen}
        />
      </div>
    </nav>
  );
}
