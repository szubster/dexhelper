const fs = require('fs');

const path = 'tests/e2e/test-utils.ts';
let content = fs.readFileSync(path, 'utf8');

// Undo the change to clearStorage since it broke the network request tests (the DB being there prevents fetching)
content = content.replace(
  `for (const db of databases) {
      if (db.name && db.name !== 'PokeDB') window.indexedDB.deleteDatabase(db.name);
    }`,
  `for (const db of databases) {
      if (db.name) window.indexedDB.deleteDatabase(db.name);
    }`
);

fs.writeFileSync(path, content);
console.log('Restored clearStorage');
