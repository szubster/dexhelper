import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Represents a journal entry from an agent.
 */
export interface JournalEntry {
  persona: string;
  filePath: string;
  content: string;
}

/**
 * Ingests all agent journals from the specified base directory.
 * @param baseDir - The root directory containing persona subdirectories with journals.
 * @returns A promise that resolves to an array of JournalEntry objects.
 */
export async function ingestJournals(baseDir: string): Promise<JournalEntry[]> {
  const entries: JournalEntry[] = [];
  try {
    const stats = await fs.stat(baseDir);
    if (!stats.isDirectory()) return entries;
  } catch {
    return entries; // Directory doesn't exist
  }

  const personas = await fs.readdir(baseDir);

  for (const persona of personas) {
    const personaDir = path.join(baseDir, persona);

    try {
      const stats = await fs.stat(personaDir);
      if (!stats.isDirectory()) continue;
    } catch {
      continue;
    }

    const files = await fs.readdir(personaDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    // Sort to ensure predictable order
    mdFiles.sort();

    for (const file of mdFiles) {
      const filePath = path.join(personaDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      entries.push({
        persona,
        filePath,
        content
      });
    }
  }

  return entries;
}

async function main() {
  const foundryJournalsDir = path.join(process.cwd(), '.foundry/journals');
  const entries = await ingestJournals(foundryJournalsDir);
  console.log(JSON.stringify(entries, null, 2));
}

// Ensure this script can be run directly
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  main().catch(console.error);
}
