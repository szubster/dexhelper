import * as fs from 'node:fs';
import * as path from 'node:path';
import { expect, test } from '@playwright/test';
import { updateIdeaDependencyMatrix } from '../../packages/foundry/update-idea-matrix';

test.describe('Idea Dependency Matrix Updates E2E', () => {
  test('update-idea-matrix.ts successfully updates the matrix markdown file', async () => {
    // Verify the file exists initially or setup a dummy environment
    const repoRoot = process.cwd();
    const matrixFile = path.join(repoRoot, '.foundry/docs/architecture/idea_dependency_matrix.md');

    expect(fs.existsSync(matrixFile)).toBe(true);

    const initialContent = fs.readFileSync(matrixFile, 'utf-8');

    // Create a dummy idea to ensure it gets picked up
    const dummyIdeaPath = path.join(repoRoot, '.foundry/ideas/idea-999-dummy-e2e-test.md');
    fs.writeFileSync(
      dummyIdeaPath,
      `---
id: idea-999-dummy-e2e-test
type: IDEA
title: Dummy E2E Test Idea
status: COMPLETED
owner_persona: product_manager
created_at: '2026-10-01'
updated_at: '2026-10-01'
depends_on: []
jules_session_id: null
parent: null
tags:
  - e2e
  - testing
rejection_count: 0
rejection_reason: ''
confidence_score: 100
---

# Dummy Idea
`,
    );

    try {
      updateIdeaDependencyMatrix(repoRoot);

      const updatedContent = fs.readFileSync(matrixFile, 'utf-8');

      // Assert that the matrix reflects the new dummy idea
      expect(updatedContent).toContain('idea-999-dummy-e2e-test');
      expect(updatedContent).toContain('Dummy E2E Test Idea');
      // The tags are extracted into the "Domain Boundaries" column. The tags array is joined by ", "
      expect(updatedContent).toContain('e2e, testing');
    } finally {
      // Cleanup
      fs.rmSync(dummyIdeaPath, { force: true });
      // Restore original content
      fs.writeFileSync(matrixFile, initialContent, 'utf-8');
    }
  });
});
