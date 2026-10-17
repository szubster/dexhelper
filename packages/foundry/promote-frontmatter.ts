import * as fs from 'node:fs';
import { replaceFrontmatterStatus } from './utils/replace-status.ts';
import { WIP_DRAFT_BANNER, removeWipBanner } from './utils/banner.ts';

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
let updatedContent = replaceFrontmatterStatus(content, targetStatus);

if (targetStatus === 'WIP' || targetStatus === 'DRAFT') {
  const bodyMatch = updatedContent.match(/^(---[\s\S]*?^---\s*[\r\n]+)([\s\S]*)$/m);
  if (bodyMatch) {
    const [_, frontmatter, body] = bodyMatch;
    if (!body.includes(WIP_DRAFT_BANNER)) {
      updatedContent = `${frontmatter}${WIP_DRAFT_BANNER}\n\n${body}`;
    }
  }
} else {
  const bodyMatch = updatedContent.match(/^(---[\s\S]*?^---\s*[\r\n]+)([\s\S]*)$/m);
  if (bodyMatch) {
    const [_, frontmatter, body] = bodyMatch;
    updatedContent = `${frontmatter}${removeWipBanner(body)}`;
  }
}

fs.writeFileSync(filePath, updatedContent, 'utf-8');

console.log(`Successfully updated ${filePath} to status ${targetStatus}`);
