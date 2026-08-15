import { describe, expect, it } from 'vitest';
import {
  EMERALD_EVENT_FLAGS_BASE_OFFSET,
  EMERALD_MOVE_TUTOR_DOUBLE_EDGE_FLAG,
  EMERALD_MOVE_TUTOR_DYNAMIC_PUNCH_FLAG,
  EMERALD_MOVE_TUTOR_EXPLOSION_FLAG,
  EMERALD_MOVE_TUTOR_FURY_CUTTER_FLAG,
  EMERALD_MOVE_TUTOR_METRONOME_FLAG,
  EMERALD_MOVE_TUTOR_MIMIC_FLAG,
  EMERALD_MOVE_TUTOR_ROLLOUT_FLAG,
  EMERALD_MOVE_TUTOR_SLEEP_TALK_FLAG,
  EMERALD_MOVE_TUTOR_SUBSTITUTE_FLAG,
  EMERALD_MOVE_TUTOR_SWAGGER_FLAG,
  FRLG_EVENT_FLAGS_BASE_OFFSET,
  FRLG_MOVE_TUTOR_BLAST_BURN_FLAG,
  FRLG_MOVE_TUTOR_BODY_SLAM_FLAG,
  FRLG_MOVE_TUTOR_COUNTER_FLAG,
  FRLG_MOVE_TUTOR_DOUBLE_EDGE_FLAG,
  FRLG_MOVE_TUTOR_DREAM_EATER_FLAG,
  FRLG_MOVE_TUTOR_EXPLOSION_FLAG,
  FRLG_MOVE_TUTOR_FRENZY_PLANT_FLAG,
  FRLG_MOVE_TUTOR_HYDRO_CANNON_FLAG,
  FRLG_MOVE_TUTOR_MEGA_KICK_FLAG,
  FRLG_MOVE_TUTOR_MEGA_PUNCH_FLAG,
  FRLG_MOVE_TUTOR_METRONOME_FLAG,
  FRLG_MOVE_TUTOR_MIMIC_FLAG,
  FRLG_MOVE_TUTOR_ROCK_SLIDE_FLAG,
  FRLG_MOVE_TUTOR_SEISMIC_TOSS_FLAG,
  FRLG_MOVE_TUTOR_SOFT_BOILED_FLAG,
  FRLG_MOVE_TUTOR_SUBSTITUTE_FLAG,
  FRLG_MOVE_TUTOR_SWORDS_DANCE_FLAG,
  FRLG_MOVE_TUTOR_THUNDER_WAVE_FLAG,
} from './constants';

