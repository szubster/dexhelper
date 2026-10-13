---
id: research-257-377-investigate-progression-timeline-failure
type: RESEARCH
title: Investigate Progression Timeline UI Failure
status: COMPLETED
owner_persona: researcher
created_at: '2026-08-01'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-036-257-concurrent-game-management
tags:
  - frontend
  - progression
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Progression Timeline UI Failure

## Context
The previous QA task `task-257-374-progression-timeline-ui-qa` failed due to duplicate `ProgressionTimeline` components and a lack of history integration. This research node aims to investigate the root cause of these issues and provide clear guidelines for the retry implementation.

## Requirements
- Investigate why there were duplicate `ProgressionTimeline` components.
- Investigate why the history integration was missing or failing.
- Provide a clear architectural solution to prevent these issues in the retry tasks.

## Findings
1. **Duplicate Components:** Two components exist with the exact same name: `src/components/timeline/ProgressionTimeline.tsx` and `src/components/dashboard/progression/ProgressionTimeline.tsx`. The one in `timeline/` actually renders a list of playthroughs rather than a timeline for a specific playthrough.
2. **Missing History Integration:** The implementation in `src/components/dashboard/progression/ProgressionTimeline.tsx` left a placeholder comment `{/* Placeholder timeline entries until SaveHistory is integrated */}` instead of implementing the logic to fetch progression events from `SaveHistoryDB`.

## Architectural Solution
1. **Deduplication:** Delete the redundant `src/components/timeline/ProgressionTimeline.tsx` and its tests, or rename it to `PlaythroughList` if the list functionality is still required elsewhere.
2. **History Integration:** In `src/components/dashboard/progression/ProgressionTimeline.tsx`, implement a `useEffect` hook that queries the `metadata` store from `SaveHistoryDB` to retrieve save history entries associated with the `activePlaythroughId`.
3. **Data Mapping:** Map the retrieved metadata entries (sorted by timestamp) into discrete timeline nodes, displaying key progression events (e.g., badges earned, playtime).

## Acceptance Criteria
- [x] Complete research on progression timeline failure
