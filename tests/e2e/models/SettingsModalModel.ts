import { expect, type Locator, type Page } from '@playwright/test';

export class SettingsModalModel {
  readonly page: Page;
  readonly modalTitle: Locator;
  readonly openSettingsBtn: Locator;
  readonly closeSettingsBtn: Locator;
  readonly livingDexBtn: Locator;
  readonly standardDexBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalTitle = page.getByText('SYS.CONFIG').first();
    this.openSettingsBtn = page.getByRole('button', { name: 'System Settings' });
    this.closeSettingsBtn = page.getByRole('button', { name: 'Close settings' });
    this.livingDexBtn = page.getByRole('radio', { name: '[ LIVING DEX ]' });
    this.standardDexBtn = page.getByRole('radio', { name: '[ STANDARD ]' });
  }

  async open() {
    await this.openSettingsBtn.click();
    await this.assertIsOpen();
  }

  async close() {
    await this.closeSettingsBtn.click();
    await expect(this.modalTitle).toBeHidden();
  }

  async toggleLivingDexMode() {
    await this.livingDexBtn.click();
  }

  async setStandardDexMode() {
    await this.standardDexBtn.click();
  }

  async setGameVersion(version: string) {
    await this.page.getByRole('radio', { name: version, exact: true }).click();
  }

  async setBallStyle(style: string) {
    await this.page.getByRole('radio', { name: style, exact: true }).click();
  }

  async assertIsOpen() {
    await expect(this.modalTitle).toBeVisible();
  }

  async assertLivingDexModeEnabled() {
    await expect(this.livingDexBtn).toHaveClass(/bg-emerald-500/);
  }

  async assertLivingDexModeChecked() {
    await expect(this.livingDexBtn).toBeChecked();
  }

  async assertGameVersion(version: string) {
    await expect(this.page.getByRole('radio', { name: version, exact: true })).toBeChecked();
  }

  async assertBallStyle(style: string) {
    await expect(this.page.getByRole('radio', { name: style, exact: true })).toBeChecked();
  }
}
