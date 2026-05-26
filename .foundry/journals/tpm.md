# TPM Journal

- **2026-05-23 / 25**: System failures repeatedly detected.
  - Reason: Session terminated with state: COMPLETED or FAILED, yet no PR was found. Transitioned back to READY without penalty.
  - Reason: Session timed out (>24h). Transitioned back to READY without penalty.
  - Lesson: The system is consistently detecting "zombie" sessions and safely transitioning them back to READY without penalty. This indicates that the heartbeat script is successfully applying the empty PR logic to gracefully handle silent completions and timeouts.
