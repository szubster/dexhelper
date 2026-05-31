import re

# Fix AppHeader
with open('src/components/AppHeader.tsx', 'r') as f:
    app_header = f.read()

# Make sure Activity is imported
if 'Activity,' not in app_header and 'Activity ' not in app_header:
    app_header = app_header.replace('Database,', 'Activity, Database,')

# Insert useStore correctly if not present
if 'const nuzlockeGraveyardBox = useStore((s) => s.nuzlockeGraveyardBox);' not in app_header:
    sig_end = app_header.find("}: AppHeaderProps) {")
    body_start = sig_end + len("}: AppHeaderProps) {")
    app_header = app_header[:body_start] + "\n  const nuzlockeGraveyardBox = useStore((s) => s.nuzlockeGraveyardBox);" + app_header[body_start:]

link_block_app = """
            {nuzlockeGraveyardBox && (
              <Link
                to="/run"
                activeProps={{
                  className:
                    'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.3)]',
                }}
                inactiveProps={{
                  className: 'border-transparent text-zinc-500 hover:text-white hover:border-white/20',
                }}
                className="group relative flex items-center gap-2 rounded-none border border-dashed px-6 py-2.5 font-black font-mono text-[10px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                <CornerCrosshairs className="h-1.5 w-1.5 border-current opacity-50 transition-colors group-hover:opacity-100" />
                <Activity size={14} />
                SYS.RUN
              </Link>
            )}
"""

if "SYS.RUN" not in app_header:
    app_header = app_header.replace('SYS.ASST\n            </Link>', 'SYS.ASST\n            </Link>' + link_block_app.rstrip('\n'))

with open('src/components/AppHeader.tsx', 'w') as f:
    f.write(app_header)

# Fix BottomNav
with open('src/components/BottomNav.tsx', 'r') as f:
    bottom_nav = f.read()

if 'Activity,' not in bottom_nav and 'Activity ' not in bottom_nav:
    bottom_nav = bottom_nav.replace('Database,', 'Activity, Database,')

if 'const nuzlockeGraveyardBox = useStore((s) => s.nuzlockeGraveyardBox);' not in bottom_nav:
    sig_end = bottom_nav.find("export function BottomNav() {")
    body_start = sig_end + len("export function BottomNav() {")
    bottom_nav = bottom_nav[:body_start] + "\n  const nuzlockeGraveyardBox = useStore((s) => s.nuzlockeGraveyardBox);" + bottom_nav[body_start:]

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

if "RUN" not in bottom_nav and "to=\"/run\"" not in bottom_nav:
    bottom_nav = bottom_nav.replace('<button\n          type="button"\n          onClick={() => setIsSettingsOpen(true)}', link_block_bottom.strip('\n') + '\n\n        <button\n          type="button"\n          onClick={() => setIsSettingsOpen(true)}')
    bottom_nav = bottom_nav.replace('grid-cols-5', 'grid-cols-6')
    bottom_nav = bottom_nav.replace('isDag ? 3 : -1', 'isDag ? 3 : isRun ? 4 : -1')
    bottom_nav = bottom_nav.replace("const isDag = location.pathname === '/dag';", "const isDag = location.pathname === '/dag';\n  const isRun = location.pathname === '/run';")

with open('src/components/BottomNav.tsx', 'w') as f:
    f.write(bottom_nav)
