const fs = require('fs');

const path = 'tests/e2e/core_data_fetch.spec.ts';
let content = fs.readFileSync(path, 'utf8');

// Also remove let isFetched = false; to fix ts error
content = content.replace(
  /let isFetched = false;\n/,
  ''
);

fs.writeFileSync(path, content);
console.log('Patched core_data_fetch.spec.ts');
