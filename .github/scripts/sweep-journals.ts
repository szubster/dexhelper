import * as fs from 'node:fs';
import * as path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const _require = createRequire(import.meta.url);
const matter = _require('gray-matter') as typeof import('gray-matter');

export interface SweepJournalsOptions {
  maxAgeDays?: number;
  archiveDirFoundry?: string;
  archiveDirJules?: string;
  dryRun?: boolean;
}

export function sweepJournals(repoRoot: string, options: SweepJournalsOptions = {}): string[] {
  const maxAgeMs = (options.maxAgeDays || 30) * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const sweptFiles: string[] = [];

  const foundryJournalsDir = path.join(repoRoot, '.foundry', 'journals');
  const julesJournalsDir = path.join(repoRoot, '.jules');

  const archiveDirFoundry = options.archiveDirFoundry || path.join(repoRoot, '.foundry', 'archive', 'journals');
  const archiveDirJules = options.archiveDirJules || path.join(repoRoot, '.foundry', 'archive', 'jules');

  function processDir(baseDir: string, archiveBaseDir: string) {
    if (!fs.existsSync(baseDir)) return;

    function walk(currentDir: string) {
      let entries: fs.Dirent[];
      try {
        entries = fs.readdirSync(currentDir, { withFileTypes: true });
      } catch {
        return;
      }

      for (const e of entries) {
        if (e.name === 'archive' && currentDir === path.join(repoRoot, '.foundry')) {
          continue;
        }

        const fullPath = path.join(currentDir, e.name);

        if (e.isDirectory()) {
          walk(fullPath);
        } else if (e.isFile() && e.name.endsWith('.md')) {
          let shouldSweep = false;

          try {
            const stats = fs.statSync(fullPath);
            const ageMs = now - stats.mtimeMs;

            if (ageMs > maxAgeMs) {
              shouldSweep = true;
            } else {
              const content = fs.readFileSync(fullPath, 'utf-8');
              const parsed = matter(content);

              if (parsed.data && parsed.data.processed === true) {
                shouldSweep = true;
              }
            }
          } catch {
            // Ignore errors
          }

          if (shouldSweep) {
            try {
              const relativePath = path.relative(baseDir, fullPath);
              const archivePath = path.join(archiveBaseDir, relativePath);
              const archiveDir = path.dirname(archivePath);

              if (!options.dryRun) {
                if (!fs.existsSync(archiveDir)) {
                  fs.mkdirSync(archiveDir, { recursive: true });
                }
                fs.renameSync(fullPath, archivePath);
              }
              sweptFiles.push(fullPath);
            } catch (err) {
              console.error(`Failed to move ${fullPath} to archive`, err);
            }
          }
        }
      }
    }

    walk(baseDir);
  }

  processDir(foundryJournalsDir, archiveDirFoundry);
  processDir(julesJournalsDir, archiveDirJules);

  return sweptFiles;
}

const isMain = process.argv[1] && import.meta.url && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const repoRoot = process.cwd();
  // using dryRun for testing the CLI unless args say otherwise, but for real we want to move
  const dryRun = process.argv.includes('--dry-run');
  const swept = sweepJournals(repoRoot, { dryRun });
  console.log(`Swept ${swept.length} journals.`);
  for (const s of swept) {
    console.log(` - ${s}`);
  }
}
