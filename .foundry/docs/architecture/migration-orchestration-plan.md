# TS 7.x Migration Orchestration Plan

## Overview
This document outlines the phased orchestration plan for migrating the project's toolchain away from `ts-node` based on the V2 benchmark findings.

## Phased Approach

### Phase 1: Local Development & Script Execution
- **Objective:** Eliminate dependency installation overhead for routine script execution.
- **Action:** Transition all local development and utility scripts to use **Node.js native execution** via the `--experimental-strip-types` flag.
- **Impact:** Immediate reduction in execution latency and completely removes the need for third-party toolchains for standard operations.

### Phase 2: High-Performance Build Pipeline
- **Objective:** Optimize heavy compilation and build steps.
- **Action:** Integrate **Oxc** into the build pipeline for operations demanding maximum performance.
- **Impact:** Leverages Oxc's class-leading performance (~59ms average execution time, 16.88 ops/sec) to drastically reduce build times.

## Summary
By combining native Node.js support for general script execution with Oxc for intensive build steps, this migration minimizes disruption while maximizing performance across both local and CI environments.
