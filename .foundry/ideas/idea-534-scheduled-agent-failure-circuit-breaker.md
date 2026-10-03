---
id: idea-534-scheduled-agent-failure-circuit-breaker
type: IDEA
title: 'Scheduled Agent Failure Circuit Breaker and Auto-Throttling'
status: READY
owner_persona: product_manager
created_at: '2026-10-03'
updated_at: '2026-10-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - scheduled-agents
  - circuit-breaker
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Idea: Scheduled Agent Failure Circuit Breaker and Auto-Throttling

## Context
Scheduled background agents in the Foundry system (such as `visionary`, `agile_coach`, `tpm`, `librarian`, `curator`) run on cron schedules via GitHub Actions to maintain the DAG, generate ideas, clean up memory, and analyze pipeline statistics. However, when an underlying issue occurs (such as a broken schema rule, failing API integration, or persistent environment failure), scheduled agents continue running on their fixed cron schedules. This results in consecutive failed workflow runs, wasted API/compute tokens, noisy PR/issue spam, and bloated failure logs.

Currently, there is no system-level circuit breaker mechanism to detect consecutive failures for scheduled agents and automatically back off or pause execution until resolved.

## Proposal
Implement an automated Circuit Breaker state machine for scheduled agents within `.github/scripts/` / `.github/workflows/`:
1. **Failure State Tracking**: Maintain execution history / consecutive failure counters for each scheduled agent persona (e.g., in `.foundry/orchestrator-state.json` or workflow state storage).
2. **Circuit Trip Threshold**: If a scheduled agent fails `N` consecutive times (e.g. 3 consecutive failures), trip the circuit breaker (`status: OPEN` / `PAUSED`).
3. **Exponential Backoff / Throttling**: When open, skip or throttle scheduled dispatches for that specific agent, increasing the interval between retry attempts or requiring manual/automated reset.
4. **Diagnostic Notification**: Automatically append a health alert to the Foundry dashboard or create a targeted diagnostic log entry for `agile_coach` / `tpm` to review during system sweeps.

## Value Proposition
- Prevents resource exhaustion and wasted compute/API tokens on broken scheduled workflows.
- Eliminates noise and repeated failing runs during ongoing infrastructure or schema disruptions.
- Improves overall operational stability and health observability of the Foundry autonomous software factory.

## Next Steps
- [ ] prd-534-scheduled-agent-failure-circuit-breaker
