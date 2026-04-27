import re

with open('.foundry/stories/story-014-029-async-startup-hydration.md', 'r') as f:
    content = f.read()

content = re.sub(r'depends_on:\s*\n', 'depends_on: []\n', content)

with open('.foundry/stories/story-014-029-async-startup-hydration.md', 'w') as f:
    f.write(content)
