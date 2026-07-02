import fs from 'node:fs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('node:fs');

describe('Gen 3 Match Call ETL', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('extracts and structures trainer match call data and calculates EVs', async () => {
    const mockReadFileSync = vi.mocked(fs.readFileSync);
    const mockWriteFileSync = vi.mocked(fs.writeFileSync);
    const mockExistsSync = vi.mocked(fs.existsSync);

    mockExistsSync.mockImplementation((path) => {
      if (typeof path === 'string' && path.includes('temp_pokeapi')) {
        return path.includes('pokemon/1/') || path.includes('pokemon/2/');
      }
      return false;
    });

    mockReadFileSync.mockImplementation((path: fs.PathOrFileDescriptor) => {
      const p = path.toString();
      if (p === 'scratch/pokeemerald/src/battle_setup.c') {
        return `
const struct RematchTrainer gRematchTable[REMATCH_TABLE_ENTRIES] =
{
    [REMATCH_ROSE] = REMATCH(TRAINER_ROSE_1, TRAINER_ROSE_2, TRAINER_ROSE_3, TRAINER_ROSE_4, TRAINER_ROSE_5, MAP_ROUTE118),
};
        `;
      }
      if (p === 'scratch/pokeemerald/src/data/trainers.h') {
        return `
    [TRAINER_ROSE_1] =
    {
        .trainerName = _("ROSE"),
        .party = TRAINER_PARTY(sParty_Rose1),
    },
    [TRAINER_ROSE_2] =
    {
        .trainerName = _("ROSE"),
        .party = TRAINER_PARTY(sParty_Rose2),
    },
        `;
      }
      if (p === 'scratch/pokeemerald/src/data/trainer_parties.h') {
        return `
static const struct TrainerMonNoItemDefaultMoves sParty_Rose1[] = {
    {
        .iv = 0,
        .lvl = 14,
        .species = SPECIES_BULBASAUR,
    }
};
static const struct TrainerMonNoItemDefaultMoves sParty_Rose2[] = {
    {
        .iv = 0,
        .lvl = 16,
        .species = SPECIES_IVYSAUR,
    }
};
        `;
      }
      if (p === 'scratch/species_map.txt') {
        return `SPECIES_BULBASAUR 1\nSPECIES_IVYSAUR 2\n`;
      }
      if (p.includes('pokemon/1/index.json')) {
        return JSON.stringify({
          stats: [
            { effort: 1, stat: { name: 'hp' } },
            { effort: 0, stat: { name: 'attack' } },
            { effort: 0, stat: { name: 'defense' } },
            { effort: 0, stat: { name: 'special-attack' } },
            { effort: 0, stat: { name: 'special-defense' } },
            { effort: 0, stat: { name: 'speed' } },
          ],
        });
      }
      if (p.includes('pokemon/2/index.json')) {
        return JSON.stringify({
          stats: [
            { effort: 1, stat: { name: 'hp' } },
            { effort: 1, stat: { name: 'attack' } },
            { effort: 0, stat: { name: 'defense' } },
            { effort: 0, stat: { name: 'special-attack' } },
            { effort: 1, stat: { name: 'special-defense' } },
            { effort: 0, stat: { name: 'speed' } },
          ],
        });
      }
      return '';
    });

    await import('../../../../scripts/data/gen3/match_call/etl.ts');

    expect(mockWriteFileSync).toHaveBeenCalled();
    const writeCall = mockWriteFileSync.mock.calls[0] as [
      fs.PathOrFileDescriptor,
      string | NodeJS.ArrayBufferView,
      fs.WriteFileOptions,
    ];
    expect(writeCall[0]).toBe('data/gen3_match_call.jsonl');

    const lines = (writeCall[1] as string).trim().split('\n');
    expect(lines).toHaveLength(1);

    const data = JSON.parse(lines[0] as string);
    expect(data.id).toBe('REMATCH_ROSE');
    expect(data.name).toBe('ROSE');
    expect(data.map).toBe('MAP_ROUTE118');

    expect(data.tiers).toHaveLength(2);

    // Tier 1
    expect(data.tiers[0].tier).toBe(1);
    expect(data.tiers[0].trainerId).toBe('TRAINER_ROSE_1');
    expect(data.tiers[0].partyName).toBe('sParty_Rose1');
    expect(data.tiers[0].evYield).toEqual({ hp: 1, atk: 0, def: 0, spatk: 0, spdef: 0, spd: 0 });

    // Tier 2
    expect(data.tiers[1].tier).toBe(2);
    expect(data.tiers[1].trainerId).toBe('TRAINER_ROSE_2');
    expect(data.tiers[1].partyName).toBe('sParty_Rose2');
    expect(data.tiers[1].evYield).toEqual({ hp: 1, atk: 1, def: 0, spatk: 0, spdef: 1, spd: 0 });
  });
});
