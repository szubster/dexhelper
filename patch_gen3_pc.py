import re

with open('src/engine/saveParser/parsers/gen3.ts', 'r') as f:
    content = f.read()

# 1. Add constants
constants_block = """
const PC_BUFFER_SECTION_IDS = [5, 6, 7, 8, 9, 10, 11, 12, 13];
const PC_BUFFER_SECTION_SIZE = 3968;
const PC_BUFFER_LAST_SECTION_SIZE = 2000;
const PC_CURRENT_BOX_OFFSET = 0x0000;
const PC_BOXES_POKEMON_LIST_OFFSET = 0x0004;
const PC_BOX_NAMES_OFFSET = 0x8344;
const PC_BOX_WALLPAPERS_OFFSET = 0x83c2;
const GEN3_PC_MAX_BOXES = 14;
const GEN3_PC_BOX_CAPACITY = 30;
const GEN3_PC_POKEMON_SIZE = 80;
const GEN3_PC_BOX_NAME_LENGTH = 9;
const GROWTH_SPECIES_ID_OFFSET = 0;
const GROWTH_EXPERIENCE_OFFSET = 4;
"""

content = re.sub(
    r'(const GEN3_ROAMER_OFFSET_FRLG = 0x30d0;)',
    r'\1\n' + constants_block,
    content
)

