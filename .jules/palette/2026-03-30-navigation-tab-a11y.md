# Palette Journal Entry - NavigationTab Decorative Brackets A11y

## Date
2026-03-30

## Micro-UX / Accessibility Improvement
Wrapped the decorative telemetry brackets (`[` and `]`) in `<NavigationTab />` with `<span aria-hidden="true">`.

## Key Learnings
- **Screen Reader Noise Reduction**: Interactive elements such as header navigation links (`<NavigationTab>`) that visually style their text label with tactical ASCII brackets `[` and `]` must wrap these brackets in `<span aria-hidden="true">`.
- Without `aria-hidden="true"`, screen readers announce "left bracket SYS.DEX right bracket link", creating repetitive acoustic bloat when navigating through primary application tabs using screen readers.
- Hiding decorative characters screen-reader side preserves the tactical hardware visual aesthetic without degrading accessibility.
