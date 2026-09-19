# Gen 3 Emulator Trailing Bytes

When investigating the failure of `task-279-304-gen3-ignore-emulator-trailing-bytes-impl`, it was found that the issue is a false premise.
There is no strict 128KB (`131072` bytes) file size equality check in the Gen 3 save parser (`src/engine/saveParser/index.ts` or `src/engine/saveParser/parsers/gen3.ts`).
The parser only enforces a minimum file size (`buffer.byteLength < 32768`) and safely reads from specific offsets, naturally ignoring any trailing bytes (such as the 44/48 RTC bytes appended by VBA-M).
Therefore, no implementation is needed. Future tasks or stories based on this premise should be cancelled.
