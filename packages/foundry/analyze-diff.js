import fs from 'node:fs';

export function analyzeDiff(diffText) {
  const lines = diffText.split('\n');
  let hasValidChanges = false;
  let currentFileIsJournal = false;
  let hasConfidenceChange = false;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('diff --git ')) {
      // The original script has a bug where extended git headers like 'new file mode' might be considered a bad prefix if not skipped.
      const match = line.match(/^diff --git a\/(.+?) b\/(.+?)$/);

      if (match) {
        // If file is deleted, b/ is the filename. If created, b/ is the filename.
        const filename = match[2];
        if (filename.startsWith('.foundry/journals/') || filename.startsWith('.jules/')) {
          currentFileIsJournal = true;
          // Note: Just because we saw a journal file in diff header, doesn't mean it has changes yet, but if it has changes we'll process them below. However, for empty file creations, git diff might have NO +/- lines.
          hasValidChanges = true;
        } else {
          currentFileIsJournal = false;
        }
      }
      i++;
      continue;
    }

    // Skip headers and unchanged lines - THESE ARE SAFE TO SKIP EVERYWHERE
    if (
      line.startsWith('index') ||
      line.startsWith('---') ||
      line.startsWith('+++ ') ||
      line.startsWith('@@') ||
      line.startsWith(' ') ||
      line === '' ||
      line.startsWith('\\ No newline at end of file') ||
      line.startsWith('old mode ') ||
      line.startsWith('new mode ') ||
      line.startsWith('similarity index ') ||
      line.startsWith('rename from ') ||
      line.startsWith('rename to ')
    ) {
      i++;
      continue;
    }

    // Check for file creations/deletions. Non-journal files shouldn't be created/deleted if we're only auto-merging checkboxes.
    if (
      line.startsWith('new file mode ') ||
      line.startsWith('deleted file mode ')
    ) {
      if (!currentFileIsJournal) {
        return false;
      }
      i++;
      continue;
    }

    // Process hunks of additions/removals
    if (line.startsWith('-') || line.startsWith('+')) {
      if (currentFileIsJournal) {
        hasValidChanges = true;
        i++;
        continue;
      }

      const removed = [];
      const added = [];

      while (i < lines.length && (lines[i].startsWith('-') || lines[i].startsWith('+'))) {
        if (lines[i].startsWith('-')) removed.push(lines[i].slice(1));
        else added.push(lines[i].slice(1));
        i++;
      }

      const remainingRemoved = [];
      const remainingAdded = [];
      // Every remaining removal must have a corresponding addition for it to be a pure "checkbox mark"
      if (removed.length !== added.length) return false;

      let hunkHasCheckboxChanges = false;
      for (let j = 0; j < removed.length; j++) {
        const r = removed[j];
        const a = added[j];

        // Match checkboxes: [ ] -> [x] or [X]
        // Note: The leading dash/plus prefix was already sliced off above.
        // But the checkbox line itself contains a hyphen-bullet like "- [ ] task"

        const rReplaced = r.replace(/^\s*-\s*\[\s\]/, 'CHECKBOX_MARKER');
        const aReplaced = a.replace(/^\s*-\s*\[[xX]\]/, 'CHECKBOX_MARKER');

        const isCheckboxChange = (rReplaced === aReplaced) && /^\s*-\s*\[\s\]/.test(r);

        const isConfidenceChange = a.startsWith('confidence_score:') && r.startsWith('confidence_score:');
        if (isConfidenceChange) hasConfidenceChange = true;

        if (!isCheckboxChange && !isConfidenceChange) return false;
        if (isCheckboxChange) hunkHasCheckboxChanges = true;
      }

      if (hunkHasCheckboxChanges || hasConfidenceChange) {
        hasValidChanges = true;
      } else if (remainingRemoved.length === 0 && remainingAdded.length === 0 && !hasConfidenceChange) {
        return false;
      }
    } else {
      // Any other unexpected line prefix means it's not a clean diff we want to auto-merge
      return false;
    }
  }

  return hasValidChanges;
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('analyze-diff.js')) {
  const diff = fs.readFileSync(0, 'utf-8');
  if (analyzeDiff(diff)) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}
