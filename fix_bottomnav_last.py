import re

with open('src/components/BottomNav.tsx', 'r') as f:
    content = f.read()

# Fix isRun defined multiple times
lines = content.split('\n')
is_run_count = sum(1 for line in lines if 'const isRun = location.pathname' in line)

if is_run_count > 1:
    new_lines = []
    found = False
    for line in lines:
        if 'const isRun = location.pathname' in line:
            if not found:
                new_lines.append(line)
                found = True
            else:
                pass # skip duplicates
        else:
            new_lines.append(line)
    content = '\n'.join(new_lines)

with open('src/components/BottomNav.tsx', 'w') as f:
    f.write(content)
