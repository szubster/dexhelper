export interface UpcomingTrainer {
  name: string;
  type: string;
  levelCap?: number;
}

// Basic map ID to Gym mapping.
// Based on typical speedrun progression.
export const GYM_MAPS: Record<number, UpcomingTrainer> = {
  2819: { name: 'Roxanne', type: 'Rock', levelCap: 15 },
  771: { name: 'Brawly', type: 'Fighting', levelCap: 19 },
  2560: { name: 'Wattson', type: 'Electric', levelCap: 24 }, // 23 in Emerald?
  2049: { name: 'Norman', type: 'Normal', levelCap: 31 },
  3073: { name: 'Winona', type: 'Flying', levelCap: 33 },
  3584: { name: 'Tate & Liza', type: 'Psychic', levelCap: 42 },
  3840: { name: 'Wallace/Juan', type: 'Water', levelCap: 46 },
};
// Add Flannery to Lavaridge
GYM_MAPS[1025] = { name: 'Flannery', type: 'Fire', levelCap: 29 };
GYM_MAPS[1026] = { name: 'Flannery', type: 'Fire', levelCap: 29 };

export const NEXT_MAJOR_TRAINER_BY_REGION: Record<number, UpcomingTrainer> = {
  // Route 101 to Rustboro
  9: { name: 'Rival 1', type: 'Mixed', levelCap: 5 }, // Littleroot Town
  16: { name: 'Rival 1', type: 'Mixed', levelCap: 5 }, // Route 101
  10: { name: 'Rival 1', type: 'Mixed', levelCap: 5 }, // Oldale Town
  18: { name: 'Rival 1', type: 'Mixed', levelCap: 5 }, // Route 103

  // To Roxanne
  17: { name: 'Roxanne', type: 'Rock', levelCap: 15 }, // Route 102
  0: { name: 'Roxanne', type: 'Rock', levelCap: 15 }, // Petalburg City
  19: { name: 'Roxanne', type: 'Rock', levelCap: 15 }, // Route 104
  3: { name: 'Roxanne', type: 'Rock', levelCap: 15 }, // Rustboro City
  31: { name: 'Roxanne', type: 'Rock', levelCap: 15 }, // Route 116 (Before first gym?)

  // To Brawly
  20: { name: 'Brawly', type: 'Fighting', levelCap: 19 }, // Route 105
  21: { name: 'Brawly', type: 'Fighting', levelCap: 19 }, // Route 106
  11: { name: 'Brawly', type: 'Fighting', levelCap: 19 }, // Dewford Town

  // To Wattson
  22: { name: 'Wattson', type: 'Electric', levelCap: 24 }, // Route 107
  23: { name: 'Wattson', type: 'Electric', levelCap: 24 }, // Route 108
  24: { name: 'Wattson', type: 'Electric', levelCap: 24 }, // Route 109
  1: { name: 'Wattson', type: 'Electric', levelCap: 24 }, // Slateport
  25: { name: 'Wattson', type: 'Electric', levelCap: 24 }, // Route 110
  2: { name: 'Wattson', type: 'Electric', levelCap: 24 }, // Mauville City

  // To Flannery
  32: { name: 'Flannery', type: 'Fire', levelCap: 29 }, // Route 117
  14: { name: 'Flannery', type: 'Fire', levelCap: 29 }, // Verdanturf
  26: { name: 'Flannery', type: 'Fire', levelCap: 29 }, // Route 111
  27: { name: 'Flannery', type: 'Fire', levelCap: 29 }, // Route 112
  28: { name: 'Flannery', type: 'Fire', levelCap: 29 }, // Route 113
  13: { name: 'Flannery', type: 'Fire', levelCap: 29 }, // Fallarbor Town
  29: { name: 'Flannery', type: 'Fire', levelCap: 29 }, // Route 114
  12: { name: 'Flannery', type: 'Fire', levelCap: 29 }, // Lavaridge Town

  // To Winona
  33: { name: 'Winona', type: 'Flying', levelCap: 33 }, // Route 118
  34: { name: 'Winona', type: 'Flying', levelCap: 33 }, // Route 119
  4: { name: 'Winona', type: 'Flying', levelCap: 33 }, // Fortree City

  // To Tate & Liza
  35: { name: 'Tate & Liza', type: 'Psychic', levelCap: 42 }, // Route 120
  36: { name: 'Tate & Liza', type: 'Psychic', levelCap: 42 }, // Route 121
  5: { name: 'Tate & Liza', type: 'Psychic', levelCap: 42 }, // Lilycove City
  39: { name: 'Tate & Liza', type: 'Psychic', levelCap: 42 }, // Route 124
  6: { name: 'Tate & Liza', type: 'Psychic', levelCap: 42 }, // Mossdeep City

  // To Wallace/Juan
  40: { name: 'Wallace/Juan', type: 'Water', levelCap: 46 }, // Route 125
  41: { name: 'Wallace/Juan', type: 'Water', levelCap: 46 }, // Route 126
  42: { name: 'Wallace/Juan', type: 'Water', levelCap: 46 }, // Route 127
  43: { name: 'Wallace/Juan', type: 'Water', levelCap: 46 }, // Route 128
  7: { name: 'Wallace/Juan', type: 'Water', levelCap: 46 }, // Sootopolis City

  // Elite 4
  8: { name: 'Elite Four', type: 'Mixed', levelCap: 58 }, // Ever Grande City
};

/**
 * Maps a given mapId to the nearest upcoming major trainer.
 * @param mapId The resolved map ID (either indoor or outdoor)
 */
export function getNearestUpcomingTrainer(mapId: number): UpcomingTrainer | null {
  // If it's explicitly a gym, return that gym's leader
  if (GYM_MAPS[mapId]) {
    return GYM_MAPS[mapId];
  }

  // Otherwise check the regional mapping
  if (NEXT_MAJOR_TRAINER_BY_REGION[mapId]) {
    return NEXT_MAJOR_TRAINER_BY_REGION[mapId];
  }

  return null;
}
