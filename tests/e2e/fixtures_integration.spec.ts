import { test } from './fixtures/index';
import { assertSaveLoadedHeader, clearStorage } from './test-utils';

const FIXTURES = [
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
  { name: 'Gen 2 fixture (silver-tid-39093.sav)', path: 'tests/fixtures/saves/gen2/Pokemon Silver - TID 39093.sav' },
  { name: 'Gen 2 fixture (silver-tid-38183.sav)', path: 'tests/fixtures/saves/gen2/Pokemon Silver - TID 38183.sav' },
];

test.describe('Fixture Integration 0', () => {
  for (const { name, path } of FIXTURES) {
    test(`should load ${name}`, async ({ page, loadSave, isMobile }) => {
      test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
      await clearStorage(page);
      await loadSave(path);
      await assertSaveLoadedHeader(page);
    });
  }
});
