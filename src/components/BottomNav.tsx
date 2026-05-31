import { Link, useLocation } from '@tanstack/react-router';
import { Activity, Database, GitGraph, LayoutGrid, Settings2, Sparkles } from 'lucide-react';
import { useStore } from '../store';
import { cn } from '../utils/cn';
import { TelemetryDecoration } from './TelemetryDecoration';

export function BottomNav() {
  const nuzlockeGraveyardBox = useStore((s) => s.nuzlockeGraveyardBox);
  const nuzlockeGraveyardBox = useStore((s) => s.nuzlockeGraveyardBox);
  const nuzlockeGraveyardBox = useStore((s) => s.nuzlockeGraveyardBox);
  const nuzlockeGraveyardBox = useStore((s) => s.nuzlockeGraveyardBox);
  const saveData = useStore((s) => s.saveData);
  const setIsSettingsOpen = useStore((s) => s.setIsSettingsOpen);
  const isSettingsOpen = useStore((s) => s.isSettingsOpen);
  const location = useLocation();

  if (!saveData) return null;

  const isDex = location.pathname === '/' || location.pathname.startsWith('/pokemon');
  const isStorage = location.pathname === '/storage';
  const isAssistant = location.pathname === '/assistant';
  const isDag = location.pathname === '/dag';
  const isRun = location.pathname === '/run';

  const activeIndex = isDex ? 0 : isStorage ? 1 : isAssistant ? 2 : isDag ? 3 : isRun ? 4 : -1;

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-zinc-800 border-t border-dashed bg-zinc-950 px-2 pt-2 pb-[env(safe-area-inset-bottom,16px)] font-mono shadow-[0_-20px_50px_rgba(0,0,0,0.8)] sm:hidden">
      {/* Hardware top lip */}
      <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50" />

      {/* Telemetry decoration */}
      <TelemetryDecoration
        label="LINK_ACTIVE"
        className="-top-[21px] left-4 rounded-none border-t border-b-0 bg-zinc-950"
      />

      <div className="relative mx-auto grid max-w-md grid-cols-6 items-center">
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

        <Link
          to="/"
          aria-label="Pokedex"
          title="Pokedex"
          aria-current={isDex ? 'page' : undefined}
          className={cn(
            'group relative z-10 flex flex-col items-center gap-1.5 rounded-none py-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
            isDex ? 'text-[var(--theme-primary)]' : 'text-zinc-600 hover:text-zinc-400',
          )}
        >
          {isDex && <div className="lcd-flicker absolute inset-0 bg-[var(--theme-primary)]/5" />}
          <div className={cn('transition-transform', isDex ? 'animate-pulse' : 'active:scale-90')}>
            <LayoutGrid
              size={20}
              strokeWidth={isDex ? 2.5 : 2}
              className={cn(isDex && 'drop-shadow-[0_0_10px_rgba(var(--theme-primary-rgb),1)]')}
            />
          </div>
          <span className="font-bold font-mono text-[9px] uppercase tracking-[0.2em]">{isDex ? '[ DEX ]' : 'DEX'}</span>
        </Link>

        <Link
          to="/storage"
          aria-label="Storage"
          title="Storage"
          aria-current={isStorage ? 'page' : undefined}
          className={cn(
            'group relative z-10 flex flex-col items-center gap-1.5 rounded-none py-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
            isStorage ? 'text-[var(--theme-primary)]' : 'text-zinc-600 hover:text-zinc-400',
          )}
        >
          {isStorage && <div className="lcd-flicker absolute inset-0 bg-[var(--theme-primary)]/5" />}
          <div className={cn('transition-transform', isStorage ? 'animate-pulse' : 'active:scale-90')}>
            <Database
              size={20}
              strokeWidth={isStorage ? 2.5 : 2}
              className={cn(isStorage && 'drop-shadow-[0_0_10px_rgba(var(--theme-primary-rgb),1)]')}
            />
          </div>
          <span className="font-bold font-mono text-[9px] uppercase tracking-[0.2em]">
            {isStorage ? '[ STRG ]' : 'STRG'}
          </span>
        </Link>

        <Link
          to="/assistant"
          aria-label="Assistant"
          title="Assistant"
          aria-current={isAssistant ? 'page' : undefined}
          className={cn(
            'group relative z-10 flex flex-col items-center gap-1.5 rounded-none py-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
            isAssistant ? 'text-[var(--theme-primary)]' : 'text-zinc-600 hover:text-zinc-400',
          )}
        >
          {isAssistant && <div className="lcd-flicker absolute inset-0 bg-[var(--theme-primary)]/5" />}
          <div className={cn('transition-transform', isAssistant ? 'animate-pulse' : 'active:scale-90')}>
            <Sparkles
              size={20}
              strokeWidth={isAssistant ? 2.5 : 2}
              className={cn(isAssistant && 'drop-shadow-[0_0_10px_rgba(var(--theme-primary-rgb),1)]')}
            />
          </div>
          <span className="font-bold font-mono text-[9px] uppercase tracking-[0.2em]">
            {isAssistant ? '[ ASST ]' : 'ASST'}
          </span>
        </Link>

        <Link
          to="/dag"
          aria-label="DAG"
          title="DAG"
          aria-current={isDag ? 'page' : undefined}
          className={cn(
            'group relative z-10 flex flex-col items-center gap-1.5 rounded-none py-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
            isDag ? 'text-[var(--theme-primary)]' : 'text-zinc-600 hover:text-zinc-400',
          )}
        >
          {isDag && <div className="lcd-flicker absolute inset-0 bg-[var(--theme-primary)]/5" />}
          <div className={cn('transition-transform', isDag ? 'animate-pulse' : 'active:scale-90')}>
            <GitGraph
              size={20}
              strokeWidth={isDag ? 2.5 : 2}
              className={cn(isDag && 'drop-shadow-[0_0_10px_rgba(var(--theme-primary-rgb),1)]')}
            />
          </div>
          <span className="font-bold font-mono text-[9px] uppercase tracking-[0.2em]">{isDag ? '[ DAG ]' : 'DAG'}</span>
        </Link>

                {nuzlockeGraveyardBox && (
          <Link
            to="/run"
            aria-label="Run Dashboard"
            title="Run Dashboard"
            aria-current={isRun ? 'page' : undefined}
            className={cn(
              'group relative z-10 flex flex-col items-center gap-1.5 rounded-none py-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
              isRun ? 'text-[var(--theme-primary)]' : 'text-zinc-600 hover:text-zinc-400',
            )}
          >
            {isRun && <div className="lcd-flicker absolute inset-0 bg-[var(--theme-primary)]/5" />}
            <div className={cn('transition-transform', isRun ? 'animate-pulse' : 'active:scale-90')}>
              <Activity
                size={20}
                strokeWidth={isRun ? 2.5 : 2}
                className={cn(isRun && 'drop-shadow-[0_0_10px_rgba(var(--theme-primary-rgb),1)]')}
              />
            </div>
            <span className="font-bold font-mono text-[9px] uppercase tracking-[0.2em]">{isRun ? '[ RUN ]' : 'RUN'}</span>
          </Link>
        )}

                {nuzlockeGraveyardBox && (
          <Link
            to="/run"
            aria-label="Run Dashboard"
            title="Run Dashboard"
            aria-current={isRun ? 'page' : undefined}
            className={cn(
              'group relative z-10 flex flex-col items-center gap-1.5 rounded-none py-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
              isRun ? 'text-[var(--theme-primary)]' : 'text-zinc-600 hover:text-zinc-400',
            )}
          >
            {isRun && <div className="lcd-flicker absolute inset-0 bg-[var(--theme-primary)]/5" />}
            <div className={cn('transition-transform', isRun ? 'animate-pulse' : 'active:scale-90')}>
              <Activity
                size={20}
                strokeWidth={isRun ? 2.5 : 2}
                className={cn(isRun && 'drop-shadow-[0_0_10px_rgba(var(--theme-primary-rgb),1)]')}
              />
            </div>
            <span className="font-bold font-mono text-[9px] uppercase tracking-[0.2em]">{isRun ? '[ RUN ]' : 'RUN'}</span>
          </Link>
        )}

                {nuzlockeGraveyardBox && (
          <Link
            to="/run"
            aria-label="Run Dashboard"
            title="Run Dashboard"
            aria-current={isRun ? 'page' : undefined}
            className={cn(
              'group relative z-10 flex flex-col items-center gap-1.5 rounded-none py-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
              isRun ? 'text-[var(--theme-primary)]' : 'text-zinc-600 hover:text-zinc-400',
            )}
          >
            {isRun && <div className="lcd-flicker absolute inset-0 bg-[var(--theme-primary)]/5" />}
            <div className={cn('transition-transform', isRun ? 'animate-pulse' : 'active:scale-90')}>
              <Activity
                size={20}
                strokeWidth={isRun ? 2.5 : 2}
                className={cn(isRun && 'drop-shadow-[0_0_10px_rgba(var(--theme-primary-rgb),1)]')}
              />
            </div>
            <span className="font-bold font-mono text-[9px] uppercase tracking-[0.2em]">{isRun ? '[ RUN ]' : 'RUN'}</span>
          </Link>
        )}

        <button
          type="button"
          onClick={() => setIsSettingsOpen(true)}
          aria-label="Open settings menu"
          title="Open settings menu"
          aria-expanded={isSettingsOpen}
          className="group relative z-10 flex flex-col items-center gap-1.5 rounded-none py-2 text-zinc-600 transition-all duration-300 hover:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          <div className="transition-transform active:scale-90">
            <Settings2 size={20} strokeWidth={2} />
          </div>
          <span className="font-bold font-mono text-[9px] uppercase tracking-[0.2em]">MENU</span>
        </button>
      </div>
    </nav>
  );
}
