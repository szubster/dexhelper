const fs = require('fs');

const file = 'src/contexts/EmulatorContext.tsx';
let content = fs.readFileSync(file, 'utf8');

// I am modifying useParsedSaveData so that it prefers emulator state, but if emulator state is empty (e.g. no emulator running) AND we have an active save in useStore, we return the useStore state.
// Wait, useStore((s) => s.saveData) has the same schema.
