cat << 'DIFF' > test-utils.diff
--- tests/e2e/test-utils.ts
+++ tests/e2e/test-utils.ts
@@ -66,7 +66,8 @@
   const trnrHeader = page.getByText(/TRNR/i).first();
   const sysConfig = page.getByRole('button', { name: /SYS\.SETTINGS/i }).first();

-  await expect(pokedexCard.or(trnrHeader).or(sysConfig)).toBeVisible({ timeout: 20000 });
+  await expect(page.getByText(/TRNR/i).first().or(page.getByTestId('pokedex-card').first()).first()).toBeVisible({ timeout: 20000 });
 }

 export async function waitForSync(page: Page) {
DIFF
patch tests/e2e/test-utils.ts test-utils.diff
