export const GEN1_PARTY_COUNT_OFFSET = 0x2f2c;
export const GEN1_PARTY_DATA_START_OFFSET = 0x2f2d;
export const GEN1_PARTY_MAX_MONS = 6;

export const GEN2_PARTY_COUNT_OFFSET_GS = 0x288a;
export const GEN2_PARTY_SPECIES_OFFSET_GS = 0x288b;

export const GEN2_PARTY_COUNT_OFFSET_CRYSTAL = 0x2865;
export const GEN2_PARTY_SPECIES_OFFSET_CRYSTAL = 0x2866;

export function isGen1Save(view: DataView): boolean {
  try {
    const partyCount = view.getUint8(GEN1_PARTY_COUNT_OFFSET);
    if (partyCount > GEN1_PARTY_MAX_MONS) return false;
    if (view.getUint8(GEN1_PARTY_DATA_START_OFFSET + partyCount) !== 0xff) return false;
    for (let i = 0; i < partyCount; i++) {
      const id = view.getUint8(GEN1_PARTY_DATA_START_OFFSET + i);
      if (id === 0 || id === 0xff) return false;
    }
    return true;
  } catch (e) {
    if (e instanceof RangeError) return false;
    throw e;
  }
}

export function isGen2Save(view: DataView, crystal: boolean): boolean {
  try {
    const countOffset = crystal ? GEN2_PARTY_COUNT_OFFSET_CRYSTAL : GEN2_PARTY_COUNT_OFFSET_GS;
    const speciesOffset = crystal ? GEN2_PARTY_SPECIES_OFFSET_CRYSTAL : GEN2_PARTY_SPECIES_OFFSET_GS;
    const partyCount = view.getUint8(countOffset);
    if (partyCount > 6) return false;
    if (view.getUint8(speciesOffset + partyCount) !== 0xff) return false;
    for (let i = 0; i < partyCount; i++) {
      const id = view.getUint8(speciesOffset + i);
      if (id === 0 || id > 251) return false;
    }
    return true;
  } catch (e) {
    if (e instanceof RangeError) return false;
    throw e;
  }
}

export function isGen3Save(view: DataView): boolean {
  try {
    if (view.byteLength > 0) {
      view.getUint8(0);
    }
    return false; // Stub implementation
  } catch (error) {
    if (error instanceof RangeError) {
      return false;
    }
    throw error;
  }
}
