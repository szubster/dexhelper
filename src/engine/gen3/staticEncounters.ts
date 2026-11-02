/**
 * @module staticEncounters
 *
 * Gen 3 Static Encounter & Event Flag Extractor
 *
 * **Architecture Note:**
 * In Generation 3 Pokémon save files (Emerald, FireRed/LeafGreen, Ruby/Sapphire),
 * SaveBlock1 contains an array of event flags beginning at relative offset \`0x1270\` (\`EVENT_FLAGS_START\`).
 * Each flag is represented by a single bit within a specific byte offset of this array.
 * A set bit (\`1\`) indicates that a static encounter (e.g. Legendary Pokémon like Rayquaza or Mewtwo,
 * overworld obstacles like Snorlax or Sudowoodo, or trap encounters like Voltorb/Electrode)
 * has been battled, defeated, or caught.
 */

import { SaveDataReader } from '../saveParser/SaveDataReader';
import {
  EMERALD_DEOXYS_BIT,
  EMERALD_DEOXYS_BYTE,
  EMERALD_ELECTRODE_1_BIT,
  EMERALD_ELECTRODE_1_BYTE,
  EMERALD_ELECTRODE_2_BIT,
  EMERALD_ELECTRODE_2_BYTE,
  EMERALD_GROUDON_BIT,
  EMERALD_GROUDON_BYTE,
  EMERALD_HO_OH_BIT,
  EMERALD_HO_OH_BYTE,
  EMERALD_KYOGRE_BIT,
  EMERALD_KYOGRE_BYTE,
  EMERALD_LUGIA_BIT,
  EMERALD_LUGIA_BYTE,
  EMERALD_MEW_CAUGHT_BIT,
  EMERALD_MEW_CAUGHT_BYTE,
  EMERALD_MEW_DEFEATED_BIT,
  EMERALD_MEW_DEFEATED_BYTE,
  EMERALD_RAYQUAZA_BIT,
  EMERALD_RAYQUAZA_BYTE,
  EMERALD_REGICE_BIT,
  EMERALD_REGICE_BYTE,
  EMERALD_REGIROCK_BIT,
  EMERALD_REGIROCK_BYTE,
  EMERALD_REGISTEEL_BIT,
  EMERALD_REGISTEEL_BYTE,
  EMERALD_SUDOWOODO_BIT,
  EMERALD_SUDOWOODO_BYTE,
  EMERALD_VOLTORB_1_BIT,
  EMERALD_VOLTORB_1_BYTE,
  EMERALD_VOLTORB_2_BIT,
  EMERALD_VOLTORB_2_BYTE,
  EMERALD_VOLTORB_3_BIT,
  EMERALD_VOLTORB_3_BYTE,
  EVENT_FLAGS_START,
  FRLG_ARTICUNO_BIT,
  FRLG_ARTICUNO_BYTE,
  FRLG_DEOXYS_BIT,
  FRLG_DEOXYS_BYTE,
  FRLG_HO_OH_BIT,
  FRLG_HO_OH_BYTE,
  FRLG_LUGIA_BIT,
  FRLG_LUGIA_BYTE,
  FRLG_MEWTWO_BIT,
  FRLG_MEWTWO_BYTE,
  FRLG_MOLTRES_BIT,
  FRLG_MOLTRES_BYTE,
  FRLG_SNORLAX_ROUTE_12_BIT,
  FRLG_SNORLAX_ROUTE_12_BYTE,
  FRLG_SNORLAX_ROUTE_16_BIT,
  FRLG_SNORLAX_ROUTE_16_BYTE,
  FRLG_ZAPDOS_BIT,
  FRLG_ZAPDOS_BYTE,
  RS_ELECTRODE_1_BIT,
  RS_ELECTRODE_1_BYTE,
  RS_ELECTRODE_2_BIT,
  RS_ELECTRODE_2_BYTE,
  RS_GROUDON_KYOGRE_BIT,
  RS_GROUDON_KYOGRE_BYTE,
  RS_RAYQUAZA_BIT,
  RS_RAYQUAZA_BYTE,
  RS_REGICE_BIT,
  RS_REGICE_BYTE,
  RS_REGIROCK_BIT,
  RS_REGIROCK_BYTE,
  RS_REGISTEEL_BIT,
  RS_REGISTEEL_BYTE,
  RS_VOLTORB_1_BIT,
  RS_VOLTORB_1_BYTE,
  RS_VOLTORB_2_BIT,
  RS_VOLTORB_2_BYTE,
  RS_VOLTORB_3_BIT,
  RS_VOLTORB_3_BYTE,
} from './staticEncounters/constants';

