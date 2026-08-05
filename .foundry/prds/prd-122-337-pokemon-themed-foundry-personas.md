---
id: prd-122-337-pokemon-themed-foundry-personas
type: PRD
title: Pokémon-Themed Foundry Persona Skins and Gamified Workflow
status: PENDING
owner_persona: epic_planner
created_at: '2026-08-05'
updated_at: '2026-08-05'
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

# Pokémon-Themed Foundry Persona Skins and Gamified Workflow

## Objective
To bring character, engagement, and a distinct retro-gaming identity to the Foundry, this PRD proposes a cohesive Pokémon-themed visual and narrative reskin for both the **Foundry Owner Personas** (which govern system nodes) and the **Jules Agent Personas** (which execute sessions). Based on core user feedback, this theme strictly utilizes highly iconic **Generation 1 Pokémon and characters**.

Additionally, it translates the system's strict directed acyclic graph (DAG) status transitions into gamified Pokémon concepts like **Egg Incubation, Evolution, Elite Four Verification, and Pokémon Center Recovery**.

## Requirements

### 1. Foundry Owner Personas (The Gym Leaders & Professors) Theme
Update `.foundry/docs/schema.md` and related orchestration scripts to incorporate the Gen 1 mapping for all 13 system roles:
- **`product_manager` ➔ Dragonite (#149 - The Delivery Messenger)**: Soars across the ocean to deliver raw ideas as perfectly structured PRD blueprints.
- **`epic_planner` ➔ Alakazam (#065 - The 5,000 IQ Strategist)**: Organizes macroscopic epics and maps out structural dependencies in its head.
- **`story_owner` ➔ Bill (The Prominent Gen 1 Scientist & Inventor)**: Dynamically writes individual stories based on real-time collection progress.
- **`architect` ➔ Mewtwo (#150 - The Master Mind of the Blueprint)**: Demands absolute logical structural perfection.
- **`tech_lead` ➔ Porygon (#137 - The Digital Blueprint Optimizer)**: Translates stories into clean, byte-level structural engineering tasks.
- **`coder` ➔ Pikachu (#025 - The Spark of Implementation)**: Turns static markdown requirements into fully functional code.
- **`qa` ➔ Ditto (#132 - The Contract Matcher)**: Transforms itself into the exact specification to verify the implementation.
- **`human` ➔ Legendary Pokémon Trainer (Red)**: Commands the grand pipeline strategies.
- **`tpm` ➔ Meowth (#052 - The Coin Finder & Archivist)**: Meticulously maintains learning logs and archives nodes.
- **`agile_coach` ➔ Professor Oak (The Process Pioneer)**: Mentoring the factory, evolving agent prompts.
- **`mechanic` ➔ Blastoise (#009 - The Torrential Pipeline Cleanser)**: Blasts through clogged pipelines with Hydro Pump.
- **`researcher` ➔ Mew (#151 - The Exploratory Genesis)**: Spawns late-bound research nodes to explore and decode.
- **`auditor` ➔ Lapras (#131 - The Gentle Final Guide)**: Navigates the PR artifacts safely to shore, distilling crucial lessons learned.

### 2. Jules Agent Personas (The Companion Pokémon) Theme
Apply the same thematic mapping to developer-facing personas defined under `.jules/`:
- **Oak (Data Integrity)** ➔ **Professor Oak**
- **Nurse (Type Safety)** ➔ **Nurse Joy (Chansey - #113)**
- **Sentinel (Testing & Coverage)** ➔ **Gengar (#094)**
- **Sweeper (Cleanup & Refactor)** ➔ **Scyther (#123)**
- **Palette (Design & Styling)** ➔ **Pidgeot (#018)**
- **Scribe (Documentation & Lore)** ➔ **Slowbro (#080)**
- **Trainer (Quality & Improvement)** ➔ **Machamp (#068)**
- **Visionary (Creative Ideation)** ➔ **Eevee (#133)**
- **Sculptor (AI Readability)** ➔ **Sandslash (#028)**
- **Infras (CI/CD Powerhouse)** ➔ **Golem (#076)**

### 3. Gamified Status Lifecycle
Update definitions in `.foundry/docs/schema.md` and related dashboard UI components to map node status transitions:
- **`PENDING` ➔ 🥚 Pokémon Egg:** Incubating, blocked by prerequisites.
- **`READY` ➔ 🐣 Hatched:** Ready for dispatch.
- **`ACTIVE` ➔ ⚔️ In Battle:** A Jules agent is actively working on the task.
- **`VERIFYING` ➔ 🏆 Elite Four Challenge:** QA/Auditor evaluates the work.
- **`COMPLETED` ➔ 🌟 Fully Evolved / Hall of Fame:** Task successfully evolved and archived.
- **`FAILED` / `BLOCKED` ➔ 🏥 Pokémon Center:** Task failed and is sent for recovery.

## Acceptance Criteria
- [ ] Epic Planner: Break down this PRD into Epics (e.g., Schema Updates, UI Dashboard Updates, GitHub Actions Orchestrator Updates).
