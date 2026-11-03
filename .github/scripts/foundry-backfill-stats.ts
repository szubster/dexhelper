/**
 * foundry-backfill-stats.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * CLI utility to backfill historical statistics by traversing git history.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { parseArgs } from 'node:util';

export function parseCliArgs(args: string[]) {
  const options = {
    daily: { type: 'boolean' as const },
    commit: { type: 'string' as const },
    help: { type: 'boolean' as const },
  };

  const { values } = parseArgs({ args, options, strict: true });
  return values;
}

export function printHelp() {
  console.log(`
Usage: tsx foundry-backfill-stats.ts [options]

Options:
  --daily        Backfill statistics on a daily interval.
  --commit <sha> Backfill statistics for a specific commit SHA.
  --help         Show this help message.
  `);
}

function main() {
  const args = process.argv.slice(2);

  let values;
  try {
    values = parseCliArgs(args);
  } catch (err: any) {
    console.error(`Error parsing arguments: ${err.message}`);
    printHelp();
    process.exit(1);
  }

  if (values.help) {
    printHelp();
    process.exit(0);
  }

  console.log('CLI scaffold complete. Arguments parsed:', values);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
