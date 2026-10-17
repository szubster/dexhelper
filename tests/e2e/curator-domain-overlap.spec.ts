import * as child_process from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { expect, test } from '@playwright/test';

test.describe('Curator Domain Overlap Identification', () => {
  let tmpDir: string;

  test.beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'curator-domain-overlap-e2e-'));
  });

  test.afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('validates update-idea-matrix.ts parses overlapping domains and merges correctly', async () => {
    fs.mkdirSync(path.join(tmpDir, '.foundry/ideas'), { recursive: true });
    fs.mkdirSync(path.join(tmpDir, '.foundry/docs/architecture'), { recursive: true });

    // Create an existing matrix with a manual "overlap" noted
    const existingMatrix = `---
id: doc-architecture-idea-dependency-matrix
type: RESEARCH
title: "Idea Dependency Matrix Schema"
status: COMPLETED
---

# Idea Dependency Matrix

| Idea ID | Title | Domain Boundaries | Dependencies / Overlaps | Status |
| :--- | :--- | :--- | :--- | :--- |
| \`idea-001\` | Legacy Storage | storage, legacy | None | COMPLETED |
| \`idea-002\` | New Storage | Uncategorized | Overlaps with idea-001 | COMPLETED |
`;
    fs.writeFileSync(path.join(tmpDir, '.foundry/docs/architecture/idea_dependency_matrix.md'), existingMatrix);

    // Create idea files that will be parsed by updateIdeaDependencyMatrix
    const idea001Content = `---
id: idea-001
type: IDEA
title: Legacy Storage
status: COMPLETED
tags:
  - storage
  - legacy
---
`;
    fs.writeFileSync(path.join(tmpDir, '.foundry/ideas/idea-001.md'), idea001Content);

    // idea-002 has a tag "modern", but the existing matrix has manual dependency note "Overlaps with idea-001"
    const idea002Content = `---
id: idea-002
type: IDEA
title: New Storage
status: COMPLETED
tags:
  - storage
  - modern
---
`;
    fs.writeFileSync(path.join(tmpDir, '.foundry/ideas/idea-002.md'), idea002Content);

    // Execute the script
    const scriptPath = path.resolve('packages/foundry/update-idea-matrix.ts');

    child_process.execSync(`npx tsx ${scriptPath}`, {
      cwd: tmpDir,
      env: { ...process.env },
      stdio: 'ignore',
    });

    // Read the updated matrix
    const updatedMatrix = fs.readFileSync(
      path.join(tmpDir, '.foundry/docs/architecture/idea_dependency_matrix.md'),
      'utf-8',
    );

    // Assert that the curator (the script updating the matrix) correctly identified the overlapping domains
    // Specifically, it should merge the tags from the file ("storage, modern") with the manual overlap note ("Overlaps with idea-001")
    expect(updatedMatrix).toContain(
      '| `idea-002` | New Storage | storage, modern | Overlaps with idea-001 | COMPLETED |',
    );
  });
});
