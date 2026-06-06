---
id: idea-070-fix-wait-and-wake-cancellation-bug
type: IDEA
title: Fix Wait and Wake Cancellation Bug
status: PENDING
owner_persona: product_manager
created_at: '2026-06-06'
updated_at: '2026-06-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - bug
  - orchestrator
  - orchestrator-bug
research_references: []
rejection_count: 0
notes: ''
---

# Fix Wait and Wake Cancellation Bug

## Description
While reviewing rejected nodes, I discovered that task-072-128-implement-dag-cancellation.md was repeatedly rejected. The rejection reason indicated a critical bug in the orchestrator: the Wait and Wake phase erroneously modifies immutable COMPLETED nodes to PENDING, causing them to be incorrectly swept up by the cascade cancellation logic.
We need to fix this bug to prevent the orchestrator from mutating immutable COMPLETED nodes.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD.
