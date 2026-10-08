import { describe, it, expect } from 'vitest';
import { replaceFrontmatterStatus } from './replace-status.ts';

describe('replaceFrontmatterStatus', () => {
  it('should replace DRAFT with STABLE', () => {
    const input = `---
id: my-node
status: DRAFT
type: PRD
---
# Content`;
    const expected = `---
id: my-node
status: STABLE
type: PRD
---
# Content`;
    expect(replaceFrontmatterStatus(input, 'STABLE')).toBe(expected);
  });

  it('should prepend banner for WIP status', () => {
    const input = `---
id: test-001
status: READY
---

# Body
`;
    const expected = `---
id: test-001
status: WIP
---

> ⚠️ **WORK IN PROGRESS / DRAFT**

# Body
`;
    expect(replaceFrontmatterStatus(input, 'WIP')).toBe(expected);
  });

  it('should remove banner when transitioning from WIP to STABLE', () => {
    const input = `---
id: test-001
status: WIP
---

> ⚠️ **WORK IN PROGRESS / DRAFT**

# Body
`;
    const expected = `---
id: test-001
status: STABLE
---
# Body
`;
    expect(replaceFrontmatterStatus(input, 'STABLE')).toBe(expected);
  });

  it('should handle different spacing', () => {
    const input = `---
status:    WIP
---
`;
    const expected = `---
status: STABLE
---
`;
    expect(replaceFrontmatterStatus(input, 'STABLE')).toBe(expected);
  });

  it('should only replace the first occurrence (in frontmatter)', () => {
    const input = `---
status: DRAFT
---
# Content
status: other`;
    const expected = `---
status: STABLE
---
# Content
status: other`;
    expect(replaceFrontmatterStatus(input, 'STABLE')).toBe(expected);
  });

  it('should not replace status if it is only found outside of frontmatter', () => {
    const input = `---
id: my-node
type: PRD
---
# Content
status: DRAFT`;
    const expected = `---
id: my-node
type: PRD
---
# Content
status: DRAFT`;
    expect(replaceFrontmatterStatus(input, 'STABLE')).toBe(expected);
  });

  it('should return original content if status is not found', () => {
    const input = `---
id: my-node
type: PRD
---
# Content`;
    const expected = `---
id: my-node
type: PRD
---
# Content`;
    expect(replaceFrontmatterStatus(input, 'STABLE')).toBe(expected);
  });
});
