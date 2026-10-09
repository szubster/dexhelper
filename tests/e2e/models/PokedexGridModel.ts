import { expect, type Locator, type Page } from '@playwright/test';

export class PokedexGridModel {
  readonly page: Page;
  readonly gridContainer: Locator;
  readonly pokemonCards: Locator;

  constructor(page: Page) {
    this.page = page;
    // Assuming a semantic locator for the grid container itself if possible,
    // otherwise we might not strictly need one if we just target the cards.
    // We'll add a generic one and specific card locators.
    this.gridContainer = page
      .getByRole('grid', { name: /pokedex/i })
      .first()
      .or(page.locator('.pokedex-grid').first())
      .first();
    this.pokemonCards = page.getByTestId('pokedex-card');
  }

  /**
   * Waits for the grid to become visible and cards to load.
   */
  async waitForGridToLoad() {
    await expect(this.pokemonCards.first()).toBeVisible();
  }

  /**
   * Retrieves a specific Pokemon card by its Dex ID.
   */
  getPokemonCard(pokemonId: number | string): Locator {
    return this.page.locator(`[data-testid="pokedex-card"][data-pokemon-id="${pokemonId}"]`);
  }

  /**
   * Verifies that a specific Pokemon card is visible.
   */
  async expectCardToBeVisible(pokemonId: number | string) {
    await expect(this.getPokemonCard(pokemonId)).toBeVisible();
  }

  /**
   * Scrolls to the bottom of the grid or page to trigger lazy loading.
   */
  async scrollToBottom() {
    const customScrollbar = this.page.locator('.custom-scrollbar').first();
    if (await customScrollbar.isVisible()) {
      await customScrollbar.evaluate((node) => {
        node.scrollTo(0, node.scrollHeight);
      });
      await this.page.evaluate(() => {
        const sc = document.querySelector('.custom-scrollbar');
        if (sc) {
          // Fake a window scroll event to trick useWindowVirtualizer
          Object.defineProperty(window, 'scrollY', { value: sc.scrollTop, configurable: true });
          window.dispatchEvent(new Event('scroll'));
        }
      });
    } else {
      await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }

    // Give it time to render new items
    await this.page.waitForTimeout(500);
  }
}
