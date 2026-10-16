import child_process from 'child_process';
try {
  child_process.execSync('npx vitest tests/e2e/wild-item-tracking.spec.ts', { stdio: 'inherit' });
} catch (e) {
  console.log('Error');
}
