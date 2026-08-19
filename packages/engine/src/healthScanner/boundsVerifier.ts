import type { PokemonInstance, SaveData } from '../saveParser/parsers/common';
import type { Anomaly, HealthScanResult, Location } from './models';

/**
 * Performs boundary verification on the extracted SaveData structure to detect corruption.
 *
 * @param saveData - The normalized player save state extracted from the binary save file.
 * @returns A HealthScanResult detailing any critical anomalies found, or an isValid flag.
 *
 * @remarks
 * **Architecture Note:**
 * This verification step is strictly required before the save data is passed to the suggestion engine
 * or the React UI. Early Generation memory structures lack robust error correction. Glitches (like MissingNo),
 * bad ROM dumps, or cheat codes can inject invalid internal IDs (e.g., > 151 in Gen 1) or invalid
 * stat Determinant Values (DVs) (e.g., > 15).
 *
 * If these out-of-bounds IDs or DVs pass silently into the application:
 * 1. The suggestion engine could crash or enter infinite loops during array indexing.
 * 2. The React UI could attempt to render non-existent sprite assets, causing fatal unhandled exceptions.
 *
 * Therefore, this function strictly enforces generation boundaries and DV limits, flagging
 * violations as 'Critical' anomalies so the application can degrade gracefully.
 */
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

      // ⚡ Bolt: Use direct property access instead of Object.entries to eliminate object allocation and O(N) loop overhead
      if (hp < 0 || hp > 15) {
        anomalies.push({
          code: 'InvalidStat',
          severity: 'Critical',
          location,
          description: `DV for HP is out of bounds (0-15): ${hp}.`,
        });
      }
      if (atk < 0 || atk > 15) {
        anomalies.push({
          code: 'InvalidStat',
          severity: 'Critical',
          location,
          description: `DV for ATK is out of bounds (0-15): ${atk}.`,
        });
      }
      if (def < 0 || def > 15) {
        anomalies.push({
          code: 'InvalidStat',
          severity: 'Critical',
          location,
          description: `DV for DEF is out of bounds (0-15): ${def}.`,
        });
      }
      if (spd < 0 || spd > 15) {
        anomalies.push({
          code: 'InvalidStat',
          severity: 'Critical',
          location,
          description: `DV for SPD is out of bounds (0-15): ${spd}.`,
        });
      }
      if (spc < 0 || spc > 15) {
        anomalies.push({
          code: 'InvalidStat',
          severity: 'Critical',
          location,
          description: `DV for SPC is out of bounds (0-15): ${spc}.`,
        });
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
  if ('daycare' in saveData && saveData.daycare) {
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
