const fs = require('fs');

const path = 'tests/e2e/core_data_fetch.spec.ts';
let content = fs.readFileSync(path, 'utf8');

// The best way to mock/intercept network requests when a service worker is present is using addInitScript to wrap window.fetch
content = content.replace(
  /await page\.route\('[\s\S]*?\}\);/,
  `await page.addInitScript(() => {
      const originalFetch = window.fetch;
      window.fetch = async (...args) => {
        const url = typeof args[0] === 'string' ? args[0] : args[0].url;
        if (url && url.includes('pokedata-core.msgpack')) {
          window.__msgpackFetched = true;
        }
        return originalFetch(...args);
      };
    });`
);

content = content.replace(
  /expect\(isFetched\)\.toBe\(true\);/,
  `const wasFetched = await page.evaluate(() => window.__msgpackFetched);
    expect(wasFetched).toBe(true);`
);

fs.writeFileSync(path, content);
console.log('Patched core_data_fetch.spec.ts');
