import { motion } from 'motion/react';
import { LayoutGrid, Database, Settings2, Sparkles } from 'lucide-react';
import { useStore } from '@nanostores/react';
import * as Store from '../store';
import { cn } from '../utils/cn';

export function BottomNav({ currentPath }: { currentPath: string }) {
  const saveData = useStore(Store.saveData);
  const setIsSettingsOpen = Store.setIsSettingsOpen;

  if (!saveData) return null;

  // Use the passed in currentPath which will be correctly provided by Astro on the server,
  // preventing hydration mismatch that happens when falling back to '/'.
  // Once hydrated, window.location.pathname might be used but currentPath works just as well.
  const pathname = currentPath;
  // Account for base URL /dexhelper in production paths
  const cleanPath = pathname.replace('/dexhelper', '');
  const isDex = cleanPath === '/' || cleanPath === '' || cleanPath.startsWith('/pokemon');
  const isStorage = cleanPath.startsWith('/storage');
  const isAssistant = cleanPath.startsWith('/assistant');

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

        <a
          href="/"
          className={cn(
            "flex flex-col items-center gap-1 transition-all duration-300 py-1",
            isDex ? 'text-[var(--theme-primary)]' : 'text-zinc-500'
          )}
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <LayoutGrid size={22} className={cn(isDex && "drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]")} />
          </motion.div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Pokedex</span>
        </a>

        <a
          href="/storage"
          className={cn(
            "flex flex-col items-center gap-1 transition-all duration-300 py-1",
            isStorage ? 'text-[var(--theme-primary)]' : 'text-zinc-500'
          )}
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <Database size={22} className={cn(isStorage && "drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]")} />
          </motion.div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Storage</span>
        </a>

        <a
          href="/assistant"
          className={cn(
            "flex flex-col items-center gap-1 transition-all duration-300 py-1",
            isAssistant ? 'text-[var(--theme-primary)]' : 'text-zinc-500'
          )}
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <Sparkles size={22} className={cn(isAssistant && "drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]")} />
          </motion.div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Assistant</span>
        </a>

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
