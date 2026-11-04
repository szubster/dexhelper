import fs from 'node:fs';

export function analyzeDiff(diffText) {
  const lines = diffText.split('\n');
  let hasValidChanges = false;
  let currentFileIsJournal = false;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('diff --git ')) {
      // Check if it is a .foundry/ or .jules/ journal file
      const match = line.match(/^diff --git a\/(.+?) b\/(.+?)$/);
      if (match) {
        const filename = match[2];
        if (filename.startsWith('.foundry/journals/') || filename.startsWith('.jules/')) {
          currentFileIsJournal = true;
          hasValidChanges = true;
        } else {
          currentFileIsJournal = false;
        }
      }
      i++;
      continue;
    }

    // Skip git headers and standard untouched lines
    if (
      line.startsWith('index ') ||
      line.startsWith('--- ') ||
      line.startsWith('+++ ') ||
      line.startsWith('@@ ') ||
      line.startsWith(' ') ||
      line === '' ||
      line.startsWith('\\ No newline') ||
      line.startsWith('old mode ') ||
      line.startsWith('new mode ') ||
      line.startsWith('similarity index ') ||
      line.startsWith('rename from ') ||
      line.startsWith('rename to ')
    ) {
      i++;
      continue;
    }

    if (line.startsWith('new file mode ') || line.startsWith('deleted file mode ')) {
      if (!currentFileIsJournal) return false;
      i++;
      continue;
    }

    // Examine hunks of modifications
    if (line.startsWith('-') || line.startsWith('+')) {
      if (currentFileIsJournal) {
        hasValidChanges = true;
        i++;
        continue;
      }

      const removed = [];
      const added = [];

      while (i < lines.length && (lines[i].startsWith('-') || lines[i].startsWith('+'))) {
        if (lines[i].startsWith('---')) break; // handle next file edgecase safely if ever adjacent
        if (lines[i].startsWith('-')) removed.push(lines[i].slice(1));
        else added.push(lines[i].slice(1));
        i++;
      }

      // If we have changes in a non-journal file, they must be perfectly paired checkbox/confidence changes
      if (removed.length !== added.length) return false;

      let hunkHasCheckboxOrConfidenceChanges = false;
      for (let j = 0; j < removed.length; j++) {
        const r = removed[j];
        const a = added[j];

        const isCheckboxChange = (r.replace(/^\s*-\s*\[\s\]/, 'CB') === a.replace(/^\s*-\s*\[[xX]\]/, 'CB')) && /^\s*-\s*\[\s\]/.test(r);
        const isConfidenceChange = a.startsWith('confidence_score:') && r.startsWith('confidence_score:');

        if (!isCheckboxChange && !isConfidenceChange) return false;
        hunkHasCheckboxOrConfidenceChanges = true;
      }
      if (hunkHasCheckboxOrConfidenceChanges) hasValidChanges = true;
    } else {
      // Unknown line prefix format
      return false;
    }
  }

  return hasValidChanges;
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('analyze-diff.js')) {
  const diff = fs.readFileSync(0, 'utf-8');
  if (analyzeDiff(diff)) process.exit(0);
  else process.exit(1);
}
