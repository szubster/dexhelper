import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { appendSummaryToEpic, archiveChildNodes } from './tpm-archival-fs.ts';

const tmpDir = path.join(__dirname, 'tmp-tpm-archival-fs');

describe('TPM Archival File System Operations', () => {
  beforeEach(() => {
    fs.mkdirSync(tmpDir, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('appendSummaryToEpic', () => {
    it('should append summary to an existing epic file', () => {
      const epicPath = path.join(tmpDir, 'test-epic.md');
      fs.writeFileSync(epicPath, 'Original Content');

      const summary = '## Changelog & Learnings\n- Point 1\n- Point 2';
      appendSummaryToEpic(epicPath, summary);

      const updatedContent = fs.readFileSync(epicPath, 'utf-8');
      expect(updatedContent).toContain('Original Content');
      expect(updatedContent).toContain(summary);
      expect(updatedContent).toBe(`Original Content\n\n${summary}\n`);
    });

    it('should append correctly if summary lacks newlines', () => {
      const epicPath = path.join(tmpDir, 'test-epic2.md');
      fs.writeFileSync(epicPath, 'Body');

      appendSummaryToEpic(epicPath, 'Summary');

      const updatedContent = fs.readFileSync(epicPath, 'utf-8');
      expect(updatedContent).toBe('Body\n\nSummary\n');
    });

    it('should throw error if epic file does not exist', () => {
      const epicPath = path.join(tmpDir, 'nonexistent-epic.md');
      expect(() => appendSummaryToEpic(epicPath, 'Summary')).toThrow(/Epic file not found/);
    });
  });

  describe('archiveChildNodes', () => {
    it('should move STORY and TASK files to their respective archive directories', () => {
      const foundryDir = path.join(tmpDir, '.foundry');
      const storiesDir = path.join(foundryDir, 'stories');
      const tasksDir = path.join(foundryDir, 'tasks');
      fs.mkdirSync(storiesDir, { recursive: true });
      fs.mkdirSync(tasksDir, { recursive: true });

      const storyPath = path.join(storiesDir, 'test-story.md');
      const taskPath = path.join(tasksDir, 'test-task.md');
      fs.writeFileSync(storyPath, 'Story content');
      fs.writeFileSync(taskPath, 'Task content');

      const childPaths = [
        path.relative(tmpDir, storyPath),
        path.relative(tmpDir, taskPath)
      ];

      archiveChildNodes(tmpDir, childPaths);

      const archivedStoryPath = path.join(foundryDir, 'archive', 'stories', 'test-story.md');
      const archivedTaskPath = path.join(foundryDir, 'archive', 'tasks', 'test-task.md');

      expect(fs.existsSync(archivedStoryPath)).toBe(true);
      expect(fs.existsSync(archivedTaskPath)).toBe(true);
      expect(fs.existsSync(storyPath)).toBe(false);
      expect(fs.existsSync(taskPath)).toBe(false);
    });

    it('should handle non-existent files gracefully without throwing', () => {
      expect(() => {
        archiveChildNodes(tmpDir, ['.foundry/tasks/does-not-exist.md']);
      }).not.toThrow();
    });
  });
});
