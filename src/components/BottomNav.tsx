import { motion } from 'motion/react';
import { LayoutGrid, Database, Settings2, Sparkles } from 'lucide-react';
import { useStore } from '../store';
import { Link, useLocation } from '@tanstack/react-router';
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/60 backdrop-blur-2xl border-t border-white/5 px-6 pb-[env(safe-area-inset-bottom,20px)] pt-3 sm:hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center max-w-sm mx-auto relative px-2">
        {/* Active Indicator Background */}
        <motion.div
          layoutId="active-pill"
          className="absolute h-12 w-[22%] bg-[var(--theme-primary)]/10 rounded-2xl border border-[var(--theme-primary)]/20 -z-10"
          animate={{ x: isDex ? '-150%' : isStorage ? '-50%' : isAssistant ? '50%' : '150%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        <Link
          to="/"
          className={cn(
            "flex flex-col items-center gap-1 transition-all duration-300 py-1",
            isDex ? 'text-[var(--theme-primary)]' : 'text-zinc-500'
          )}
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <LayoutGrid size={22} className={cn(isDex && "drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]")} />
          </motion.div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Pokedex</span>
        </Link>

        <Link
          to="/storage"
          className={cn(
            "flex flex-col items-center gap-1 transition-all duration-300 py-1",
            isStorage ? 'text-[var(--theme-primary)]' : 'text-zinc-500'
          )}
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <Database size={22} className={cn(isStorage && "drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]")} />
          </motion.div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Storage</span>
        </Link>

        <Link
          to="/assistant"
          className={cn(
            "flex flex-col items-center gap-1 transition-all duration-300 py-1",
            isAssistant ? 'text-[var(--theme-primary)]' : 'text-zinc-500'
          )}
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <Sparkles size={22} className={cn(isAssistant && "drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]")} />
          </motion.div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Assistant</span>
        </Link>

        <button
          onClick={() => setIsSettingsOpen(true)}
          className="flex flex-col items-center gap-1 transition-all duration-300 py-1 text-zinc-500"
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <Settings2 size={22} />
          </motion.div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Menu</span>
        </button>
      </div>
    </nav>
  );
}
