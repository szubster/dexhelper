---
id: task-536-567-acceptance-criteria-alternatives-qa
type: TASK
title: QA Acceptance Criteria Alternatives
status: READY
owner_persona: qa
created_at: '2026-09-08'
updated_at: '2026-09-08'
depends_on:
  - task-536-564-schema-leaf-nodes-update
  - task-536-565-core-policies-parent-nodes-update
  - task-536-566-ci-checkbox-formatter-script
jules_session_id: null
locks: []
pr_number: null
parent: story-534-536-propose-acceptance-criteria-alternatives
priority: 50
tags:
  - foundry
  - architecture
research_references:
  - .foundry/research/research-534-517-audit-acceptance-criteria.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Acceptance Criteria Alternatives

## Context
QA verification for the documentation and script updates related to Acceptance Criteria formatting.

## Requirements
- Verify that `schema.md` correctly relaxes the AC checklist requirement for leaf nodes.
- Verify that `core_policies.md` strictly enforces AC checklist formatting for parent nodes.
- Test the new CI checkbox formatter script to ensure it correctly normalizes malformed checkboxes without breaking valid markdown.

## Acceptance Criteria
- [ ] qa: Verify schema.md updates.
- [ ] qa: Verify core_policies.md updates.
- [ ] qa: Test the CI checkbox formatter script.
