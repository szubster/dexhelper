import {
  BITS_PER_BYTE,
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

const readFlag = (dataView: DataView, baseOffset: number, flagId: number): boolean => {
  const byteOffset = Math.floor(flagId / BITS_PER_BYTE);
  const bitPosition = flagId % BITS_PER_BYTE;
  return (dataView.getUint8(baseOffset + byteOffset) & (1 << bitPosition)) !== 0;
};

export const extractEmeraldMoveTutors = (dataView: DataView, sectionOffset: number) => {
  try {
    const baseOffset = sectionOffset + EMERALD_EVENT_FLAGS_BASE_OFFSET;

    return {
      swagger: readFlag(dataView, baseOffset, EMERALD_MOVE_TUTOR_SWAGGER_FLAG),
      rollout: readFlag(dataView, baseOffset, EMERALD_MOVE_TUTOR_ROLLOUT_FLAG),
      furyCutter: readFlag(dataView, baseOffset, EMERALD_MOVE_TUTOR_FURY_CUTTER_FLAG),
      mimic: readFlag(dataView, baseOffset, EMERALD_MOVE_TUTOR_MIMIC_FLAG),
      metronome: readFlag(dataView, baseOffset, EMERALD_MOVE_TUTOR_METRONOME_FLAG),
      sleepTalk: readFlag(dataView, baseOffset, EMERALD_MOVE_TUTOR_SLEEP_TALK_FLAG),
      substitute: readFlag(dataView, baseOffset, EMERALD_MOVE_TUTOR_SUBSTITUTE_FLAG),
      dynamicPunch: readFlag(dataView, baseOffset, EMERALD_MOVE_TUTOR_DYNAMIC_PUNCH_FLAG),
      doubleEdge: readFlag(dataView, baseOffset, EMERALD_MOVE_TUTOR_DOUBLE_EDGE_FLAG),
      explosion: readFlag(dataView, baseOffset, EMERALD_MOVE_TUTOR_EXPLOSION_FLAG),
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
};

export const extractFRLGMoveTutors = (dataView: DataView, sectionOffset: number) => {
  try {
    const baseOffset = sectionOffset + FRLG_EVENT_FLAGS_BASE_OFFSET;

    return {
      doubleEdge: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_DOUBLE_EDGE_FLAG),
      thunderWave: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_THUNDER_WAVE_FLAG),
      rockSlide: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_ROCK_SLIDE_FLAG),
      explosion: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_EXPLOSION_FLAG),
      megaPunch: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_MEGA_PUNCH_FLAG),
      megaKick: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_MEGA_KICK_FLAG),
      dreamEater: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_DREAM_EATER_FLAG),
      softBoiled: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_SOFT_BOILED_FLAG),
      substitute: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_SUBSTITUTE_FLAG),
      swordsDance: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_SWORDS_DANCE_FLAG),
      seismicToss: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_SEISMIC_TOSS_FLAG),
      counter: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_COUNTER_FLAG),
      metronome: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_METRONOME_FLAG),
      mimic: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_MIMIC_FLAG),
      bodySlam: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_BODY_SLAM_FLAG),
      frenzyPlant: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_FRENZY_PLANT_FLAG),
      blastBurn: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_BLAST_BURN_FLAG),
      hydroCannon: readFlag(dataView, baseOffset, FRLG_MOVE_TUTOR_HYDRO_CANNON_FLAG),
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
};
