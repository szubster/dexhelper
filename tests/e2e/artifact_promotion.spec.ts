import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import { createValidTestNode } from '../../.github/scripts/foundry-test-utils';
import { createMockFoundry } from './fixtures/mock-foundry';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('Artifact Promotion Workflow E2E', () => {
  let tempDir: string;

  test.beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'artifact-promotion-e2e-'));
    createMockFoundry(tempDir);
  });

  test.afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  test('should synchronously remove WIP banner, update frontmatter, and graduate feature flags', async () => {
    // 1. Create a mock file with WIP banner
    const mockFilePath = path.join(tempDir, 'mock-artifact.md');
    const wipContent = `> ⚠️ **WORK IN PROGRESS / DRAFT**\n\n# Artifact Title\nSome content.`;
    fs.writeFileSync(mockFilePath, wipContent, 'utf-8');

    // Execute banner removal utility synchronously
    const bannerUtilPath = path.resolve(__dirname, '../../.github/scripts/utils/banner.ts');
    execSync(`node --experimental-strip-types -e "
            import fs from 'node:fs';
            import { removeWipBanner } from '${bannerUtilPath}';
            const content = fs.readFileSync('${mockFilePath}', 'utf-8');
            fs.writeFileSync('${mockFilePath}', removeWipBanner(content), 'utf-8');
        "`);

    const updatedContent = fs.readFileSync(mockFilePath, 'utf-8');
    expect(updatedContent).not.toContain('⚠️ **WORK IN PROGRESS / DRAFT**');

    // 2. Frontmatter updates
    const nodePath = path.join(tempDir, '.foundry', 'tasks', 'task-999.md');
    createValidTestNode(tempDir, '.foundry/tasks/task-999.md', {
      id: 'task-999',
      status: 'DRAFT',
    });

    const promoteScriptPath = path.resolve(__dirname, '../../.github/scripts/promote-frontmatter.ts');
    execSync(`node --experimental-strip-types ${promoteScriptPath} ${nodePath} STABLE`);

    const nodeContent = fs.readFileSync(nodePath, 'utf-8');
    expect(nodeContent).toContain('status: STABLE');

    // 3. Feature flag resolution
    const tsFilePath = path.join(tempDir, 'feature.ts');
    fs.writeFileSync(
      tsFilePath,
      `
            if (flags.EXPERIMENTAL_FEATURE) {
                console.log('experimental');
            } else {
                console.log('stable');
            }
        `,
    );

    const flagScriptPath = path.resolve(__dirname, '../../scripts/feature-flags/cli.ts');
    execSync(`node --experimental-strip-types ${flagScriptPath} graduate EXPERIMENTAL_FEATURE ${tsFilePath}`);

    const updatedTsContent = fs.readFileSync(tsFilePath, 'utf-8');
    expect(updatedTsContent).not.toContain('flags.EXPERIMENTAL_FEATURE');
    expect(updatedTsContent).toContain("console.log('experimental');");
    expect(updatedTsContent).not.toContain("console.log('stable');");
  });
});
