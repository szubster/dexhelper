#!/usr/bin/env node

import * as fs from 'node:fs/promises';
import * as path from 'node:path';

async function main() {
  console.log('Schema linting started...');
  // Logic to parse schema.md and validate node frontmatter schemas will go here.
  console.log(`Initialized fs: ${typeof fs.readFile}`);
  console.log(`Initialized path: ${typeof path.join}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
