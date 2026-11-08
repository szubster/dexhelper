## TacticalCheckbox Extraction & Refactoring

- **What**: Extracted repeated standard `<input type="checkbox">` elements and custom label markup into a centralized, reusable `TacticalCheckbox` component (`src/components/TacticalCheckbox.tsx`). Refactored `Gen3MapControlPanel.tsx` to use `TacticalCheckbox` for layers toggling and `TacticalButton` for feature selection controls. Added a showcase in `TacticalKitchenSink.tsx`.
- **Why**: Centralizes tactical input styling (sharp edges `rounded-none`, dashed borders, custom accent color, theme focus state) and accessibility (label association, disabled states) across map controls and future dashboard toggle components.
- **Key Learnings**:
  - `React.forwardRef` and extending `Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>` allows `TacticalCheckbox` to seamlessly accept standard props like `checked`, `onChange`, `disabled`, and `data-testid` without requiring custom wrappers for test selectors.
  - When wrapping `<input type="checkbox">` inside an optional `<label>` container, forwarding `containerClassName` and `labelClassName` gives consumers precise layout control while keeping the internal checkbox component simple and DRY.
