const fs = require('fs');

const path = 'tests/e2e/test-utils.ts';
let content = fs.readFileSync(path, 'utf8');

// Use page.evaluate to correctly preserve PokeDB using a specific check
content = content.replace(
  `for (const db of databases) {
      if (db.name) window.indexedDB.deleteDatabase(db.name);
    }`,
  `for (const db of databases) {
      if (db.name && db.name !== 'PokeDB') window.indexedDB.deleteDatabase(db.name);
    }`
);

fs.writeFileSync(path, content);
console.log('Patched clearStorage correctly this time');
