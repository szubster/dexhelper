import { motion } from 'motion/react';
import { LayoutGrid, Database, Settings2 } from 'lucide-react';
import { useAppState } from '../state';
import { Link, useLocation } from '@tanstack/react-router';

export function BottomNav() {
  const { saveData, setIsSettingsOpen } = useAppState();
  const location = useLocation();

  if (!saveData) return null;

  const isDex = location.pathname === '/' || location.pathname.startsWith('/pokemon');
  const isStorage = location.pathname === '/storage';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-900/50 px-8 py-3 sm:hidden shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-center max-w-sm mx-auto">
        <Link 
          to="/"
          className={`group flex flex-col items-center gap-1.5 transition-all ${isDex ? 'text-red-500' : 'text-zinc-500'}`}
        >
          <motion.div 
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-xl transition-all ${isDex ? 'bg-red-500/10 shadow-lg shadow-red-500/10' : 'group-hover:bg-zinc-900'}`}
          >
            <LayoutGrid size={20} />
          </motion.div>
          <span className={`text-[9px] font-black uppercase tracking-widest ${isDex ? 'opacity-100' : 'opacity-60'}`}>Dex</span>
        </Link>
        <Link 
          to="/storage"
          className={`group flex flex-col items-center gap-1.5 transition-all ${isStorage ? 'text-red-500' : 'text-zinc-500'}`}
        >
          <motion.div 
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-xl transition-all ${isStorage ? 'bg-red-500/10 shadow-lg shadow-red-500/10' : 'group-hover:bg-zinc-900'}`}
          >
            <Database size={20} />
          </motion.div>
          <span className={`text-[9px] font-black uppercase tracking-widest ${isStorage ? 'opacity-100' : 'opacity-60'}`}>Storage</span>
        </Link>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className={`group flex flex-col items-center gap-1.5 transition-all text-zinc-500`}
        >
          <motion.div 
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-xl transition-all group-hover:bg-zinc-900`}
          >
            <Settings2 size={20} />
          </motion.div>
          <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Menu</span>
        </button>
      </div>
    </nav>
  );
}
