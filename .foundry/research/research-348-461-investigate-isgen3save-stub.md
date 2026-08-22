---
id: research-348-461-investigate-isgen3save-stub
type: RESEARCH
title: 'Research: Investigate isGen3Save Stub Failure'
status: ACTIVE
owner_persona: researcher
created_at: '2026-08-22T10:49:07Z'
updated_at: '2026-08-22'
depends_on: []
jules_session_id: '17957715633786075962'
pr_number: null
parent: story-268-348-gen3-ash-integration
tags:
  - gen3
  - ash
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate isGen3Save Stub Failure

## Objective
Investigate why \`isGen3Save\` is a stub returning \`false\`, which prevents Gen 3 save files from being parsed entirely during E2E testing for the Volcanic Ash feature.

## Context
During the implementation and QA of the Gen 3 Volcanic Ash UI integration, the QA task permanently failed because \`isGen3Save\` was discovered to be a stub returning \`false\`. This blocks any E2E tests for Gen 3 features from succeeding, as the save files cannot be parsed.

## Required Outputs
- Determine the correct implementation for \`isGen3Save\` so that Gen 3 saves are correctly identified.
- Document findings and provide clear guidance on how to fix the stub in the implementation task.

## Findings

**Root Cause:**
\`isGen3Save\` in \`src/engine/saveParser/utils/detection.ts\` was intentionally stubbed out to always return \`false\` (except when throwing \`RangeError\` for out-of-bounds). The comment explains this was to avoid false positives, relying instead on structural scanning inside \`index.ts\`. However, by stubbing it entirely, E2E tests and general fallback detection logic inside \`parseSaveFile\` in \`index.ts\` (where \`isGen3Save\` is called directly) will permanently fail to identify Gen 3 saves if the initial checksums or signature parsing heuristics misalign.

**Correct Implementation Guidance:**
To correctly detect Gen 3 save files without producing false positives, \`isGen3Save\` should replicate the `SIGNATURE` detection logic similar to `getLatestSectionOffset` within `src/engine/saveParser/parsers/gen3.ts`.

A Gen 3 save has two blocks (`SAVE_BLOCK_A` at `0x0000` and `SAVE_BLOCK_B` at `0xe000`), each divided into 14 sections of 4KB (`4096` bytes).
A section is valid if it contains the `SIGNATURE` (`0x08012025`) at offset `0x0ff8`.

Implementation strategy:
1. Define constants for Gen 3 parameters (if not imported): `SIGNATURE = 0x08012025`, `SIGNATURE_OFFSET = 0x0ff8`, `NUM_SECTIONS = 14`, `SECTION_SIZE = 4096`, `SAVE_BLOCK_A = 0x0000`, `SAVE_BLOCK_B = 0xe000`.
2. Iterate through sections of Block A and Block B.
3. For each section, securely read the 32-bit `SIGNATURE` using `view.getUint32(offset + SIGNATURE_OFFSET, true)` if it is within bounds.
4. If at least one valid section containing the signature is found across the scanning, return `true`.
5. Maintain the `RangeError` try-catch block requirement (return `false` if `RangeError` is thrown) to ensure backwards compatibility with tests expecting a `false` return on incomplete buffers instead of throwing. Note: Explicit out-of-bounds access `view.getUint32` when `< 0` or `> byteLength` will naturally trigger `RangeError` and thus return `false`.

```typescript
const GEN3_SIGNATURE = 0x08012025;
const GEN3_SIGNATURE_OFFSET = 0x0ff8;
const GEN3_SAVE_BLOCK_A = 0x0000;
const GEN3_SAVE_BLOCK_B = 0xe000;
const GEN3_NUM_SECTIONS = 14;
const GEN3_SECTION_SIZE = 4096;

export function isGen3Save(view: DataView): boolean {
  try {
    let validSections = 0;

    const checkBank = (baseOffset: number) => {
      for (let i = 0; i < GEN3_NUM_SECTIONS; i++) {
        const offset = baseOffset + i * GEN3_SECTION_SIZE;
        // bounds check
        if (offset + GEN3_SIGNATURE_OFFSET + 4 <= view.byteLength) {
          const signature = view.getUint32(offset + GEN3_SIGNATURE_OFFSET, true);
          if (signature === GEN3_SIGNATURE) {
            validSections++;
          }
        } else {
           // Original behavior allowed out of bounds to throw RangeError naturally, or we can just skip
           // To strictly maintain test compliance which expects RangeError handling:
           view.getUint32(offset + GEN3_SIGNATURE_OFFSET, true); // this will throw RangeError
        }
      }
    };

    checkBank(GEN3_SAVE_BLOCK_A);
    checkBank(GEN3_SAVE_BLOCK_B);

    return validSections > 0;
  } catch (error) {
    if (error instanceof RangeError) {
      return false;
    }
    throw error;
  }
}
```


## Acceptance Criteria
- [x] Determine the root cause of the \`isGen3Save\` stub returning \`false\`.
- [x] Provide the actual implementation logic needed for \`isGen3Save\` in a documented format.
