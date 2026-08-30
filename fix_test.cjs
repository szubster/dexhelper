const fs = require('fs');

let content = fs.readFileSync('src/engine/saveParser/parsers/gen3_extraction.test.ts', 'utf8');

// The replacement above failed or duplicated SUBSTRUCTURE_ORDER, let's fix it by parsing properly.
content = content.replace("  SUBSTRUCTURE_ORDER,\n", "");

fs.writeFileSync('src/engine/saveParser/parsers/gen3_extraction.test.ts', content);
