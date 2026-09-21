---
id: doc-architecture-idea-dependency-matrix
type: RESEARCH
title: "Idea Dependency Matrix Schema"
status: COMPLETED
owner_persona: architect
created_at: "2026-09-10"
updated_at: "2026-09-10"
depends_on: []
jules_session_id: null
pr_number: null
parent: null
priority: 50
tags:
  - architecture
  - documentation
research_references: []
rejection_count: 0
rejection_reason: ""
notes: "Historical mapping metadata index for overlapping domain boundaries between implemented and archived Ideas."
---

# Idea Dependency Matrix

## Context / Purpose
The Idea Dependency Matrix is a lightweight historical mapping index designed to track the relationships, dependencies, and overlapping domain boundaries between implemented, active, and archived `IDEA` nodes within The Foundry. As the system scales and multiple ideas touch similar parts of the codebase or product surface, this matrix serves as a single source of truth for understanding how different ideas interact.

## Guidelines
- **Updating the Matrix:** When a new `IDEA` node is transitioned to `COMPLETED` or when a new feature is architected that significantly overlaps with existing domains, the architect or responsible persona must update the matrix table below.
- **Node IDs:** Always use the exact, full Node ID (e.g., `idea-001-auth-overhaul`).
- **Domain Boundaries:** Briefly describe the specific area of the application or architecture that the Idea modifies or relies upon.
- **Dependencies:** List any other `IDEA` nodes that this Idea directly depends on or significantly interacts with.