/** Parsed static encounter flag states for Pokémon Emerald. */
export interface Gen3EmeraldStaticEncounters {
  deoxys: boolean;
  regirock: boolean;
  regice: boolean;
  registeel: boolean;
  kyogre: boolean;
  groudon: boolean;
  rayquaza: boolean;
  voltorb1: boolean;
  voltorb2: boolean;
  voltorb3: boolean;
  electrode1: boolean;
  electrode2: boolean;
  sudowoodo: boolean;
  mewDefeated: boolean;
  mewCaught: boolean;
  hoOh: boolean;
  lugia: boolean;
}

/** Parsed static encounter flag states for Pokémon FireRed and LeafGreen. */
export interface Gen3FRLGStaticEncounters {
  mewtwo: boolean;
  moltres: boolean;
  articuno: boolean;
  zapdos: boolean;
  deoxys: boolean;
  lugia: boolean;
  hoOh: boolean;
  snorlaxRoute12: boolean;
  snorlaxRoute16: boolean;
}

/** Parsed static encounter flag states for Pokémon Ruby and Sapphire. */
export interface Gen3RSStaticEncounters {
  groudonKyogre: boolean;
  rayquaza: boolean;
  regirock: boolean;
  regice: boolean;
  registeel: boolean;
  voltorb1: boolean;
  voltorb2: boolean;
  voltorb3: boolean;
  electrode1: boolean;
  electrode2: boolean;
}

/** Union type representing static encounter flags across all Gen 3 game variants. */
export type Gen3StaticEncounters = Gen3EmeraldStaticEncounters | Gen3FRLGStaticEncounters | Gen3RSStaticEncounters;

/**
 * Extracts static encounter event flags from a Gen 3 save file buffer.
 *
 * **Architecture Note:**
 * Different Gen 3 titles locate event flags at different byte offsets within SaveBlock1.
 * This function locates \`EVENT_FLAGS_START\` relative to \`section1Offset\` and checks individual
 * bit positions for legendary encounters, stationary Pokémon (e.g., Snorlax, Sudowoodo),
 * and traps (Voltorb/Electrode in Power Plant / New Mauville).
 *
 * @param saveData - The DataView wrapping the raw binary save file buffer.
 * @param gameVersion - The detected or active GameVersion string.
 * @param section1Offset - The resolved memory offset to the active SaveBlock1 section.
 * @returns Object mapping encounter flags to boolean completion states, or \`undefined\` for non-Gen 3 versions.
 * @throws Error with "The save file is corrupted or incomplete." if \`saveData\` bounds are exceeded.
 *
 * @example
 * const flags = extractGen3StaticEncounterFlags(dataView, 'emerald', 0x0000);
 * if (flags && 'rayquaza' in flags) {
 *   console.log('Rayquaza defeated/caught:', flags.rayquaza);
 * }
 */
