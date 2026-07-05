import os
files = []
for root, dirs, filenames in os.walk('.foundry/docs'):
    for filename in filenames:
        if filename.endswith('.md'):
            files.append(os.path.join(root, filename))
for f in sorted(files):
    print(f)
