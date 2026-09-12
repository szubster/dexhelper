---
id: task-526-564-schema-wip-update
type: TASK
title: Update schema.md with DRAFT and WIP statuses
status: ACTIVE
owner_persona: coder
created_at: '2026-09-09'
updated_at: '2026-09-12'
depends_on: []
jules_session_id: '17969382770798430496'
pr_number: null
parent: story-517-526-schema-wip-support
priority: 50
tags:
  - schema
  - documentation
  - wip
research_references: []
experiment_variants: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update schema.md with DRAFT and WIP statuses

## Description
This task updates the core Foundry schema in `.foundry/docs/schema.md` to formally support `DRAFT` and `WIP` frontmatter statuses for documentation nodes.

## Acceptance Criteria
- [ ] Add `DRAFT` and `WIP` to the list of allowed statuses in `.foundry/docs/schema.md` (sections 3.1 and 4.1).
- [ ] Define the lifecycle transitions for these new statuses in `.foundry/docs/schema.md` (section 4.2).
- [ ] Run core verification commands.
