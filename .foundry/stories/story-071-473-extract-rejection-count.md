---
id: story-071-473-extract-rejection-count
type: STORY
title: Extract Rejection Count in DAG Parsing
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-25'
updated_at: '2026-08-26'
depends_on: []
jules_session_id: '12887234632296617073'
pr_number: null
parent: epic-045-071-refactor-data-parsing-layer
tags:
  - data
  - dashboard
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Extract Rejection Count in DAG Parsing

## Overview
To support the Permanent Failure Dashboard (ADR 017), the DAG data parsing layer must extract the `rejection_count` field from the YAML frontmatter of `.foundry` markdown files.

## Acceptance Criteria
- [ ] Break down into Tasks
