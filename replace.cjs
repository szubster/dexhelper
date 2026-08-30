const fs = require('fs');

let content = fs.readFileSync('src/engine/saveParser/parsers/gen3.ts', 'utf8');

content = content.replace(/const CONDITION_COOL_OFFSET = 0x06;\nconst CONDITION_BEAUTY_OFFSET = 0x07;\nconst CONDITION_CUTE_OFFSET = 0x08;\nconst CONDITION_SMART_OFFSET = 0x09;\nconst CONDITION_TOUGH_OFFSET = 0x0a;\nconst CONDITION_SHEEN_OFFSET = 0x0b;\n/, '');

content = content.replace(
  "import { extractFeebasSeed } from '../../gen3/feebas';",
  "import { extractFeebasSeed } from '../../gen3/feebas';\nimport { CONDITION_BEAUTY_OFFSET, CONDITION_COOL_OFFSET, CONDITION_CUTE_OFFSET, CONDITION_SHEEN_OFFSET, CONDITION_SMART_OFFSET, CONDITION_TOUGH_OFFSET } from '../gen3/conditionStats/constants';"
);

fs.writeFileSync('src/engine/saveParser/parsers/gen3.ts', content);
