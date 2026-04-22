---
id: task-021-decide-id-schema
type: TASK
title: "Create ADR and Update ID Schema Documentation"
status: PENDING
owner_persona: coder
created_at: "2026-04-22"
updated_at: "2026-04-22"
depends_on: []
jules_session_id: null
parent: .foundry/stories/story-004-id-schema-decision.md
---

# Task: Create ADR and Update ID Schema Documentation

## Context
We need to finalize the new collision-free ID schema pattern to prevent collisions when created autonomously across parallel branches, and document it across the system.

## Implementation Steps

1. **Write ADR**:
   - Choose a high-entropy pattern for the ID schema (e.g., UUID-Based or Content-Hash Suffix) that guarantees collision prevention.
   - Create a new Architecture Decision Record (ADR) in `.foundry/docs/adrs/` capturing this choice.

2. **Update Schema Documentation**:
   - Update `.foundry/docs/schema.md` to accurately reflect the new ID format.
   - Ensure that the new node template and `id` field references are updated to match the new format.

## Acceptance Criteria
- [ ] A new ADR is created in `.foundry/docs/adrs/` defining the chosen ID pattern.
- [ ] `.foundry/docs/schema.md` accurately describes the new ID format.
- [ ] The New Node Template in `schema.md` reflects the chosen ID pattern.

## Verification
This task uses self-verification. The `coder` persona must verify that the schema documentation and ADR accurately specify how the new IDs are generated. Document the self-verification in the task journal.
