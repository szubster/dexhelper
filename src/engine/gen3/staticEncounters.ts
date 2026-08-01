export const EVENT_FLAGS_START = 0x1270;

// Emerald Offsets & Bits
export const EMERALD_DEOXYS_BYTE = 0x35;
export const EMERALD_DEOXYS_BIT = 4;
export const EMERALD_REGIROCK_BYTE = 0x37;
export const EMERALD_REGIROCK_BIT = 3;
export const EMERALD_REGICE_BYTE = 0x37;
export const EMERALD_REGICE_BIT = 4;
export const EMERALD_REGISTEEL_BYTE = 0x37;
export const EMERALD_REGISTEEL_BIT = 5;
export const EMERALD_KYOGRE_BYTE = 0x37;
export const EMERALD_KYOGRE_BIT = 6;
export const EMERALD_GROUDON_BYTE = 0x37;
export const EMERALD_GROUDON_BIT = 7;
export const EMERALD_RAYQUAZA_BYTE = 0x38;
export const EMERALD_RAYQUAZA_BIT = 0;
export const EMERALD_VOLTORB_1_BYTE = 0x38;
export const EMERALD_VOLTORB_1_BIT = 1;
export const EMERALD_VOLTORB_2_BYTE = 0x38;
export const EMERALD_VOLTORB_2_BIT = 2;
export const EMERALD_VOLTORB_3_BYTE = 0x38;
export const EMERALD_VOLTORB_3_BIT = 3;
export const EMERALD_ELECTRODE_1_BYTE = 0x38;
export const EMERALD_ELECTRODE_1_BIT = 4;
export const EMERALD_ELECTRODE_2_BYTE = 0x38;
export const EMERALD_ELECTRODE_2_BIT = 5;
export const EMERALD_SUDOWOODO_BYTE = 0x38;
export const EMERALD_SUDOWOODO_BIT = 6;
export const EMERALD_MEW_DEFEATED_BYTE = 0x38;
export const EMERALD_MEW_DEFEATED_BIT = 7;
export const EMERALD_MEW_CAUGHT_BYTE = 0x39;
export const EMERALD_MEW_CAUGHT_BIT = 2;
export const EMERALD_HO_OH_BYTE = 0x3b;
export const EMERALD_HO_OH_BIT = 4;
export const EMERALD_LUGIA_BYTE = 0x3b;
export const EMERALD_LUGIA_BIT = 5;

// FireRed/LeafGreen Offsets & Bits
export const FRLG_MEWTWO_BYTE = 0x57;
export const FRLG_MEWTWO_BIT = 4;
export const FRLG_MOLTRES_BYTE = 0x57;
export const FRLG_MOLTRES_BIT = 5;
export const FRLG_ARTICUNO_BYTE = 0x57;
export const FRLG_ARTICUNO_BIT = 6;
export const FRLG_ZAPDOS_BYTE = 0x57;
export const FRLG_ZAPDOS_BIT = 7;
export const FRLG_DEOXYS_BYTE = 0x5c;
export const FRLG_DEOXYS_BIT = 4;
export const FRLG_LUGIA_BYTE = 0x5e;
export const FRLG_LUGIA_BIT = 2;
export const FRLG_HO_OH_BYTE = 0x5e;
export const FRLG_HO_OH_BIT = 3;
export const FRLG_SNORLAX_ROUTE_12_BYTE = 0x4a;
export const FRLG_SNORLAX_ROUTE_12_BIT = 3;
export const FRLG_SNORLAX_ROUTE_16_BYTE = 0x10;
export const FRLG_SNORLAX_ROUTE_16_BIT = 0;

// Ruby/Sapphire Offsets & Bits
export const RS_GROUDON_KYOGRE_BYTE = 0x0e;
export const RS_GROUDON_KYOGRE_BIT = 1;
export const RS_RAYQUAZA_BYTE = 0x60;
export const RS_RAYQUAZA_BIT = 5;
export const RS_REGIROCK_BYTE = 0x74;
export const RS_REGIROCK_BIT = 7;
export const RS_REGICE_BYTE = 0x75;
export const RS_REGICE_BIT = 0;
export const RS_REGISTEEL_BYTE = 0x75;
export const RS_REGISTEEL_BIT = 1;
export const RS_VOLTORB_1_BYTE = 0x79;
export const RS_VOLTORB_1_BIT = 6;
export const RS_VOLTORB_2_BYTE = 0x79;
export const RS_VOLTORB_2_BIT = 7;
export const RS_VOLTORB_3_BYTE = 0x7a;
export const RS_VOLTORB_3_BIT = 0;
export const RS_ELECTRODE_1_BYTE = 0x7a;
export const RS_ELECTRODE_1_BIT = 1;
export const RS_ELECTRODE_2_BYTE = 0x7a;
export const RS_ELECTRODE_2_BIT = 2;

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

export type Gen3StaticEncounters = Gen3EmeraldStaticEncounters | Gen3FRLGStaticEncounters | Gen3RSStaticEncounters;

