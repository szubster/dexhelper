# Task Breakdown Architectural Policy

## 1. Overview
This document serves as the architectural policy for how `STORY` nodes should be decomposed into `TASK` nodes by the `tech_lead`. It specifically addresses the "Two-Tasks-Max" anti-pattern and encourages a balanced, modular breakdown of work.

## 2. Splitting Frontend and Backend Work
When breaking down a story that spans multiple architectural layers (e.g., both data parsing and UI rendering), the work MUST be split into separate tasks.
- **Backend / Data Layer:** Tasks should focus exclusively on data extraction, save file parsing, schema definitions, or API interactions.
- **Frontend / UI Layer:** Tasks should focus exclusively on React components, styling, and view logic.

This separation ensures that complex implementations do not become monolithic PRs, allowing for targeted code reviews and adherence to the single responsibility principle.

## 3. Addressing the "Two-Tasks-Max" Anti-Pattern
The "Two-Tasks-Max" anti-pattern occurs when a Tech Lead blindly decomposes a STORY into exactly two tasks (e.g., one monolithic Coder task and one QA task), regardless of the story's actual complexity.

### Policy Directive:
Generative personas (specifically the Tech Lead) MUST actively decompose broad concepts into multiple, smaller, highly-focused downstream nodes rather than single monolithic nodes or 1-to-1 mappings.
- Do NOT group type definitions, core logic implementation, and unit testing into a single monolithic task if the story is complex.
- Decompose complex implementations into distinct, modular TASK nodes.
- Utilize Late Binding to dynamically spawn and chain subsequent downstream nodes in future sessions as requirements crystallize.

By actively avoiding the "Two-Tasks-Max" anti-pattern, we ensure predictable execution, smaller pull requests, and maximum pipeline throughput.
