---
id: task-010-024-update-persona-prompts
type: TASK
title: "Update Agent Prompts for Node Creation Guidelines"
status: "COMPLETED"
owner_persona: coder
created_at: "2026-04-23"
updated_at: "2026-04-24"
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

# Update Agent Prompts for Node Creation Guidelines

## Goal
Update the system prompts for the agent personas to gently encourage and remind them of the proper node creation matrix, without strictly enforcing it via the orchestrator.

## Context
As refined in the story `.foundry/stories/story-010-persona-permissions-matrix.md`, the system should guide personas rather than block them. The most effective way to do this is by updating their base prompt instructions.

## Blueprint / Implementation Details
1. **Modify Agent Prompts (`.github/agents/*.md`):**
   - You need to update the markdown files that contain the core system prompts for the respective personas.
   - For `architect.md`, explicitly add instructions/encouragement that they typically create `TASK`, `ADR`, and `IDEA` nodes.
   - For `tech_lead.md`, explicitly add instructions/encouragement that they typically create `TASK` and `ADR` nodes.
   - For `story_owner.md` (or `epic_planner.md` if `story_owner` does not exist), explicitly add instructions/encouragement that they typically create `STORY` and `EPIC` nodes.
   - For `product_manager.md`, explicitly add instructions/encouragement that they typically create `IDEA`, `PRD`, and `EPIC` nodes.
   - Ensure the language is framed as guidance/best practice ("you should typically create...") rather than a hard physical system limit. Add encouragement where it makes sense.

2. **No Orchestrator or Hook Changes:**
   - **Crucially: Do not touch `.github/scripts/foundry-orchestrator.ts` or `lefthook.yml`.** This requirement is strictly prompt-based.

## Acceptance Criteria
- [x] The `architect` prompt encourages creating `TASK`, `ADR`, and `IDEA` nodes.
- [x] The `tech_lead` prompt encourages creating `TASK` and `ADR` nodes.
- [x] The `story_owner` (or relevant) prompt encourages creating `STORY` and `EPIC` nodes.
- [x] The `product_manager` prompt encourages creating `IDEA`, `PRD`, and `EPIC` nodes.
- [x] No strict enforcement checks or orchestrator logs are added.
