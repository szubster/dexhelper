import path from 'path';
import { execSync } from 'child_process';

const extensions = ['.sh', '.cjs', '.js', '.md'];

let untrackedFiles = [];
try {
  const output = execSync('git ls-files --others --exclude-standard', { encoding: 'utf-8' });
  untrackedFiles = output.split('\n').filter(Boolean);
} catch (e) {
  console.error('Error running git command', e);
  process.exit(1);
}

const scratchpads = untrackedFiles.filter(file => {
  // Only check files in the repository root
  if (file.includes('/')) return false;

  const ext = path.extname(file);
  return extensions.includes(ext);
});

if (scratchpads.length > 0) {
  console.error('Error: Found uncommitted scratchpad files in the repository root:');
  scratchpads.forEach(file => console.error(`  ${file}`));
  process.exit(1);
} else {
  console.log('No scratchpad files found in the repository root.');
  process.exit(0);
}
