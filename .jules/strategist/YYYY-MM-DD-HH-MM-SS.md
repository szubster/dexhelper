## YYYY-MM-DD-HH-MM-SS - [Accepted] - Prompt improvement - Centralize E2E Orchestrator Safeguard
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The `epic_planner` prompt had an explicit rule to generate E2E verification stories for every Epic. However, `story_owner` (who dynamically generates stories for Epics) lacked this instruction. Because of the orchestrator safeguard, Epics handled by `story_owner` were stalling and failing.
**Pattern:** Move critical orchestrator safeguard generation rules (like E2E requirements) out of individual generative prompts (`epic_planner`) and into the "Node Generation Rules" section of `core_policies.md` so that all generative personas (`story_owner`, etc.) enforce them uniformly.

## 2026-08-05 - [Accepted] - Prompt improvement - Centralize architectural and verification constraints
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** Several personas (Coder, QA, Tech Lead, Auditor) shared duplicated constraints around Save File Parsing (Section 13), UI Aesthetics (ADR 008), Architectural Scaffolding, Vitest mocks, and the Intelligent Verification Protocol. This leads to drift and bloated context windows.
**Pattern:** Extract duplicated coding and verification policies from individual agent schedules and centralize them into `core_policies.md` to ensure all agents operate from a single, consistent source of truth, reducing token usage and simplifying prompt maintenance.

## YYYY-MM-DD - [Accepted] - Centralize Journal Management to Archivist
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The `tpm.md` persona was burdened with aggregating session logs and purging transient status logs, which overlapped with the `archivist.md` persona whose primary focus is "Knowledge Hygiene". TPM is a pipeline orchestrator and resolving deadlocks; Archivist is the domain owner of logs and memories.
**Pattern:** Move domain-specific knowledge maintenance duties out of pipeline orchestration agents (TPM) and strictly centralize them within the knowledge maintenance agent (Archivist) to preserve separation of concerns.
