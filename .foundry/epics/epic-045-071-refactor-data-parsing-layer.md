---
id: epic-045-071-refactor-data-parsing-layer
type: EPIC
title: Refactor Data Parsing Layer for rejection_count
status: PENDING
owner_persona: story_owner
created_at: '2026-06-10'
updated_at: '2026-08-25'
depends_on:
  - epic-045-070-implement-dag-context
jules_session_id: null
pr_number: null
parent: prd-073-045-refactor-dag-dashboard-context
tags:
  - data
  - dashboard
  - context
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Refactor Data Parsing Layer for rejection_count

## Overview
As per ADR 017, the Permanent Failure Dashboard requires access to the \`rejection_count\` of each node. The data parsing layer needs to be updated to extract this field from the markdown frontmatter.

## Requirements
- Update the DAG data parsing layer to extract the \`rejection_count\` field from the YAML frontmatter.
- Ensure the \`rejection_count\` is passed along with the rest of the node data to the \`DagContext\`.

## Acceptance Criteria
- [x] Break down into Stories
- [ ] story-071-473-extract-rejection-count
- [ ] story-071-474-pass-rejection-count-context
- [ ] story-071-475-refactor-parsing-e2e
