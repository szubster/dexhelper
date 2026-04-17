import 'fake-indexeddb/auto';
import { openDB } from 'idb';

async function run() {
  const db = await openDB('test-db', 1, {
    upgrade(db) {
      db.createObjectStore('pokemon', { keyPath: 'id' });
    },
  });

  // Populate
  const tx = db.transaction('pokemon', 'readwrite');
  for (let i = 1; i <= 1000; i++) {
    tx.store.put({ id: i, n: `Bulbasaur ${i}` });
  }
  await tx.done;

  const idsToFetch = Array.from({length: 150}, (_, i) => i + 1);

  // Measure Promise.all(db.get)
  const start1 = performance.now();
  for(let iter=0; iter<10; iter++) {
    await Promise.all(idsToFetch.map(id => db.get('pokemon', id)));
  }
  const end1 = performance.now();
  console.log(`db.get (N transactions): ${(end1 - start1).toFixed(2)}ms`);

  // Measure single tx with store.get
  const start2 = performance.now();
  for(let iter=0; iter<10; iter++) {
    const tx2 = db.transaction('pokemon', 'readonly');
    const store2 = tx2.objectStore('pokemon');
    await Promise.all(idsToFetch.map(id => store2.get(id)));
  }
  const end2 = performance.now();
  console.log(`Single tx store.get: ${(end2 - start2).toFixed(2)}ms`);

  // Measure getAll
  const start3 = performance.now();
  for(let iter=0; iter<10; iter++) {
    const all = await db.getAll('pokemon');
    const filtered = all.filter(p => idsToFetch.includes(p.id));
  }
  const end3 = performance.now();
  console.log(`getAll + filter: ${(end3 - start3).toFixed(2)}ms`);

  process.exit(0);
}

run();