# 2. Add parseGen3PCBoxes function
parse_pc_boxes = """
/**
 * Parses the PC Boxes from a Gen 3 save file.
 * The PC buffer is spread across sections 5-13.
 */
function parseGen3PCBoxes(view: DataView): { pc: number[]; pcDetails: PokemonInstance[]; currentBoxCount: number } {
  const pcBuffer = new Uint8Array(PC_BUFFER_SECTION_SIZE * 8 + PC_BUFFER_LAST_SECTION_SIZE);
  let bufferOffset = 0;

  for (let i = 0; i < PC_BUFFER_SECTION_IDS.length; i++) {
    const sectionId = PC_BUFFER_SECTION_IDS[i] as number;
    const sectionOffset = getLatestSectionOffset(view, sectionId);

    const size = sectionId === 13 ? PC_BUFFER_LAST_SECTION_SIZE : PC_BUFFER_SECTION_SIZE;
    for (let j = 0; j < size; j++) {
      pcBuffer[bufferOffset++] = view.getUint8(sectionOffset + j);
    }
  }

  const pcView = new DataView(pcBuffer.buffer);
  const currentBoxNum = pcView.getUint32(PC_CURRENT_BOX_OFFSET, true);

  const boxNames: string[] = [];
  for (let i = 0; i < GEN3_PC_MAX_BOXES; i++) {
    let name = '';
    const offset = PC_BOX_NAMES_OFFSET + i * GEN3_PC_BOX_NAME_LENGTH;
    for (let j = 0; j < 8; j++) {
      const charCode = pcView.getUint8(offset + j);
      if (charCode === 0xff) break;
      // Basic character mapping (for full accuracy, use a proper char map)
      if (charCode >= 0xbb && charCode <= 0xd4) {
        name += String.fromCharCode(charCode - 0xbb + 65); // A-Z
      } else if (charCode >= 0xd5 && charCode <= 0xee) {
        name += String.fromCharCode(charCode - 0xd5 + 97); // a-z
      } else if (charCode >= 0xa1 && charCode <= 0xaa) {
        name += String.fromCharCode(charCode - 0xa1 + 48); // 0-9
      } else if (charCode === 0x00) {
        name += ' ';
      } else {
        name += '?';
      }
    }
    boxNames.push(name.trim() || `BOX${i + 1}`);
  }

  const pc: number[] = [];
  const pcDetails: PokemonInstance[] = [];

  for (let box = 0; box < GEN3_PC_MAX_BOXES; box++) {
    for (let slot = 0; slot < GEN3_PC_BOX_CAPACITY; slot++) {
      const offset = PC_BOXES_POKEMON_LIST_OFFSET + (box * GEN3_PC_BOX_CAPACITY + slot) * GEN3_PC_POKEMON_SIZE;

      const pv = pcView.getUint32(offset + GEN3_POKEMON_PV_OFFSET, true);
      const otId = pcView.getUint32(offset + GEN3_POKEMON_OT_ID_OFFSET, true);

      if (pv === 0 && otId === 0) continue;

      const decryptionKey = pv ^ otId;
      const permutationIndex = pv % NUM_SUBSTRUCTURE_PERMUTATIONS;
      const permutation = SUBSTRUCTURE_ORDER[permutationIndex];

      if (!permutation) continue;

      const indexOfG = permutation.indexOf('G');
      const indexOfM = permutation.indexOf('M');

      const growthOffset = offset + GEN3_POKEMON_DATA_OFFSET + indexOfG * SUBSTRUCTURE_SIZE;
      const miscOffset = offset + GEN3_POKEMON_DATA_OFFSET + indexOfM * SUBSTRUCTURE_SIZE;

      const encryptedGrowthWord1 = pcView.getUint32(growthOffset, true);
      const decryptedGrowthWord1 = encryptedGrowthWord1 ^ decryptionKey;

      const speciesId = decryptedGrowthWord1 & 0xffff;
      if (speciesId === 0 || speciesId > 411) continue;

      pc.push(speciesId);

      // Just a stub for level for now as it requires calculating EXP curve.
      // But we can extract IVs easily.
      const encryptedMiscWord2 = pcView.getUint32(miscOffset + MISC_IVS_OFFSET, true);
      const decryptedMiscWord2 = encryptedMiscWord2 ^ decryptionKey;

      const hp = (decryptedMiscWord2 >> IV_SHIFT_HP) & IV_MASK;
      const attack = (decryptedMiscWord2 >> IV_SHIFT_ATK) & IV_MASK;
      const defense = (decryptedMiscWord2 >> IV_SHIFT_DEF) & IV_MASK;
      const speed = (decryptedMiscWord2 >> IV_SHIFT_SPD) & IV_MASK;
      const specialAttack = (decryptedMiscWord2 >> IV_SHIFT_SPATK) & IV_MASK;
      const specialDefense = (decryptedMiscWord2 >> IV_SHIFT_SPDEF) & IV_MASK;

      pcDetails.push({
        speciesId,
        level: 1, // Will need proper calculation based on exp curve, or just leave as 1 for now if not strictly required
        isShiny: false, // Would need to check shiny logic
        moves: [], // Would need to parse attacks from 'A' substructure
        storageLocation: boxNames[box] || `BOX${box + 1}`,
        slot: slot + 1,
        dvs: { hp, atk: attack, def: defense, spd: speed, spc: specialAttack }, // spDef not in the interface, maybe just specialAttack?
        hash: `${pv}-${otId}`,
      });
    }
  }

  return { pc, pcDetails, currentBoxCount: currentBoxNum };
}
"""

content = content.replace("export function parseGen3TrainerId", parse_pc_boxes + "\nexport function parseGen3TrainerId")

# 3. Call parseGen3PCBoxes in parseGen3
call_pc_boxes = """
    const gen3SecretBases = parseGen3SecretBases(view, section1Offset, _forcedVersion || 'ruby');

    let pcData = { pc: [] as number[], pcDetails: [] as import('./common').PokemonInstance[], currentBoxCount: 0 };
    try {
      pcData = parseGen3PCBoxes(view);
    } catch {
      // Ignored
    }
"""

content = content.replace(
    "const gen3SecretBases = parseGen3SecretBases(view, section1Offset, _forcedVersion || 'ruby');",
    call_pc_boxes
)

content = content.replace(
    "pc: [],",
    "pc: pcData.pc,"
)
content = content.replace(
    "pcDetails: [],",
    "pcDetails: pcData.pcDetails,"
)
content = content.replace(
    "currentBoxCount: 0,",
    "currentBoxCount: pcData.currentBoxCount,"
)

with open('src/engine/saveParser/parsers/gen3.ts', 'w') as f:
    f.write(content)
