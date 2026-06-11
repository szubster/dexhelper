import type { PokemonInstance, SaveData } from '../saveParser/parsers/common';
import type { Anomaly, HealthScanResult, Location } from './models';

export function verifyBounds(saveData: SaveData): HealthScanResult {
  const anomalies: Anomaly[] = [];

  const checkPokemon = (pokemon: PokemonInstance, location: Location) => {
    // 1. Verify Pokemon IDs
    if (saveData.generation === 1) {
      if (pokemon.speciesId < 0 || pokemon.speciesId > 151) {
        anomalies.push({
          code: 'OutOfBoundsId',
          severity: 'Critical',
          location,
          description: `Pokemon ID ${pokemon.speciesId} is out of Gen 1 bounds (0-151).`,
        });
      }
    } else if (saveData.generation === 2) {
      if (pokemon.speciesId < 0 || pokemon.speciesId > 251) {
        anomalies.push({
          code: 'OutOfBoundsId',
          severity: 'Critical',
          location,
          description: `Pokemon ID ${pokemon.speciesId} is out of Gen 2 bounds (0-251).`,
        });
      }
    }

    // 2. Verify DVs
    if (pokemon.dvs) {
      const { hp, atk, def, spd, spc } = pokemon.dvs;
      const stats = { hp, atk, def, spd, spc };

      for (const [statName, value] of Object.entries(stats)) {
        if (value < 0 || value > 15) {
          anomalies.push({
            code: 'InvalidStat',
            severity: 'Critical',
            location,
            description: `DV for ${statName.toUpperCase()} is out of bounds (0-15): ${value}.`,
          });
        }
      }
    }
  };

  // Scan Party
  saveData.partyDetails.forEach((pokemon, index) => {
    checkPokemon(pokemon, { type: 'party', index });
  });

  // Scan PC Boxes
  saveData.pcDetails.forEach((pokemon, index) => {
    // Determine boxNumber and slot from storageLocation string if possible? Or just use index as slot if not easy.
    // The PokemonInstance has storageLocation: string and slot?: number
    let boxNumber = 1; // Default
    if (pokemon.storageLocation) {
      const match = pokemon.storageLocation.match(/Box (\d+)/i);
      if (match?.[1]) {
        boxNumber = parseInt(match[1], 10);
      }
    }

    checkPokemon(pokemon, { type: 'pc_box', boxNumber, slot: pokemon.slot ?? index });
  });

  // Scan Daycare (Gen 2 mainly)
  if (saveData.daycare) {
    saveData.daycare.forEach((pokemon, index) => {
      checkPokemon(pokemon, { type: 'daycare', index });
    });
  }

  return {
    isValid: anomalies.length === 0,
    anomalies,
    scannedAt: new Date(),
  };
}
