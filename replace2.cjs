const fs = require('fs');

let content = fs.readFileSync('src/engine/saveParser/parsers/gen3.ts', 'utf8');

content = content.replace(/export const SUBSTRUCTURE_ORDER = \[\s+'GAEM',\s+'GAME',\s+'GEAM',\s+'GEMA',\s+'GMAE',\s+'GMEA',\s+'AGEM',\s+'AGME',\s+'AEGM',\s+'AEMG',\s+'AMGE',\s+'AMEG',\s+'EGAM',\s+'EGMA',\s+'EAGM',\s+'EAMG',\s+'EMGA',\s+'EMAG',\s+'MGAE',\s+'MGEA',\s+'MAGE',\s+'MAEG',\s+'MEGA',\s+'MEAG',\s+\];/s, '');

content = content.replace(
  "import { extractFeebasSeed } from '../../gen3/feebas';",
  "import { extractFeebasSeed } from '../../gen3/feebas';\nimport { SUBSTRUCTURE_ORDER } from '../gen3/pokemon/constants';"
);

fs.writeFileSync('src/engine/saveParser/parsers/gen3.ts', content);
