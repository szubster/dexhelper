---
id: task-010-024-remind-persona-permissions
type: TASK
title: "Implement Soft Reminders for Node Creation Permissions"
status: PENDING
owner_persona: coder
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on: []
jules_session_id: null
parent: .foundry/stories/story-010-persona-permissions-matrix.md
tags:
  - foundry-v2
  - architecture
  - orchestration
rejection_count: 0
notes: ""
---

# Implement Soft Reminders for Node Creation Permissions

## Goal
Implement a soft warning/reminder system in the orchestrator to encourage agent personas to follow node creation guidelines without strictly blocking them.

## Context
As refined in the story `.foundry/stories/story-010-persona-permissions-matrix.md` and parent epic, the system should gently remind personas of the expected node creation matrix rather than strictly failing their work. We want to encourage the right behavior.

## Blueprint / Implementation Details
1. **Modify the Orchestrator (`.github/scripts/foundry-orchestrator.ts`):**
   - During the `PARSE` and discovery phase, when reading a node's YAML frontmatter, check if the node was created by the active persona in an unusual way.
   - To determine the "creating persona" locally during a session, the script should check the `parent` file referenced in the new node's frontmatter. The `owner_persona` of that parent node is the persona currently active and creating the child node.
   - For `IDEA` nodes without a parent, ensure the system allows creation by `architect` or `product_manager`.
   - Permissions Matrix (Expected Guidelines):
     - `architect` creates `TASK`, `ADR`, and `IDEA` nodes.
     - `tech_lead` creates `TASK` and `ADR` nodes.
     - `story_owner` creates `STORY` and `EPIC` nodes.
     - `product_manager` creates `IDEA`, `PRD`, and `EPIC` nodes.
   - If an unexpected creation is detected, the orchestrator should output a `warn()` log indicating that this creation is outside typical guidelines, acting as a reminder to the agent reviewing the logs.
   - **Crucially: Do not exit with code `1` or fail the orchestrator run for these violations. This is a soft check.**

2. **No Pre-Commit Hooks Required:**
   - Do not implement any strict git pre-commit hooks for this feature. The orchestrator logs will serve as the feedback mechanism.

## Acceptance Criteria
- [ ] The orchestrator detects and checks the creating persona against the node type using the parent node's `owner_persona`.
- [ ] Helpful warning logs are printed when a node creation falls outside the standard guidelines.
- [ ] The orchestrator continues execution and does not fail or exit prematurely when these warnings occur.
