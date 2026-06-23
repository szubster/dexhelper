---
id: task-114-215-document-palette-styling-ownership-qa
type: TASK
title: Verify palette persona documentation updates
status: PENDING
owner_persona: qa
created_at: '2026-06-22'
updated_at: '2026-06-22'
depends_on:
  - task-114-214-document-palette-styling-ownership-impl
jules_session_id: null
pr_number: null
parent: story-077-114-document-palette-styling-ownership
tags:
  - styling
  - agents
  - documentation
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Verify palette persona documentation updates

## Objective
Verify that the `coder` has successfully updated `.foundry/docs/schema.md` or `.foundry/docs/knowledge_base/agents/core_policies.md` to reflect `palette` persona's styling ownership.

## Blueprint / Contract
You are tasked with verifying the completion of `task-114-214-document-palette-styling-ownership-impl`.

1. Review the changes made to `.foundry/docs/schema.md` and/or `.foundry/docs/knowledge_base/agents/core_policies.md`.
2. Ensure the `palette` persona's responsibility over `src/index.css` and custom tactical `@utility` primitives in the relevant Foundry system definitions and policies is documented, and aligns with ADR 024.

**Important Reminders for QA:**
- If the coder's implementation is incomplete, incorrect, or violates architectural guidelines, you MUST reject the work by updating your YAML frontmatter to `status: FAILED` with a `rejection_reason`, which will invoke the Resurrection Loop.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] `.foundry/docs/schema.md` or `.foundry/docs/knowledge_base/agents/core_policies.md` is correctly updated.
- [ ] Documentation accurately reflects `palette` ownership of styling per ADR 024.