describe('Gen 3 Move Tutor Constants', () => {
  it('should define correct base offsets for Event Flags', () => {
    expect(EMERALD_EVENT_FLAGS_BASE_OFFSET).toBe(0x1270);
    expect(FRLG_EVENT_FLAGS_BASE_OFFSET).toBe(0x0ee0);
  });

  it('should match Emerald Move Tutor flag offsets correctly', () => {
    // Tests mapping according to the knowledge base:
    // Swagger | 0x1B1 | 433 | +0x36 | 1
    expect(EMERALD_MOVE_TUTOR_SWAGGER_FLAG).toBe(433);
    expect(Math.floor(EMERALD_MOVE_TUTOR_SWAGGER_FLAG / 8)).toBe(0x36);
    expect(EMERALD_MOVE_TUTOR_SWAGGER_FLAG % 8).toBe(1);

    // Rollout | 0x1B2 | 434 | +0x36 | 2
    expect(EMERALD_MOVE_TUTOR_ROLLOUT_FLAG).toBe(434);
    expect(Math.floor(EMERALD_MOVE_TUTOR_ROLLOUT_FLAG / 8)).toBe(0x36);
    expect(EMERALD_MOVE_TUTOR_ROLLOUT_FLAG % 8).toBe(2);

    // Fury Cutter | 0x1B3 | 435 | +0x36 | 3
    expect(EMERALD_MOVE_TUTOR_FURY_CUTTER_FLAG).toBe(435);
    expect(Math.floor(EMERALD_MOVE_TUTOR_FURY_CUTTER_FLAG / 8)).toBe(0x36);
    expect(EMERALD_MOVE_TUTOR_FURY_CUTTER_FLAG % 8).toBe(3);

    // Mimic | 0x1B4 | 436 | +0x36 | 4
    expect(EMERALD_MOVE_TUTOR_MIMIC_FLAG).toBe(436);
    expect(Math.floor(EMERALD_MOVE_TUTOR_MIMIC_FLAG / 8)).toBe(0x36);
    expect(EMERALD_MOVE_TUTOR_MIMIC_FLAG % 8).toBe(4);

    // Metronome | 0x1B5 | 437 | +0x36 | 5
    expect(EMERALD_MOVE_TUTOR_METRONOME_FLAG).toBe(437);
    expect(Math.floor(EMERALD_MOVE_TUTOR_METRONOME_FLAG / 8)).toBe(0x36);
    expect(EMERALD_MOVE_TUTOR_METRONOME_FLAG % 8).toBe(5);

    // Sleep Talk | 0x1B6 | 438 | +0x36 | 6
    expect(EMERALD_MOVE_TUTOR_SLEEP_TALK_FLAG).toBe(438);
    expect(Math.floor(EMERALD_MOVE_TUTOR_SLEEP_TALK_FLAG / 8)).toBe(0x36);
    expect(EMERALD_MOVE_TUTOR_SLEEP_TALK_FLAG % 8).toBe(6);

    // Substitute | 0x1B7 | 439 | +0x36 | 7
    expect(EMERALD_MOVE_TUTOR_SUBSTITUTE_FLAG).toBe(439);
    expect(Math.floor(EMERALD_MOVE_TUTOR_SUBSTITUTE_FLAG / 8)).toBe(0x36);
    expect(EMERALD_MOVE_TUTOR_SUBSTITUTE_FLAG % 8).toBe(7);

    // DynamicPunch | 0x1B8 | 440 | +0x37 | 0
    expect(EMERALD_MOVE_TUTOR_DYNAMIC_PUNCH_FLAG).toBe(440);
    expect(Math.floor(EMERALD_MOVE_TUTOR_DYNAMIC_PUNCH_FLAG / 8)).toBe(0x37);
    expect(EMERALD_MOVE_TUTOR_DYNAMIC_PUNCH_FLAG % 8).toBe(0);

    // Double-Edge | 0x1B9 | 441 | +0x37 | 1
    expect(EMERALD_MOVE_TUTOR_DOUBLE_EDGE_FLAG).toBe(441);
    expect(Math.floor(EMERALD_MOVE_TUTOR_DOUBLE_EDGE_FLAG / 8)).toBe(0x37);
    expect(EMERALD_MOVE_TUTOR_DOUBLE_EDGE_FLAG % 8).toBe(1);

    // Explosion | 0x1BA | 442 | +0x37 | 2
    expect(EMERALD_MOVE_TUTOR_EXPLOSION_FLAG).toBe(442);
    expect(Math.floor(EMERALD_MOVE_TUTOR_EXPLOSION_FLAG / 8)).toBe(0x37);
    expect(EMERALD_MOVE_TUTOR_EXPLOSION_FLAG % 8).toBe(2);
  });

  it('should match FireRed/LeafGreen Move Tutor flag offsets correctly', () => {
    // Tests mapping according to the knowledge base:
    // Double-Edge | 0x2C0 | 704 | +0x58 | 0
    expect(FRLG_MOVE_TUTOR_DOUBLE_EDGE_FLAG).toBe(704);
    expect(Math.floor(FRLG_MOVE_TUTOR_DOUBLE_EDGE_FLAG / 8)).toBe(0x58);
    expect(FRLG_MOVE_TUTOR_DOUBLE_EDGE_FLAG % 8).toBe(0);

    // Thunder Wave | 0x2C1 | 705 | +0x58 | 1
    expect(FRLG_MOVE_TUTOR_THUNDER_WAVE_FLAG).toBe(705);
    expect(Math.floor(FRLG_MOVE_TUTOR_THUNDER_WAVE_FLAG / 8)).toBe(0x58);
    expect(FRLG_MOVE_TUTOR_THUNDER_WAVE_FLAG % 8).toBe(1);

    // Rock Slide | 0x2C2 | 706 | +0x58 | 2
    expect(FRLG_MOVE_TUTOR_ROCK_SLIDE_FLAG).toBe(706);
    expect(Math.floor(FRLG_MOVE_TUTOR_ROCK_SLIDE_FLAG / 8)).toBe(0x58);
    expect(FRLG_MOVE_TUTOR_ROCK_SLIDE_FLAG % 8).toBe(2);

    // Explosion | 0x2C3 | 707 | +0x58 | 3
    expect(FRLG_MOVE_TUTOR_EXPLOSION_FLAG).toBe(707);
    expect(Math.floor(FRLG_MOVE_TUTOR_EXPLOSION_FLAG / 8)).toBe(0x58);
    expect(FRLG_MOVE_TUTOR_EXPLOSION_FLAG % 8).toBe(3);

    // Mega Punch | 0x2C4 | 708 | +0x58 | 4
    expect(FRLG_MOVE_TUTOR_MEGA_PUNCH_FLAG).toBe(708);
    expect(Math.floor(FRLG_MOVE_TUTOR_MEGA_PUNCH_FLAG / 8)).toBe(0x58);
    expect(FRLG_MOVE_TUTOR_MEGA_PUNCH_FLAG % 8).toBe(4);

    // Mega Kick | 0x2C5 | 709 | +0x58 | 5
    expect(FRLG_MOVE_TUTOR_MEGA_KICK_FLAG).toBe(709);
    expect(Math.floor(FRLG_MOVE_TUTOR_MEGA_KICK_FLAG / 8)).toBe(0x58);
    expect(FRLG_MOVE_TUTOR_MEGA_KICK_FLAG % 8).toBe(5);

    // Dream Eater | 0x2C6 | 710 | +0x58 | 6
    expect(FRLG_MOVE_TUTOR_DREAM_EATER_FLAG).toBe(710);
    expect(Math.floor(FRLG_MOVE_TUTOR_DREAM_EATER_FLAG / 8)).toBe(0x58);
    expect(FRLG_MOVE_TUTOR_DREAM_EATER_FLAG % 8).toBe(6);

    // Soft-Boiled | 0x2C7 | 711 | +0x58 | 7
    expect(FRLG_MOVE_TUTOR_SOFT_BOILED_FLAG).toBe(711);
    expect(Math.floor(FRLG_MOVE_TUTOR_SOFT_BOILED_FLAG / 8)).toBe(0x58);
    expect(FRLG_MOVE_TUTOR_SOFT_BOILED_FLAG % 8).toBe(7);

    // Substitute | 0x2C8 | 712 | +0x59 | 0
    expect(FRLG_MOVE_TUTOR_SUBSTITUTE_FLAG).toBe(712);
    expect(Math.floor(FRLG_MOVE_TUTOR_SUBSTITUTE_FLAG / 8)).toBe(0x59);
    expect(FRLG_MOVE_TUTOR_SUBSTITUTE_FLAG % 8).toBe(0);

    // Swords Dance | 0x2C9 | 713 | +0x59 | 1
    expect(FRLG_MOVE_TUTOR_SWORDS_DANCE_FLAG).toBe(713);
    expect(Math.floor(FRLG_MOVE_TUTOR_SWORDS_DANCE_FLAG / 8)).toBe(0x59);
    expect(FRLG_MOVE_TUTOR_SWORDS_DANCE_FLAG % 8).toBe(1);

    // Seismic Toss | 0x2CA | 714 | +0x59 | 2
    expect(FRLG_MOVE_TUTOR_SEISMIC_TOSS_FLAG).toBe(714);
    expect(Math.floor(FRLG_MOVE_TUTOR_SEISMIC_TOSS_FLAG / 8)).toBe(0x59);
    expect(FRLG_MOVE_TUTOR_SEISMIC_TOSS_FLAG % 8).toBe(2);

    // Counter | 0x2CB | 715 | +0x59 | 3
    expect(FRLG_MOVE_TUTOR_COUNTER_FLAG).toBe(715);
    expect(Math.floor(FRLG_MOVE_TUTOR_COUNTER_FLAG / 8)).toBe(0x59);
    expect(FRLG_MOVE_TUTOR_COUNTER_FLAG % 8).toBe(3);

    // Metronome | 0x2CC | 716 | +0x59 | 4
    expect(FRLG_MOVE_TUTOR_METRONOME_FLAG).toBe(716);
    expect(Math.floor(FRLG_MOVE_TUTOR_METRONOME_FLAG / 8)).toBe(0x59);
    expect(FRLG_MOVE_TUTOR_METRONOME_FLAG % 8).toBe(4);

    // Mimic | 0x2CD | 717 | +0x59 | 5
    expect(FRLG_MOVE_TUTOR_MIMIC_FLAG).toBe(717);
    expect(Math.floor(FRLG_MOVE_TUTOR_MIMIC_FLAG / 8)).toBe(0x59);
    expect(FRLG_MOVE_TUTOR_MIMIC_FLAG % 8).toBe(5);

    // Body Slam | 0x2CE | 718 | +0x59 | 6
    expect(FRLG_MOVE_TUTOR_BODY_SLAM_FLAG).toBe(718);
    expect(Math.floor(FRLG_MOVE_TUTOR_BODY_SLAM_FLAG / 8)).toBe(0x59);
    expect(FRLG_MOVE_TUTOR_BODY_SLAM_FLAG % 8).toBe(6);

    // Frenzy Plant | 0x2DE | 734 | +0x5B | 6
    expect(FRLG_MOVE_TUTOR_FRENZY_PLANT_FLAG).toBe(734);
    expect(Math.floor(FRLG_MOVE_TUTOR_FRENZY_PLANT_FLAG / 8)).toBe(0x5b);
    expect(FRLG_MOVE_TUTOR_FRENZY_PLANT_FLAG % 8).toBe(6);

    // Blast Burn | 0x2DF | 735 | +0x5B | 7
    expect(FRLG_MOVE_TUTOR_BLAST_BURN_FLAG).toBe(735);
    expect(Math.floor(FRLG_MOVE_TUTOR_BLAST_BURN_FLAG / 8)).toBe(0x5b);
    expect(FRLG_MOVE_TUTOR_BLAST_BURN_FLAG % 8).toBe(7);

    // Hydro Cannon | 0x2E0 | 736 | +0x5C | 0
    expect(FRLG_MOVE_TUTOR_HYDRO_CANNON_FLAG).toBe(736);
    expect(Math.floor(FRLG_MOVE_TUTOR_HYDRO_CANNON_FLAG / 8)).toBe(0x5c);
    expect(FRLG_MOVE_TUTOR_HYDRO_CANNON_FLAG % 8).toBe(0);
  });
});
