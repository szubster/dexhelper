import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('Statistics Generation', () => {
  test('should execute full generation loop and create artifacts', async () => {
    const repoRoot = path.resolve(__dirname, '../../');
    const jsonPath = path.join(repoRoot, 'foundry-statistics.json');
    const mdPath = path.join(repoRoot, 'foundry-statistics.md');

    // Clean up before test
    if (fs.existsSync(jsonPath)) fs.unlinkSync(jsonPath);
    if (fs.existsSync(mdPath)) fs.unlinkSync(mdPath);

    const scriptPath = path.join(repoRoot, '.github/scripts/generate-statistics.ts');

    execSync(`npx tsx ${scriptPath}`, {
      cwd: repoRoot,
      env: {
        ...process.env,
        ['PATH']: `${path.join(__dirname, 'mock-bin')}:${process.env['PATH']}`,
      },
    });

    expect(fs.existsSync(jsonPath)).toBeTruthy();
    expect(fs.existsSync(mdPath)).toBeTruthy();

    const jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    expect(jsonContent).toHaveProperty('nodes');
    expect(jsonContent).toHaveProperty('prs');
    expect(jsonContent).toHaveProperty('timestamp');
    expect(jsonContent.nodes).toHaveProperty('byType');
    expect(jsonContent.nodes).toHaveProperty('byStatus');

    const mdContent = fs.readFileSync(mdPath, 'utf-8');
    expect(mdContent).toContain('# Foundry System Statistics');
    expect(mdContent).toContain('## Node Statistics');
    expect(mdContent).toContain('## PR Metrics');

    // Clean up after test
    if (fs.existsSync(jsonPath)) fs.unlinkSync(jsonPath);
    if (fs.existsSync(mdPath)) fs.unlinkSync(mdPath);
  });
});
