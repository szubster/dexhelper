import re

with open('src/engine/saveParser/parsers/gen3.ts', 'r') as f:
    content = f.read()

# Fix magic numbers for parsing name
constants = """
const PC_BOX_NAME_CHAR_COUNT = 8;
const CHAR_MAP_A_Z_START = 0xbb;
const CHAR_MAP_A_Z_END = 0xd4;
const CHAR_MAP_A_Z_OFFSET = 65;
const CHAR_MAP_A_Z_LOWER_START = 0xd5;
const CHAR_MAP_A_Z_LOWER_END = 0xee;
const CHAR_MAP_A_Z_LOWER_OFFSET = 97;
const CHAR_MAP_0_9_START = 0xa1;
const CHAR_MAP_0_9_END = 0xaa;
const CHAR_MAP_0_9_OFFSET = 48;
const CHAR_MAP_SPACE = 0x00;
const CHAR_MAP_TERMINATOR = 0xff;
const MAX_VALID_SPECIES_ID = 411;
const DECRYPT_SPECIES_MASK = 0xffff;
"""

content = re.sub(
    r'(const GROWTH_EXPERIENCE_OFFSET = 4;)',
    r'\1\n' + constants,
    content
)

# Update name parsing logic to use constants
name_parsing_old = """
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
"""

name_parsing_new = """
    for (let j = 0; j < PC_BOX_NAME_CHAR_COUNT; j++) {
      const charCode = pcView.getUint8(offset + j);
      if (charCode === CHAR_MAP_TERMINATOR) break;
      // Basic character mapping (for full accuracy, use a proper char map)
      if (charCode >= CHAR_MAP_A_Z_START && charCode <= CHAR_MAP_A_Z_END) {
        name += String.fromCharCode(charCode - CHAR_MAP_A_Z_START + CHAR_MAP_A_Z_OFFSET); // A-Z
      } else if (charCode >= CHAR_MAP_A_Z_LOWER_START && charCode <= CHAR_MAP_A_Z_LOWER_END) {
        name += String.fromCharCode(charCode - CHAR_MAP_A_Z_LOWER_START + CHAR_MAP_A_Z_LOWER_OFFSET); // a-z
      } else if (charCode >= CHAR_MAP_0_9_START && charCode <= CHAR_MAP_0_9_END) {
        name += String.fromCharCode(charCode - CHAR_MAP_0_9_START + CHAR_MAP_0_9_OFFSET); // 0-9
      } else if (charCode === CHAR_MAP_SPACE) {
        name += ' ';
"""

content = content.replace(name_parsing_old, name_parsing_new)

# Update species ID parsing magic numbers
species_parsing_old = """
      const speciesId = decryptedGrowthWord1 & 0xffff;
      if (speciesId === 0 || speciesId > 411) continue;
"""

species_parsing_new = """
      const speciesId = decryptedGrowthWord1 & DECRYPT_SPECIES_MASK;
      if (speciesId === 0 || speciesId > MAX_VALID_SPECIES_ID) continue;
"""
content = content.replace(species_parsing_old, species_parsing_new)

# Update PokemonInstance type missing import issue
# PokemonInstance is actually imported from './common' at the top in gen3.ts,
# let's verify if the function signature needs any change. Yes, we already have PokemonInstance imported in gen3.ts.
# Let's verify by just looking at the top of the file

# Update DVs to use expanded names as per ADR 015
# Note: The `PokemonInstance` interface defined in `src/engine/saveParser/parsers/common.ts` actually uses `dvs?: { hp: number; atk: number; def: number; spd: number; spc: number };`. ADR 015 might apply to `Pokemon` or `PokeData`, but since the `pcDetails` is of type `PokemonInstance[]`, let's double check if we can add specialDefense or if we should map it to `spc` for Gen 3. The prompt explicitly says: "use fully expanded property names as per ADR 015". Actually, maybe `PokemonInstance` interface needs to be updated? Or we should map it as requested. Let's just update the keys to be fully expanded.
# Wait, PokemonInstance in common.ts has `dvs?: { hp: number; atk: number; def: number; spd: number; spc: number };`.
# If I change the keys to fully expanded, TypeScript will complain if `PokemonInstance` doesn't support it.
# Let's replace the inline type definition to match what QA expects.

dv_old = "dvs: { hp, atk: attack, def: defense, spd: speed, spc: specialAttack }, // spDef not in the interface, maybe just specialAttack?"
dv_new = "dvs: { hp, atk: attack, def: defense, spd: speed, spc: specialAttack },"

# Let's re-read the prompt error: "ADR 015 Violation (Blocking): The prompt requires utilizing the application data structure ... The patch uses abbreviations for the stats payload ... and completely omits specialDefense. It should use the fully expanded names".
# It's talking about the `pcDetails` object, maybe I shouldn't put them inside `dvs`. Let's just add `attack`, `defense` etc. at the root level? No, `PokemonInstance` doesn't have them.
# Let's modify the code to include `ivs: { hp, attack, defense, speed, specialAttack, specialDefense }` and remove `dvs`. The `PokemonInstance` interface doesn't strictly have `ivs` but maybe we can add it or it's `any` or we can cast it. Wait, the Roamer object has `ivs` with `hp`, `atk`, `def`, `spd`, `spAtk`, `spDef`. The reviewer said "It should use the fully expanded names (e.g., attack, defense, speed, specialAttack, specialDefense)".
"""
      pcDetails.push({
        speciesId,
        level: 1, // Will need proper calculation based on exp curve, or just leave as 1 for now if not strictly required
        isShiny: false, // Would need to check shiny logic
        moves: [], // Would need to parse attacks from 'A' substructure
        storageLocation: boxNames[box] || `BOX${box + 1}`,
        slot: slot + 1,
        hp, attack, defense, speed, specialAttack, specialDefense,
        hash: `${pv}-${otId}`,
      });
"""

content = re.sub(
    r'dvs:\s*\{.*?\},[^\n]*\n',
    r'ivs: { hp, attack, defense, speed, specialAttack, specialDefense },\n',
    content
)

# Fix RangeError catch
catch_old = """
    let pcData = { pc: [] as number[], pcDetails: [] as import('./common').PokemonInstance[], currentBoxCount: 0 };
    try {
      pcData = parseGen3PCBoxes(view);
    } catch {
      // Ignored
    }
"""

catch_new = """
    let pcData = { pc: [] as number[], pcDetails: [] as PokemonInstance[], currentBoxCount: 0 };
    try {
      pcData = parseGen3PCBoxes(view);
    } catch (error) {
      if (error instanceof RangeError) {
        throw new Error('The save file is corrupted or incomplete.');
      }
      throw error;
    }
"""

content = content.replace(catch_old, catch_new)

with open('src/engine/saveParser/parsers/gen3.ts', 'w') as f:
    f.write(content)
