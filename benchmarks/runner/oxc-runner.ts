import { transform } from 'oxc-transform';
import { readFileSync, writeFileSync } from 'node:fs';

const inputFile = process.argv[2] as string;
const outputFile = process.argv[3] as string;

const sourceCode = readFileSync(inputFile, 'utf-8');

async function run() {
  const result = await transform(inputFile, sourceCode, {
    lang: 'ts'
  });

  writeFileSync(outputFile, result.code, 'utf-8');
}

run().catch(console.error);
