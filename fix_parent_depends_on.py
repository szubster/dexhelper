import os
import re

def get_all_valid_nodes(base_dir='.foundry'):
    valid_nodes = set()
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.md'):
                valid_nodes.add(file[:-3])
    return valid_nodes

def fix_frontmatter():
    valid_nodes = get_all_valid_nodes()

    for root, dirs, files in os.walk('.foundry'):
        for file in files:
            if not file.endswith('.md'):
                continue

            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()

            if not content.startswith('---'):
                continue

            # split frontmatter
            parts = content.split('---', 2)
            if len(parts) < 3:
                continue

            frontmatter = parts[1]
            lines = frontmatter.split('\n')
            new_lines = []

            modified = False

            i = 0
            while i < len(lines):
                line = lines[i]

                # Check parent
                if line.startswith('parent:'):
                    parent_val = line.split('parent:', 1)[1].strip()
                    if parent_val:
                        parent_val = parent_val.strip("'\"")
                        if parent_val.endswith('.md'):
                            parent_val = parent_val[:-3]

                        if parent_val != 'null' and parent_val not in valid_nodes:
                            new_lines.append('parent: null')
                            modified = True
                        else:
                            if line != f'parent: {parent_val}':
                                new_lines.append(f'parent: {parent_val}')
                                modified = True
                            else:
                                new_lines.append(line)
                    else:
                        new_lines.append(line)
                    i += 1
                    continue

                # Check depends_on array items (multi-line) or single line empty/null
                if line.startswith('depends_on:'):
                    val = line.split('depends_on:', 1)[1].strip()
                    if val in ['null', '""', "''", "[]"]:
                        if line != 'depends_on: []':
                            new_lines.append('depends_on: []')
                            modified = True
                        else:
                            new_lines.append(line)
                        i += 1
                        continue

                    if not val:
                        # Check next lines for array items
                        j = i + 1
                        items = []
                        is_empty = True
                        while j < len(lines):
                            if lines[j].strip().startswith('-'):
                                item = lines[j].strip()[1:].strip().strip("'\"")
                                if item.endswith('.md'):
                                    item = item[:-3]
                                if item in valid_nodes:
                                    items.append(item)
                                else:
                                    modified = True
                                is_empty = False
                            elif ':' in lines[j] and not lines[j].strip().startswith('#'):
                                break
                            elif lines[j].strip() == '':
                                pass
                            else:
                                break
                            j += 1

                        if is_empty or len(items) == 0:
                            if line != 'depends_on: []':
                                new_lines.append('depends_on: []')
                                modified = True
                            else:
                                new_lines.append(line)
                        else:
                            new_lines.append('depends_on:')
                            for item in items:
                                new_lines.append(f'  - {item}')

                        i = j
                        continue

                new_lines.append(line)
                i += 1

            if modified:
                new_frontmatter = '\n'.join(new_lines)
                new_content = f'---{new_frontmatter}---{parts[2]}'
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f'Fixed {filepath}')

if __name__ == "__main__":
    fix_frontmatter()
