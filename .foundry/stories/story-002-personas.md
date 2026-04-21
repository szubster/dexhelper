---
id: story-002-personas
type: STORY
title: "Persona-aware Prompt Injection"
status: READY
rejection_count: 1
owner_persona: story_owner
created_at: "2026-04-20"
updated_at: "2026-04-21"
depends_on:
  - .foundry/epics/epic-003-actions-engine.md
jules_session_id: null
pr_number: null
---

# Persona-aware Prompt Injection

Inject persona-specific instructions (QA, Coder, Tech Lead, Story Owner, etc.) into the Jules environment based on the `owner_persona` field.

This is a STORY. As per the schema, the `story_owner` must break this down into specific atomic TASKS inside `.foundry/tasks/`. 

## Requirements to break down:

1. **Scaffold Persona Markdown Files**
   - Create `.github/agents/tech_lead.md`
   - Create `.github/agents/coder.md`
   - Create `.github/agents/qa.md`
   - Create `.github/agents/product_manager.md`
   - Create `.github/agents/epic_planner.md`
   - Create `.github/agents/story_owner.md`
   - Create `.github/agents/tpm.md`
   - Create `.github/agents/agile_coach.md`
   - Each of these files MUST instruct the agent to explicitly read all documents under `.foundry/docs/` and `.foundry/docs/adrs/` when they begin their session to establish their context! Ensure they are aware of the rules in `.foundry/docs/adrs/001-the-foundry-architecture.md`.

2. **Modify the Action Runner**
   - Update `.github/workflows/foundry-engine.yml`'s "Invoke Jules Agent" step.
   - It should dynamically read the `.github/agents/${owner_persona}.md` file according to the node's `owner_persona`.
   - If the file exists, inject its context into the JSON prompt sent to Jules. If not, fallback to a default prompt.

3. **Migrate Memory System to The Foundry**
   - The standalone Jules instances do not have MCP access to Serena memories.
   - We must migrate all content inside `.serena/memories/` into `.foundry/docs/` (e.g., as `.foundry/docs/knowledge_base/`).
   - The persona prompts must instruct Jules to automatically index and read relevant knowledge from this migrated directory whenever they are assigned a task.

## Instructions for current agent

Since you are running via the fallback prompt in `foundry-engine.yml`, you will act to break this Story down into the above Tasks. Create the `.foundry/tasks/` nodes reflecting the breakdown, set `depends_on: [".foundry/stories/story-002-personas.md"]`, and change this Story's status from `READY` to `COMPLETED`.
