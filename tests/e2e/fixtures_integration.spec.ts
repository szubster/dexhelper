import { test } from './fixtures/index';
import { assertSaveLoadedHeader, clearStorage } from './test-utils';

const FIXTURES = [
  // Gen 1 fixtures
  { name: 'Gen 1 fixture (blue-0.sav)', path: 'tests/fixtures/saves/gen1/POKEMON BLUE-0.sav' },
  { name: 'Gen 1 fixture (yellow-0.sav)', path: 'tests/fixtures/saves/gen1/POKEMON YELLOW-0.sav' },
  {
    name: 'Gen 1 fixture (yellow-glitch-hunt-2.sav)',
    path: 'tests/fixtures/saves/gen1/Pokemon Yellow - 2nd Glitch Hunt.sav',
  },
  {
    name: 'Gen 1 fixture (yellow-glitch-hunt-1.sav)',
    path: 'tests/fixtures/saves/gen1/Pokemon Yellow - 1st Glitch Hunt.sav',
  },
  { name: 'Gen 1 fixture (red-base.sav)', path: 'tests/fixtures/saves/gen1/BaseSAV.sav' },
  { name: 'Gen 1 fixture (red-0.sav)', path: 'tests/fixtures/saves/gen1/POKEMON RED-0.sav' },

  // Gen 2 fixtures
  { name: 'Gen 2 fixture (silver-tid-39093.sav)', path: 'tests/fixtures/saves/gen2/Pokemon Silver - TID 39093.sav' },
  { name: 'Gen 2 fixture (silver-tid-38183.sav)', path: 'tests/fixtures/saves/gen2/Pokemon Silver - TID 38183.sav' },
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

  // Gen 3 fixtures
  { name: 'Gen 3 fixture (ruby-vithuang-2.sav)', path: 'tests/fixtures/saves/gen3/ruby2_vithuang.sav' },
  { name: 'Gen 3 fixture (firered-eventsgallery.sav)', path: 'tests/fixtures/saves/gen3/firered_eventsgallery.sav' },
  { name: 'Gen 3 fixture (emerald-spinda-pc.sav)', path: 'tests/fixtures/saves/gen3/emerald_spinda_pc_fixture.sav' },
  { name: 'Gen 3 fixture (ruby-vithuang.sav)', path: 'tests/fixtures/saves/gen3/ruby_vithuang.sav' },
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

test.describe('Fixture Integration', () => {
  for (const { name, path } of FIXTURES) {
    test(`should load ${name}`, async ({ page, loadSave, isMobile }) => {
      test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
      await clearStorage(page);
      await loadSave(path);
      await assertSaveLoadedHeader(page);
    });
  }
});
