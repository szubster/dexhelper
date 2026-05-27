import { readFileSync, writeFileSync } from 'fs';
const file = 'src/engine/saveParser/parsers/gen1.ts';
let code = readFileSync(file, 'utf-8');
code = code.replace(
  "    mapIdStr in gen1MapLocations ? gen1MapLocations[mapIdStr as keyof typeof gen1MapLocations] : 'Unknown Map';",
  "    isValidMapId(mapIdStr) ? gen1MapLocations[mapIdStr] : 'Unknown Map';"
);

const importsEndIndex = code.lastIndexOf("import ");
const nextLineIndex = code.indexOf('\n', importsEndIndex) + 1;

const functionCode = "\nfunction isValidMapId(id: string): id is keyof typeof gen1MapLocations {\n  return id in gen1MapLocations;\n}\n";
code = code.slice(0, nextLineIndex) + functionCode + code.slice(nextLineIndex);

writeFileSync(file, code);
