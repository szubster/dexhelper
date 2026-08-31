const fs = require('fs');

let content = fs.readFileSync('src/components/__tests__/StorageGrid.test.tsx', 'utf8');
content = content.replace(
  "const errorLed = container.querySelector('.border-red-500.shadow-\\\\[0_0_8px_rgba\\\\(239\\\\,68\\\\,68\\\\,0\\\\.8\\\\)\\\\]');",
  "const errorLed = container.querySelector('.border-red-500.shadow-\\\\[0_0_8px_rgba\\\\(239\\\\,68\\\\,68\\\\,0\\\\.8\\\\)\\\\]');"
);
//Actually let's just re-add the missing tests and remove duplicates
