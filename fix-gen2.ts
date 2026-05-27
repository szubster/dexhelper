import { readFileSync, writeFileSync } from 'fs';
const file = 'src/engine/saveParser/parsers/gen2.ts';
let code = readFileSync(file, 'utf-8');
code = code.replace(
  "    locationName = locStr in gen2Landmarks ? gen2Landmarks[locStr as keyof typeof gen2Landmarks] : undefined;",
  "    locationName = isValidLandmark(locStr) ? gen2Landmarks[locStr] : undefined;"
);
code = code.replace(
  "    groupStr in gen2MapLocations ? gen2MapLocations[groupStr as keyof typeof gen2MapLocations] : undefined;",
  "    isValidMapGroup(groupStr) ? gen2MapLocations[groupStr] : undefined;"
);
code = code.replace(
  "  const foundMap =\n    mapGroupDict && mapIdStr in mapGroupDict ? mapGroupDict[mapIdStr as keyof typeof mapGroupDict] : undefined;",
  "  const foundMap = mapGroupDict && isValidMapId(mapIdStr, mapGroupDict) ? mapGroupDict[mapIdStr] : undefined;"
);

const importsEndIndex = code.lastIndexOf("import ");
const nextLineIndex = code.indexOf('\n', importsEndIndex) + 1;

const functionCode = "\nfunction isValidLandmark(id: string): id is keyof typeof gen2Landmarks {\n  return id in gen2Landmarks;\n}\n\n" +
       "function isValidMapGroup(id: string): id is keyof typeof gen2MapLocations {\n  return id in gen2MapLocations;\n}\n\n" +
       "function isValidMapId<T extends Record<string, string>>(id: string, dict: T): id is keyof T & string {\n  return id in dict;\n}\n";

code = code.slice(0, nextLineIndex) + functionCode + code.slice(nextLineIndex);
writeFileSync(file, code);
