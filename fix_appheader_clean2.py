import re

with open('src/components/AppHeader.tsx', 'r') as f:
    content = f.read()

# Make sure Activity is imported
if 'Activity,' not in content and 'Activity ' not in content:
    content = content.replace('Database,', 'Activity, Database,')

if 'import { useStore } from' not in content:
    content = "import { useStore } from '../store';\n" + content

# Insert the hook properly after the function signature and before other hooks
# We need to find `export function AppHeader({`
# and the matching `}: AppHeaderProps) {`
# and insert `  const nuzlockeGraveyardBox = useStore((s) => s.nuzlockeGraveyardBox);`
# right after `{`.

sig_end = content.find("}: AppHeaderProps) {")
if sig_end != -1:
    body_start = sig_end + len("}: AppHeaderProps) {")
    content = content[:body_start] + "\n  const nuzlockeGraveyardBox = useStore((s) => s.nuzlockeGraveyardBox);" + content[body_start:]

link_block = """
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

content = content.replace('SYS.ASST\n            </Link>', 'SYS.ASST\n            </Link>' + link_block.rstrip('\n'))

with open('src/components/AppHeader.tsx', 'w') as f:
    f.write(content)
