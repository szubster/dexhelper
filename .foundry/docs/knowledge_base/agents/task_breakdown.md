# Task Breakdown Architectural Policy

## 1. Overview
This document serves as the architectural policy for how `STORY` nodes should be decomposed into `TASK` nodes by the `tech_lead`. It specifically addresses the "Two-Tasks-Max" anti-pattern and enforces a modular breakdown of work.

## 2. The "Two-Tasks-Max" Anti-Pattern
The `tech_lead` MUST NOT simply split a `STORY` into exactly two tasks (e.g., one implementation task for the `coder` and one verification task for `qa`). This leads to monolithic PRs, high cognitive load, and brittle code.

## 3. Mandatory Modular Breakdown
A `STORY` must be decomposed into multiple, discrete, modular execution steps.
Examples of required separations include, but are not limited to:
*   **Data/Engine Layer:** Save file parsing logic, data extraction, or backend API integrations.
*   **State/Context Layer:** React Context definitions, state management, or store configurations.
*   **Presentation/UI Layer:** UI components, layout, styling, and visual rendering.
*   **Quality Assurance:** Dedicated QA tasks where appropriate, especially for complex integrations or risk-heavy stories. Simple tasks may have the coder self-verify, but this must be a conscious decision, not the default.

By separating these concerns into distinct `TASK` nodes, we ensure smaller, more reviewable PRs and better adherence to architectural boundaries.
