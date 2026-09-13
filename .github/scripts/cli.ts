import fs from 'node:fs';
import path from 'node:path';
import { removeWipBanner } from './utils/banner.js';

export function processFiles(dir: string): void {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processFiles(filePath);
    } else if (file.endsWith('.md')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const updatedContent = removeWipBanner(content);
      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf-8');
        console.log(`Updated ${filePath}`);
      }
    }
  }
}

export function main(args: string[]): void {
  const targetDir = args[2];

  if (!targetDir) {
    console.error('Usage: tsx cli.ts <directory>');
    process.exit(1);
    return;
  }

  const resolvedDir = path.resolve(targetDir);

  if (!fs.existsSync(resolvedDir)) {
    console.error(`Directory not found: ${resolvedDir}`);
    process.exit(1);
    return;
  }

  processFiles(resolvedDir);
}

if (process.argv[1] && process.argv[1].endsWith('cli.ts') && !process.env.VITEST) {
  main(process.argv);
}
