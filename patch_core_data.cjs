const fs = require('fs');

const path = 'tests/e2e/core_data_fetch.spec.ts';
let content = fs.readFileSync(path, 'utf8');

// Replace standard page.on('request') with page.route to properly intercept fetch since Service Worker might intercept it
content = content.replace(
  /page\.on\('request', \(request\) => \{[\s\S]*?\}\);/,
  `await page.route('**/pokedata-core.msgpack', async (route) => {
      isFetched = true;
      await route.continue();
    });`
);

fs.writeFileSync(path, content);
console.log('Patched core_data_fetch.spec.ts');
