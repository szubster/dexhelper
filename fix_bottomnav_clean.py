import re

with open('src/components/BottomNav.tsx', 'r') as f:
    content = f.read()

# Fix isRun redefined:
content = content.replace("const isDag = location.pathname === '/dag';\n  const isRun = location.pathname === '/run';", "const isDag = location.pathname === '/dag';")

with open('src/components/BottomNav.tsx', 'w') as f:
    f.write(content)
