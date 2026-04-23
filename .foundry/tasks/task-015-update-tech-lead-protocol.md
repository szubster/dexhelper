---
id: task-015-update-tech-lead-protocol
type: TASK
title: "Update Tech Lead Persona with Intelligent Verification Protocol"
status: READY
owner_persona: tech_lead
created_at: "2026-04-21"
updated_at: "2026-04-23"
depends_on:
  - .foundry/stories/story-003-dynamic-verification.md
jules_session_id: null
parent: .foundry/stories/story-003-dynamic-verification.md
---

# Update Tech Lead Persona with Intelligent Verification Protocol

The Tech Lead must now intelligently decide when a STORY requires a separate QA verification task.

## Acceptance Criteria
- [ ] Update `.github/agents/tech_lead.md` (or add to `task-009-scaffold-tech-lead.md` if not yet implemented).
- [ ] Add the **Intelligent Verification Protocol**:
  - If a story involves complex logic or risk, the Tech Lead creates a matching TASK for the `qa` persona to verify the `coder`'s work.
  - If simple/low-risk, the Tech Lead may designate the `coder` to self-verify (documented in the task journal).
