---
id: idea-423-automated-playwright-e2e-flakiness-detector
type: IDEA
title: Automated Playwright E2E Flakiness Detector and Mitigator
status: READY
owner_persona: product_manager
created_at: '2026-08-31T02:24:41Z'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - testing
  - pipeline
  - quality-assurance
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Automated Playwright E2E Flakiness Detector and Mitigator

## Context & Vision
As the Foundry system heavily relies on an "E2E-first strategy" using Playwright to verify autonomous code changes (via `qa` and `auditor` personas), the pipeline is highly sensitive to test flakiness. Transient errors—such as "Execution context was destroyed", layout shifts during assertions, or race conditions in `locators`—frequently cause the `qa` persona to permanently fail a task or the `auditor` to unnecessarily trigger the Resurrection Loop.
Currently, agents are instructed to retry transient failures, but they often lack the diagnostic capability to differentiate between a genuinely broken implementation and a flaky test script.

## Value Proposition & Concept
Implement an "Automated Flakiness Detector" step within the Foundry Orchestrator's verification pipeline.
- **Pre-flight Stress Test**: Before a PR is considered fully verified by the `auditor`, the orchestrator automatically runs the newly introduced or modified E2E tests multiple times (e.g., `--repeat-each=5`) in an isolated GitHub Actions matrix job.
- **Flakiness Report Card**: If a test fails inconsistently, the system generates a "Flakiness Report" node and injects it back into the DAG.
- **Targeted Refactoring**: The Orchestrator creates a high-priority `STORY` assigned to a `coder` specifically scoped to harden the flaky test (e.g., replacing generic timeouts with explicit `waitFor` conditions, resolving strict-mode locator violations).

## Strategic Alignment
This focuses on the **Foundry System** and directly improves the reliability and throughput of the autonomous software factory, addressing a known pain point (false-positive rejections due to E2E timeouts/flakiness) and strictly adhering to the 50/50 balance between product features and system improvements.

## Acceptance Criteria
- [ ] Product Manager: Draft a PRD detailing the integration of a `--repeat-each` stress test phase into the GitHub Actions CI workflow and the mechanism for the Orchestrator to ingest these results and spawn Flakiness Report nodes.
