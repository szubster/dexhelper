import * as fs from 'node:fs';
import { replaceFrontmatterStatus } from './utils/replace-status.ts';

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("Usage: node promote-frontmatter.ts <file_path> <target_status>");
  process.exit(1);
}

const filePath = args[0];
const targetStatus = args[1];

if (!fs.existsSync(filePath)) {
  console.error(`Error: File not found - ${filePath}`);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf-8');
const updatedContent = replaceFrontmatterStatus(content, targetStatus);
fs.writeFileSync(filePath, updatedContent, 'utf-8');

console.log(`Successfully updated ${filePath} to status ${targetStatus}`);
