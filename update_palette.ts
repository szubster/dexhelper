import fs from 'fs';

const FILE_PATH = '.jules/palette.md';

const newMemory = `
## 2024-05-21 - Added tooltips to interactive card elements
**Learning:** For accessibility and micro-UX, interactive card elements that act as links or triggers must provide a \`title\` attribute for sighted users alongside the \`aria-label\` for screen readers.
**Action:** When creating or modifying card components that handle click events (e.g. \`TacticalCard\`), ensure they accept and render a \`title\` prop matching their \`aria-label\`.
`;

const content = fs.readFileSync(FILE_PATH, 'utf-8');
fs.writeFileSync(FILE_PATH, content + '\n' + newMemory, 'utf-8');
console.log('Successfully updated palette.md');
