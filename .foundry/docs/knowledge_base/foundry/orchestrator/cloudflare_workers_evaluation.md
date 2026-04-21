# Cloudflare Workers Orchestrator Evaluation (Idea 005)

## Context
Goal: Replace/augment GitHub Actions for Foundry orchestration due to cron unreliability and slow git-based state management.

## Proposed Architecture
- **Worker**: Acts as the primary scheduler.
- **Storage**: Cloudflare D1 (SQL) for atomic state tracking of node status (`READY`, `ACTIVE`, etc.).
- **Boundary**: "Jules cannot reach this state" (Private to the orchestrator).
- **Control Plane**: Uses GitHub API (repository_dispatch) to trigger Action-based agents.

## Benefits
- Reliable sub-minute scheduling.
- Atomic state transitions (eliminates race conditions in status updates).
- External reachability for cross-repo or multi-factored orchestrations.
