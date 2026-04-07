## 2026-04-07 - Inline Confirmation for Destructive Actions
**Learning:** Destructive actions inside easily dismissible modals are prone to accidental clicks. Adding an inline confirmation step prevents data loss without forcing the user out of their current context.
**Action:** Always implement a two-step inline confirmation (e.g., 'Delete' -> 'Cancel' / 'Confirm') for data-clearing actions within dialogs.
