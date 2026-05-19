import { Link, useLocation } from '@tanstack/react-router';
import { Database, GitGraph, LayoutGrid, Settings2, Sparkles } from 'lucide-react';
import { useStore } from '../store';
import { cn } from '../utils/cn';
import { TelemetryDecoration } from './TelemetryDecoration';

export function SideNav() {
  const saveData = useStore((s) => s.saveData);
  const setIsSettingsOpen = useStore((s) => s.setIsSettingsOpen);
  const isSettingsOpen = useStore((s) => s.isSettingsOpen);
  const location = useLocation();

  if (!saveData) return null;

  const isDex = location.pathname === '/' || location.pathname.startsWith('/pokemon');
  const isStorage = location.pathname === '/storage';
  const isAssistant = location.pathname === '/assistant';
  const isDag = location.pathname === '/dag';

  const activeIndex = isDex ? 0 : isStorage ? 1 : isAssistant ? 2 : isDag ? 3 : -1;

  return (
    <nav className="relative z-40 hidden w-24 shrink-0 flex-col border-zinc-800 border-r border-dashed bg-zinc-950/80 sm:flex">
      <TelemetryDecoration label="SYS.NAV" className="top-4 -right-[64px] origin-top-left rotate-90" />
      <div className="flex-1 overflow-y-auto py-8">
        <div className="relative flex flex-col gap-2 px-2">
          {activeIndex !== -1 && (
            <div
              className="pointer-events-none absolute z-0 h-[64px] w-[calc(100%-16px)] transition-transform duration-500 ease-out"
              style={{ transform: `translateY(${activeIndex * 72}px)` }}
            >
              <div className="absolute top-0 left-0 h-2 w-2 border-[var(--theme-primary)] border-t-2 border-l-2" />
              <div className="absolute top-0 right-0 h-2 w-2 border-[var(--theme-primary)] border-t-2 border-r-2" />
              <div className="absolute bottom-0 left-0 h-2 w-2 border-[var(--theme-primary)] border-b-2 border-l-2" />
              <div className="absolute right-0 bottom-0 h-2 w-2 border-[var(--theme-primary)] border-r-2 border-b-2" />
              <div className="absolute inset-0 bg-[var(--theme-primary)]/10" />
              <div className="scanline-overlay absolute inset-0 opacity-20" />
            </div>
          )}

          <Link
            to="/"
            aria-label="Pokedex"
            title="Pokedex"
            aria-current={isDex ? 'page' : undefined}
            className={cn(
              'group relative z-10 flex h-[64px] flex-col items-center justify-center gap-1.5 rounded-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
              isDex ? 'text-[var(--theme-primary)]' : 'text-zinc-600 hover:text-white',
            )}
          >
            <div className="transition-transform active:scale-90">
              <LayoutGrid
                size={20}
                strokeWidth={isDex ? 2.5 : 2}
                className={cn(isDex && 'drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.8)]')}
              />
            </div>
            <span className="font-bold text-[9px] uppercase tracking-widest">SYS.DEX</span>
          </Link>

          <Link
            to="/storage"
            aria-label="Storage"
            title="Storage"
            aria-current={isStorage ? 'page' : undefined}
            className={cn(
              'group relative z-10 flex h-[64px] flex-col items-center justify-center gap-1.5 rounded-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
              isStorage ? 'text-[var(--theme-primary)]' : 'text-zinc-600 hover:text-white',
            )}
          >
            <div className="transition-transform active:scale-90">
              <Database
                size={20}
                strokeWidth={isStorage ? 2.5 : 2}
                className={cn(isStorage && 'drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.8)]')}
              />
            </div>
            <span className="font-bold text-[9px] uppercase tracking-widest">SYS.STRG</span>
          </Link>

          <Link
            to="/assistant"
            aria-label="Assistant"
            title="Assistant"
            aria-current={isAssistant ? 'page' : undefined}
            className={cn(
              'group relative z-10 flex h-[64px] flex-col items-center justify-center gap-1.5 rounded-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
              isAssistant ? 'text-[var(--theme-primary)]' : 'text-zinc-600 hover:text-white',
            )}
          >
            <div className="transition-transform active:scale-90">
              <Sparkles
                size={20}
                strokeWidth={isAssistant ? 2.5 : 2}
                className={cn(isAssistant && 'drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.8)]')}
              />
            </div>
            <span className="font-bold text-[9px] uppercase tracking-widest">SYS.ASST</span>
          </Link>

          <Link
            to="/dag"
            aria-label="DAG"
            title="DAG"
            aria-current={isDag ? 'page' : undefined}
            className={cn(
              'group relative z-10 flex h-[64px] flex-col items-center justify-center gap-1.5 rounded-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
              isDag ? 'text-[var(--theme-primary)]' : 'text-zinc-600 hover:text-white',
            )}
          >
            <div className="transition-transform active:scale-90">
              <GitGraph
                size={20}
                strokeWidth={isDag ? 2.5 : 2}
                className={cn(isDag && 'drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.8)]')}
              />
            </div>
            <span className="font-bold text-[9px] uppercase tracking-widest">SYS.DAG</span>
          </Link>
        </div>
      </div>

      <div className="mt-auto border-zinc-800 border-t border-dashed p-2">
        <button
          type="button"
          onClick={() => setIsSettingsOpen(true)}
          aria-label="Open settings menu"
          title="Open settings menu"
          aria-expanded={isSettingsOpen}
          className="group relative flex h-[64px] w-full flex-col items-center justify-center gap-1.5 rounded-none text-zinc-600 transition-all duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          <div className="transition-transform active:scale-90">
            <Settings2 size={20} strokeWidth={2} />
          </div>
          <span className="font-bold text-[9px] uppercase tracking-widest">SYS.MENU</span>
        </button>
      </div>
    </nav>
  );
}
