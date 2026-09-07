# Task Breakdown Architectural Policy

## 1. Overview
This document serves as the architectural policy for how `STORY` nodes should be decomposed into `TASK` nodes by the `tech_lead`. It specifically addresses the "Two-Tasks-Max" anti-pattern and encourages a balanced, modular breakdown of work.

## 2. The "Two-Tasks-Max" Anti-Pattern
The `tech_lead` should carefully consider the complexity of a `STORY` before splitting it. While blindly splitting into exactly two tasks (e.g., one implementation task for the `coder` and one verification task for `qa`) can lead to monolithic PRs for complex features, it is important to remember that this is not a strict rule. For simpler stories, one or two tasks may be perfectly sufficient and avoiding unnecessary bloat is key.

## 3. Encouraging Modular Breakdown
When dealing with complex stories, decomposing them into multiple, discrete, modular execution steps is highly encouraged.
Examples of potential separations include, but are not limited to:
*   **Data/Engine Layer:** Save file parsing logic, data extraction, or backend API integrations.
*   **State/Context Layer:** React Context definitions, state management, or store configurations.
*   **Presentation/UI Layer:** UI components, layout, styling, and visual rendering.
*   **Quality Assurance:** Dedicated QA tasks where appropriate, especially for complex integrations or risk-heavy stories. Simple tasks may have the coder self-verify.

By separating concerns into distinct `TASK` nodes *when the complexity warrants it*, we ensure smaller, more reviewable PRs and better adherence to architectural boundaries. Modularity should be rewarded and encouraged, rather than strictly enforced.
