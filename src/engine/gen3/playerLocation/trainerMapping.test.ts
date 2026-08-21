import { describe, expect, it } from 'vitest';
import { getNearestUpcomingTrainer } from './trainerMapping';

describe('getNearestUpcomingTrainer', () => {
  it('maps Rustboro Gym to Roxanne', () => {
    const trainer = getNearestUpcomingTrainer(2819); // Rustboro Gym
    expect(trainer).toEqual({ name: 'Roxanne', type: 'Rock', levelCap: 15 });
  });

  it('maps Route 102 to Roxanne', () => {
    const trainer = getNearestUpcomingTrainer(17); // Route 102
    expect(trainer).toEqual({ name: 'Roxanne', type: 'Rock', levelCap: 15 });
  });

  it('maps Petalburg Gym to Norman', () => {
    const trainer = getNearestUpcomingTrainer(2049); // Petalburg Gym
    expect(trainer).toEqual({ name: 'Norman', type: 'Normal', levelCap: 31 });
  });

  it('maps Route 119 to Winona', () => {
    const trainer = getNearestUpcomingTrainer(34); // Route 119
    expect(trainer).toEqual({ name: 'Winona', type: 'Flying', levelCap: 33 });
  });

  it('returns null for unknown map', () => {
    const trainer = getNearestUpcomingTrainer(99999);
    expect(trainer).toBeNull();
  });
});
