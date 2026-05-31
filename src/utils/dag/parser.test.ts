import { describe, expect, it } from 'vitest';
import { parseFoundryNode } from './parser';

describe('parseFoundryNode', () => {
  it('should parse valid frontmatter correctly', () => {
    const rawContent = `---
id: task-043-074-parse-frontmatter
type: TASK
status: READY
owner_persona: coder
depends_on:
  - .foundry/tasks/task-043-073-read-foundry-files.md
---
# Content here`;
    const result = parseFoundryNode(rawContent);
    expect(result).toEqual({
      id: 'task-043-074-parse-frontmatter',
      type: 'TASK',
      status: 'READY',
      owner_persona: 'coder',
      depends_on: ['.foundry/tasks/task-043-073-read-foundry-files.md'],
      rejection_count: 0,
    });
  });

  it('should parse rejection_count correctly if present', () => {
    const rawContent = `---
id: task-043-074-parse-frontmatter
type: TASK
status: READY
owner_persona: coder
depends_on: []
rejection_count: 3
---
# Content here`;
    const result = parseFoundryNode(rawContent);
    expect(result).toEqual({
      id: 'task-043-074-parse-frontmatter',
      type: 'TASK',
      status: 'READY',
      owner_persona: 'coder',
      depends_on: [],
      rejection_count: 3,
    });
  });

  it('should handle empty depends_on correctly', () => {
    const rawContent = `---
id: task-1
type: TASK
status: PENDING
owner_persona: coder
depends_on: []
---
# Content here`;
    const result = parseFoundryNode(rawContent);
    expect(result).toEqual({
      id: 'task-1',
      type: 'TASK',
      status: 'PENDING',
      owner_persona: 'coder',
      depends_on: [],
      rejection_count: 0,
    });
  });

  it('should return null if id is missing', () => {
    const rawContent = `---
type: TASK
status: PENDING
owner_persona: coder
depends_on: []
---`;
    expect(parseFoundryNode(rawContent)).toBeNull();
  });

  it('should return null if depends_on is missing', () => {
    const rawContent = `---
id: task-1
type: TASK
status: PENDING
owner_persona: coder
---`;
    expect(parseFoundryNode(rawContent)).toBeNull();
  });

  it('should return null if depends_on is not an array', () => {
    const rawContent = `---
id: task-1
type: TASK
status: PENDING
owner_persona: coder
depends_on: "not an array"
---`;
    expect(parseFoundryNode(rawContent)).toBeNull();
  });

  it('should return null if markdown has no frontmatter', () => {
    const rawContent = `# Just a title
    No frontmatter here`;
    expect(parseFoundryNode(rawContent)).toBeNull();
  });

  it('should return null if frontmatter is invalid yaml', () => {
    const rawContent = `---
id: [unclosed array
type: TASK
---`;
    expect(parseFoundryNode(rawContent)).toBeNull();
  });
});