function getBit(dataView: DataView, offset: number, bitPosition: number): boolean {
  return (dataView.getUint8(offset) & (1 << bitPosition)) !== 0;
}

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
    const baseOffset = section1Offset + EVENT_FLAGS_START;

    if (gameVersion === 'emerald') {
      return {
        deoxys: getBit(saveData, baseOffset + EMERALD_DEOXYS_BYTE, EMERALD_DEOXYS_BIT),
        regirock: getBit(saveData, baseOffset + EMERALD_REGIROCK_BYTE, EMERALD_REGIROCK_BIT),
        regice: getBit(saveData, baseOffset + EMERALD_REGICE_BYTE, EMERALD_REGICE_BIT),
        registeel: getBit(saveData, baseOffset + EMERALD_REGISTEEL_BYTE, EMERALD_REGISTEEL_BIT),
        kyogre: getBit(saveData, baseOffset + EMERALD_KYOGRE_BYTE, EMERALD_KYOGRE_BIT),
        groudon: getBit(saveData, baseOffset + EMERALD_GROUDON_BYTE, EMERALD_GROUDON_BIT),
        rayquaza: getBit(saveData, baseOffset + EMERALD_RAYQUAZA_BYTE, EMERALD_RAYQUAZA_BIT),
        voltorb1: getBit(saveData, baseOffset + EMERALD_VOLTORB_1_BYTE, EMERALD_VOLTORB_1_BIT),
        voltorb2: getBit(saveData, baseOffset + EMERALD_VOLTORB_2_BYTE, EMERALD_VOLTORB_2_BIT),
        voltorb3: getBit(saveData, baseOffset + EMERALD_VOLTORB_3_BYTE, EMERALD_VOLTORB_3_BIT),
        electrode1: getBit(saveData, baseOffset + EMERALD_ELECTRODE_1_BYTE, EMERALD_ELECTRODE_1_BIT),
        electrode2: getBit(saveData, baseOffset + EMERALD_ELECTRODE_2_BYTE, EMERALD_ELECTRODE_2_BIT),
        sudowoodo: getBit(saveData, baseOffset + EMERALD_SUDOWOODO_BYTE, EMERALD_SUDOWOODO_BIT),
        mewDefeated: getBit(saveData, baseOffset + EMERALD_MEW_DEFEATED_BYTE, EMERALD_MEW_DEFEATED_BIT),
        mewCaught: getBit(saveData, baseOffset + EMERALD_MEW_CAUGHT_BYTE, EMERALD_MEW_CAUGHT_BIT),
        hoOh: getBit(saveData, baseOffset + EMERALD_HO_OH_BYTE, EMERALD_HO_OH_BIT),
        lugia: getBit(saveData, baseOffset + EMERALD_LUGIA_BYTE, EMERALD_LUGIA_BIT),
      };
    } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
      return {
        mewtwo: getBit(saveData, baseOffset + FRLG_MEWTWO_BYTE, FRLG_MEWTWO_BIT),
        moltres: getBit(saveData, baseOffset + FRLG_MOLTRES_BYTE, FRLG_MOLTRES_BIT),
        articuno: getBit(saveData, baseOffset + FRLG_ARTICUNO_BYTE, FRLG_ARTICUNO_BIT),
        zapdos: getBit(saveData, baseOffset + FRLG_ZAPDOS_BYTE, FRLG_ZAPDOS_BIT),
        deoxys: getBit(saveData, baseOffset + FRLG_DEOXYS_BYTE, FRLG_DEOXYS_BIT),
        lugia: getBit(saveData, baseOffset + FRLG_LUGIA_BYTE, FRLG_LUGIA_BIT),
        hoOh: getBit(saveData, baseOffset + FRLG_HO_OH_BYTE, FRLG_HO_OH_BIT),
        snorlaxRoute12: getBit(saveData, baseOffset + FRLG_SNORLAX_ROUTE_12_BYTE, FRLG_SNORLAX_ROUTE_12_BIT),
        snorlaxRoute16: getBit(saveData, baseOffset + FRLG_SNORLAX_ROUTE_16_BYTE, FRLG_SNORLAX_ROUTE_16_BIT),
      };
    } else if (gameVersion === 'ruby' || gameVersion === 'sapphire') {
      return {
        groudonKyogre: getBit(saveData, baseOffset + RS_GROUDON_KYOGRE_BYTE, RS_GROUDON_KYOGRE_BIT),
        rayquaza: getBit(saveData, baseOffset + RS_RAYQUAZA_BYTE, RS_RAYQUAZA_BIT),
        regirock: getBit(saveData, baseOffset + RS_REGIROCK_BYTE, RS_REGIROCK_BIT),
        regice: getBit(saveData, baseOffset + RS_REGICE_BYTE, RS_REGICE_BIT),
        registeel: getBit(saveData, baseOffset + RS_REGISTEEL_BYTE, RS_REGISTEEL_BIT),
        voltorb1: getBit(saveData, baseOffset + RS_VOLTORB_1_BYTE, RS_VOLTORB_1_BIT),
        voltorb2: getBit(saveData, baseOffset + RS_VOLTORB_2_BYTE, RS_VOLTORB_2_BIT),
        voltorb3: getBit(saveData, baseOffset + RS_VOLTORB_3_BYTE, RS_VOLTORB_3_BIT),
        electrode1: getBit(saveData, baseOffset + RS_ELECTRODE_1_BYTE, RS_ELECTRODE_1_BIT),
        electrode2: getBit(saveData, baseOffset + RS_ELECTRODE_2_BYTE, RS_ELECTRODE_2_BIT),
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
