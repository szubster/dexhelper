import { reportResult, runBenchmark } from './harness.ts';

const mockSaveData = {
  player: {
    id: 12345,
    name: 'Ash',
    money: 9999,
  },
  party: [
    { species: 'Pikachu', level: 50, hp: 100 },
    { species: 'Charizard', level: 50, hp: 150 },
  ],
  inventory: {
    items: [
      { id: 1, count: 99 },
      { id: 2, count: 50 },
    ],
  },
};

const jsonString = JSON.stringify(mockSaveData);

const serializationResult = runBenchmark(
  'Serialization (JSON.stringify)',
  () => {
    JSON.stringify(mockSaveData);
  },
  100000,
);

const deserializationResult = runBenchmark(
  'Deserialization (JSON.parse)',
  () => {
    JSON.parse(jsonString);
  },
  100000,
);

reportResult(serializationResult);
reportResult(deserializationResult);
