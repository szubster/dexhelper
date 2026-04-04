import React from 'react';
import { motion } from 'motion/react';
import {
  Upload, Settings2, RefreshCw, AlertTriangle, LayoutGrid, Database, Zap, Sparkles
} from 'lucide-react';
import { useStore } from '../store';
import type { GameVersion } from '../store';
import { parseSaveFile } from '../engine/saveParser/index';
import { getGenerationConfig, VERSION_THEMES } from '../utils/generationConfig';
import { SettingsModal } from './SettingsModal';
import { VersionModal } from './VersionModal';
import { BottomNav } from './BottomNav';
import { Link } from '@tanstack/react-router';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const saveData = useStore((s) => s.saveData);
  const setSaveData = useStore((s) => s.setSaveData);
  const error = useStore((s) => s.error);
  const setError = useStore((s) => s.setError);
  const manualVersion = useStore((s) => s.manualVersion);
  const setManualVersion = useStore((s) => s.setManualVersion);
  const setIsSettingsOpen = useStore((s) => s.setIsSettingsOpen);
  const setIsVersionModalOpen = useStore((s) => s.setIsVersionModalOpen);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer;
        const data = parseSaveFile(buffer, manualVersion || undefined);
        setSaveData(data);
        setError(null);

        if (data.gameVersion === 'unknown') {
          setIsVersionModalOpen(true);
        } else {
          setManualVersion(null);
        }

        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]!);
        }
        localStorage.setItem('last_save_file', window.btoa(binary));
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to parse save file.';
        setError(message);
        setSaveData(null);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const effectiveVersion = manualVersion || saveData?.gameVersion || 'unknown';
  const themeClass = VERSION_THEMES[effectiveVersion.toLowerCase()] || '';

  return (
    <div className={`app-layout ${themeClass}`}>
      {/* Top Bar Indicator */}
      {/* Top Bar Indicator */}
      <div className="fixed inset-0 z-50 pointer-events-none" style={{ height: '0.5rem', backgroundColor: 'var(--theme-primary)' }}>
        <div className="absolute inset-0 lcd-flicker" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
      </div>

      <div className="app-container">
        <header className="glass-card app-header">

          <div className="header-left">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-col flex">
                <div className="flex items-center gap-2">
                  <span className="brand-title">
                    DEX<span className="text-primary">HELPER</span>
                  </span>
                </div>
                <div className="flex items-center gap-2" style={{ marginTop: '-4px' }}>
                  <span className="font-retro brand-subtitle">
                    {saveData ? getGenerationConfig(saveData.generation).label : 'Protocol X'}
                  </span>
                  <div style={{ height: '1px', flex: 1, backgroundColor: '#27272a' }} />
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            {saveData && (
              <nav className="desktop-nav">
                <Link
                  to="/"
                  activeProps={{ className: 'active' }}
                  className="desktop-nav-link"
                >
                  <LayoutGrid size={16} /> Pokedex
                </Link>
                <Link
                  to="/storage"
                  activeProps={{ className: 'active' }}
                  className="desktop-nav-link"
                >
                  <Database size={16} /> Storage
                </Link>
                <Link
                  to="/assistant"
                  activeProps={{ className: 'active' }}
                  className="desktop-nav-link"
                >
                  <Sparkles size={16} /> Assistant
                </Link>
              </nav>
            )}
          </div>

          {saveData ? (
            <div className="header-right">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card trainer-card">
                <div className="flex-col flex">
                  <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: '#71717a' }}>Trainer</span>
                  <span className="text-xs font-mono font-black text-primary uppercase">
                    {saveData.trainerName || 'UNKNOWN'}
                  </span>
                </div>
                <div className="trainer-card-divider" />
                <div className="flex-col flex">
                  <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: '#71717a' }}>ID</span>
                  <span className="text-xs font-mono font-bold" style={{ color: '#d4d4d8' }}>
                    {String(saveData.trainerId).padStart(5, '0')}
                  </span>
                </div>

                {/* Living Dex Progress */}
                <div className="trainer-card-divider mx-1" />
                <div className="flex-col flex" style={{ minWidth: '120px' }}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: '#71717a' }}>Living Dex</span>
                    <span className="text-[10px] font-mono font-black text-primary">
                      {(() => {
                         const securedIds = new Set([...saveData.party, ...saveData.pc]);
                         const total = getGenerationConfig(saveData.generation).maxDex;
                         const percent = Math.floor((securedIds.size / total) * 100);
                         return `${percent}%`;
                      })()}
                    </span>
                  </div>
                  <div style={{ height: '0.25rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '9999px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(() => {
                        const securedIds = new Set([...saveData.party, ...saveData.pc]);
                        const total = getGenerationConfig(saveData.generation).maxDex;
                        return (securedIds.size / total) * 100;
                      })()}%` }}
                      style={{ height: '100%', backgroundColor: 'var(--theme-primary)', boxShadow: '0 0 10px var(--theme-primary)' }}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.button
                 onClick={() => setIsVersionModalOpen(true)}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="retro-button version-btn"
                 style={{
                   backgroundColor: effectiveVersion === 'unknown' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(var(--theme-primary-rgb), 0.1)',
                   color: effectiveVersion === 'unknown' ? '#f59e0b' : 'var(--theme-primary)',
                   borderColor: effectiveVersion === 'unknown' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(var(--theme-primary-rgb), 0.2)'
                 }}
               >
                  <Zap size={12} />
                  {effectiveVersion}
              </motion.button>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  aria-label="System Settings"
                  className="retro-button btn-icon"
                  title="System Settings"
                >
                  <Settings2 size={20} />
                </button>
                <label
                  className="retro-button btn-icon"
                  title="Import New Save"
                >
                  <RefreshCw size={20} />
                  <input type="file" accept=".sav" style={{ display: 'none' }} onChange={handleFileUpload} />
                </label>
              </div>
            </div>
          ) : (
            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              role="button"
              className="btn-init"
            >
              <Upload size={20} />
              Initialize Pokedex
              <input type="file" accept=".sav" style={{ display: 'none' }} onChange={handleFileUpload} />
            </motion.label>
          )}
        </header>

        {error && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="glass-card system-error"
          >
            <AlertTriangle size={24} style={{ flexShrink: 0 }} />
            <div className="flex-col flex">
              <span className="text-[10px] font-black uppercase tracking-tighter">System Error</span>
              <span className="text-sm font-bold">{error}</span>
            </div>
          </motion.div>
        )}

        <main className="main-content">
          {children}
        </main>
      </div>

      <BottomNav />
      <SettingsModal />
      <VersionModal />

      {/* Retro Background Pattern */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.03, zIndex: -1, overflow: 'hidden' }}>
        <div className="scanline-overlay" style={{ position: 'absolute', inset: 0 }} />
      </div>
    </div>
  );
}
