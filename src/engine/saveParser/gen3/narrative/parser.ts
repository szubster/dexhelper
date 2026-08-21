import {
  FRLG_FLAG_BADGE01_GET,
  FRLG_FLAG_BADGE02_GET,
  FRLG_FLAG_BADGE03_GET,
  FRLG_FLAG_BADGE04_GET,
  FRLG_FLAG_BADGE05_GET,
  FRLG_FLAG_BADGE06_GET,
  FRLG_FLAG_BADGE07_GET,
  FRLG_FLAG_BADGE08_GET,
  FRLG_FLAGS_OFFSET,
  RSE_FLAG_BADGE01_GET,
  RSE_FLAG_BADGE02_GET,
  RSE_FLAG_BADGE03_GET,
  RSE_FLAG_BADGE04_GET,
  RSE_FLAG_BADGE05_GET,
  RSE_FLAG_BADGE06_GET,
  RSE_FLAG_BADGE07_GET,
  RSE_FLAG_BADGE08_GET,
  RSE_FLAGS_OFFSET_E,
  RSE_FLAGS_OFFSET_RS,
} from './constants';

const BITS_PER_BYTE = 8;
const BIT_MASK = 1;

/**
 * Extracts story progression narrative flags and upcoming bosses for Gen 3.
 */
export function parseGen3NarrativeFlags(view: DataView, saveBlock1Offset: number, gameVersion: string) {
  try {
    let baseFlagsOffset = 0;

    if (gameVersion === 'emerald') {
      baseFlagsOffset = saveBlock1Offset + RSE_FLAGS_OFFSET_E;
    } else if (gameVersion === 'ruby' || gameVersion === 'sapphire') {
      baseFlagsOffset = saveBlock1Offset + RSE_FLAGS_OFFSET_RS;
    } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
      baseFlagsOffset = saveBlock1Offset + FRLG_FLAGS_OFFSET;
    } else {
      return {
        badges: 0,
        flags: {
          badge1: false,
          badge2: false,
          badge3: false,
          badge4: false,
          badge5: false,
          badge6: false,
          badge7: false,
          badge8: false,
        },
        upcomingBoss: 'Unknown',
      };
    }

    const readFlag = (flagId: number) => {
      const byteOffset = baseFlagsOffset + Math.floor(flagId / BITS_PER_BYTE);
      const bitIndex = flagId % BITS_PER_BYTE;
      const byteValue = view.getUint8(byteOffset);
      return !!((byteValue >> bitIndex) & BIT_MASK);
    };

    let badges = 0;
    let upcomingBoss = 'Unknown';
    const flags = {
      badge1: false,
      badge2: false,
      badge3: false,
      badge4: false,
      badge5: false,
      badge6: false,
      badge7: false,
      badge8: false,
    };

    if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
      flags.badge1 = readFlag(FRLG_FLAG_BADGE01_GET);
      flags.badge2 = readFlag(FRLG_FLAG_BADGE02_GET);
      flags.badge3 = readFlag(FRLG_FLAG_BADGE03_GET);
      flags.badge4 = readFlag(FRLG_FLAG_BADGE04_GET);
      flags.badge5 = readFlag(FRLG_FLAG_BADGE05_GET);
      flags.badge6 = readFlag(FRLG_FLAG_BADGE06_GET);
      flags.badge7 = readFlag(FRLG_FLAG_BADGE07_GET);
      flags.badge8 = readFlag(FRLG_FLAG_BADGE08_GET);

      if (flags.badge1) badges++;
      if (flags.badge2) badges++;
      if (flags.badge3) badges++;
      if (flags.badge4) badges++;
      if (flags.badge5) badges++;
      if (flags.badge6) badges++;
      if (flags.badge7) badges++;
      if (flags.badge8) badges++;

      if (!flags.badge1) upcomingBoss = 'Brock';
      else if (!flags.badge2) upcomingBoss = 'Misty';
      else if (!flags.badge3) upcomingBoss = 'Lt. Surge';
      else if (!flags.badge4) upcomingBoss = 'Erika';
      else if (!flags.badge5) upcomingBoss = 'Koga';
      else if (!flags.badge6) upcomingBoss = 'Sabrina';
      else if (!flags.badge7) upcomingBoss = 'Blaine';
      else if (!flags.badge8) upcomingBoss = 'Giovanni';
      else upcomingBoss = 'Elite Four';
    } else {
      flags.badge1 = readFlag(RSE_FLAG_BADGE01_GET);
      flags.badge2 = readFlag(RSE_FLAG_BADGE02_GET);
      flags.badge3 = readFlag(RSE_FLAG_BADGE03_GET);
      flags.badge4 = readFlag(RSE_FLAG_BADGE04_GET);
      flags.badge5 = readFlag(RSE_FLAG_BADGE05_GET);
      flags.badge6 = readFlag(RSE_FLAG_BADGE06_GET);
      flags.badge7 = readFlag(RSE_FLAG_BADGE07_GET);
      flags.badge8 = readFlag(RSE_FLAG_BADGE08_GET);

      if (flags.badge1) badges++;
      if (flags.badge2) badges++;
      if (flags.badge3) badges++;
      if (flags.badge4) badges++;
      if (flags.badge5) badges++;
      if (flags.badge6) badges++;
      if (flags.badge7) badges++;
      if (flags.badge8) badges++;

      if (!flags.badge1) upcomingBoss = 'Roxanne';
      else if (!flags.badge2) upcomingBoss = 'Brawly';
      else if (!flags.badge3) upcomingBoss = 'Wattson';
      else if (!flags.badge4) upcomingBoss = 'Flannery';
      else if (!flags.badge5) upcomingBoss = 'Norman';
      else if (!flags.badge6) upcomingBoss = 'Winona';
      else if (!flags.badge7) upcomingBoss = 'Tate & Liza';
      else if (!flags.badge8) upcomingBoss = 'Wallace/Juan';
      else upcomingBoss = 'Elite Four';
    }

    return {
      badges,
      flags,
      upcomingBoss,
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
