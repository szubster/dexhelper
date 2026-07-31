## 2026-08-30 - [Accepted] - Retire mechanic persona
**Type:** Retirement
**Outcome:** Merged
**Why:** The `mechanic` persona's remaining responsibilities are completely redundant. Resolving DAG deadlocks and orchestrator issues is handled by the `tpm` (hourly), and proactively proposing system improvements (IDEA nodes) for the Foundry orchestrator is explicitly handled by the `visionary` (which maintains a 50/50 split between DexHelper and Foundry ideas). Its previous prompt-improvement duties were already moved to `strategist`. Removing it reduces overhead and eliminates overlapping meta-agents.
**Pattern:** Retire agents whose responsibilities have been fully absorbed by more specialized personas to keep the roster lean and prevent conflicting actions.
