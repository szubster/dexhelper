---
id: task-412-422-update-experiment-schema
type: TASK
title: Update Schema with EXPERIMENT type and experiment_variants
status: COMPLETED
owner_persona: coder
created_at: '2026-08-12'
updated_at: '2026-08-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-411-412-define-experiment-schema
tags:
  - schema
  - documentation
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update Schema with EXPERIMENT type and experiment_variants

## Objective
Update the master schema document (`.foundry/docs/schema.md`) to formally support the `EXPERIMENT` node type and `experiment_variants` frontmatter array for A/B testing configurations.

## Instructions
1.  **Update YAML Frontmatter Example (Section 3)**:
    *   Add `EXPERIMENT` to the enum list in the comment for the `type:` field.
    *   Add a new `experiment_variants: []` field to the example block. It should be optional and indicate it tracks variant configurations.
2.  **Update Field Reference (Section 3.1)**:
    *   In the `type` row, add `\| EXPERIMENT` to the list of allowed enums.
    *   Add a new row for `experiment_variants`. It should be type `string[]`, optional, and described as "Tracks variant configurations for A/B experiments."
3.  **Update New Node Template (Section 8)**:
    *   Add `EXPERIMENT` to the enum list in the comment for the `type:` field in the template.

## Acceptance Criteria
- [x] Schema document updated to include `EXPERIMENT` type and `experiment_variants` frontmatter field.
- [x] No formatting regressions introduced in the markdown table.
