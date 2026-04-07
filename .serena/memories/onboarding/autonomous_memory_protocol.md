# Autonomous Memory Protocol

To ensure that the `.serena/memories` are always up to date and serve as an autonomous result of our interactions, the assistant (Antigravity) follows these rules:

1.  **Task-End Reflection**: At the conclusion of every task, the assistant evaluates if new knowledge has been uncovered that warrants a memory update.
2.  **Onboarding Synchronization**: Any changes to project architecture, styling conventions, or testing standards must be immediately reflected in the `onboarding/` memories.
3.  **Topic Hierarchy**: Memories are organized by topic (e.g., `features/`, `bugs/`, `onboarding/`) to ensure easy retrieval.
4.  **No Stale Data**: Obsolete memories are updated or deleted as the codebase evolves, preventing "knowledge rot."
5.  **Autonomous Creation**: The assistant proactively creates memories for complex subsystems or significant debugging journeys without requiring explicit user prompting.
