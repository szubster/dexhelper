import { test } from './fixtures/index';
import { assertSaveLoadedHeader, clearStorage } from './test-utils';

const FIXTURES = [
  { name: 'Gen 2 fixture (gold-tid-65525.sav)', path: 'tests/fixtures/saves/gen2/Pokemon Gold - TID 65525.sav' },
  {
    name: 'Gen 2 fixture (silver-ue-c.sav)',
    path: 'tests/fixtures/saves/gen2/Pokemon - Silver Version (UE) [C][!].sav',
  },
  { name: 'Gen 2 fixture (gold-tid-15051.sav)', path: 'tests/fixtures/saves/gen2/Pokemon Gold - TID 15051.sav' },
  {
    name: 'Gen 2 fixture (crystal-egg-shiny-living-dex.sav)',
    path: 'tests/fixtures/saves/gen2/Egg Shiny Living Dex.sav',
  },
  { name: 'Gen 3 fixture (ruby-vithuang-2.sav)', path: 'tests/fixtures/saves/gen3/ruby2_vithuang.sav' },
  { name: 'Gen 3 fixture (firered-eventsgallery.sav)', path: 'tests/fixtures/saves/gen3/firered_eventsgallery.sav' },
  { name: 'Gen 3 fixture (emerald-spinda-pc.sav)', path: 'tests/fixtures/saves/gen3/emerald_spinda_pc_fixture.sav' },
  { name: 'Gen 3 fixture (ruby-vithuang.sav)', path: 'tests/fixtures/saves/gen3/ruby_vithuang.sav' },
];

test.describe('Fixture Integration 1', () => {
  for (const { name, path } of FIXTURES) {
    test(`should load ${name}`, async ({ page, loadSave, isMobile }) => {
      test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
      await clearStorage(page);
      await loadSave(path);
      await assertSaveLoadedHeader(page);
    });
  }
});
