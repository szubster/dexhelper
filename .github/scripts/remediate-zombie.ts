import * as fs from 'node:fs';
import * as path from 'node:path';
import { createRequire } from 'node:module';
import { NodeFrontmatterSchema } from './schema.ts';

const _require = createRequire(import.meta.url);
const matter = _require('gray-matter') as typeof import('gray-matter');

/**
 * Safely updates the YAML frontmatter of a given node file to remediate a zombie node.
 * Changes `status: ACTIVE` to `status: FAILED` and sets `rejection_reason`.
 * Preserves all other frontmatter fields and the original markdown body.
 *
 * @param repoRoot - The root directory of the repository.
 * @param relativeFilePath - The relative path to the node file from the repo root.
 * @param rejectionReason - The reason for transitioning to FAILED (defaults to 'Zombie node detected').
 * @returns boolean - true if successful, false otherwise.
 */
export function remediateZombieNode(
  repoRoot: string,
  relativeFilePath: string,
  rejectionReason: string = 'Zombie node detected',
  dryRun: boolean = false
): boolean {
  const fullPath = path.join(repoRoot, relativeFilePath);

  try {
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`);
      return false;
    }

    const content = fs.readFileSync(fullPath, 'utf-8');

    let parsed: ReturnType<typeof matter>;
    try {
      parsed = matter(content);
    } catch {
      console.warn(`Malformed YAML frontmatter in: ${fullPath}`);
      return false;
    }

    const parseResult = NodeFrontmatterSchema.safeParse(parsed.data);
    if (!parseResult.success) {
      const detailedErrors = parseResult.error.issues.map(issue => `\`${issue.path.join('.')}\`: ${issue.message}`).join('; ');
      console.warn(`Malformed schema in: ${fullPath}. Errors: ${detailedErrors}`);
      return false;
    }

    if (parseResult.data.status !== 'ACTIVE') {
      console.warn(`Node is not ACTIVE: ${fullPath}`);
      return false;
    }

    const newData = {
      ...parseResult.data,
      status: 'FAILED' as const,
      rejection_reason: rejectionReason,
    };

    const newContent = matter.stringify(parsed.content, newData);
    if (!dryRun) {
      fs.writeFileSync(fullPath, newContent, 'utf-8');
    }

    return true;
  } catch (error) {
    console.error(`Failed to remediate zombie node at ${fullPath}:`, error);
    return false;
  }
}
