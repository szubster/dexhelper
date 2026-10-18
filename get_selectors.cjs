const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:4173/dexhelper/');
  await page.waitForTimeout(5000);

  // load yellow.sav
  const saveBuffer = fs.readFileSync('tests/fixtures/yellow.sav');
  const saveArray = Array.from(saveBuffer);
  await page.evaluate(
      async ({ saveArray }) => {
        // IndexedDB injection
        const SAVE_DB_NAME = 'SaveDB';
        const STORE_NAME = 'saves';

        const db = await new Promise((resolve, reject) => {
          const request = indexedDB.open(SAVE_DB_NAME, 2);
          request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
              db.createObjectStore(STORE_NAME);
            }
          };
          request.onsuccess = (event) => resolve(event.target.result);
          request.onerror = (event) => reject(event.target.error);
        });

        await new Promise((resolve, reject) => {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          const request = store.put(new Uint8Array(saveArray), 'last_save_file');
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
        db.close();
      },
      { saveArray },
    );

  await page.reload();
  await page.waitForTimeout(5000);

  const searchInput = page.getByTestId('search-input');
  await searchInput.click({ force: true });
  await searchInput.fill('Pikachu');
  await page.waitForTimeout(1000);

  const targetCard = page.getByTestId('pokedex-card').first();
  await targetCard.click({ force: true });
  await page.waitForTimeout(3000);

  const html = await page.content();
  fs.writeFileSync('details_dom.html', html);

  await browser.close();
})();
