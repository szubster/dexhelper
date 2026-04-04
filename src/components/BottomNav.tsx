import { Show, createMemo } from 'solid-js';
import { LayoutGrid, Database, Settings2, Sparkles } from 'lucide-solid';
import { saveData, setIsSettingsOpen } from '../store';
import { A, useLocation } from '@solidjs/router';
import { cn } from '../utils/cn';

export function BottomNav() {
  const location = useLocation();

  const isDex = createMemo(() => location.pathname === '/' || location.pathname.startsWith('/pokemon'));
  const isStorage = createMemo(() => location.pathname === '/storage');
  const isAssistant = createMemo(() => location.pathname === '/assistant');

  return (
    <Show when={saveData()}>
      <nav class="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/60 backdrop-blur-2xl border-t border-white/5 px-6 pb-[env(safe-area-inset-bottom,20px)] pt-3 sm:hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div class="flex justify-around items-center max-w-sm mx-auto relative px-2">
          {/* Active Indicator Background */}
          <div
            class="absolute h-12 w-[22%] bg-[var(--theme-primary)]/10 rounded-2xl border border-[var(--theme-primary)]/20 -z-10 transition-transform duration-500 ease-out"
            style={{ "transform": `translateX(${isDex() ? '-150%' : isStorage() ? '-50%' : isAssistant() ? '50%' : '150%'})` }}
          />

          <A
            href="/"
            class={cn(
              "flex flex-col items-center gap-1 transition-all duration-300 py-1 active:scale-90",
              isDex() ? 'text-[var(--theme-primary)]' : 'text-zinc-500'
            )}
          >
            <div class="transition-transform active:scale-90">
              <LayoutGrid size={22} class={cn(isDex() && "drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]")} />
            </div>
            <span class="text-[8px] font-black uppercase tracking-[0.2em]">Pokedex</span>
          </A>

          <A
            href="/storage"
            class={cn(
              "flex flex-col items-center gap-1 transition-all duration-300 py-1 active:scale-90",
              isStorage() ? 'text-[var(--theme-primary)]' : 'text-zinc-500'
            )}
          >
            <div class="transition-transform active:scale-90">
              <Database size={22} class={cn(isStorage() && "drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]")} />
            </div>
            <span class="text-[8px] font-black uppercase tracking-[0.2em]">Storage</span>
          </A>

          <A
            href="/assistant"
            class={cn(
              "flex flex-col items-center gap-1 transition-all duration-300 py-1 active:scale-90",
              isAssistant() ? 'text-[var(--theme-primary)]' : 'text-zinc-500'
            )}
          >
            <div class="transition-transform active:scale-90">
              <Sparkles size={22} class={cn(isAssistant() && "drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]")} />
            </div>
            <span class="text-[8px] font-black uppercase tracking-[0.2em]">Assistant</span>
          </A>

          <button
            onClick={() => setIsSettingsOpen(true)}
            class="flex flex-col items-center gap-1 transition-all duration-300 py-1 text-zinc-500 active:scale-90"
          >
            <div class="transition-transform active:scale-90">
              <Settings2 size={22} />
            </div>
            <span class="text-[8px] font-black uppercase tracking-[0.2em]">Menu</span>
          </button>
        </div>
      </nav>
    </Show>
  );
}
