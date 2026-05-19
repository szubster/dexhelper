const fs = require('fs');
let code = fs.readFileSync('src/engine/assistant/__tests__/generateSuggestions.test.ts', 'utf8');

const newTest = `    // 3. Has move learned
    localSaveData.inventory = [];
    localSaveData.partyDetails = [
      {
        speciesId: 10,
        level: 20,
        isShiny: false,
        moves: [29, 249],
        storageLocation: 'Party'
      }
    ];
    const result3 = generateSuggestions(localSaveData, false, 'gold', localApiData, localStrategy);
    const catch3 = result3.suggestions.find((s) => s.category === 'Catch' && s.id.startsWith('catch-nearby'));
    expect(catch3).toBeDefined(); // Included
    expect(catch3?.encounterInfo?.[missingPid]?.some((e: EncounterDetail) => e.method === 'headbutt')).toBe(true);
    expect(catch3?.encounterInfo?.[missingPid]?.some((e: EncounterDetail) => e.method === 'rock-smash')).toBe(true);
  });
`;

code = code.replace("expect(catch2?.encounterInfo?.[missingPid]?.some((e: EncounterDetail) => e.method === 'rock-smash')).toBe(true);\n  });", "expect(catch2?.encounterInfo?.[missingPid]?.some((e: EncounterDetail) => e.method === 'rock-smash')).toBe(true);\n\n" + newTest);
fs.writeFileSync('src/engine/assistant/__tests__/generateSuggestions.test.ts', code);
