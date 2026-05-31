import re

with open('src/components/BottomNav.tsx', 'r') as f:
    content = f.read()

# Make sure Activity is imported
if 'Activity,' not in content and 'Activity ' not in content:
    content = content.replace('Database,', 'Activity, Database,')

if 'import { useStore } from' not in content:
    content = "import { useStore } from '../store';\n" + content

# BottomNav does not have `}: BottomNavProps) {`, it's `export function BottomNav() {`
sig_end = content.find("export function BottomNav() {")
if sig_end != -1:
    body_start = sig_end + len("export function BottomNav() {")
    content = content[:body_start] + "\n  const nuzlockeGraveyardBox = useStore((s) => s.nuzlockeGraveyardBox);" + content[body_start:]

link_block_bottom = """
        {nuzlockeGraveyardBox && (
          <Link
            to="/run"
            aria-label="Run Dashboard"
            title="Run Dashboard"
            aria-current={isRun ? 'page' : undefined}
            className={cn(
              'group relative z-10 flex flex-col items-center gap-1.5 rounded-none py-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
              isRun ? 'text-[var(--theme-primary)]' : 'text-zinc-600 hover:text-zinc-400',
            )}
          >
            {isRun && <div className="lcd-flicker absolute inset-0 bg-[var(--theme-primary)]/5" />}
            <div className={cn('transition-transform', isRun ? 'animate-pulse' : 'active:scale-90')}>
              <Activity
                size={20}
                strokeWidth={isRun ? 2.5 : 2}
                className={cn(isRun && 'drop-shadow-[0_0_10px_rgba(var(--theme-primary-rgb),1)]')}
              />
            </div>
            <span className="font-bold font-mono text-[9px] uppercase tracking-[0.2em]">{isRun ? '[ RUN ]' : 'RUN'}</span>
          </Link>
        )}
"""

if "RUN" not in content and "to=\"/run\"" not in content:
    content = content.replace('<button\n          type="button"\n          onClick={() => setIsSettingsOpen(true)}', link_block_bottom.strip('\n') + '\n\n        <button\n          type="button"\n          onClick={() => setIsSettingsOpen(true)}')
    content = content.replace('grid-cols-5', 'grid-cols-6')
    content = content.replace('isDag ? 3 : -1', 'isDag ? 3 : isRun ? 4 : -1')
    content = content.replace("const isDag = location.pathname === '/dag';", "const isDag = location.pathname === '/dag';\n  const isRun = location.pathname === '/run';")

with open('src/components/BottomNav.tsx', 'w') as f:
    f.write(content)
