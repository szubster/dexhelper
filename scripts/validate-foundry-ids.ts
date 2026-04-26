import fs from 'node:fs';
import path from 'node:path';

function getFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      getFiles(path.join(dir, file), fileList);
    } else {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

function validateIds() {
  const foundryDir = path.resolve('.foundry');
  if (!fs.existsSync(foundryDir)) {
    console.error('No .foundry directory found.');
    process.exit(0);
  }

  const allFiles = getFiles(foundryDir);
  const targetFiles = allFiles.filter(file => {
    if (!file.endsWith('.md')) return false;
    const relativePath = path.relative(foundryDir, file);
    const normalizedRelative = relativePath.split(path.sep).join('/');
    if (normalizedRelative.startsWith('docs/')) return false;
    if (normalizedRelative.startsWith('journals/')) return false;
    return true;
  });

  const ids = new Set<string>();
  let hasError = false;

  const ideaRegex = /^idea-\d{3}-[a-z0-9-]+$/;
  const otherRegex = /^(prd|epic|story|task)-\d{3}-\d{3}-[a-z0-9-]+$/;

  for (const file of targetFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const idMatch = content.match(/^id:\s*"?([^"\n]+)"?/m);

    if (idMatch && idMatch[1]) {
      const id = idMatch[1].trim();

      if (ids.has(id)) {
        console.error(`Error: Duplicate ID found: ${id} in file ${file}`);
        hasError = true;
      }
      ids.add(id);

      if (id.startsWith('idea-')) {
        if (!ideaRegex.test(id)) {
          console.error(`Error: Invalid ID format for IDEA node: ${id} in file ${file}`);
          hasError = true;
        }
      } else {
        if (!otherRegex.test(id)) {
          console.error(`Error: Invalid ID format for node: ${id} in file ${file}`);
          hasError = true;
        }
      }
    } else {
      console.error(`Error: No ID found in frontmatter of file ${file}`);
      hasError = true;
    }
  }

  if (hasError) {
    process.exit(1);
  } else {
    console.log('All Foundry IDs are valid.');
  }
}

validateIds();
