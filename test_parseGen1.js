import { readFileSync } from 'fs';
const file = readFileSync('src/engine/saveParser/parsers/common.ts', 'utf-8');
console.log(file.split('\n').findIndex(line => line.includes('gen3FeebasTiles?: number[];')));
