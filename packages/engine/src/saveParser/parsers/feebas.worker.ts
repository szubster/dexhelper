import { calculateFeebasTiles, mapSpotIdsToCoordinates } from '../../gen3/feebas';

self.onmessage = (event: MessageEvent<number>) => {
  const seed = event.data;

  if (typeof seed !== 'number') {
    self.postMessage({ error: 'Invalid seed provided.' });
    return;
  }

  try {
    const spotIds = calculateFeebasTiles(seed);
    const coordinates = mapSpotIdsToCoordinates(spotIds);
    self.postMessage({ coordinates });
  } catch (error) {
    self.postMessage({ error: error instanceof Error ? error.message : 'Unknown error occurred.' });
  }
};
