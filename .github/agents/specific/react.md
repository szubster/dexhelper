## React & Frontend Guidelines
- Build functional components with modern React hooks.
- Adhere strictly to the "tactical hardware/snooping" aesthetic outlined in ADR 008:
  - Sharp edges only: use `rounded-none`. Do NOT use any rounded corners (e.g., `rounded`, `rounded-sm`, `rounded-md`, etc.).
  - Use dashed borders (`border-dashed`).
  - Use monospaced fonts (e.g., `font-mono`) and tabular numbers where appropriate.
- Ensure all newly created UI components are properly integrated into the application's view hierarchy.
- For component test cases, explicitly type `vi.fn()` mock callbacks to satisfy TypeScript constraints.
