#!/usr/bin/env -S npx tsx
import { analyzePlaywrightPaths } from './core.ts';

const filePaths = ['tests/e2e/**/*.ts', 'tests/helpers/**/*.ts'];
const results = analyzePlaywrightPaths(filePaths);

if (results.length > 0) {
  console.log(`Found ${results.length} invalid page.goto path(s):`);
  for (const result of results) {
    console.log(`${result.file}:${result.line}:${result.column} - Path: "${result.path}"`);
  }
  process.exit(1);
} else {
  console.log('No invalid page.goto paths found.');
  process.exit(0);
}
