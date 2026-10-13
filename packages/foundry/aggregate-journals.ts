import fs from 'node:fs/promises';
import path from 'node:path';

async function aggregateJournals(baseDir: string, archiveBaseDir: string) {
  try {
    const stats = await fs.stat(baseDir);
    if (!stats.isDirectory()) return;
  } catch {
    return; // Directory doesn't exist
  }

  const personas = await fs.readdir(baseDir);

  for (const persona of personas) {
    const personaDir = path.join(baseDir, persona);
    const archivePersonaDir = path.join(archiveBaseDir, persona);

    try {
      const stats = await fs.stat(personaDir);
      if (!stats.isDirectory()) continue;
    } catch {
      continue;
    }

    const files = await fs.readdir(personaDir);
    const mdFiles = files.filter(f => f.endsWith('.md') && f !== 'master.md');

    if (mdFiles.length === 0) continue;

    await fs.mkdir(archivePersonaDir, { recursive: true });

    const masterFilePath = path.join(personaDir, 'master.md');

    // Sort files to ensure predictable order
    mdFiles.sort();

    let masterContent = '';
    try {
      masterContent = await fs.readFile(masterFilePath, 'utf-8');
    } catch {
      masterContent = '';
    }

    for (const file of mdFiles) {
      const filePath = path.join(personaDir, file);
      const content = await fs.readFile(filePath, 'utf-8');

      const normContent = content.trim().replace(/\s+/g, ' ');
      const normMaster = masterContent.trim().replace(/\s+/g, ' ');

      if (normContent && !normMaster.includes(normContent)) {
        const separator = masterContent.trim() ? `\n\n---\n\n` : '';
        const toAppend = `${separator}${content.trim()}`;
        await fs.appendFile(masterFilePath, toAppend);
        masterContent += `\n${content.trim()}`;
      }

      // Delete the processed file
      await fs.unlink(filePath);
      console.log(`Aggregated and deleted: ${filePath}`);
    }
  }
}

async function main() {
  const foundryJournalsDir = path.join(process.cwd(), '.foundry/journals');
  const foundryArchiveJournalsDir = path.join(process.cwd(), '.foundry/archive/journals');

  const julesJournalsDir = path.join(process.cwd(), '.jules');
  const julesArchiveJournalsDir = path.join(process.cwd(), '.foundry/archive/jules');

  console.log('Aggregating .foundry/journals...');
  await aggregateJournals(foundryJournalsDir, foundryArchiveJournalsDir);

  console.log('Aggregating .jules...');
  await aggregateJournals(julesJournalsDir, julesArchiveJournalsDir);

  console.log('Journal aggregation complete.');
}

main().catch(console.error);
