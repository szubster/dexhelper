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

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-white/5 border-t bg-zinc-950/60 px-6 pt-3 pb-[env(safe-area-inset-bottom,20px)] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:hidden">
      <div className="relative mx-auto flex max-w-sm items-center justify-around px-2">
        {/* Active Indicator Background */}
        <div
          className="absolute -z-10 h-12 w-[22%] rounded-2xl border border-[var(--theme-primary)]/20 bg-[var(--theme-primary)]/10 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(${isDex ? '-150%' : isStorage ? '-50%' : isAssistant ? '50%' : '150%'})`,
          }}
        />

        <Link
          to="/"
          className={cn(
            'flex flex-col items-center gap-1 py-1 transition-all duration-300',
            isDex ? 'text-[var(--theme-primary)]' : 'text-zinc-500',
          )}
        >
          <div className="transition-transform active:scale-80">
            <LayoutGrid size={22} className={cn(isDex && 'drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]')} />
          </div>
          <span className="font-black text-[8px] uppercase tracking-[0.2em]">Pokedex</span>
        </Link>

        <Link
          to="/storage"
          className={cn(
            'flex flex-col items-center gap-1 py-1 transition-all duration-300',
            isStorage ? 'text-[var(--theme-primary)]' : 'text-zinc-500',
          )}
        >
          <div className="transition-transform active:scale-80">
            <Database
              size={22}
              className={cn(isStorage && 'drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]')}
            />
          </div>
          <span className="font-black text-[8px] uppercase tracking-[0.2em]">Storage</span>
        </Link>

        <Link
          to="/assistant"
          className={cn(
            'flex flex-col items-center gap-1 py-1 transition-all duration-300',
            isAssistant ? 'text-[var(--theme-primary)]' : 'text-zinc-500',
          )}
        >
          <div className="transition-transform active:scale-80">
            <Sparkles
              size={22}
              className={cn(isAssistant && 'drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]')}
            />
          </div>
          <span className="font-black text-[8px] uppercase tracking-[0.2em]">Assistant</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsSettingsOpen(true)}
          aria-label="Open settings menu"
          className="flex flex-col items-center gap-1 py-1 text-zinc-500 transition-all duration-300"
        >
          <div className="transition-transform active:scale-80">
            <Settings2 size={22} />
          </div>
          <span className="font-black text-[8px] uppercase tracking-[0.2em]">Menu</span>
        </button>
      </div>
    </nav>
  );
}
