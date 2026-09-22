import fs from 'node:fs';
import path from 'node:path';

// Define directory relative to the repository root
const TASKS_DIR = path.join(process.cwd(), '.foundry', 'tasks');

async function migrateTaskReminders() {
  if (!fs.existsSync(TASKS_DIR)) {
    console.error(`Directory not found: ${TASKS_DIR}`);
    return;
  }

  const files = fs.readdirSync(TASKS_DIR).filter((f) => f.endsWith('.md'));
  let modifiedCount = 0;

  for (const file of files) {
    const filePath = path.join(TASKS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Parse status using a simple regex since we just need the status from the YAML frontmatter
    const statusMatch = content.match(/^status:\s*(ACTIVE|PENDING|READY)\s*$/m);

    if (!statusMatch) {
      continue; // Skip tasks not in target states or without matching status
    }

    // Regex to match "### REMINDER FOR CODER" or "### REMINDER FOR QA"
    // and all following content up to the next heading or the end of the file.
    const regex =
      /^### REMINDER FOR (?:CODER|QA)[\s\S]*?(?=(?:^#|$(?![\s\S])))/gm;

    if (regex.test(content)) {
      const newContent = content.replace(regex, '');
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`Migrated: ${file}`);
      modifiedCount++;
    }
  }

  console.log(`Migration complete. Modified ${modifiedCount} files.`);
}

migrateTaskReminders().catch(console.error);
