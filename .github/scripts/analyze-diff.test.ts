import { describe, expect, it } from 'vitest';
import { analyzeDiff } from './analyze-diff.js';

describe('analyzeDiff', () => {
  it('returns true for checkbox-only changes in non-journal files', () => {
    const diff = `diff --git a/.foundry/tasks/task-123.md b/.foundry/tasks/task-123.md
index 1234567..89abcdef 100644
--- a/.foundry/tasks/task-123.md
+++ b/.foundry/tasks/task-123.md
@@ -10,3 +10,3 @@
-- [ ] First acceptance criteria
+- [x] First acceptance criteria
`;
    expect(analyzeDiff(diff)).toBe(true);
  });

  it('returns true for additions of confidence_score in non-journal files', () => {
    const diff = `diff --git a/.foundry/tasks/task-123.md b/.foundry/tasks/task-123.md
index 1234567..89abcdef 100644
--- a/.foundry/tasks/task-123.md
+++ b/.foundry/tasks/task-123.md
@@ -5,2 +5,3 @@
 rejection_reason: ''
+confidence_score: 100
 ---
`;
    expect(analyzeDiff(diff)).toBe(true);
  });

  it('returns true for updates to confidence_score in non-journal files', () => {
    const diff = `diff --git a/.foundry/tasks/task-123.md b/.foundry/tasks/task-123.md
index 1234567..89abcdef 100644
--- a/.foundry/tasks/task-123.md
+++ b/.foundry/tasks/task-123.md
@@ -5,3 +5,3 @@
 rejection_reason: ''
-confidence_score: 80
+confidence_score: 100
 ---
`;
    expect(analyzeDiff(diff)).toBe(true);
  });

  it('returns true for combined confidence_score addition and checkbox check', () => {
    const diff = `diff --git a/.foundry/tasks/task-123.md b/.foundry/tasks/task-123.md
index 1234567..89abcdef 100644
--- a/.foundry/tasks/task-123.md
+++ b/.foundry/tasks/task-123.md
@@ -5,5 +5,6 @@
 rejection_reason: ''
+confidence_score: 100
 ---
-- [ ] Completed work
+- [x] Completed work
`;
    expect(analyzeDiff(diff)).toBe(true);
  });

  it('returns true for updates to journal files', () => {
    const diff = `diff --git a/.foundry/journals/coder/master.md b/.foundry/journals/coder/master.md
index 1234567..89abcdef 100644
--- a/.foundry/journals/coder/master.md
+++ b/.foundry/journals/coder/master.md
@@ -1,3 +1,5 @@
 # Journal
+
+Added journal entry for completed work.
`;
    expect(analyzeDiff(diff)).toBe(true);
  });

  it('returns false when non-journal file contains code or title modifications', () => {
    const diff = `diff --git a/.foundry/tasks/task-123.md b/.foundry/tasks/task-123.md
index 1234567..89abcdef 100644
--- a/.foundry/tasks/task-123.md
+++ b/.foundry/tasks/task-123.md
@@ -1,3 +1,3 @@
----
-title: Old Title
+title: New Title
---
`;
    expect(analyzeDiff(diff)).toBe(false);
  });

  it('returns false for invalid confidence_score syntax', () => {
    const diff = `diff --git a/.foundry/tasks/task-123.md b/.foundry/tasks/task-123.md
index 1234567..89abcdef 100644
--- a/.foundry/tasks/task-123.md
+++ b/.foundry/tasks/task-123.md
@@ -5,2 +5,3 @@
 rejection_reason: ''
+confidence_score: invalid_number
 ---
`;
    expect(analyzeDiff(diff)).toBe(false);
  });

  it('returns false when non-journal file is created', () => {
    const diff = `diff --git a/src/index.ts b/src/index.ts
new file mode 100644
index 000000000..123456789
--- /dev/null
+++ b/src/index.ts
@@ -0,0 +1,1 @@
+console.log("hello");
`;
    expect(analyzeDiff(diff)).toBe(false);
  });

  it('returns false for empty diff', () => {
    expect(analyzeDiff('')).toBe(false);
  });
});
