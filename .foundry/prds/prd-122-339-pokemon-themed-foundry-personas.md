---
id: prd-122-339-pokemon-themed-foundry-personas
type: PRD
title: Pokémon-Themed Foundry Persona Skins and Gamified Workflow
status: PENDING
owner_persona: epic_planner
created_at: '2026-08-06'
updated_at: '2026-08-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-122-pokemon-themed-foundry-personas
tags:
  - foundry
  - ux
  - gamification
  - personas
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Pokémon-Themed Foundry Persona Skins and Gamified Workflow

## Objective
To bring character, engagement, and a distinct retro-gaming identity to the Foundry, this PRD proposes a cohesive Pokémon-themed visual and narrative reskin for both the **Foundry Owner Personas** and the **Jules Agent Personas**. Based on core user feedback, this theme strictly utilizes highly iconic **Generation 1 Pokémon and characters**.
Additionally, it translates the system's strict directed acyclic graph (DAG) status transitions into gamified Pokémon concepts like **Egg Incubation, Evolution, Elite Four Verification, and Pokémon Center Recovery**.

## Functional Requirements
1. **Schema Updates:** Update `.foundry/docs/schema.md` to map the 13 system roles to their respective Gen 1 entities (e.g., `product_manager` ➔ Dragonite, `epic_planner` ➔ Alakazam).
2. **Jules Agent Skins:** Introduce matched narrative Gen 1 skins for developer-facing personas defined under `.jules/` (e.g., `Oak (Data Integrity)` ➔ Professor Oak, `Nurse (Type Safety)` ➔ Nurse Joy).
3. **Gamified Status Lifecycle:** Map standard DAG statuses to Gen 1 progression mechanics (e.g., `PENDING` ➔ 🥚 Pokémon Egg, `COMPLETED` ➔ 🌟 Fully Evolved / Hall of Fame).
4. **Dashboard Updates:** The DAG UI dashboard must render the themed names, statuses, and custom visual icons/badges.
5. **Orchestrator Output:** Update `.github/scripts/foundry-orchestrator.ts` to output themed messages and emoji badges to GitHub Action summaries.

## Non-Functional Requirements
- **Theme Constraints:** Strictly adhere to Generation 1 Pokémon and characters.
- **Consistency:** Ensure the narrative theme is consistently applied across all documentation, UI components, and logs.

## Acceptance Criteria
- [ ] Epic Planner: Break down this PRD into EPICs and dependencies.
