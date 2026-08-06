import fs from 'fs';
const testPath = 'src/engine/saveParser/gen3/trainerFlags/parser.test.ts';
let code = fs.readFileSync(testPath, 'utf-8');
code = code.replace(/const buffer = new ArrayBuffer\(4000\);/, 'const buffer = new ArrayBuffer(5000);');
fs.writeFileSync(testPath, code);
