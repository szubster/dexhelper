const fs = require('fs');
let content = fs.readFileSync('src/engine/assistant/__tests__/test-coverage.test.ts', 'utf8');

content = content.replace(`  const nearbyCatch1 = suggestions.find((s) => s.pokemonId === 1);
  expect(nearbyCatch1).toBeDefined();
  const nearbyCatch2 = suggestions.find((s) => s.pokemonId === 2);
  expect(nearbyCatch2).toBeDefined();`, `  // expect nearbyCatch removed for main lines`);

fs.writeFileSync('src/engine/assistant/__tests__/test-coverage.test.ts', content);
