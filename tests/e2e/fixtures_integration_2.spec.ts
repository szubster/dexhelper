import { test } from './fixtures/index';
import { assertSaveLoadedHeader, clearStorage } from './test-utils';

const FIXTURES = [
  { name: 'Gen 3 fixture (firered-vithuang.sav)', path: 'tests/fixtures/saves/gen3/firered_vithuang.sav' },
  {
    name: 'Gen 3 fixture (emerald-spinda-party.sav)',
    path: 'tests/fixtures/saves/gen3/emerald_spinda_party_fixture.sav',
  },
  { name: 'Gen 3 fixture (emerald-bl1ndbeholder.sav)', path: 'tests/fixtures/saves/gen3/emerald_bl1ndbeholder.sav' },
  { name: 'Gen 3 fixture (emerald-vithuang.sav)', path: 'tests/fixtures/saves/gen3/emerald_vithuang.sav' },
  { name: 'Gen 3 fixture (emerald-egg.sav)', path: 'tests/fixtures/saves/gen3/emerald_egg_fixture.sav' },
  { name: 'Gen 3 fixture (emerald-mystery-gift.sav)', path: 'tests/fixtures/saves/gen3/emerald_mystery_gift.sav' },
  { name: 'Gen 3 fixture (firered-mystery-gift.sav)', path: 'tests/fixtures/saves/gen3/firered_mystery_gift.sav' },
  { name: 'Gen 3 fixture (emerald-vithuang-rtc.sav)', path: 'tests/fixtures/saves/gen3/emerald_vithuang_rtc.sav' },
];

test.describe('Fixture Integration 2', () => {
  for (const { name, path } of FIXTURES) {
    test(`should load ${name}`, async ({ page, loadSave, isMobile }) => {
      test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
      await clearStorage(page);
      await loadSave(path);
      await assertSaveLoadedHeader(page);
    });
  }
});
