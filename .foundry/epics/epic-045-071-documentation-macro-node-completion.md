---
id: epic-045-071-documentation-macro-node-completion
type: EPIC
title: Documentation Updates for Macro Node Completion
status: ACTIVE
owner_persona: story_owner
created_at: '2026-06-10'
updated_at: '2026-07-03'
depends_on: []
jules_session_id: '7033322333510645735'
pr_number: null
parent: prd-072-045-strict-macro-node-completion
tags:
  - orchestrator
  - architecture
  - documentation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Documentation Updates for Macro Node Completion

## Context
With the introduction of strict hierarchical completion in the orchestrator, where macro nodes (`IDEA`, `PRD`, `EPIC`, `STORY`) cannot complete until all descendant nodes are `COMPLETED`, our system documentation needs to reflect these new constraints.

## Objective
Update the core system documentation to detail the new macro node completion rules so that all personas are aware of the expected behavior and how to properly format parent-child relationships to comply.

## Requirements
1. **Schema Updates**: Update `.foundry/docs/schema.md` to explain the new rule.
2. **ADR 001 Updates**: Update `.foundry/docs/adrs/001-the-foundry-architecture.md` to reflect the strict completion checks.
3. **Other Knowledge Base Updates**: Update any other relevant documents if necessary (e.g. `core_policies.md`).

## Acceptance Criteria
- [ ] Update `schema.md` with hierarchical completion rules.
- [ ] Update `001-the-foundry-architecture.md` (ADR 001) to detail the behavior.
- [ ] Verify that there are no conflicting statements across other core documentation.

### Stories
- [x] .foundry/stories/story-071-108-update-schema-macro-node-completion.md
- [x] .foundry/stories/story-071-109-update-adr001-macro-node-completion.md
- [x] .foundry/stories/story-071-110-verify-core-documentation.md

### Follow-up Work
- [ ] idea-097-schema-verifying-state-fix

### Auditor Rejection
Verification failed. The descendant macro node `idea-097-schema-verifying-state-fix` is in PENDING state, not COMPLETED. Macro nodes cannot be verified as completed until all of their spawned descendant nodes in the generated sub-tree have fully transitioned to the COMPLETED state.
