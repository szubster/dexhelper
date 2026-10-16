---
id: research-478-676-investigate-kurt-apricorn-types-failure
type: RESEARCH
title: Investigate Kurt Apricorn Types Failure
status: ACTIVE
owner_persona: researcher
created_at: '2026-10-10'
updated_at: '2026-10-15'
depends_on: []
jules_session_id: '13822722629473639719'
pr_number: null
parent: story-404-478-kurt-apricorn-parsing-logic
tags:
  - gen2
  - types
  - failure-investigation
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---
# Investigate Kurt Apricorn Types Failure

## Context
The child task `task-478-667-kurt-apricorn-types` encountered a permanent failure due to an Autonomous No-Ask Policy Violation (session entered AWAITING_USER_FEEDBACK twice), causing cascading cancellation of the dependent core logic and testing tasks. We need to investigate why the coder persona was awaiting feedback instead of progressing autonomously, resolve the root cause, and establish clear architectural constraints to allow the retry task to succeed.

## Objectives
- Investigate the agent logs and trace history to determine exactly what ambiguity or lack of context triggered the No-Ask Policy violation.
- Determine if there are missing memory offsets, type structures, or file location uncertainties for Gen 2 item definitions.
- Provide a clear, actionable set of typed interfaces and file destinations so the `coder` persona can implement them without needing to ask the user.

## Acceptance Criteria
- [x] Investigate the root cause of the `task-478-667` failure.
- [x] Document the required TypeScript interfaces and their correct file path in the `## Research Report` section of this node.

## Research Report

### Root Cause Analysis of `task-478-667` Failure
The child task `task-478-667-kurt-apricorn-types` failed because the agent encountered ambiguity regarding where to place Kurt Apricorn types/constants and what specific interfaces were needed for Kurt's crafting state, leading to a Autonomous No-Ask Policy Violation. Specifically, Gen 2 modular save parsers in this codebase (such as phone and roamer) are organized in dedicated subdirectories under `src/engine/saveParser/parsers/gen2/`.

### Required TypeScript Interfaces and File Locations
To eliminate ambiguity for the retry coder persona:
1. **Target File Location**: `src/engine/saveParser/parsers/gen2/kurt/types.ts` (or `src/engine/saveParser/parsers/gen2/kurt/constants.ts` / `types.ts`).
2. **TypeScript Interfaces**:
```typescript
export interface KurtApricornState {
  apricornId: number;
  ballId: number;
  quantity: number;
  isCrafting: boolean;
  dayOfWeek?: number;
}

export type ApricornType = 'RED' | 'BLU' | 'YLW' | 'GRN' | 'WHT' | 'BLK' | 'PNK';

export interface ApricornBallMapping {
  apricornId: number;
  ballId: number;
  ballName: string;
}
```
3. **Save Offset Reference**:
- SRAM Offsets in Crystal / GS for Kurt Apricorn count/quantity and items should be placed in `src/engine/saveParser/parsers/gen2/kurt/constants.ts` or exported alongside `gen2Constants.ts`.
