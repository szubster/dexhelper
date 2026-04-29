import { Link, useLocation } from '@tanstack/react-router';
import { Database, LayoutGrid, Settings2, Sparkles } from 'lucide-react';
import { useStore } from '../store';
import { cn } from '../utils/cn';

export function BottomNav() {
  const saveData = useStore((s) => s.saveData);
  const setIsSettingsOpen = useStore((s) => s.setIsSettingsOpen);
  const location = useLocation();

  if (!saveData) return null;

  const isDex = location.pathname === '/' || location.pathname.startsWith('/pokemon');
  const isStorage = location.pathname === '/storage';
  const isAssistant = location.pathname === '/assistant';

  const activeIndex = isDex ? 0 : isStorage ? 1 : isAssistant ? 2 : -1;

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-zinc-800 border-t border-dashed bg-zinc-950 px-2 pt-2 pb-[env(safe-area-inset-bottom,16px)] font-mono shadow-[0_-20px_50px_rgba(0,0,0,0.8)] sm:hidden">
      {/* Hardware top lip */}
      <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50" />

      {/* Telemetry decoration */}
      <div className="absolute -top-[21px] left-4 flex gap-1 rounded-t border border-zinc-800 border-b-0 border-dashed bg-zinc-950 px-3 py-1 font-black text-[8px] text-zinc-600 tracking-widest">
        <span className="animate-pulse text-[var(--theme-primary)]">●</span> LINK_ACTIVE
      </div>

      <div className="relative mx-auto grid max-w-sm grid-cols-4 items-center">
        {/* Active Indicator Brackets */}
        {activeIndex !== -1 && (
          <div
            className="pointer-events-none absolute z-0 h-full w-[25%] transition-transform duration-500 ease-out"
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          >
            <div className="absolute top-0 left-2 h-2 w-2 border-[var(--theme-primary)] border-t-2 border-l-2" />
            <div className="absolute top-0 right-2 h-2 w-2 border-[var(--theme-primary)] border-t-2 border-r-2" />
            <div className="absolute bottom-0 left-2 h-2 w-2 border-[var(--theme-primary)] border-b-2 border-l-2" />
            <div className="absolute right-2 bottom-0 h-2 w-2 border-[var(--theme-primary)] border-r-2 border-b-2" />
            <div className="absolute inset-x-2 inset-y-0 bg-[var(--theme-primary)]/10" />
            <div className="scanline-overlay absolute inset-x-2 inset-y-0 opacity-20" />
          </div>
        )}

        <Link
          to="/"
          className={cn(
            'group relative z-10 flex flex-col items-center gap-1.5 rounded-sm py-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
            isDex ? 'text-[var(--theme-primary)]' : 'text-zinc-600',
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
          className={cn(
            'group relative z-10 flex flex-col items-center gap-1.5 rounded-sm py-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
            isStorage ? 'text-[var(--theme-primary)]' : 'text-zinc-600',
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
          className={cn(
            'group relative z-10 flex flex-col items-center gap-1.5 rounded-sm py-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
            isAssistant ? 'text-[var(--theme-primary)]' : 'text-zinc-600',
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

        <button
          type="button"
          onClick={() => setIsSettingsOpen(true)}
          aria-label="Open settings menu"
          className="group relative z-10 flex flex-col items-center gap-1.5 rounded-sm py-2 text-zinc-600 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
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
