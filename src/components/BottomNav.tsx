import { motion } from 'motion/react';
import { LayoutGrid, Database, Settings2, Sparkles } from 'lucide-react';
import { useStore } from '../store';
import { Link, useLocation } from '@tanstack/react-router';

export function BottomNav() {
  const saveData = useStore((s) => s.saveData);
  const setIsSettingsOpen = useStore((s) => s.setIsSettingsOpen);
  const location = useLocation();

  if (!saveData) return null;

  const isDex = location.pathname === '/' || location.pathname.startsWith('/pokemon');
  const isStorage = location.pathname === '/storage';
  const isAssistant = location.pathname === '/assistant';

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-inner relative">
        {/* Active Indicator Background */}
        <motion.div
          layoutId="active-pill"
          style={{ position: 'absolute', height: '3rem', width: '22%', backgroundColor: 'rgba(var(--theme-primary-rgb), 0.1)', borderRadius: '1rem', border: '1px solid rgba(var(--theme-primary-rgb), 0.2)', zIndex: -10 }}
          animate={{ x: isDex ? '-150%' : isStorage ? '-50%' : isAssistant ? '50%' : '150%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        <Link to="/" className={`bottom-nav-item ${isDex ? 'active' : ''}`}>
          <motion.div whileTap={{ scale: 0.8 }} className="bottom-nav-icon">
            <LayoutGrid size={22} style={isDex ? { filter: 'drop-shadow(0 0 8px rgba(var(--theme-primary-rgb),0.5))' } : {}} />
          </motion.div>
          <span className="bottom-nav-text uppercase tracking-retro">Pokedex</span>
        </Link>

        <Link to="/storage" className={`bottom-nav-item ${isStorage ? 'active' : ''}`}>
          <motion.div whileTap={{ scale: 0.8 }} className="bottom-nav-icon">
            <Database size={22} style={isStorage ? { filter: 'drop-shadow(0 0 8px rgba(var(--theme-primary-rgb),0.5))' } : {}} />
          </motion.div>
          <span className="bottom-nav-text uppercase tracking-retro">Storage</span>
        </Link>

        <Link to="/assistant" className={`bottom-nav-item ${isAssistant ? 'active' : ''}`}>
          <motion.div whileTap={{ scale: 0.8 }} className="bottom-nav-icon">
            <Sparkles size={22} style={isAssistant ? { filter: 'drop-shadow(0 0 8px rgba(var(--theme-primary-rgb),0.5))' } : {}} />
          </motion.div>
          <span className="bottom-nav-text uppercase tracking-retro">Assistant</span>
        </Link>

        <button onClick={() => setIsSettingsOpen(true)} className="bottom-nav-item">
          <motion.div whileTap={{ scale: 0.8 }} className="bottom-nav-icon">
            <Settings2 size={22} />
          </motion.div>
          <span className="bottom-nav-text uppercase tracking-retro">Menu</span>
        </button>
      </div>
    </nav>
  );
}
