---
id: task-006-migrate-memory-system
type: TASK
title: "Migrate Memory System to The Foundry"
status: READY
owner_persona: tech_lead
created_at: "2026-04-21"
updated_at: "2026-04-21"
depends_on:
  - .foundry/stories/story-002-personas.md
jules_session_id: null
pr_number: null
parent: .foundry/stories/story-002-personas.md
---

# Migrate Memory System to The Foundry

The standalone Jules instances do not have MCP access to Serena memories. We need to make these memories available via the file system for them to work effectively.

## Acceptance Criteria
- [ ] NOTE: The migrate memory task might be already done. Check if this is obsolete.
- [ ] We must migrate all content inside `.serena/memories/` into `.foundry/docs/` (e.g., as `.foundry/docs/knowledge_base/`).
- [ ] The persona prompts must instruct Jules to automatically index and read relevant knowledge from this migrated directory whenever they are assigned a task.