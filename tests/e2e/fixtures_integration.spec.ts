import { expect, test } from './fixtures/index';
import { clearStorage } from './test-utils';

test.describe('Fixture Integration', () => {
  const fixtures = [
    { filename: 'blue-0.sav', label: /BLUE/i },
    { filename: 'yellow-0.sav', label: /YELLOW/i },
    { filename: 'yellow-glitch-hunt-2.sav', label: /YELLOW/i },
    { filename: 'yellow-glitch-hunt-1.sav', label: /YELLOW/i },
    { filename: 'red-base.sav', label: /RED/i },
    { filename: 'red-0.sav', label: /RED/i },
    { filename: 'silver-tid-39093.sav', label: /SILVER/i },
    { filename: 'silver-tid-38183.sav', label: /SILVER/i },
    { filename: 'gold-tid-65525.sav', label: /GOLD/i },
    { filename: 'silver-ue-c.sav', label: /SILVER/i },
    { filename: 'gold-tid-15051.sav', label: /GOLD/i },
    { filename: 'crystal-egg-shiny-living-dex.sav', label: /CRYSTAL/i },
    { filename: 'ruby-vithuang-2.sav', label: /RUBY/i },
    { filename: 'firered-eventsgallery.sav', label: /FIRE/i },
    { filename: 'emerald-spinda-pc.sav', label: /EMERALD|UNKNOWN/i },
    { filename: 'ruby-vithuang.sav', label: /RUBY/i },
    { filename: 'firered-vithuang.sav', label: /FIRE/i },
    { filename: 'emerald-spinda-party.sav', label: /EMERALD|UNKNOWN/i },
    { filename: 'emerald-bl1ndbeholder.sav', label: /EMERALD|UNKNOWN/i },
    { filename: 'emerald-vithuang.sav', label: /EMERALD|UNKNOWN/i },
    { filename: 'emerald-egg.sav', label: /EMERALD|UNKNOWN/i },
    { filename: 'emerald-mystery-gift.sav', label: /EMERALD|UNKNOWN/i },
    { filename: 'firered-mystery-gift.sav', label: /FIRE/i },
    { filename: 'emerald-vithuang-rtc.sav', label: /EMERALD|UNKNOWN/i },
    { filename: 'red.sav', label: /RED/i },
    { filename: 'crystal.sav', label: /CRYSTAL/i },
    { filename: 'emerald.sav', label: /EMERALD|UNKNOWN/i },
  ];

  for (const fixture of fixtures) {
    test(`should load fixture (${fixture.filename})`, async ({ page, loadSave }) => {
      await clearStorage(page);
      await loadSave(`tests/fixtures/${fixture.filename}`);
      await expect(page.locator('header').getByText(fixture.label).first()).toBeVisible();
    });
  }
});
