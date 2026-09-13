import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { execSync } from 'node:child_process';
import { generateStatisticsReport } from './statistics.js';

vi.mock('node:child_process', () => ({
  execSync: vi.fn<() => Buffer>(),
}));

describe('Statistics Generator E2E', () => {
  let tempRepoRoot: string;

  beforeEach(() => {
    tempRepoRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'foundry-stats-e2e-'));
    const foundryDir = path.join(tempRepoRoot, '.foundry');
    fs.mkdirSync(foundryDir);

    fs.writeFileSync(path.join(foundryDir, 'task1.md'), '---\ntype: TASK\nstatus: COMPLETED\n---\nbody');
    fs.writeFileSync(path.join(foundryDir, 'task2.md'), '---\ntype: TASK\nstatus: ACTIVE\n---\nbody');
    fs.writeFileSync(path.join(foundryDir, 'idea1.md'), '---\ntype: IDEA\nstatus: COMPLETED\n---\nbody');
    fs.writeFileSync(path.join(foundryDir, 'idea2.md'), '---\ntype: IDEA\nstatus: FAILED\n---\nbody');
    fs.writeFileSync(path.join(foundryDir, 'epic1.md'), '---\ntype: EPIC\nstatus: ACTIVE\n---\nbody');

    const prOutput = JSON.stringify([
      { state: 'OPEN' },
      { state: 'MERGED' },
      { state: 'CLOSED' },
      { state: 'MERGED' },
    ]);
    vi.mocked(execSync).mockReturnValue(Buffer.from(prOutput) as any);
  });

  afterEach(() => {
    fs.rmSync(tempRepoRoot, { recursive: true, force: true });
    vi.clearAllMocks();
  });

  it('should execute the full loop and generate statistics files', () => {
    generateStatisticsReport(tempRepoRoot);

    const jsonPath = path.join(tempRepoRoot, 'foundry-statistics.json');
    const mdPath = path.join(tempRepoRoot, 'foundry-statistics.md');

    expect(fs.existsSync(jsonPath)).toBe(true);
    expect(fs.existsSync(mdPath)).toBe(true);

    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    expect(jsonData.nodes.byType['TASK']).toBe(2);
    expect(jsonData.nodes.byType['IDEA']).toBe(2);
    expect(jsonData.nodes.byType['EPIC']).toBe(1);
    expect(jsonData.nodes.byStatus['COMPLETED']).toBe(2);
    expect(jsonData.nodes.byStatus['ACTIVE']).toBe(2);
    expect(jsonData.nodes.byStatus['FAILED']).toBe(1);
    expect(jsonData.prs.totalPRs).toBe(4);
    expect(jsonData.prs.openPRs).toBe(1);
    expect(jsonData.prs.mergedPRs).toBe(2);
    expect(jsonData.prs.closedPRs).toBe(1);

    const mdContent = fs.readFileSync(mdPath, 'utf-8');
    expect(mdContent).toContain('Foundry System Statistics');
    expect(mdContent).toContain('**TASK**: 2');
    expect(mdContent).toContain('**IDEA**: 2');
    expect(mdContent).toContain('**EPIC**: 1');
    expect(mdContent).toContain('**COMPLETED**: 2');
    expect(mdContent).toContain('**ACTIVE**: 2');
    expect(mdContent).toContain('**FAILED**: 1');
    expect(mdContent).toContain('**Total PRs**: 4');
    expect(mdContent).toContain('**Open PRs**: 1');
    expect(mdContent).toContain('**Merged PRs**: 2');
    expect(mdContent).toContain('**Closed PRs**: 1');
  });
});
