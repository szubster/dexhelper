# False Permanent Failure in task-638-717-extract-constants-to-core-v6

## Context
When investigating the permanent failure (`Max rejection count reached`) of `task-638-717-extract-constants-to-core-v6`.

## Learnings
The git history showed its prior rejection reasons were `Session terminated with state: COMPLETED`. This means the task was a false permanent failure due to repeated system-level agent session crashes (likely submitting empty PRs without checking off completion boxes), rather than a flaw in the actual namespaced exports strategy.

Because the orchestrator's logic increments the `rejection_count` for these system-level crashes just like it does for standard task rejections, the node eventually hit the `MAX_REJECTION_THRESHOLD` (3) and was auto-cancelled. The namespaced exports deduplication strategy should still be implemented in the replacement node (V7).
