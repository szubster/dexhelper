const fs = require('fs');

const replaceAllInFile = (filePath, searchValue, replaceValue) => {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replaceAll(searchValue, replaceValue);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${filePath}`);
}

replaceAllInFile('src/components/PokemonDetails.tsx', ': CompactEncounterDetail: _CompactEncounterDetail', ': CompactEncounterDetail');
replaceAllInFile('src/components/assistant/AssistantSuggestionCard.tsx', '{ pokemonId, encounters }', '{ pokemonId, enc }'); // Because "encounters" might be unused because the object has `enc` instead. Wait! Let's just fix the interface where we missed it
