import * as fs from 'node:fs';
import * as path from 'node:path';
import { createRequire } from 'node:module';
import { NodeFrontmatterSchema, type NodeFrontmatter } from './schema.ts';

const require = createRequire(import.meta.url);
const matter = require('gray-matter') as typeof import('gray-matter');

export interface EpicNode {
  frontmatter: NodeFrontmatter;
  repoPath: string;
}

export function getCompletedEpics(repoRoot: string): EpicNode[] {
  const epicsDir = path.join(repoRoot, '.foundry', 'epics');
  if (!fs.existsSync(epicsDir)) {
    return [];
  }

  const completedEpics: EpicNode[] = [];
  const entries = fs.readdirSync(epicsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      const fullPath = path.join(epicsDir, entry.name);
      try {
        const rawContent = fs.readFileSync(fullPath, 'utf-8');
        const parsed = matter(rawContent);
        const frontmatter = NodeFrontmatterSchema.parse(parsed.data);

        if (frontmatter.type === 'EPIC' && frontmatter.status === 'COMPLETED') {
          completedEpics.push({
            frontmatter,
            repoPath: path.relative(repoRoot, fullPath).replace(/\\/g, '/'),
          });
        }
      } catch (error) {
        console.warn(`Failed to parse node at ${fullPath}:`, error);
      }
    }
  }

  return completedEpics;
}

export interface ChildNode {
  frontmatter: NodeFrontmatter;
  repoPath: string;
  content: string;
}

export function getChildNodesForEpic(repoRoot: string, epicId: string): ChildNode[] {
  const childNodes: ChildNode[] = [];
  const directoriesToSearch = [
    path.join(repoRoot, '.foundry', 'stories'),
    path.join(repoRoot, '.foundry', 'tasks'),
  ];

  const allNodes: { id: string; parent: string | null; repoPath: string; rawContent: string }[] = [];

  for (const dir of directoriesToSearch) {
    if (!fs.existsSync(dir)) continue;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.md')) {
        const fullPath = path.join(dir, entry.name);
        try {
          const rawContent = fs.readFileSync(fullPath, 'utf-8');
          const parsed = matter(rawContent);
          const frontmatter = NodeFrontmatterSchema.parse(parsed.data);
          allNodes.push({
            id: frontmatter.id,
            parent: frontmatter.parent || null,
            repoPath: path.relative(repoRoot, fullPath).replace(/\\/g, '/'),
            rawContent
          });
        } catch (error) {
          console.warn(`Failed to parse child node candidate at ${fullPath}:`, error);
        }
      }
    }
  }

  const resolved = new Set<string>();
  const queue = [epicId];
  while (queue.length > 0) {
      const current = queue.shift()!;
      for (const node of allNodes) {
          if (node.parent === current && !resolved.has(node.id)) {
              resolved.add(node.id);
              queue.push(node.id);
              const parsed = matter(node.rawContent);
              const frontmatter = NodeFrontmatterSchema.parse(parsed.data);
              childNodes.push({
                  frontmatter,
                  repoPath: node.repoPath,
                  content: parsed.content
              });
          }
      }
  }

  return childNodes;
}

export function generateChangelogAndLearnings(childNodes: ChildNode[]): string {
  let changelog = '\n## Changelog & Learnings\n\n### Child Node Outcomes\n';

  // Group by stories and tasks
  const stories = childNodes.filter(c => c.frontmatter.type === 'STORY');
  const tasks = childNodes.filter(c => c.frontmatter.type === 'TASK');

  for (const story of stories) {
      changelog += `- **[${story.frontmatter.id}]** ${story.frontmatter.title} (${story.frontmatter.status})\n`;
      // Find tasks for this story
      const storyTasks = tasks.filter(t => t.frontmatter.parent === story.frontmatter.id);
      for (const task of storyTasks) {
          changelog += `  - **[${task.frontmatter.id}]** ${task.frontmatter.title} (${task.frontmatter.status})\n`;
      }
  }

  // Tasks that don't belong to any story (direct children of epic)
  const directTasks = tasks.filter(t => t.frontmatter.parent && !stories.find(s => s.frontmatter.id === t.frontmatter.parent));
  for (const task of directTasks) {
       changelog += `- **[${task.frontmatter.id}]** ${task.frontmatter.title} (${task.frontmatter.status})\n`;
  }

  // Add journals / learnings (e.g., extracted from nodes)
  changelog += '\n### Summarized Learnings\n';
  changelog += 'The following child nodes contributed to the completion of this EPIC:\n';
  for (const child of childNodes) {
      if (child.frontmatter.notes) {
          changelog += `- **${child.frontmatter.id}:** ${child.frontmatter.notes}\n`;
      }
  }

  return changelog;
}
