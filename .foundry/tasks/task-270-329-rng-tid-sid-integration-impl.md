---
id: task-270-329-rng-tid-sid-integration-impl
type: TASK
title: RNG TID and SID UI Integration Implementation
status: READY
owner_persona: coder
created_at: '2026-07-16'
updated_at: '2026-07-16'
depends_on:
  - story-130-269-extract-gen3-trainer-id-secret-id
jules_session_id: null
pr_number: null
parent: story-130-270-rng-tid-sid-integration
tags:
  - ui
  - feature
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# RNG TID and SID UI Integration Implementation

## Objective
Integrate the `RngTidSidDisplay` component into the `TelemetryMatrix` to show the Trainer ID and Secret ID.

## Context
The user wants to see their Secret ID alongside the Trainer ID for RNG manipulation purposes. We have already created an `RngTidSidDisplay` component and will be adding `secretId` to the `SaveData` interface in a separate task (`story-130-269-extract-gen3-trainer-id-secret-id`).

In the `TelemetryMatrix` component, we currently display the `trainerId`. We need to replace the `ID` `InlineDataPoint` or augment the `TelemetryMatrix` to incorporate the `RngTidSidDisplay` component (or display it alongside) when `secretId` is available.
Note: Since `TelemetryMatrix` is a dense header component, we might want to just update `TelemetryMatrix` to show `SID` as an `InlineDataPoint` right next to the `TID`, or replace the ID display with a modal/popover that contains the full `RngTidSidDisplay`, OR add `RngTidSidDisplay` to the `BattleFrontierDashboard` or another dashboard page instead of `TelemetryMatrix`. The story explicitly says: "Integrate the newly created TID/SID display component into the main Trainer dashboard or relevant save data summary views so users can readily access this information."

## Blueprint
1. Modify `src/routes/dashboard.tsx` to include the `RngTidSidDisplay` component at the top of the dashboard, above the specific dashboards (like Battle Frontier or Breeding).
2. Ensure the `saveData` has a `secretId` property (which will be added by `story-130-269-extract-gen3-trainer-id-secret-id`). For now, if `secretId` is undefined, perhaps don't show the component, or show `00000` or a placeholder. Wait, `secretId` might only be available in Gen 3 if we parsed it. Gen 2 has no secret ID? No, Gen 2 doesn't have a visible secret ID used for RNG in the same way, or maybe it does? Actually, Gen 3 requires SID for shiny hunting. Let's render it if `secretId` is present.
3. Update any relevant tests.

## Contracts
- **Coder**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Coder**: If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Coder**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] The `RngTidSidDisplay` component is rendered in `src/routes/dashboard.tsx` when `saveData.secretId` is available.
- [ ] Tests are updated if necessary.
