---
id: adr-586-584-failure-tracking-architecture
type: ADR
title: Technical Architecture for Failure Tracking
status: COMPLETED
owner_persona: architect
created_at: '2026-10-08'
updated_at: '2026-10-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-535-586-false-permanent-failure-detection
tags: []
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
priority: 80
---

# Technical Architecture for Failure Tracking

## Context

Currently, the Orchestrator tracks node rejections using a single `rejection_count` field. When this threshold (`MAX_REJECTION_THRESHOLD = 3`) is reached, the task is automatically cancelled and marked as permanently failed. The issue is that this single count conflates two very different types of failures:
1. **Domain/QA Rejections**: Human or automated Auditor/QA rejections where the generated artifacts do not meet the acceptance criteria or domain requirements.
2. **System/Infrastructure Crashes**: Failures caused by underlying infrastructure issues, agent session timeouts, or unexpected API errors (e.g., `NOT_FOUND`, `INTERNAL_ERROR`), which do not reflect on the quality of the task itself.

Because these are currently grouped, transient system crashes can artificially exhaust a task's rejection limit, causing it to be falsely marked as a permanent domain failure.

## Decision

We will explicitly separate the tracking of infrastructure failures from domain rejections in our YAML metadata and Orchestrator logic.

1.  **New Metadata Field**: Introduce a new `system_failure_count` (integer, default 0) to the YAML frontmatter schema for all nodes. This field will track purely infrastructural/system crashes.
2.  **Explicit Thresholding**: The existing `rejection_count` field will strictly track domain/QA rejections. The maximum threshold for `rejection_count` remains 3. We will introduce a new, separate maximum threshold for `system_failure_count` (e.g., `MAX_SYSTEM_FAILURE_THRESHOLD = 5`) to allow tasks more leeway for transient infrastructure instability before permanent cancellation.
3.  **Orchestrator Phase 3.0 Processing**: The Orchestrator's rejection processing logic will be updated to:
    *   Parse the termination state or error log of a failed session.
    *   If the failure indicates an infrastructure issue (e.g., `NOT_FOUND`, network timeout, agent crash), increment `system_failure_count`.
    *   If the failure indicates a domain rejection (e.g., explicitly marked by QA/Auditor), increment `rejection_count`.
4.  **Distinct Cancellation States**: When a node is permanently cancelled due to exceeding either threshold, the Orchestrator will record an explicit `rejection_reason` indicating whether it was due to `Max domain rejection count reached` or `Max system failure count reached`, aiding parent nodes and researchers in root-cause analysis.
5.  **Telemetry Updates**: Telemetry tools and dashboards will be updated to display both counters separately, allowing operators to monitor the true health of the domain logic versus the stability of the underlying infrastructure.

## Consequences

*   **Positive**: Significant reduction in false-positive task cancellations. Clearer visibility into system stability versus domain task difficulty. Better context for parent nodes managing failed child tasks.
*   **Negative**: Slight increase in schema complexity and Orchestrator parsing logic. Existing reporting tools will need updates to query the new field.
*   **Schema Update Required**: The `.foundry/docs/schema.md` must be updated to include the new `system_failure_count` field.

## Compliance

This decision MUST be reflected by updating the system's central schema document (`.foundry/docs/schema.md`).
