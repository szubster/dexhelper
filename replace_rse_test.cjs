const fs = require('fs');

let code = fs.readFileSync('tests/e2e/gen3_rse_data_extraction.spec.ts', 'utf-8');

code = code.replace(
  `await initializeWithSave(page, 'tests/fixtures/emerald.sav');`,
  `await page.goto('.');
    await page.evaluate(() => {
      localStorage.setItem('pokemon-game-version', 'emerald');
      localStorage.setItem('pokemon-game-generation', '3');
    });

    await initializeWithSave(page, 'tests/fixtures/emerald.sav');`
);

fs.writeFileSync('tests/e2e/gen3_rse_data_extraction.spec.ts', code);
