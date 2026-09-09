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
});
