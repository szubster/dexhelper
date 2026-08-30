import { expect, test } from '@playwright/test';
import { initializeWithSave } from './test-utils';

test.describe('Egg Move Pathfinding Engine', () => {
  test('surfaces valid breeding chains for egg moves in Assistant and displays missing links', async ({
    page,
    isMobile,
  }) => {
    // We use page.route to intercept the fetch call for assistant data metadata.
    // This allows the actual pathfinding engine to run locally on the client using the real
    // save file, but with modified metadata that forces a missing link scenario.
    // We use actual Pokemon IDs to avoid rendering errors.
    await page.route(/.*\/assistant\.json/, async (route) => {
      const response = await route.fetch();
      const json = await response.json();

      if (json.pokemonMetadata) {
        // Gold save inherently owns Pidgey (16). It does not own Lapras (131).
        // Let's create an artificial breeding chain for Pikachu (25) where
        // Pidgey (16) knows the move, passes to Lapras (131) [absent], passes to Pikachu (25) [target].
        // This guarantees an 'absent' missing link.
        json.pokemonMetadata[25] = {
          ...json.pokemonMetadata[25],
          em: {
            // Fake move 9999 is passed from 16 -> 131 -> 25
            9999: [16, 131, 25],
          },
        };
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(json),
        headers: {
          'Cache-Control': 'no-store',
        },
      });
    });

    await initializeWithSave(page, 'tests/fixtures/gold.sav');

    if (isMobile) {
      const assistantLink = page.getByRole('link', { name: 'Assistant' });
      await expect(assistantLink).toBeVisible();
      await assistantLink.click();
    } else {
      const assistantLink = page.getByRole('link', { name: /SYS\.ASST/i });
      await expect(assistantLink).toBeVisible();
      await assistantLink.click();
    }

    await expect(page.getByText(/AI Assistant/i)).toBeVisible();

    const cards = page.locator('[data-testid="assistant-suggestion-card"]');
    await expect(cards.first()).toBeVisible({ timeout: 15000 });

    const breedCards = cards.filter({ hasText: /Breed/i });
    expect(await breedCards.count()).toBeGreaterThan(0);

    const missingLinkCard = cards.filter({ hasText: /MISSING LINK/i }).first();
    await expect(missingLinkCard).toBeVisible({ timeout: 15000 });

    const cardText = await missingLinkCard.textContent();
    expect(cardText).toContain('NOT OWNED');
  });
});
