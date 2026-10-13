import { describe, it, expect } from 'vitest';
import { replaceFrontmatterStatus } from './replace-status.ts';

describe('replaceFrontmatterStatus', () => {
  it('should replace DRAFT with STABLE', () => {
    const input = `---\nid: my-node\nstatus: DRAFT\ntype: PRD\n---\n# Content`;
    const expected = `---\nid: my-node\nstatus: STABLE\ntype: PRD\n---\n# Content`;
    expect(replaceFrontmatterStatus(input, 'STABLE')).toBe(expected);
  });

  it('should handle different spacing', () => {
    const input = `---\nstatus:    WIP   \n---\n`;
    const expected = `---\nstatus: STABLE\n---\n`;
    expect(replaceFrontmatterStatus(input, 'STABLE')).toBe(expected);
  });

  it('should only replace the first occurrence (in frontmatter)', () => {
    const input = `---\nstatus: DRAFT\n---\n# Content\nstatus: other`;
    const expected = `---\nstatus: STABLE\n---\n# Content\nstatus: other`;
    expect(replaceFrontmatterStatus(input, 'STABLE')).toBe(expected);
  });

  it('should not replace status if it is only found outside of frontmatter', () => {
    const input = `---\nid: my-node\ntype: PRD\n---\n# Content\nstatus: DRAFT`;
    const expected = `---\nid: my-node\ntype: PRD\n---\n# Content\nstatus: DRAFT`;
    expect(replaceFrontmatterStatus(input, 'STABLE')).toBe(expected);
  });

  it('should return original content if status is not found', () => {
    const input = `---\nid: my-node\ntype: PRD\n---\n# Content`;
    const expected = `---\nid: my-node\ntype: PRD\n---\n# Content`;
    expect(replaceFrontmatterStatus(input, 'STABLE')).toBe(expected);
  });
});
