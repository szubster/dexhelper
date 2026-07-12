---
id: research-267-296-bash-timeout-wrapper-alternatives
type: RESEARCH
title: Research alternatives for bash timeout wrapper
status: READY
owner_persona: researcher
created_at: '2026-07-09'
updated_at: '2026-07-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-127-267-bash-timeout-wrapper
tags:
  - foundry
  - system-improvement
  - resilience
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research alternatives for bash timeout wrapper

## Overview
Investigate alternative ways to implement a timeout wrapper for bash sessions. The previous implementation task failed because `run_in_bash_session` is a platform tool and cannot be modified from within the repo.

## Context
The goal is to interrupt commands that run over a specific threshold (e.g., 30 seconds) to prevent infinite hangs caused by blocking commands like `tail -f`. Since modifying the platform tool `run_in_bash_session` is not possible, we need to find other ways to enforce this timeout.

## Research Objectives
1.  **Identify Alternative Mechanisms**: Explore ways to wrap bash execution or enforce timeouts at a level that *can* be modified from within the repository.
    *   Could we introduce a wrapper script within the repo that agents are instructed to use instead of calling `run_in_bash_session` directly?
    *   Are there other platform features or configurations we can leverage?
    *   Can we enforce a timeout policy via instructions to the agents?
2.  **Evaluate Feasibility**: Assess the practicality and effectiveness of each identified alternative.
3.  **Propose a Solution**: Recommend the best approach for implementing the timeout requirement given the constraints.

## Findings
The fundamental constraint is that `run_in_bash_session` is a platform tool outside the repo, making a transparent, repo-level wrapper impossible.

We considered the following alternatives:

1.  **Repo-level Wrapper Script**:
    - *Concept*: Create a script like `scripts/safe_bash.sh` that wraps commands in `timeout 30s "$@"`.
    - *Feasibility*: Low. Agents would need to be re-prompted continuously to use this script instead of `run_in_bash_session` directly. This is error-prone and violates the expectation that the sandbox behaves normally.

2.  **Platform/Agent Instructions**:
    - *Concept*: Update agent system prompts (e.g., `AGENTS.md` or core policies) to explicitly forbid blocking commands like `tail -f` and require the use of `timeout`.
    - *Feasibility*: High. We already enforce behavioral constraints via `.foundry/docs/knowledge_base/agents/core_policies.md`.

3.  **Using the `timeout` command**:
    - *Concept*: Linux systems provide the `timeout` utility (e.g. `timeout 30s tail -f log.txt`).
    - *Feasibility*: High. It's a standard coreutils tool available in the sandbox.

## Proposed Solution
The most feasible and resilient approach is an **instructional policy enforcement**. Since we cannot physically restrict the sandbox tool, we must constrain agent behavior through the system's core policies.

We should update `.foundry/docs/knowledge_base/agents/core_policies.md` to explicitly forbid the execution of blocking commands (like `tail -f`) without a timeout wrapper, and suggest alternatives (like `cat` or `tail -n`).

Specifically, the policy should state:
*   Never execute blocking commands (e.g., `tail -f`, long-running loops) in `run_in_bash_session` as they will cause the session to hang indefinitely.
*   Use non-blocking alternatives like `cat` or `tail -n`.
*   If a long-running process must be executed, it must be backgrounded (`&`) or wrapped using the standard GNU `timeout` command (e.g., `timeout 30s command`).

## Acceptance Criteria
- [x] Investigate alternative mechanisms for enforcing a timeout on bash commands.
- [x] Document findings and propose a feasible solution.
