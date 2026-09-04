---
id: prd-086-520-fix-gen3save-mock
type: PRD
title: Fix isGen3Save heuristic mock for E2E tests
status: READY
owner_persona: epic_planner
created_at: '2026-08-25T00:00:00.000Z'
updated_at: '2026-08-25'
depends_on: []
parent: idea-086-fix-gen3save-mock
---

## Context
The `isGen3Save` heuristic currently mocks returning `false` (or is bypassed), causing E2E tests on Gen 3 to require a bypass mechanism. This technical debt needs to be addressed.
As seen in `src/engine/saveParser/utils/detection.ts`, the actual heuristic implementation is already present:
```typescript
    let validSectors = 0;
    const numSectors = Math.min(28, Math.floor(view.byteLength / 0x1000));
    for (let i = 0; i < numSectors; i++) {
      const footerOffset = i * 0x1000 + 0x0ff8;
      const signature = view.getUint32(footerOffset, true);
      if (signature === 0x08012025) {
        validSectors++;
      }
    }
    return validSectors >= 7;
```

However, in tests, it is mocked, and tests bypass it. The goal is to remove this mock from `isGen3Save` in `index.test.ts` and anywhere else it is bypassed, so that the actual heuristic runs successfully during E2E tests and unit tests. If the heuristic is flawed and throws errors, we need to fix it.

## Acceptance Criteria
- [ ] Break down into Epics
