# Scribe Journal

- **Gen 1 Save Parsers (`parseGen1`)**: Gen 1 save structures lack definitive version headers. Yellow version shifts core memory offsets by +1 byte. The `detectVersionAndOffsets` function dynamically probes padding bits to calculate an `offsetShift`, which must be applied to all subsequent memory reads to avoid corruption.
- **Gen 2 Save Parsers (`parseGen2`)**: While more standardized than Gen 1, Gen 2 differentiates strongly between Gold/Silver and Crystal. Crystal introduces extra "caught data" (time of day, level, location) not present in G/S. The parser uses an `isCrystal` flag to determine if these extra bytes should be decoded.
