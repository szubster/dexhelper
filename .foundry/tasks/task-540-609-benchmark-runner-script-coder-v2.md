---
id: task-540-609-benchmark-runner-script-coder-v2
type: TASK
title: Implement Benchmark Runner Script V2
status: READY
owner_persona: coder
created_at: '2026-09-21'
updated_at: '2026-09-24'
depends_on:
  - research-540-608-benchmark-failure-investigation
jules_session_id: null
pr_number: null
parent: story-536-540-benchmarking-ts7-toolchains
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Benchmark Runner Script V2

## Description
Based on the findings from research-540-608-benchmark-failure-investigation, implement a benchmark runner script that measures the compilation and execution time of TypeScript files using ts-node, swc, esbuild, oxc, and Node.js native strip-typing. Include metrics for dependency installation overhead.

**CRITICAL CONSTRAINT**: The runner must strictly use ephemeral packages installed in a `/tmp` directory. Included toolchain dependencies MUST NOT pollute the main workspace `package.json`.

## Acceptance Criteria
- [ ] Implement the script to execute benchmark runs per the research recommendations.
- [ ] Record start and end times for each toolchain.
- [ ] Record dependency overhead for each toolchain.
- [ ] Output a report of execution times and dependency overhead.
