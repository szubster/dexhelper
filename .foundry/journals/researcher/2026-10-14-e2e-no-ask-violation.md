# Investigation of E2E Secret Base Parsing Failure

Investigated the failure of `task-407-668-e2e-base-location-parsing` and its sibling tasks. The permanent failure was caused by an Autonomous No-Ask Policy Violation (entering `AWAITING_USER_FEEDBACK`). The agent asked a conversational question instead of working autonomously, causing the autonomous Orchestrator session to hang.

To prevent this, agents must strictly follow the No-Ask policy, autonomously finalize their work using the `submit` tool, and use Late Binding if context or information is missing rather than asking the user for hints.
