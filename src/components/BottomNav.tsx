import React from 'react';
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
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-900 px-8 py-4 sm:hidden shadow-2xl">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <Link 
          to="/"
          className={`flex flex-col items-center gap-1.5 transition-all ${isDex ? 'text-red-500' : 'text-zinc-600'}`}
        >
          <div className={`p-1 rounded-lg transition-colors ${isDex ? 'bg-red-500/10' : ''}`}>
            <LayoutGrid size={22} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest">Dex</span>
        </Link>
        <Link 
          to="/storage"
          className={`flex flex-col items-center gap-1.5 transition-all ${isStorage ? 'text-red-500' : 'text-zinc-600'}`}
        >
          <div className={`p-1 rounded-lg transition-colors ${isStorage ? 'bg-red-500/10' : ''}`}>
            <Database size={22} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest">Storage</span>
        </Link>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className={`flex flex-col items-center gap-1.5 transition-all text-zinc-600`}
        >
          <div className={`p-1 rounded-lg transition-colors`}>
            <Settings2 size={22} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest">Menu</span>
        </button>
      </div>
    </nav>
  );
}
