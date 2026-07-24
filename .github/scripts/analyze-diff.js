import fs from 'node:fs';

const diff = fs.readFileSync(0, 'utf-8');

function analyzeDiff(diffText) {
  const lines = diffText.split('\n');
  let hasCheckboxChanges = false;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Skip headers and unchanged lines
    if (
      line.startsWith('diff --git') ||
      line.startsWith('index') ||
      line.startsWith('---') ||
      line.startsWith('+++') ||
      line.startsWith('@@') ||
      line.startsWith(' ') ||
      line === '' ||
      line.startsWith('\\ No newline at end of file')
    ) {
      i++;
      continue;
    }

    // Process hunks of additions/removals
    if (line.startsWith('-') || line.startsWith('+')) {
      const removed = [];
      const added = [];

      while (i < lines.length && (lines[i].startsWith('-') || lines[i].startsWith('+'))) {
        if (lines[i].startsWith('-')) removed.push(lines[i].slice(1));
        else added.push(lines[i].slice(1));
        i++;
      }

      // Every removal must have a corresponding addition for it to be a pure "checkbox mark"
      if (removed.length !== added.length) return false;

      for (let j = 0; j < removed.length; j++) {
        const r = removed[j];
        const a = added[j];

        // Match checkboxes: [ ] -> [x] or [X]
        // Note: The leading dash/plus prefix was already sliced off above.
        // But the checkbox line itself contains a hyphen-bullet like "- [ ] task"

        const rReplaced = r.replace(/^\s*-\s*\[\s\]/, 'CHECKBOX_MARKER');
        const aReplaced = a.replace(/^\s*-\s*\[[xX]\]/, 'CHECKBOX_MARKER');

        const isCheckboxChange = (rReplaced === aReplaced) && /^\s*-\s*\[\s\]/.test(r);

        if (!isCheckboxChange) return false;
        hasCheckboxChanges = true;
      }
    } else {
      // Any other unexpected line prefix means it's not a clean diff we want to auto-merge
      return false;
    }
  }

  return hasCheckboxChanges;
}

if (analyzeDiff(diff)) {
  process.exit(0);
} else {
  process.exit(1);
}
