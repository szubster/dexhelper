# QA Journal

## Dealing with Cancelled/Replaced Tasks Reawakening
When a cancelled or replaced task node is reawakened (e.g., because its previous implementation dependency finished, triggering the Empty PR flow), the agent must still check off the acceptance criteria to allow the node to gracefully exit the DAG, satisfying ADR 007's completeness requirements. Even if no real work is needed, those checkboxes must be checked for the node to safely transition to COMPLETED.
