# Mason Journal

## TacticalInput Extraction

- **What**: Extracted the repeating tactical `<input>` element pattern (including wrappers, label, corner crosshairs, and clear button) into a reusable `TacticalInput` component.
- **Why**: Found multiple repeating patterns for text inputs, particularly in `SearchAndFilters`, which makes the code messy. Extracting it to a generic tactical component standardizes the styling and logic.
- **Key Learnings**:
  - React.forwardRef is essential when wrapping inputs to allow refs to pass through normally.
  - The tactical input design has an absolute label, so placing `group` on the parent container ensures `group-focus-within` triggers styles appropriately when the inner input is focused.
