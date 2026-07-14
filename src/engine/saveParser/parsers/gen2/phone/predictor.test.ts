import { describe, expect, it } from 'vitest';
import { checkPhoneCall, chooseRandomCaller, enrichContact, filterHighValueCalls } from './predictor';

describe('Gen 2 Pokegear Predictor Engine Logic', () => {
  describe('checkPhoneCall', () => {
    it('should return false if there is a delay remaining', () => {
      const timerState = { delayMinsRemaining: 10, timeCyclesSinceLastCall: 0 };
      expect(checkPhoneCall(timerState, 0)).toBe(false);
      expect(checkPhoneCall(timerState, 127)).toBe(false);
      expect(checkPhoneCall(timerState, 255)).toBe(false);
    });

    it('should evaluate 50% probability properly when no delay remains', () => {
      const timerState = { delayMinsRemaining: 0, timeCyclesSinceLastCall: 5 };

      // masked < 64 returns true, masked >= 64 returns false.

      // random byte: 0 -> masked: 0 (true)
      expect(checkPhoneCall(timerState, 0)).toBe(true);
      // random byte: 63 -> masked: 63 (true)
      expect(checkPhoneCall(timerState, 63)).toBe(true);

      // random byte: 64 -> masked: 64 (false)
      expect(checkPhoneCall(timerState, 64)).toBe(false);
      // random byte: 127 -> masked: 127 (false)
      expect(checkPhoneCall(timerState, 127)).toBe(false);

      // Above 127, the mask strips the highest bit:
      // random byte: 128 (10000000) -> masked: 0 (true)
      expect(checkPhoneCall(timerState, 128)).toBe(true);
      // random byte: 191 (10111111) -> masked: 63 (true)
      expect(checkPhoneCall(timerState, 191)).toBe(true);
      // random byte: 192 (11000000) -> masked: 64 (false)
      expect(checkPhoneCall(timerState, 192)).toBe(false);
      // random byte: 255 (11111111) -> masked: 127 (false)
      expect(checkPhoneCall(timerState, 255)).toBe(false);
    });
  });

  describe('chooseRandomCaller', () => {
    it('should return null if there are no available callers', () => {
      expect(chooseRandomCaller([], 123)).toBeNull();
    });

    it('should uniformly sample a caller based on SimpleDivide (modulo)', () => {
      const callers = [
        { id: 1, name: 'Mom' },
        { id: 2, name: 'Prof. Elm' },
        { id: 3, name: 'Youngster Joey' },
      ];

      // random byte % 3
      // 0 % 3 = 0 -> Mom
      expect(chooseRandomCaller(callers, 0)).toEqual(callers[0]);
      // 1 % 3 = 1 -> Prof. Elm
      expect(chooseRandomCaller(callers, 1)).toEqual(callers[1]);
      // 2 % 3 = 2 -> Youngster Joey
      expect(chooseRandomCaller(callers, 2)).toEqual(callers[2]);

      // 3 % 3 = 0 -> Mom
      expect(chooseRandomCaller(callers, 3)).toEqual(callers[0]);

      // 255 % 3 = 0 -> Mom
      expect(chooseRandomCaller(callers, 255)).toEqual(callers[0]);
    });
  });

  describe('enrichContact and filterHighValueCalls', () => {
    it('should correctly identify Dunsparce swarm for Hiker Anthony', () => {
      const anthony = { id: 19, name: 'Hiker Anthony' };
      const enriched = enrichContact(anthony, 1 << 2, 0); // SWARM_FLAG_DUNSPARCE_BIT is 2
      expect(enriched.isSwarm).toBe(true);
      expect(enriched.isHighValue).toBe(true);
    });

    it('should correctly identify rare item for Wade', () => {
      const wade = { id: 16, name: 'Bug Catcher Wade' };
      const enriched = enrichContact(wade, 0, 1 << 2); // ITEM_FLAG_WADE_BIT is 2
      expect(enriched.hasRareItem).toBe(true);
      expect(enriched.isHighValue).toBe(true);
    });

    it('should filter out non-high-value calls', () => {
      const contacts = [
        { id: 16, name: 'Bug Catcher Wade' },
        { id: 1, name: 'Mom' },
        { id: 23, name: 'Bug Catcher Arnie' },
      ];

      const swarmFlags = 1 << 3; // SWARM_FLAG_YANMA_BIT
      const dailyItemFlags = 0; // No rare items

      const highValue = filterHighValueCalls(contacts, swarmFlags, dailyItemFlags);
      expect(highValue.length).toBe(1);
      expect(highValue[0]?.id).toBe(23); // Only Arnie (Yanma swarm)
    });
  });
});

describe('more enrichContact and filterHighValueCalls tests', () => {
    it('should correctly identify rare item for all rare item contacts', () => {
      const contacts = [
        { id: 6, name: 'Beverly' },
        { id: 13, name: 'Jose' },
        { id: 16, name: 'Wade' },
        { id: 21, name: 'Gina' },
        { id: 24, name: 'Alan' },
        { id: 18, name: 'Liz' },
        { id: 28, name: 'Derek' },
        { id: 29, name: 'Tully' },
        { id: 31, name: 'Tiffany' },
        { id: 33, name: 'Wilton' },
      ];
      const enrichedBeverly = enrichContact(contacts[0], 0, 1 << 0);
      expect(enrichedBeverly.hasRareItem).toBe(true);

      const enrichedJose = enrichContact(contacts[1], 0, 1 << 1);
      expect(enrichedJose.hasRareItem).toBe(true);

      const enrichedWade = enrichContact(contacts[2], 0, 1 << 2);
      expect(enrichedWade.hasRareItem).toBe(true);

      const enrichedGina = enrichContact(contacts[3], 0, 1 << 3);
      expect(enrichedGina.hasRareItem).toBe(true);

      const enrichedAlan = enrichContact(contacts[4], 0, 1 << 4);
      expect(enrichedAlan.hasRareItem).toBe(true);

      const enrichedLiz = enrichContact(contacts[5], 0, 1 << 5);
      expect(enrichedLiz.hasRareItem).toBe(true);

      const enrichedDerek = enrichContact(contacts[6], 0, 1 << 6);
      expect(enrichedDerek.hasRareItem).toBe(true);

      const enrichedTully = enrichContact(contacts[7], 0, 1 << 7);
      expect(enrichedTully.hasRareItem).toBe(true);

      const enrichedTiffany = enrichContact(contacts[8], 0, 1 << 8);
      expect(enrichedTiffany.hasRareItem).toBe(true);

      const enrichedWilton = enrichContact(contacts[9], 0, 1 << 9);
      expect(enrichedWilton.hasRareItem).toBe(true);
    });
});
