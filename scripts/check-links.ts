import fs from 'node:fs';
import path from 'node:path';

function extractFrontmatterPaths(fm: string): string[] {
  const paths: string[] = [];
  const lines = fm.split('\n');
  let inDependsOn = false;

  for (const line of lines) {
    if (line.startsWith('depends_on:')) {
      const remainder = line.slice('depends_on:'.length).trim();
      if (remainder.startsWith('[')) {
        const arrStr = remainder.slice(1, remainder.indexOf(']'));
        const items = arrStr.split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
        paths.push(...items);
        inDependsOn = false;
      } else {
        inDependsOn = true;
      }
      continue;
    }

    if (inDependsOn) {
      if (line.match(/^\s*-/)) {
        const pathStr = line.replace(/^\s*-/, '').trim().replace(/^["']|["']$/g, '');
        if (pathStr) {
          paths.push(pathStr);
        }
        continue;
      } else if (line.match(/^[a-zA-Z0-9_-]+:/)) {
        inDependsOn = false;
      }
    }

    if (line.startsWith('parent:')) {
      inDependsOn = false;
      const parentVal = line.slice('parent:'.length).trim().replace(/^["']|["']$/g, '');
      if (parentVal && parentVal !== 'null') {
        paths.push(parentVal);
      }
    }
  }
  return paths;
}

function extractInlineLinks(content: string): string[] {
  const links: string[] = [];
  // Ignore links in inline code blocks or regular code blocks. For a simple parser, we'll just parse lines and skip lines that are code blocks or links that contain backticks around them roughly.
  // Actually, standard markdown links in backticks will not be matched if we don't look inside them, but `[text](./path)` inside a backtick will be matched by a simple regex. Let's do a simple approach.

  // Strip out code blocks
  content = content.replace(/```[\s\S]*?```/g, '');
  // Strip out inline code
  content = content.replace(/`[^`]*`/g, '');

  const regex = /\[[^\]]*\]\(\s*([^)]+)\s*\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    let link = match[1]?.trim();
    if (!link) continue;
    if (link.startsWith('http://') || link.startsWith('https://') || link.startsWith('mailto:') || link.startsWith('#')) {
      continue;
    }
    link = link.split('#')[0] || '';
    if (link) {
      links.push(link);
    }
  }
  return links;
}

function checkLinks() {
  const files = process.argv.slice(2);
  let hasErrors = false;

  for (const file of files) {
    if (!file.endsWith('.md')) {
      continue;
    }

    try {
      const content = fs.readFileSync(file, 'utf8');
      const hasFrontmatter = content.startsWith('---');
      let frontmatter = '';
      let body = content;

      if (hasFrontmatter) {
        const fmEndIndex = content.indexOf('---', 3);
        if (fmEndIndex !== -1) {
          frontmatter = content.slice(3, fmEndIndex);
          body = content.slice(fmEndIndex + 3);
        }
      }

      if (file.startsWith('.foundry/') && frontmatter) {
        const fmPaths = extractFrontmatterPaths(frontmatter);
        for (const fmPath of fmPaths) {
          const absolutePath = path.resolve(process.cwd(), fmPath);
          if (!fs.existsSync(absolutePath)) {
            console.error(`❌ Broken link in ${file}: Frontmatter path '${fmPath}' does not exist.`);
            hasErrors = true;
          }
        }
      }

      const inlineLinks = extractInlineLinks(body);
      for (const link of inlineLinks) {
        const relativePath = path.resolve(path.dirname(file), link);
        const rootPath = path.resolve(process.cwd(), link);

        if (!fs.existsSync(relativePath) && !fs.existsSync(rootPath)) {
          console.error(`❌ Broken link in ${file}: Inline link '${link}' does not exist.`);
          hasErrors = true;
        }
      }

    } catch (e) {
      console.error(`Error processing file ${file}:`, e);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    process.exit(1);
  }
}

checkLinks();
