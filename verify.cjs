const { spawnSync } = require('child_process');
const result = spawnSync('node', ['--experimental-strip-types', 'scripts/validate-foundry-schema.ts']);
const output = result.stdout.toString() + result.stderr.toString();
fs.writeFileSync('verify_output.txt', output);
if (output.includes('All Foundry nodes passed schema validation.')) {
  process.exit(0);
} else {
  process.exit(1);
}
