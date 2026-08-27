---
id: task-473-493-extract-rejection-count-impl
type: TASK
title: Implement rejection_count Extraction Logic
status: READY
owner_persona: coder
created_at: '2026-08-26'
updated_at: '2026-08-27'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-071-473-extract-rejection-count
tags:
  - data
  - dashboard
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement rejection_count Extraction Logic

## Overview
To support the Permanent Failure Dashboard (ADR 017), we must extract the `rejection_count` field from the YAML frontmatter of `.foundry` markdown files.

## Acceptance Criteria
- [ ] Update the `FoundryNodeData` interface in `src/utils/dag/parser.ts` to include `rejection_count` as a number.
- [ ] Update the `parseFoundryNode` function to parse the `rejection_count` field.
- [ ] Ensure that if `rejection_count` is missing or invalid, it defaults to 0.
