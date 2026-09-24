---
id: research-540-608-benchmark-failure-investigation
type: RESEARCH
title: Investigate Benchmark Runner Script Failure
status: COMPLETED
owner_persona: researcher
created_at: '2026-09-21'
updated_at: '2026-09-24'
depends_on: []
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

# Investigate Benchmark Runner Script Failure

## Description
Investigate why task-540-546-benchmark-runner-script-coder repeatedly failed to implement the benchmark runner script for TS 7.x toolchains and reached its max rejection count. Determine the correct approach to measuring compilation/execution time and dependency overhead for ts-node, swc, esbuild, oxc, and Node.js native strip-typing. Crucially, address the reviewer feedback that included dependencies cannot pollute the main `package.json`; they must be implemented as ephemeral packages in a `/tmp` directory.

## Acceptance Criteria
- [x] Investigate the root cause of the task 540-546 failure.
- [x] Produce a technical recommendation for implementing the benchmark script.

## Findings and Recommendation
The previous task failed because the benchmark script polluted the main package.json with dependencies like ts-node, esbuild, swc, and oxc.

To resolve this, the benchmark script MUST NOT modify the root package.json. Instead, it should create a temporary project in a /tmp directory, initialize it with an empty package.json, and run pnpm install or npm install inside that temporary directory for the required toolchain dependencies.

The benchmark should measure the time taken for this installation step as the dependency overhead. After the dependency is installed in the ephemeral directory, the script can execute the toolchain CLI or API from that location and measure the compilation and execution time of the provided TypeScript payloads.
