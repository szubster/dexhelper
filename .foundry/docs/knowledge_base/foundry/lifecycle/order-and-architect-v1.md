# Foundry Order & Architect Integration

## Context
The user identified an issue in PR #355 where the PM (Jules) was performing 'Architect' level technical decisions in a PRD. There is also a DAG deadlock because IDEA nodes were being treated as composite instead of atomic.

## Proposed Resolution
1. **The Order**: IDEA (PM) -> PRD (PM) -> ADR (Architect) -> EPIC (Planner) -> STORY -> TASK.
2. **Atomic Handoff**: A node is marked COMPLETED when its successor is created/approved.
3. **Architect Persona**: Formally integration the Architect as the 'Gatekeeper' between Requirements (PRD) and Implementation (EPIC).

## Impact
- Unblocks idea-002.
- Prevents technical brainstorming from leaking into PRDs.
- Establishes a clear handoff for the upcoming Distributed ID feature.