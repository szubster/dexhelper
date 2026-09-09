---
id: task-520-551-save-limit-enforcement-coder
type: TASK
title: Implement Save Limit Enforcement
status: READY
owner_persona: coder
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on:
  - task-520-550-save-limit-utility-coder
jules_session_id: null
pr_number: null
parent: story-399-520-save-state-limits
tags:
  - storage
  - indexeddb
  - history
---

# Task: Implement Save Limit Enforcement

## Overview
Enforce the maximum save limit before allowing new save states to be written.

## Acceptance Criteria
- [ ] Update writeSaveState (or similar flow) to check the current count against the limit.