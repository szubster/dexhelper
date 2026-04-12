import fs from 'fs';
const g2 = fs.readFileSync('src/engine/saveParser/parsers/gen2.test.ts', 'utf-8');

fs.writeFileSync('src/engine/saveParser/parsers/gen2.test.ts', g2.replace("expect(data.gameVersion).toBe('unknown');", "expect(data.gameVersion).toBe('gold');"));
