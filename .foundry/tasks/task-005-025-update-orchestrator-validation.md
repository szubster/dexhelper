---
id: task-005-025-update-orchestrator-validation
type: TASK
title: "Update Orchestrator Validation for Parent-Linked ID Schema"
status: "ACTIVE"
owner_persona: coder
created_at: "2026-04-23"
updated_at: "2026-04-24"
depends_on: []
jules_session_id: "18267044109127171064"
parent: .foundry/stories/story-005-id-schema-templates.md
---

# Task: Update Orchestrator Validation for Parent-Linked ID Schema

## Context
ADR 002 introduces a new Parent-Linked Distributed ID Schema: `<type>-<parent_NNN>-<NNN>-<slug>`. The previous format was `<type>-<NNN>-<slug>`.
The `foundry-orchestrator.ts` parses these nodes and might perform strict sequential numbering checks or ID validations.

## Contract
Modify the orchestrator validation logic to support the new ID format. The orchestrator must not fail validation or dependency resolution due to the new schema.

## Requirements
1. **Orchestrator Validation (`.github/scripts/foundry-orchestrator.ts`)**
   - Review ID parsing and validation logic.
   - If there are regular expressions or substring checks assuming the old format, update them to support both the old and new format (since older nodes will not be backfilled).
   - Ensure the new format parses successfully and doesn't trigger warnings.

2. **Test Updates (`.github/scripts/foundry-orchestrator.test.ts`)**
   - Add new test cases using the new ID schema (`<type>-<parent_NNN>-<NNN>-<slug>`) to ensure it parses and resolves dependencies correctly.
   - Ensure existing tests with the old ID schema continue to pass.

## Acceptance Criteria
- [ ] `foundry-orchestrator.ts` gracefully handles nodes utilizing the `<type>-<parent_NNN>-<NNN>-<slug>` format without validation warnings.
- [ ] Backward compatibility is maintained for older `<type>-<NNN>-<slug>` node IDs.
- [ ] Unit tests are added/updated to verify orchestrator behavior against the new schema.
