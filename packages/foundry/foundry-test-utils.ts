import * as path from 'node:path';
import * as fs from 'node:fs';
import { type NodeFrontmatter } from './schema.ts';

export function getValidOwnerPersona(type: string): string {
  switch (type) {
    case 'IDEA': return 'product_manager';
    case 'PRD': return 'epic_planner';
    case 'EPIC': return 'story_owner';
    case 'STORY': return 'tech_lead';
    case 'TASK': return 'coder';
    case 'RESEARCH': return 'researcher';
    case 'ADR': return 'architect';
    default: return 'coder';
  }
}

export function createValidNodeFrontmatter(overrides: Partial<NodeFrontmatter> & { type?: string; [key: string]: any } = {}): string {
  const type = overrides.type || 'TASK';
  const owner_persona = overrides.owner_persona || getValidOwnerPersona(type);

  const frontmatter = {
    id: overrides.id || `${type.toLowerCase()}-001`,
    type,
    title: overrides.title || `${type} Title`,
    status: overrides.status || 'PENDING',
    owner_persona,
    created_at: overrides.created_at || '2026-04-20',
    updated_at: overrides.updated_at || '2026-04-20',
    depends_on: overrides.depends_on || [],
    jules_session_id: overrides.jules_session_id !== undefined ? overrides.jules_session_id : null,
    pr_number: overrides.pr_number !== undefined ? overrides.pr_number : null,
    parent: overrides.parent,
    tags: overrides.tags || [],
    research_references: overrides.research_references || [],
    rejection_count: overrides.rejection_count || 0,
    rejection_reason: overrides.rejection_reason || '',
    notes: overrides.notes || ''
  };

  let yaml = '';
  for (const [key, value] of Object.entries(frontmatter)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      if (value.length === 0) {
        yaml += `${key}: []\n`;
      } else {
        yaml += `${key}:\n`;
        for (const item of value) {
          if (typeof item === 'string') {
              yaml += `  - "${item}"\n`;
          } else {
              yaml += `  - ${JSON.stringify(item)}\n`;
          }
        }
      }
    } else if (value === null) {
      yaml += `${key}: null\n`;
    } else if (typeof value === 'string' && (key === 'title' || key === 'owner_persona' || key === 'created_at' || key === 'updated_at' || key === 'parent' || key === 'rejection_reason' || key === 'notes' || key === 'jules_session_id')) {
      if (key === 'owner_persona') {
          // Sometimes it is string with commas, in those bad test cases, wrap in quotes
          if (value.includes(',')) {
              yaml += `${key}: "${value}"\n`;
          } else {
              yaml += `${key}: ${value}\n`;
          }
      } else {
          yaml += `${key}: "${value}"\n`;
      }
    } else {
      yaml += `${key}: ${value}\n`;
    }
  }

  return yaml.trim();
}

export function createValidTestNode(tmpDir: string, relPath: string, overrides: Partial<NodeFrontmatter> & { type?: string; [key: string]: any } = {}, body: string = '# Title') {
  const fullPath = path.join(tmpDir, relPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const frontmatter = createValidNodeFrontmatter(overrides);
  fs.writeFileSync(fullPath, `---\n${frontmatter}\n---\n\n${body}`, 'utf-8');
}
