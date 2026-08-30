const fs = require('fs');

let content = fs.readFileSync('src/engine/saveParser/parsers/gen3_extraction.test.ts', 'utf8');
content = content.replace(
  "import {\n  GEN3_POKEMON_DATA_OFFSET,\n  LOWER_16_BIT_MASK,\n  NUM_SUBSTRUCTURE_PERMUTATIONS,\n  SUBSTRUCTURE_ORDER,\n  SUBSTRUCTURE_SIZE,\n  parseGen3PokemonData,\n} from './gen3';",
  "import {\n  GEN3_POKEMON_DATA_OFFSET,\n  LOWER_16_BIT_MASK,\n  NUM_SUBSTRUCTURE_PERMUTATIONS,\n  SUBSTRUCTURE_SIZE,\n  parseGen3PokemonData,\n} from './gen3';\nimport { SUBSTRUCTURE_ORDER } from '../gen3/pokemon/constants';"
);

fs.writeFileSync('src/engine/saveParser/parsers/gen3_extraction.test.ts', content);