## The Matrix
| Idea ID | Title | Domain Boundaries | Dependencies / Overlaps | Status |
| :--- | :--- | :--- | :--- | :--- |
| `idea-000-137-orchestrator-telemetry-for-cycles` | Orchestrator Telemetry For Cycles | foundry, orchestrator, telemetry |  | PENDING |
| `idea-001-the-foundry` | The Foundry: Autonomous Software Factory | Uncategorized |  | COMPLETED |
| `idea-002-collision-free-ids` | Distributed IDs & Concurrency Resilience | Uncategorized | Parent: `idea-001-the-foundry` | COMPLETED |
| `idea-002-tpm-scheduling` | Agent Scheduling | infrastructure |  | COMPLETED |
| `idea-003-atomic-handoff-foundation` | Foundry V2: Atomic Handoffs & Single-Persona Ownership | Uncategorized |  | COMPLETED |
| `idea-004-human-in-the-loop` | Human-in-the-Loop Handoff | Uncategorized | Parent: `idea-003-atomic-handoff-foundation` | COMPLETED |
| `idea-005-late-binding-orchestrator` | Late Binding Epics & Recursive Orchestration | foundry-v2, architecture, orchestration | Parent: `idea-003-atomic-handoff-foundation` | COMPLETED |
| `idea-005-revert-data-optimizations` | Revert Data Format Optimizations (Short Property Names) | Uncategorized |  | COMPLETED |
| `idea-006-gen2-expansion` | Gen 2 Support Expansion: Johto/Kanto Lifecycle | Uncategorized | `idea-001-the-foundry` | COMPLETED |
| `idea-007-automated-link-checker` | Automated Link Checker Pre-commit Hook | infras, verification |  | COMPLETED |
| `idea-007-migrate-saves-to-indexeddb` | Migrate Save Data to IndexedDB | Uncategorized |  | COMPLETED |
| `idea-008-ui-component-reuse` | UI Component Reuse and Refactoring | Uncategorized |  | COMPLETED |
| `idea-009-enforce-strict-empty-pr-policy` | Enforce Strict Empty PR Policy Across Personas | Uncategorized |  | COMPLETED |
| `idea-010-idempotent-node-generation` | Idempotent Node Generation Mechanism | orchestrator, generation, efficiency |  | COMPLETED |
| `idea-011-relax-node-engine` | Relax Node engine requirement in package.json to >=22.0.0 | Uncategorized |  | COMPLETED |
| `idea-011-researcher-persona` | Introduce Researcher Persona | foundry, persona, research |  | COMPLETED |
| `idea-012-sibling-dependency-enforcement` | Sibling Dependency Enforcement | orchestrator, dag, reliability |  | COMPLETED |
| `idea-012-use-gray-matter-parsing` | Replace Regex Manipulations with Gray-Matter parsing | foundry, parsing, gray-matter, maintenance |  | COMPLETED |
| `idea-013-improve-late-binding-completion` | Improve Late Binding Parent Completion | orchestrator, late-binding, bug |  | COMPLETED |
| `idea-014-cascade-cancellation` | DAG Feature: Cascade CANCELLED Statuses | foundry, dag, orchestrator, cancellation |  | COMPLETED |
| `idea-015-enforce-persona-pipeline` | DAG Feature: Enforce Persona Pipeline Handoffs | foundry, dag, orchestrator, validation |  | COMPLETED |
| `idea-016-precommit-schema-validation` | DAG Feature: Pre-commit Schema Validation | foundry, dag, orchestrator, validation |  | COMPLETED |
| `idea-017-dag-dashboard` | DAG Dashboard Webview | foundry, dag, visualization |  | COMPLETED |
| `idea-018-migrate-heartbeat-to-gray-matter` | Migrate foundry-heartbeat.ts to gray-matter | foundry, dag, orchestrator, technical-debt |  | COMPLETED |
| `idea-019-automated-branch-cleanup` | Automated Branch Cleanup | Uncategorized |  | COMPLETED |
| `idea-019-orchestrator-test-factories` | Standardized Orchestrator Test Factories | Uncategorized |  | COMPLETED |
| `idea-020-enforce-acceptance-criteria-completion` | Enforce Acceptance Criteria Checkbox Completion | Uncategorized |  | COMPLETED |
| `idea-021-unified-scheduled-agent-policies` | Unified Scheduled Agent Policies Module | foundry, agents, meta |  | COMPLETED |
| `idea-039-401-r2-conflict-resolution-ui` | Cloudflare R2 Conflict Resolution UI | ui, sync, ux | Parent: `epic-030-039-cloudflare-r2-save-sync` | COMPLETED |
| `idea-050-orchestrator-leaf-failure-validation` | DAG Feature: Enforce Acceptance Criteria on Empty PRs | foundry, dag, orchestrator, validation |  | COMPLETED |
| `idea-051-dag-kanban-board-view` | DAG Kanban/Scrum Board View | foundry, dag, visualization, board | `idea-017-dag-dashboard` | COMPLETED |
| `idea-051-strict-schema-validations` | Strict Schema Validations for FAILED Nodes and Dependency Paths | foundry, schema, validation |  | COMPLETED |
| `idea-052-strict-research-references-validation` | Strict Schema Validations for Research References | foundry, schema, validation |  | COMPLETED |
| `idea-053-gen3-support` | Add Gen3 Support | feature, gen3 |  | COMPLETED |
| `idea-054-robust-session-completion` | Robust Handling of Session Completion in Heartbeat | foundry, dag, orchestrator, heartbeat |  | COMPLETED |
| `idea-055-cloudflare-sync-and-future-features` | Cloudflare Backend for Offline-First Save Syncing and Future Progression Features | backend, sync, cloudflare, authentication, progression |  | COMPLETED |
| `idea-056-living-dex-tracker` | Specialized "Living Dex" Organization Tracker UI | feature, ui, living-dex |  | PENDING |
| `idea-058-damage-calculator-integration` | Damage Calculator and Showdown Export Integration | feature, showdown, calculator |  | ACTIVE |
| `idea-059-multi-save-trade-planner` | Multi-Save Trade Planner | feature, trades, multi-save |  | PENDING |
| `idea-059-orchestrator-auto-cancel-orphaned-nodes` | Auto-Cancel Orphaned PENDING Nodes in Orchestrator | foundry, dag, orchestrator, cancellation |  | COMPLETED |
| `idea-060-auditor-persona` | Introduce 'auditor' persona to verify work and possibly create new nodes based on status/learnings | process, orchestrator, persona |  | COMPLETED |
| `idea-061-emulator-auto-sync` | Emulator Auto-Sync via File System Access API | feature, ux, local-sync |  | COMPLETED |
| `idea-062-drive-cloudflare-sync` | Google Drive and Cloudflare Server-Side Sync | feature, sync, backend, cloudflare |  | PENDING |
| `idea-063-permanent-failure-dashboard` | Permanent Failure Dashboard View | foundry, ui, dashboard |  | COMPLETED |
| `idea-063-shiny-breeding-assistant` | Gen 2 Shiny Gene Detection & Breeding Assistant | feature, breeding, gen2 |  | COMPLETED |
| `idea-064-smart-route-radar` | Smart Route Radar / Context-Aware Missing Encounter Map | feature, ux, map, exploration |  | PENDING |
| `idea-065-epic-verification-timing` | Re-evaluate Epic Verification Timing | foundry, process, orchestrator |  | COMPLETED |
| `idea-066-enforce-gray-matter-linter` | Enforce Gray-Matter Linter for Scripts | lint, schema, foundry |  | CANCELLED |
| `idea-066-feebas-tile-predictor` | Gen 3 Feebas Tile Predictor | feature, gen3 |  | PENDING |
| `idea-066-fix-wait-and-wake-cancellation-bug` | Fix Wait and Wake Cancellation Bug | orchestrator, auto-cancel, bug |  | COMPLETED |
| `idea-066-rom-hack-support` | ROM Hack Support via Custom Adapters | engine, features, parsing |  | ACTIVE |
| `idea-066-save-file-health-scanner` | Save File Health & Corruption Scanner | feature, preservation, save-file |  | PENDING |
| `idea-066-save-state-history` | Save State Version History and Metadata Inference | feature, history, metadata, indexeddb |  | PENDING |
| `idea-066-time-capsule-validator` | Time Capsule Readiness Validator | feature, gen2, trade, tool |  | COMPLETED |
| `idea-067-clear-rejection-reason` | Clear Rejection Reason on Status Change | foundry, lifecycle, orchestrator |  | COMPLETED |
| `idea-067-extract-dag-utils` | Extract DAG Utilities to Shared Module | refactor, foundry, orchestrator |  | COMPLETED |
| `idea-067-gen3-berry-tracker` | Gen 3 Berry Farming Tracker | feature, gen3, berries |  | PENDING |
| `idea-068-069-pokerus-tracker` | Pokerus Tracker and Infection Spread Assistant | feature, tool, quality-of-life |  | PENDING |
| `idea-068-hidden-items-finder` | Missing Hidden Items Finder | feature, tool, quality-of-life |  | COMPLETED |
| `idea-068-mirage-island-predictor` | Gen 3 Mirage Island Predictor | feature, gen3, mirage-island |  | PENDING |
| `idea-068-unown-tracker` | Unown Form Tracker | feature, gen2, tracking |  | COMPLETED |
| `idea-069-daily-event-tracker` | Gen 2 Daily and Weekly Event Tracker | feature, gen2, daily-events |  | PENDING |
| `idea-069-mirage-island-predictor` | Gen 3 Mirage Island Predictor | gen3, mirage-island, rng |  | PENDING |
| `idea-070-gen3-contest-tracker` | Gen 3 Contest Stat and Ribbon Tracker | feature, gen3, contests |  | COMPLETED |
| `idea-070-hall-of-fame-exporter` | Hall of Fame Timeline and Certificate Exporter | feature, social, hall-of-fame |  | PENDING |
| `idea-070-roamer-tracking-dashboard` | Roaming Pokémon Tracking Dashboard | feature, ux, map, exploration |  | PENDING |
| `idea-071-gen3-roamer-tracker` | Gen 3 Roaming Legendary Tracker and IV Glitch Inspector | feature, gen3, roamer |  | PENDING |
| `idea-071-tailwind-v4-utilities-migration` | Tailwind v4 @utility Consolidation | tech-debt, styling, refactor |  | PENDING |
| `idea-072-strict-macro-node-completion` | Strict Macro Node Completion Enforcement | orchestrator, architecture |  | PENDING |
| `idea-073-gen3-secret-base-viewer` | Gen 3 Secret Base and Mixed Record Viewer | feature, gen3, secret-base |  | PENDING |
| `idea-073-refactor-dag-dashboard-context` | Refactor DagDashboard to use React Context (ADR 013/017) | architecture, ui, dashboard |  | PENDING |
| `idea-074-gen3-battle-frontier-tracker` | Gen 3 Battle Frontier Dashboard | feature, gen3, endgame |  | PENDING |
| `idea-074-refactor-dag-dashboard-context` | Refactor DagDashboard to use React Context (ADR 013/017) | architecture, ui, dashboard |  | PENDING |
| `idea-075-gen3-tv-swarm-tracker` | Gen 3 TV Broadcast and Swarm Tracker | feature, gen3, daily-events |  | PENDING |
| `idea-076-tpm-journal-bloat` | Investigate TPM Journal Bloat and Orchestrator Logging | architecture, logging, orchestrator |  | COMPLETED |
| `idea-077-dynamic-pokeapi-data` | Parse items and moveset PPs from repository data during build | refactor, build, db |  | PENDING |
| `idea-077-gen3-match-call-tracker` | Gen 3 PokéNav Match Call & Rematch Tracker | feature, gen3, tracking, endgame |  | PENDING |
| `idea-078-settle-rtc-strategy` | Settle RTC Strategy Once and For All | feature, gen3, rtc, architecture |  | COMPLETED |
| `idea-079-automated-max-rejection-cancellation` | Automated Max Rejection Cancellation | foundry, orchestrator, resilience |  | PENDING |
| `idea-079-foundry-zombie-node-cleanup` | Foundry Zombie Node Garbage Collection | foundry, orchestrator, maintenance |  | PENDING |
| `idea-080-gen3-pokerus-extraction` | Implement Gen 3 Pokerus Extraction | gen3, save-engine, pokerus |  | PENDING |
| `idea-081-friendship-evolution-tracker` | Exact Friendship & Evolution Tracker | gen2, gen3, companion-app |  | PENDING |
| `idea-082-gen3-secret-id-shiny-rng` | Gen 3 Secret ID Viewer and Shiny RNG Assistant | feature, gen3, rng, shiny-hunting |  | PENDING |
| `idea-083-daycare-egg-tracker` | Daycare Status and Exact Egg Hatch Tracker | feature, gen2, gen3, breeding |  | PENDING |
| `idea-084-standardize-relative-offsets` | Standardize Relative Offsets for Dynamic Data Parsing | architecture, save-parsing, offset-mapping |  | PENDING |
| `idea-085-hidden-power-calculator` | Hidden Power Type and Base Power Calculator | feature, mechanics, gen2, gen3 |  | ACTIVE |
| `idea-085-lift-rejection-count-state` | Lift rejection_count state to DagContext | refactor, dashboard |  | COMPLETED |
| `idea-086-box-duplicate-analyzer` | PC Box Duplicate Analyzer & Release Assistant | feature, ui, ux, gen2, gen3 |  | PENDING |
| `idea-086-fix-gen3save-mock` | Fix isGen3Save heuristic mock for E2E tests | Uncategorized |  | PENDING |
| `idea-086-fix-orchestrator-phase-3-6` | Fix orchestrator phase 3.6 for CANCELLED nodes | foundry, orchestrator, resilience |  | COMPLETED |
| `idea-088-trick-house-tracker` | Gen 3 Trick House Progression Tracker | feature, gen3, mechanics |  | COMPLETED |
| `idea-089-gen3-ash-gathering-tracker` | Gen 3 Volcanic Ash Gathering Tracker | feature, gen3, mechanics |  | PENDING |
| `idea-090-pokegear-phone-tracker` | Gen 2 Pokegear Phone Call Predictor & Tracker | feature, gen2, mechanics |  | COMPLETED |
| `idea-091-smart-egg-move-path-finder` | Smart Egg Move Breeding Path Finder | feature, tool, mechanics |  | PENDING |
| `idea-092-gen3-ev-training-dashboard` | Gen 3 Effort Value (EV) Training Dashboard | gen3, save-engine, endgame, competitive |  | COMPLETED |
| `idea-093-gen3-ribbon-master-tracker` | Gen 3 Ribbon Master Challenge Tracker | gen3, save-engine, endgame, completionist |  | PENDING |
| `idea-094-move-tutor-tracker` | Gen 3 Move Tutor Availability Dashboard | Uncategorized |  | PENDING |
| `idea-095-in-game-trade-assistant` | Gen 2/3 In-Game Trade Assistant Dashboard | Uncategorized |  | PENDING |
| `idea-095-prevent-blocking-bash-commands` | Automated Timeout Wrapper for Bash Sessions | foundry, system-improvement, resilience |  | PENDING |
| `idea-096-macro-node-boundary-enforcement` | Enforce Macro Node Functional Boundaries | process, orchestrator |  | COMPLETED |
| `idea-097-schema-verifying-state-fix` | Fix contradiction in schema.md regarding VERIFYING state | documentation, schema |  | COMPLETED |
| `idea-098-gen3-pokemon-lottery-predictor` | Gen 3 Pokémon Lottery Predictor | feature, gen3 |  | PENDING |
| `idea-099-gen3-shoal-cave-tracker` | Gen 3 Shoal Cave Tide Tracker | feature, gen3, shoal-cave, rtc |  | CANCELLED |
| `idea-100-static-encounter-tracker` | Gen 1-3 Static Encounter & Legendary Checklist | feature, gen1, gen2, gen3 |  | PENDING |
| `idea-101-pc-box-organization-assistant` | Gen 1-3 PC Box Organization Assistant | feature, gen1, gen2, gen3 |  | COMPLETED |
| `idea-101-re-implement-extract-rejection-count` | Re-implement Rejection Count Extraction | foundry, ui, dashboard |  | COMPLETED |
| `idea-102-gen3-trainer-card-stars` | Gen 3 Trainer Card Stars & Achievements Dashboard | feature, gen3, achievements, completionist |  | PENDING |
| `idea-103-foundry-node-content-consolidation` | Foundry Node and Prompt Content Consolidation | foundry, agents, meta |  | PENDING |
| `idea-104-missed-trainer-radar` | Gen 1-3 Missed Trainer Radar | feature, gen1, gen2, gen3 |  | PENDING |
| `idea-104-refactor-existing-parsers-adr-028` | Refactor Existing Parsers for ADR 028 | architecture, save-parsing, offset-mapping, technical-debt |  | PENDING |
| `idea-105-tm-hm-inventory-planner` | Gen 1-3 TM/HM Inventory & Compatibility Planner | feature, gen1, gen2, gen3 |  | PENDING |
| `idea-106-rs-battle-tower-dashboard-support` | Ruby/Sapphire Battle Tower Dashboard Support | feature, gen3, endgame |  | COMPLETED |
| `idea-107-pokerus-strain-ui-tracker` | Pokerus Strain Specific UI Tracker | pokerus, ui |  | CANCELLED |
| `idea-108-406-orchestrator-state-machine-fuzzing` | Implement Orchestrator State Machine Fuzzing | foundry, orchestrator, resilience, testing |  | PENDING |
| `idea-108-gen2-shiny-breeding-dv-planner` | Gen 2 Shiny Breeding DV Compatibility Planner | gen2, shiny-hunting, breeding, ui |  | PENDING |
| `idea-109-gen2-room-decoration-tracker` | Gen 2 Room Decoration & Mom's Savings Tracker | Uncategorized |  | PENDING |
| `idea-110-npc-size-record-assistant` | Gen 2 & Gen 3 NPC Size Record Assistant | Uncategorized |  | PENDING |
| `idea-111-safari-zone-tracker` | Gen 1 & Gen 3 Safari Zone Tracking Dashboard | feature, ui, safari-zone |  | PENDING |
| `idea-112-gen3-split-variable-extraction-strategy` | Gen3 Split Variable Extraction Strategy | gen3, architecture |  | PENDING |
| `idea-113-gen3-pokeblock-stats-viewer` | Gen 3 Pokéblock Exact Stats Viewer | gen3, contests, pokeblocks, quality-of-life |  | PENDING |
| `idea-114-update-permanent-failure-dashboard-ui` | Update Permanent Failure Dashboard UI for Cancelled Nodes | foundry, ui |  | PENDING |
| `idea-115-gen3-fame-checker-assistant` | Gen 3 Fame Checker Progress & Assistant | gen3, firered, leafgreen, fame-checker |  | PENDING |
| `idea-115-remove-obsolete-orphaned-node-manual-cancellation` | Remove Obsolete Orphaned Node Manual Cancellation Rule | foundry, orchestrator, agile-coach |  | COMPLETED |
| `idea-116-gen3-pc-box-wallpaper-customizer` | Gen 3 PC Box Wallpaper Customizer | gen3, pc-box, customization, endgame |  | PENDING |
| `idea-116-zod-schema-validation-orchestrator` | Implement Zod for Strict Node Schema Validation in Foundry Orchestrator | foundry, orchestrator, architecture |  | COMPLETED |
| `idea-117-split-bundles-and-data` | Split bundles and data by game generation | performance, architecture, bundles |  | PENDING |
| `idea-118-centralize-prompt-reminders` | Centralize Coder and QA Task Prompt Reminders | foundry, agents, prompts |  | PENDING |
| `idea-118-centralize-prompt-reminders-complete` | Re-evaluate Need for Coder/QA Reminders | foundry, agents, prompts |  | PENDING |
| `idea-118-orchestrator-circular-dependency-detection` | Implement Circular Dependency Detection in DAG Orchestrator | foundry, orchestrator, architecture |  | PENDING |
| `idea-119-gen2-unown-dex-tracker` | Gen 2 Unown Dex Progress Tracker | feature, gen2, unown |  | PENDING |
| `idea-119-gen3-spinda-pattern-viewer` | Gen 3 Spinda Pattern Viewer | gen3, spinda, collection, premium-feature |  | PENDING |
| `idea-120-conflictless-agent-journals` | Research and Implement Conflict-less Agent Journals | foundry, journals, workflow, DX |  | COMPLETED |
| `idea-120-orchestrator-critical-path-scheduling` | Implement Critical Path Node Prioritization in the DAG Orchestrator | Uncategorized |  | COMPLETED |
| `idea-121-gen2-kurt-apricorn-tracker` | Gen 2 Kurt Apricorn Tracker | feature, gen2, items |  | PENDING |
| `idea-121-gen2-time-capsule-validator` | Gen 2 Time Capsule Compatibility Validator | Uncategorized |  | BLOCKED |
| `idea-121-gen3-e-reader-event-tracker` | Gen 3 E-Reader and Mystery Event Tracker | app, gen3, collection, events, hardware |  | PENDING |
| `idea-121-gen3-mystery-gift-viewer` | Gen 3 Mystery Gift Viewer | gen3, collection, mystery-gift, premium-feature |  | PENDING |
| `idea-122-foundry-lead-time-metrics` | Implement Foundry Lead Time Metrics and Bottleneck Analysis | foundry, orchestrator, metrics |  | BLOCKED |
| `idea-122-pokemon-themed-foundry-personas` | Pokémon-Themed Foundry Persona Skins and Gamified Workflow | foundry, ux, gamification, personas |  | PENDING |
| `idea-123-improved-savedata-typing` | Improve SaveData Typing with Discriminated Generation Unions | savedata, typescript, refactoring, type-safety |  | COMPLETED |
| `idea-124-librarian-persona-context-optimizer` | Librarian Persona for Context Token Optimization | foundry, orchestrator, optimization, token-usage |  | COMPLETED |
| `idea-128-gen3-acro-bike-route-planner` | Gen 3 Acro Bike / Mach Bike Route Requirements | gen3, map, quality-of-life |  | PENDING |
| `idea-129-epic-level-distillation-archival` | Epic-Level Distillation and Cold Storage Archival | foundry, infrastructure, performance |  | PENDING |
| `idea-130-shoal-cave-tide-tracker` | Shoal Cave Tide & Item Tracker (Gen 3) | feature, gen3, time-based, item-tracker |  | PENDING |
| `idea-131-orchestrator-resource-locking-mutex` | Implement Resource Locking (Mutex) in DAG Orchestrator | orchestrator, architecture |  | PENDING |
| `idea-132-gen3-pal-park-migration-planner` | Gen 3 Pal Park Migration Planner | feature, gen3, migration |  | PENDING |
| `idea-133-automated-dag-visualizer` | Automated DAG Visualizer via Mermaid Generation | orchestrator, tooling, visualization |  | BLOCKED |
| `idea-134-active-party-matchup-analyzer` | Gen 1-3 Active Party Matchup Analyzer | feature, gen1, gen2, gen3 |  | PENDING |
| `idea-135-automated-agent-ab-testing-framework` | Automated Agent A/B Testing Framework | foundry, orchestrator, optimization |  | PENDING |
| `idea-136-gen3-ai-move-predictor` | Gen 3 Trainer AI Move Predictor | gen3, nuzlocke, ai |  | PENDING |
| `idea-136-in-game-mail-archiver` | Gen 1-3 In-Game Mail Archiver | feature, mail, collector |  | BLOCKED |
| `idea-136-split-bundles-and-data` | Split bundles and data by game generation | performance, architecture, bundles, database |  | PENDING |
| `idea-137-builtin-emulator` | Built-in Emulator Integration | emulator, research, core |  | PENDING |
| `idea-137-decouple-persona-prompts` | Decouple Persona Prompts and Support Composite Multi-Layered Prompts | foundry, orchestrator, architecture |  | PENDING |
| `idea-137-external-source-links` | Add Links to External Sources | general, documentation, ui |  | BLOCKED |
| `idea-138-realtime-memory-sync-extraction` | Real-Time WebAssembly Memory Sync and Extraction | emulator, save-engine, architecture |  | PENDING |
| `idea-139-live-battle-prediction-overlay` | Live Battle Advisor and Prediction Overlay | emulator, battle, ui |  | PENDING |
| `idea-140-auto-checklist-location-tracker` | Automated Location Tracking and Checklist Sync | emulator, map, checklist |  | PENDING |
| `idea-141-wasm-savestate-timetravel-debugging` | WASM Savestate Time Travel and Debugging Suite | emulator, debug, save-engine |  | PENDING |
| `idea-142-automated-adr-compliance-linter` | Automated ADR Compliance Linter | foundry, orchestrator, compliance, adr |  | PENDING |
| `idea-143-local-visual-regression-testing` | Local Visual Regression Testing & Component Diffing | testing, frontend, visual-regression |  | PENDING |
| `idea-144-gen2-bug-catching-contest-analyzer` | Gen 2 Bug-Catching Contest Score Analyzer | feature, gen2, utility |  | PENDING |
| `idea-145-component-variants-theming-consolidation` | Component Variants and Theming Consolidation | refactor, styling, frontend, theming, design-system |  | COMPLETED |
| `idea-145-semantic-prompt-validation` | Semantic Validation for Agent Prompts | testing, prompts |  | PENDING |
| `idea-146-foundry-system-statistics` | Implement Foundry System Statistics Reporting and Backfilling | orchestrator, metrics, statistics, database |  | PENDING |
| `idea-147-add-more-test-fixtures` | Add more real save file test fixtures for Gen 1, 2, and 3 | testing, fixtures, saveParser |  | PENDING |
| `idea-147-gen3-weather-anomaly-tracker` | Gen 3 Weather Anomaly Tracker (Groudon & Kyogre) | feature, gen3, tracker |  | PENDING |
| `idea-148-orchestrator-priority-scheduling` | Foundry Orchestrator DAG Priority Scheduling | foundry, orchestrator, scheduling, optimization |  | PENDING |
| `idea-148-priority-based-dispatch-queue` | Priority-Based Dispatch Queue for Orchestrator | orchestrator, scheduling, pipeline |  | PENDING |
| `idea-148-save-editor-cli` | Save Editor CLI | cli, saveEditor |  | PENDING |
| `idea-149-reevaluate-acceptance-criteria` | Re-evaluate Acceptance Criteria Structure and Usage in Foundry | foundry, architecture, schema, acceptance-criteria, adr |  | PENDING |
| `idea-150-wild-held-item-hunting-assistant` | Wild Held Item Hunting Assistant | dexhelper, feature, gen2, gen3 |  | PENDING |
| `idea-151-holistic-code-curator-persona` | Holistic Code Curator Persona: Architectural Refactoring & Historical Backtracking | foundry, personas, refactoring, architecture, quality |  | PENDING |
| `idea-151-work-in-progress-draft-signaling` | Work-in-Progress and Draft Artifact Signaling across Foundry and DexHelper | foundry, dexhelper, adr, architecture, documentation, wip |  | PENDING |
| `idea-152-archival-cleanup-and-retention-policy` | Archival Cleanup & Incremental Node Retention Policy | foundry, archive, retention, garbage-collection, persona |  | PENDING |
| `idea-152-deterministic-dag-tree-archival` | Deterministic DAG Tree Archival in Orchestrator | foundry, infrastructure, orchestrator |  | PENDING |
| `idea-153-foundry-rearchitecture-and-code-architect-persona` | Foundry Rearchitecture: State Machine/Graph Libraries & Scheduled Code Architect Persona | foundry, architecture, state-machine, dag, refactoring, personas |  | PENDING |
| `idea-154-ecosystem-modernization-and-generators` | Bleeding-Edge Ecosystem Modernization, TypeScript 7.x & Generator Architecture | typescript, typescript-7, generators, nodejs, refactoring, adr, research, tech-stack |  | PENDING |
| `idea-155-gen3-trick-house-tracker` | Gen 3 Trick House Tracker Dashboard | dexhelper, feature, gen3, tracker |  | PENDING |
| `idea-156-automated-graph-healing` | Automated Graph Healing for BLOCKED Nodes | foundry, orchestrator, dag, self-healing |  | PENDING |
| `idea-156-foundry-node-status-health-heatmap` | Foundry DAG Node Health Heatmap Visualizer | foundry, orchestrator, UI, tooling |  | PENDING |
| `idea-157-gen2-headbutt-tree-predictor` | Gen 2 Headbutt Tree Predictor | dexhelper, feature, gen2, tracker |  | PENDING |
| `idea-157-pnpm-workspaces-architecture` | Step-by-Step Monorepo Architectural Migration to pnpm Workspaces | architecture, monorepo, pnpm, dx, cloudflare |  | PENDING |
| `idea-158-dataview-composite-wrapper` | DataView Composite Wrapper & Save Parser Abstraction | architecture, dataview, save-parser, abstraction, testing, refactoring |  | PENDING |
| `idea-159-individual-pokemon-pkm-exporter` | Individual Pokémon PKM/PK3 Exporter | feature, gen1, gen2, gen3, export |  | PENDING |
| `idea-417-407-more-save-files` | Idea: Source additional save files for testing | testing, fixtures | Parent: `epic-343-417-test-fixtures-sourcing` | PENDING |
| `idea-418-replace-xyflow-with-custom-dag` | Replace @xyflow/react with a lightweight directory tree visualization | performance, bundle-size, memory, architecture, ui-ux |  | PENDING |
| `idea-419-scheduled-agents-dashboard` | Scheduled Agents Dispatch via GitHub Issues and Execution Tracking | foundry, scheduled-agents, github-issues, zero-inbox |  | PENDING |
| `idea-420-task-breakdown-anti-patterns` | Enforce Specific Task Breakdown Anti-Patterns for Tech Leads | Uncategorized |  | PENDING |
| `idea-421-automated-schema-linting` | Implement Automated Markdown Schema Validation via Biome or Custom CLI | Uncategorized |  | PENDING |
| `idea-422-formalize-playwright-mocking-utilities` | Formalize Playwright Mocking Utilities and Testing Style Guide | Uncategorized |  | PENDING |
| `idea-422-gen3-fossil-revival-tracker` | Gen 3 Fossil Revival Tracker | dexhelper, gen3, tracking |  | PENDING |
| `idea-422-gen3-pokeblock-recipe-optimizer` | Gen 3 Pokéblock Recipe Optimizer for Contest Conditions | dexhelper, gen3, contests, optimization |  | PENDING |
| `idea-423-dynamic-rag-context-hydration` | Dynamic RAG-Based Context Hydration for Agent Prompts | foundry, orchestrator, optimization, AI |  | PENDING |
| `idea-424-gen3-interactive-map-dashboard` | Gen 3 Interactive Map Dashboard | dexhelper, feature, gen3, map |  | PENDING |
| `idea-487-refactor-rejection-count-schema` | Refactor IDEA Node Schema to Disallow Rejection Count and Reason | Uncategorized |  | BLOCKED |
| `idea-488-autonomous-execution-enforcement` | Implement Automated Detection of Autonomous Execution Violations | Uncategorized |  | PENDING |
| `idea-488-nuzlocke-level-cap-tracker` | Hardcore Nuzlocke Level Cap Tracker | feature, nuzlocke |  | BLOCKED |
| `idea-516-gen3-pokedex-completion-tracker` | Gen 3 Pokédex Completion & Missed Achievement Tracker | dexhelper |  | PENDING |
| `idea-517-automated-magic-number-linter` | Automated Magic Number Linter for Save Parsing | Uncategorized |  | PENDING |
| `idea-517-automated-orphan-node-garbage-collection` | Automated Orphan Node Garbage Collection | foundry, orchestrator, maintenance |  | BLOCKED |
| `idea-517-gen2-radio-password-tracker` | Gen 2 Buena's Password Tracker & Alert System | dexhelper, gen2, daily-events |  | COMPLETED |
| `idea-517-gen3-berry-blender-optimizer` | Gen 3 Berry Blender Multiplayer Optimizer | dexhelper |  | BLOCKED |
| `idea-517-lazy-load-pokedex-pokemon-list` | Lazy Load Pokedex Grid Items and Virtualization | Uncategorized |  | PENDING |
| `idea-517-optimize-pokedex-grid-rendering` | Optimize Pokedex and Storage Grids with Virtualization | performance, frontend, rendering |  | PENDING |
| `idea-520-gen3-berry-blending-optimizer-dashboard` | Gen 3 Berry Blending Optimizer Dashboard | dexhelper, gen3, contests |  | BLOCKED |
| `idea-521-agent-confidence-metrics-dashboard` | Agent Confidence Metrics Dashboard | foundry, orchestrator, metrics |  | PENDING |
| `idea-521-coroner-persona-post-mortem` | Coroner Persona for Automated Post-Mortem Analysis | foundry, orchestrator, optimization, error-handling |  | BLOCKED |
| `idea-521-foundry-persona-execution-time-profiler` | Foundry Persona Execution Time Profiler | foundry, orchestrator, metrics, profiling |  | BLOCKED |
| `idea-522-gen3-secret-base-radar` | Gen 3 Secret Base Radar & Analyzer | dexhelper, gen3, secret-base, map |  | PENDING |
| `idea-523-component-variants-theming-consolidation-refactor` | Component Variants and Theming Consolidation Refactor | refactor, styling, frontend, theming, design-system |  | PENDING |
| `idea-524-multi-box-search-filtering` | Multi-Box Advanced Search and Filtering System | dexhelper, ux, search, pc-box |  | PENDING |
| `idea-525-e2e-page-component-object-models` | E2E Page & Component Object Models and AI-Optimized Testing Patterns | testing, e2e, playwright, ai-optimization, DX |  | PENDING |
| `idea-526-save-file-schema-migration-framework` | Versioned Save State Schema Migration Pipeline | save-engine, architecture, schema, dx |  | READY |
