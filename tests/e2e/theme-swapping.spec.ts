import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Theme Swapping E2E', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('should swap themes correctly between different version save files', async ({ page }) => {
    // 1. Initialize with Yellow save
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');

    // In our app, theme classes are added to the outer div.
    const outerContainer = page.locator('div.theme-yellow').first();
    await expect(outerContainer).toBeAttached({ timeout: 15000 });

    // Validate that UI element colors actually update via custom properties.
    // The Version Selector button has class `text-[var(--theme-primary)]`
    const versionButton = page.locator('[data-testid="version-selector"]').first();
    await expect(versionButton).toBeVisible();
    await expect(versionButton).toHaveCSS('color', 'rgb(234, 179, 8)');

    // Check that CSS variable is updated directly to be safe from browser-specific background-color return formats (like oklab)
    const yellowPrimary = await page.evaluate(() => {
      const el = document.querySelector('.theme-yellow') as HTMLElement;
      return window.getComputedStyle(el).getPropertyValue('--theme-primary').trim();
    });
    expect(yellowPrimary).toBe('#eab308');

    // Clear for next save
    await clearStorage(page);

    // 2. Initialize with Crystal save
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');
    await page.waitForTimeout(1000);

    // wait for crystal theme
    await expect(page.locator('div.theme-crystal').first()).toBeAttached({ timeout: 15000 });

    const versionButtonCrystal = page.locator('[data-testid="version-selector"]').first();
    await expect(versionButtonCrystal).toBeVisible();
    await expect(versionButtonCrystal).toHaveCSS('color', 'rgb(74, 222, 128)');

    const crystalPrimary = await page.evaluate(() => {
      const el = document.querySelector('.theme-crystal') as HTMLElement;
      return window.getComputedStyle(el).getPropertyValue('--theme-primary').trim();
    });
    expect(crystalPrimary).toBe('#4ade80');
  });

  test('should change theme when manual version is updated in settings', async ({ page, isMobile }) => {
    // We cannot use empty state easily because the version selector requires an initialized state.
    // Let's load the yellow save first, then change version manually.
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');

    // Wait for the app to be mounted
    await expect(page.locator('#root')).toBeAttached();

    if (isMobile) {
      // Handle mobile menu if version selector is hidden
      const menuButton = page
        .locator('button[aria-label="Toggle menu"], button.mobile-menu-button, button[aria-label="Open menu"]')
        .first();
      if (await menuButton.isVisible()) {
        await menuButton.click();
      }
    }

    const versionSelector = page.locator('[data-testid="version-selector"]').first();
    await expect(versionSelector).toBeVisible();
    await versionSelector.click();

    // Wait for the Version Modal to appear
    const versionModal = page.locator('[role="dialog"]').filter({ hasText: 'Version' }).first();
    await expect(versionModal).toBeVisible();

    // The version modal has grid of versions.
    // Let's click "Red" version button inside the modal.
    const redButton = versionModal.locator('button').filter({ hasText: 'Red' }).first();
    if (await redButton.isVisible()) {
      await redButton.click();
    } else {
      const overrideLabel = versionModal.getByText('Game Version Override');
      if (await overrideLabel.isVisible()) {
        const select = versionModal.locator('select').first();
        await select.selectOption({ label: 'Red' });
      }
    }

    // Verify theme-red is applied
    await expect(page.locator('div.theme-red').first()).toBeAttached();

    const versionButtonRed = page.locator('[data-testid="version-selector"]').first();
    await expect(versionButtonRed).toBeVisible();
    await expect(versionButtonRed).toHaveCSS('color', 'rgb(239, 68, 68)');

    // Open version modal again
    // For mobile, maybe we need to open the menu again if it closed
    if (isMobile) {
      const menuButton = page
        .locator('button[aria-label="Toggle menu"], button.mobile-menu-button, button[aria-label="Open menu"]')
        .first();
      if (await menuButton.isVisible()) {
        await menuButton.click();
      }
    }

    await versionSelector.click();

    // We might have multiple version modals on screen if not unmounted cleanly, so use the first visible.
    const versionModal2 = page.locator('[role="dialog"]').filter({ hasText: 'Version' }).first();
    await expect(versionModal2).toBeVisible();

    // Since Crystal isn't always available, let's use Emerald since Emerald was available in the grid for Yellow/Crystal ? Wait, yellow only has gen1 versions!
    // That's why Crystal wasn't found in the grid or list of versions. Let's switch to Blue instead.
    const blueButton = versionModal2.locator('button').filter({ hasText: 'Blue' }).first();
    if (await blueButton.isVisible()) {
      await blueButton.click();
    } else {
      const overrideLabel = versionModal2.getByText('Game Version Override');
      if (await overrideLabel.isVisible()) {
        const select = versionModal2.locator('select').first();
        await select.selectOption({ label: 'Blue' });
      }
    }

    // Since settings update is fast, wait for the class to appear
    await expect(page.locator('div.theme-blue').first()).toBeAttached({ timeout: 15000 });

    const versionButtonBlue = page.locator('[data-testid="version-selector"]').first();
    await expect(versionButtonBlue).toBeVisible();
    await expect(versionButtonBlue).toHaveCSS('color', 'rgb(59, 130, 246)');
  });
});
