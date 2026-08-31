---
id: epic-339-406-tpm-distillation-logic
type: EPIC
title: TPM Distillation and Archival Logic
status: ACTIVE
owner_persona: story_owner
created_at: '2026-08-07'
updated_at: '2026-08-31'
depends_on:
  - epic-339-405-orchestrator-archive-bypass
jules_session_id: '9641389618674614283'
pr_number: null
parent: prd-129-339-epic-level-distillation-archival
tags:
  - foundry
  - infrastructure
  - performance
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TPM Distillation and Archival Logic

## Context
When an EPIC node completes, its granular child nodes (STORY and TASK) are no longer needed by the orchestrator but contain valuable learnings. We need the TPM persona to distill these learnings into the EPIC and move the files into cold storage.

## Objective
Implement logic that the TPM persona will execute to synthesize child node learnings into the parent EPIC and archive the processed node files.

## Requirements
1. The TPM agent script must identify `COMPLETED` EPIC nodes and trigger distillation.
2. The process must aggregate content, outcomes, and journals from child STORY and TASK nodes.
3. It must append a "Changelog & Learnings" summary section to the EPIC node.
4. Processed child nodes must be moved from `.foundry/stories/` and `.foundry/tasks/` to `.foundry/archive/stories/` and `.foundry/archive/tasks/`.

## Acceptance Criteria
- [x] Implement logic to detect completed EPICs and trigger distillation.
- [x] Implement text aggregation and synthesis to create the Changelog & Learnings summary.
- [x] Implement file system operations to append to the EPIC and move child files to `.foundry/archive/`.
- [x] Delegate the generation of the E2E STORY to the `story_owner`.

- [ ] story-406-497-tpm-epic-detection-logic
- [ ] story-406-498-tpm-aggregation-and-archival
- [ ] story-406-499-tpm-distillation-e2e
