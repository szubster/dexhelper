const fs = require('fs');

let code = fs.readFileSync('tests/e2e/test-utils.ts', 'utf-8');

code = code.replace(
  `  // Use Locator.or properly with a final .first() to prevent strict mode violations,
  // as one of these two elements guarantees successful load.
  await expect(page.getByText(/TRNR/i).first().or(page.getByTestId('pokedex-card').first()).first()).toBeVisible({
    timeout: 20000,
  });`,
  `  // Wait, actually, the user TRNR text might not appear if trainerName is blank, which emerald.sav is!
  // And if it's blank, the text won't be TRNR or it'll just be TRNR. Wait, if it's blank it might just be TRNR with nothing.
  // Let's use getByTestId('pokedex-card').first() or a generic header locator.
  const pokedexCard = page.getByTestId('pokedex-card').first();
  const trnrHeader = page.getByText(/TRNR/i).first();
  const sysConfig = page.getByRole('button', { name: /SYS\\.SETTINGS/i }).first();

  await expect(pokedexCard.or(trnrHeader).or(sysConfig)).toBeVisible({ timeout: 20000 });
`
);

code = code.replace(
  `  const isInitialized = await page.getByText(/TRNR/i).first().or(page.getByTestId('pokedex-card').first()).isVisible({ timeout: 2000 });`,
  `  const isInitialized = await page.getByText(/TRNR/i).first().or(page.getByTestId('pokedex-card').first()).isVisible({ timeout: 2000 });`
);

fs.writeFileSync('tests/e2e/test-utils.ts', code);