export function extractGen3StaticEncounterFlags(
  saveData: DataView,
  gameVersion:
    | 'emerald'
    | 'firered'
    | 'leafgreen'
    | 'ruby'
    | 'sapphire'
    | 'unknown'
    | 'red'
    | 'blue'
    | 'yellow'
    | 'gold'
    | 'silver'
    | 'crystal',
  section1Offset: number,
): Gen3StaticEncounters | undefined {
  try {
    const reader = new SaveDataReader(saveData);
    // SaveBlock1 event flags array starts at section1Offset + EVENT_FLAGS_START
    const baseOffset = section1Offset + EVENT_FLAGS_START;

    if (gameVersion === 'emerald') {
      return {
        deoxys: reader.readFlag(baseOffset + EMERALD_DEOXYS_BYTE, EMERALD_DEOXYS_BIT),
        regirock: reader.readFlag(baseOffset + EMERALD_REGIROCK_BYTE, EMERALD_REGIROCK_BIT),
        regice: reader.readFlag(baseOffset + EMERALD_REGICE_BYTE, EMERALD_REGICE_BIT),
        registeel: reader.readFlag(baseOffset + EMERALD_REGISTEEL_BYTE, EMERALD_REGISTEEL_BIT),
        kyogre: reader.readFlag(baseOffset + EMERALD_KYOGRE_BYTE, EMERALD_KYOGRE_BIT),
        groudon: reader.readFlag(baseOffset + EMERALD_GROUDON_BYTE, EMERALD_GROUDON_BIT),
        rayquaza: reader.readFlag(baseOffset + EMERALD_RAYQUAZA_BYTE, EMERALD_RAYQUAZA_BIT),
        voltorb1: reader.readFlag(baseOffset + EMERALD_VOLTORB_1_BYTE, EMERALD_VOLTORB_1_BIT),
        voltorb2: reader.readFlag(baseOffset + EMERALD_VOLTORB_2_BYTE, EMERALD_VOLTORB_2_BIT),
        voltorb3: reader.readFlag(baseOffset + EMERALD_VOLTORB_3_BYTE, EMERALD_VOLTORB_3_BIT),
        electrode1: reader.readFlag(baseOffset + EMERALD_ELECTRODE_1_BYTE, EMERALD_ELECTRODE_1_BIT),
        electrode2: reader.readFlag(baseOffset + EMERALD_ELECTRODE_2_BYTE, EMERALD_ELECTRODE_2_BIT),
        sudowoodo: reader.readFlag(baseOffset + EMERALD_SUDOWOODO_BYTE, EMERALD_SUDOWOODO_BIT),
        mewDefeated: reader.readFlag(baseOffset + EMERALD_MEW_DEFEATED_BYTE, EMERALD_MEW_DEFEATED_BIT),
        mewCaught: reader.readFlag(baseOffset + EMERALD_MEW_CAUGHT_BYTE, EMERALD_MEW_CAUGHT_BIT),
        hoOh: reader.readFlag(baseOffset + EMERALD_HO_OH_BYTE, EMERALD_HO_OH_BIT),
        lugia: reader.readFlag(baseOffset + EMERALD_LUGIA_BYTE, EMERALD_LUGIA_BIT),
      };
    } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
      return {
        mewtwo: reader.readFlag(baseOffset + FRLG_MEWTWO_BYTE, FRLG_MEWTWO_BIT),
        moltres: reader.readFlag(baseOffset + FRLG_MOLTRES_BYTE, FRLG_MOLTRES_BIT),
        articuno: reader.readFlag(baseOffset + FRLG_ARTICUNO_BYTE, FRLG_ARTICUNO_BIT),
        zapdos: reader.readFlag(baseOffset + FRLG_ZAPDOS_BYTE, FRLG_ZAPDOS_BIT),
        deoxys: reader.readFlag(baseOffset + FRLG_DEOXYS_BYTE, FRLG_DEOXYS_BIT),
        lugia: reader.readFlag(baseOffset + FRLG_LUGIA_BYTE, FRLG_LUGIA_BIT),
        hoOh: reader.readFlag(baseOffset + FRLG_HO_OH_BYTE, FRLG_HO_OH_BIT),
        snorlaxRoute12: reader.readFlag(baseOffset + FRLG_SNORLAX_ROUTE_12_BYTE, FRLG_SNORLAX_ROUTE_12_BIT),
        snorlaxRoute16: reader.readFlag(baseOffset + FRLG_SNORLAX_ROUTE_16_BYTE, FRLG_SNORLAX_ROUTE_16_BIT),
      };
    } else if (gameVersion === 'ruby' || gameVersion === 'sapphire') {
      return {
        groudonKyogre: reader.readFlag(baseOffset + RS_GROUDON_KYOGRE_BYTE, RS_GROUDON_KYOGRE_BIT),
        rayquaza: reader.readFlag(baseOffset + RS_RAYQUAZA_BYTE, RS_RAYQUAZA_BIT),
        regirock: reader.readFlag(baseOffset + RS_REGIROCK_BYTE, RS_REGIROCK_BIT),
        regice: reader.readFlag(baseOffset + RS_REGICE_BYTE, RS_REGICE_BIT),
        registeel: reader.readFlag(baseOffset + RS_REGISTEEL_BYTE, RS_REGISTEEL_BIT),
        voltorb1: reader.readFlag(baseOffset + RS_VOLTORB_1_BYTE, RS_VOLTORB_1_BIT),
        voltorb2: reader.readFlag(baseOffset + RS_VOLTORB_2_BYTE, RS_VOLTORB_2_BIT),
        voltorb3: reader.readFlag(baseOffset + RS_VOLTORB_3_BYTE, RS_VOLTORB_3_BIT),
        electrode1: reader.readFlag(baseOffset + RS_ELECTRODE_1_BYTE, RS_ELECTRODE_1_BIT),
        electrode2: reader.readFlag(baseOffset + RS_ELECTRODE_2_BYTE, RS_ELECTRODE_2_BIT),
      };
    }
    return undefined;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

export {
  EMERALD_DEOXYS_BIT,
  EMERALD_DEOXYS_BYTE,
  EMERALD_ELECTRODE_1_BIT,
  EMERALD_ELECTRODE_1_BYTE,
  EMERALD_ELECTRODE_2_BIT,
  EMERALD_ELECTRODE_2_BYTE,
  EMERALD_GROUDON_BIT,
  EMERALD_GROUDON_BYTE,
  EMERALD_HO_OH_BIT,
  EMERALD_HO_OH_BYTE,
  EMERALD_KYOGRE_BIT,
  EMERALD_KYOGRE_BYTE,
  EMERALD_LUGIA_BIT,
  EMERALD_LUGIA_BYTE,
  EMERALD_MEW_CAUGHT_BIT,
  EMERALD_MEW_CAUGHT_BYTE,
  EMERALD_MEW_DEFEATED_BIT,
  EMERALD_MEW_DEFEATED_BYTE,
  EMERALD_RAYQUAZA_BIT,
  EMERALD_RAYQUAZA_BYTE,
  EMERALD_REGICE_BIT,
  EMERALD_REGICE_BYTE,
  EMERALD_REGIROCK_BIT,
  EMERALD_REGIROCK_BYTE,
  EMERALD_REGISTEEL_BIT,
  EMERALD_REGISTEEL_BYTE,
  EMERALD_SUDOWOODO_BIT,
  EMERALD_SUDOWOODO_BYTE,
  EMERALD_VOLTORB_1_BIT,
  EMERALD_VOLTORB_1_BYTE,
  EMERALD_VOLTORB_2_BIT,
  EMERALD_VOLTORB_2_BYTE,
  EMERALD_VOLTORB_3_BIT,
  EMERALD_VOLTORB_3_BYTE,
  EVENT_FLAGS_START,
  FRLG_ARTICUNO_BIT,
  FRLG_ARTICUNO_BYTE,
  FRLG_DEOXYS_BIT,
  FRLG_DEOXYS_BYTE,
  FRLG_HO_OH_BIT,
  FRLG_HO_OH_BYTE,
  FRLG_LUGIA_BIT,
  FRLG_LUGIA_BYTE,
  FRLG_MEWTWO_BIT,
  FRLG_MEWTWO_BYTE,
  FRLG_MOLTRES_BIT,
  FRLG_MOLTRES_BYTE,
  FRLG_SNORLAX_ROUTE_12_BIT,
  FRLG_SNORLAX_ROUTE_12_BYTE,
  FRLG_SNORLAX_ROUTE_16_BIT,
  FRLG_SNORLAX_ROUTE_16_BYTE,
  FRLG_ZAPDOS_BIT,
  FRLG_ZAPDOS_BYTE,
  RS_ELECTRODE_1_BIT,
  RS_ELECTRODE_1_BYTE,
  RS_ELECTRODE_2_BIT,
  RS_ELECTRODE_2_BYTE,
  RS_GROUDON_KYOGRE_BIT,
  RS_GROUDON_KYOGRE_BYTE,
  RS_RAYQUAZA_BIT,
  RS_RAYQUAZA_BYTE,
  RS_REGICE_BIT,
  RS_REGICE_BYTE,
  RS_REGIROCK_BIT,
  RS_REGIROCK_BYTE,
  RS_REGISTEEL_BIT,
  RS_REGISTEEL_BYTE,
  RS_VOLTORB_1_BIT,
  RS_VOLTORB_1_BYTE,
  RS_VOLTORB_2_BIT,
  RS_VOLTORB_2_BYTE,
  RS_VOLTORB_3_BIT,
  RS_VOLTORB_3_BYTE,
} from './staticEncounters/constants';
