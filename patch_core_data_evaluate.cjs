const fs = require('fs');

const path = 'tests/e2e/core_data_fetch.spec.ts';
let content = fs.readFileSync(path, 'utf8');

// The original test didn't mock properly when the service worker is active.
// Also clearStorage is wiping it out. Wait, `clearStorage` calls `page.goto('.')`!
// So our `page.route` setup was cleared or applied too late.
// Let's modify the test to do clearStorage first, then setup the route, then goto.

content = content.replace(
  /let isFetched = false;\n\s*await page\.route\([\s\S]*?\}\);\n\n\s*await clearStorage\(page\);\n\s*await page\.goto\('\.'\);/,
  `await clearStorage(page);

    let isFetched = false;
    await page.route('**/pokedata-core.msgpack', async (route) => {
      isFetched = true;
      await route.continue();
    });

    // We must manually delete the PokeDB so that it's forced to re-fetch on reload, since we fixed clearStorage to preserve it
    await page.evaluate(() => {
      window.indexedDB.deleteDatabase('PokeDB');
    });

    await page.goto('.');`
);

fs.writeFileSync(path, content);
console.log('Patched core_data_fetch.spec.ts');
