import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * Appends a "Changelog & Learnings" summary block to the given EPIC node.
 * @param epicRepoPath - The absolute or relative path to the EPIC markdown file.
 * @param summary - The formatted summary content to append.
 */
export function appendSummaryToEpic(epicRepoPath: string, summary: string): void {
  if (!fs.existsSync(epicRepoPath)) {
    throw new Error(`Epic file not found: ${epicRepoPath}`);
  }

  // Ensure the summary is prefixed and suffixed correctly, preventing formatting collisions
  let contentToAppend = summary;
  if (!contentToAppend.startsWith('\n')) {
    contentToAppend = `\n\n${contentToAppend}`;
  }
  if (!contentToAppend.endsWith('\n')) {
    contentToAppend = `${contentToAppend}\n`;
  }

  fs.appendFileSync(epicRepoPath, contentToAppend, 'utf-8');
}

/**
 * Moves processed child nodes to their respective archive directories.
 * @param repoRoot - The root directory of the repository.
 * @param childPaths - An array of relative paths (from repoRoot) to the child nodes (STORY or TASK).
 */
export function archiveChildNodes(repoRoot: string, childPaths: string[]): void {
  for (const childPath of childPaths) {
    const absolutePath = path.resolve(repoRoot, childPath);
    if (!fs.existsSync(absolutePath)) {
      console.warn(`File not found: ${absolutePath}, skipping archive.`);
      continue;
    }

    // Determine the destination archive subdirectory based on the source path
    let archiveSubDir = 'tasks'; // Default
    if (childPath.includes('/stories/') || childPath.includes('\\stories\\')) {
      archiveSubDir = 'stories';
    }

    const archiveDir = path.join(repoRoot, '.foundry', 'archive', archiveSubDir);
    fs.mkdirSync(archiveDir, { recursive: true });

    const fileName = path.basename(absolutePath);
    const destinationPath = path.join(archiveDir, fileName);

    fs.renameSync(absolutePath, destinationPath);
  }
}
