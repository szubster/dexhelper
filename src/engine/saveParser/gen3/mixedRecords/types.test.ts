import { describe, expect, it } from 'vitest';
import { Gen3MixedRecordTrainerSchema } from './types';

describe('Gen3 Mixed Record Types', () => {
  it('should validate a correctly structured trainer record', () => {
    const validTrainer = {
      secretBaseId: 15,
      trainerName: 'ASH',
      trainerId: 12345,
      gender: 'M',
      battledOwnerToday: false,
      language: 2,
      party: [
        {
          personality: 42424242,
          species: 25,
          heldItem: 12,
          moves: [1, 2, 3, 4],
          level: 50,
          evs: 255,
        },
      ],
    };

    const result = Gen3MixedRecordTrainerSchema.safeParse(validTrainer);
    expect(result.success).toBe(true);
  });

  it('should invalidate a trainer record with missing required fields', () => {
    const invalidTrainer = {
      secretBaseId: 15,
      trainerName: 'ASH',
      // missing trainerId
      gender: 'M',
      battledOwnerToday: false,
      party: [],
    };

    const result = Gen3MixedRecordTrainerSchema.safeParse(invalidTrainer);
    expect(result.success).toBe(false);
  });

  it('should invalidate a pokemon with out of bounds EV', () => {
    const validTrainer = {
      secretBaseId: 15,
      trainerName: 'ASH',
      trainerId: 12345,
      gender: 'M',
      battledOwnerToday: false,
      party: [
        {
          personality: 42424242,
          species: 25,
          heldItem: 12,
          moves: [1, 2, 3, 4],
          level: 50,
          evs: 256, // invalid, max 255
        },
      ],
    };

    const result = Gen3MixedRecordTrainerSchema.safeParse(validTrainer);
    expect(result.success).toBe(false);
  });
});
