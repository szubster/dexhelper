const fs = require('fs');
let code = fs.readFileSync('src/engine/saveParser/parsers/gen1.ts', 'utf-8');

code = code.replace(/const GEN1_EMPTY_SLOT = 0xff;\n/, '');
code = code.replace(/const BANK_1_BOX_1_OFFSET = 0x4000;/, 'const GEN1_EMPTY_SLOT = 0xff;\n\nconst BANK_1_BOX_1_OFFSET = 0x4000;');

fs.writeFileSync('src/engine/saveParser/parsers/gen1.ts', code);
