---
id: story-005-empty-state-handling
type: STORY
title: "Graceful Empty State Handling"
status: "READY"
owner_persona: tech_lead
created_at: "2026-04-22"
updated_at: "2026-04-22"
depends_on:
  - .foundry/stories/story-004-generic-scheduling-workflow.md
jules_session_id: null
parent: .foundry/epics/epic-004-generic-agent-scheduling.md
---

# Graceful Empty State Handling

Implement logic within the orchestrator or agent runner script to gracefully handle cases where a scheduled agent (like TPM) finds no actionable work. It should exit successfully (0) without creating an empty PR or spamming logs. This addresses the empty state requirement.