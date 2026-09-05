import { describe, expect, it } from 'vitest';
import { getUnobtainableReason } from '../gen1Exclusives';

describe('gen1Exclusives', () => {
  describe('getUnobtainableReason', () => {
    describe('Yellow Raichu', () => {
      it('should lock Raichu (26) in Yellow if Pikachu (25) was not evolved', () => {
        const ownedSet = new Set([25]); // Own Pikachu
        const reason = getUnobtainableReason(26, 'yellow', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('Thunder Stone');
      });

      it('should not lock Raichu in Yellow if Raichu is already owned', () => {
        const ownedSet = new Set([25, 26]); // Own Pikachu and Raichu
        const reason = getUnobtainableReason(26, 'yellow', 2, ownedSet);
        expect(reason).toBeNull();
      });

      it('should not lock Raichu in Red/Blue even if not owned', () => {
        const ownedSet = new Set([25]); // Own Pikachu
        const reasonRed = getUnobtainableReason(26, 'red', 1, ownedSet);
        const reasonBlue = getUnobtainableReason(26, 'blue', 1, ownedSet);
        expect(reasonRed).toBeNull();
        expect(reasonBlue).toBeNull();
      });
    });

    describe('Starter Choices', () => {
      it('should lock unchosen starters', () => {
        const ownedSet = new Set([1]); // Own Bulbasaur
        const reasonCharmander = getUnobtainableReason(4, 'red', 1, ownedSet);
        const reasonCharmeleon = getUnobtainableReason(5, 'red', 1, ownedSet);
        const reasonCharizard = getUnobtainableReason(6, 'red', 1, ownedSet);
        expect(reasonCharmander).toContain('other Starter Pokémon');
        expect(reasonCharmeleon).toContain('other Starter Pokémon');
        expect(reasonCharizard).toContain('other Starter Pokémon');

        const reasonSquirtle = getUnobtainableReason(7, 'red', 1, ownedSet);
        expect(reasonSquirtle).toContain('other Starter Pokémon');
      });

      it('should lock unchosen starters even if we only own evolved forms of the chosen starter', () => {
        const ownedSet = new Set([3]); // Own Venusaur
        const reasonCharmander = getUnobtainableReason(4, 'red', 1, ownedSet);
        expect(reasonCharmander).toContain('other Starter Pokémon');
      });

      it('should NOT lock starters if no starter is owned (early game)', () => {
        const ownedSet = new Set([19]); // Own Rattata
        const reasonCharmander = getUnobtainableReason(4, 'red', 1, ownedSet);
        expect(reasonCharmander).toBeNull();
      });

      it('should NOT lock starters in Yellow, since all three are obtainable via NPCs', () => {
        const ownedSet = new Set([1, 3]); // Own Bulbasaur and Venusaur
        const reasonCharmander = getUnobtainableReason(4, 'yellow', 1, ownedSet);
        const reasonSquirtle = getUnobtainableReason(7, 'yellow', 1, ownedSet);
        expect(reasonCharmander).toBeNull();
        expect(reasonSquirtle).toBeNull();
      });
    });

    describe('Missed pre-evolutions (Starters/Eevee)', () => {
      it('should lock Bulbasaur (1) if Ivysaur (2) is owned but Bulbasaur is not', () => {
        const ownedSet = new Set([2]); // Own Ivysaur
        const reason = getUnobtainableReason(1, 'red', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('Pre-evolution missed');
      });

      it('should lock Squirtle (7) if Wartortle (8) is owned but Squirtle is not', () => {
        const ownedSet = new Set([8]); // Own Wartortle
        const reason = getUnobtainableReason(7, 'red', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('Pre-evolution missed');
      });

      it('should lock Squirtle (7) if Blastoise (9) is owned but Squirtle is not', () => {
        const ownedSet = new Set([9]); // Own Blastoise
        const reason = getUnobtainableReason(7, 'red', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('Pre-evolution missed');
      });

      it('should lock Charmander (4) if Charmeleon (5) is owned but Charmander is not', () => {
        const ownedSet = new Set([5]); // Own Charmeleon
        const reason = getUnobtainableReason(4, 'red', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('Pre-evolution missed');
      });

      it('should not lock Charmander (4) if it is currently owned', () => {
        const ownedSet = new Set([4, 5]); // Own Charmander and Charmeleon
        const reason = getUnobtainableReason(4, 'red', 2, ownedSet);
        expect(reason).toBeNull();
      });

      it('should not lock Charmander (4) if no evolution is owned', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(4, 'red', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should lock Eevee (133) if an evolution (Vaporeon 134) is owned but Eevee is not', () => {
        const ownedSet = new Set([134]); // Own Vaporeon
        const reason = getUnobtainableReason(133, 'red', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('Pre-evolution missed');
      });

      it('should lock Eevee (133) if Jolteon (135) is owned but Eevee is not', () => {
        const ownedSet = new Set([135]); // Own Jolteon
        const reason = getUnobtainableReason(133, 'red', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('Pre-evolution missed');
      });

      it('should lock Eevee (133) if Flareon (136) is owned but Eevee is not', () => {
        const ownedSet = new Set([136]); // Own Flareon
        const reason = getUnobtainableReason(133, 'red', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('Pre-evolution missed');
      });
    });

    describe('Branching evolutions (Eevee)', () => {
      it('should lock Jolteon (135) if Vaporeon (134) is owned, and Eevee (133) and Jolteon (135) are not', () => {
        const ownedSet = new Set([134]);
        const reason = getUnobtainableReason(135, 'red', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('different form');
      });

      it('should not lock Jolteon (135) if Eevee (133) is owned', () => {
        const ownedSet = new Set([133, 134]);
        const reason = getUnobtainableReason(135, 'red', 2, ownedSet);
        expect(reason).toBeNull();
      });

      it('should not lock Jolteon (135) if no eeveelution is owned', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(135, 'red', 0, ownedSet);
        expect(reason).toBeNull();
      });
    });

    describe('Hitmons (Mutually Exclusive)', () => {
      it('should lock Hitmonlee (106) if Hitmonchan (107) is owned and Hitmonlee is not', () => {
        const ownedSet = new Set([107]); // Own Hitmonchan
        const reason = getUnobtainableReason(106, 'red', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('other Dojo Pokémon');
      });

      it('should lock Hitmonchan (107) if Hitmonlee (106) is owned and Hitmonchan is not', () => {
        const ownedSet = new Set([106]); // Own Hitmonlee
        const reason = getUnobtainableReason(107, 'red', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('other Dojo Pokémon');
      });

      it('should not lock Hitmonlee (106) if neither is owned', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(106, 'red', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should not lock Hitmonlee (106) if both are somehow owned (traded)', () => {
        const ownedSet = new Set([106, 107]);
        const reason = getUnobtainableReason(106, 'red', 2, ownedSet);
        expect(reason).toBeNull();
      });
    });

    describe('Yellow Version Exclusives', () => {
      it('should lock Electabuzz (125) in Yellow', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(125, 'yellow', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('not available in Yellow');
      });

      it('should not lock Sandshrew (27) or Pinsir (127) in Yellow', () => {
        const ownedSet = new Set<number>();
        const reasonSandshrew = getUnobtainableReason(27, 'yellow', 0, ownedSet);
        const reasonPinsir = getUnobtainableReason(127, 'yellow', 0, ownedSet);
        expect(reasonSandshrew).toBeNull();
        expect(reasonPinsir).toBeNull();
      });
    });

    describe('Fossils (Mutually Exclusive)', () => {
      it('should lock Omanyte (138) if Kabuto (140) is owned', () => {
        const ownedSet = new Set([140]); // Own Kabuto
        const reason = getUnobtainableReason(138, 'red', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('other Fossil');
      });

      it('should lock Omanyte (138) if Kabutops (141) is owned', () => {
        const ownedSet = new Set([141]); // Own Kabutops
        const reason = getUnobtainableReason(138, 'red', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('other Fossil');
      });

      it('should lock Kabuto (140) if Omastar (139) is owned', () => {
        const ownedSet = new Set([139]); // Own Omastar
        const reason = getUnobtainableReason(140, 'red', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('other Fossil');
      });

      it('should lock Omastar (139) if Kabuto (140) is owned', () => {
        const ownedSet = new Set([140]); // Own Kabuto
        const reason = getUnobtainableReason(139, 'red', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('other Fossil');
      });

      it('should lock Kabutops (141) if Omanyte (138) is owned', () => {
        const ownedSet = new Set([138]); // Own Omanyte
        const reason = getUnobtainableReason(141, 'red', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('other Fossil');
      });

      it('should lock Kabutops (141) if Omastar (139) is owned', () => {
        const ownedSet = new Set([139]); // Own Omastar
        const reason = getUnobtainableReason(141, 'red', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('other Fossil');
      });

      it('should not lock Omanyte (138) if neither is owned', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(138, 'red', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should not lock Omanyte (138) if both are somehow owned', () => {
        const ownedSet = new Set([138, 140]);
        const reason = getUnobtainableReason(138, 'red', 2, ownedSet);
        expect(reason).toBeNull();
      });
    });

    describe('General Obtainable Pokémon', () => {
      it('should return null for normally obtainable Pokémon (Pidgey 16)', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(16, 'red', 0, ownedSet);
        expect(reason).toBeNull();
      });
    });

    describe('Red and Blue Version Exclusives', () => {
      it('should lock Sandshrew (27) in Red', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(27, 'red', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('not available in Red');
      });

      it('should not lock Ekans (23) in Red', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(23, 'red', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should lock Ekans (23) in Blue', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(23, 'blue', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('not available in Blue');
      });

      it('should not lock Sandshrew (27) in Blue', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(27, 'blue', 0, ownedSet);
        expect(reason).toBeNull();
      });
    });
  });
});

describe('getUnobtainableReason - Missing Linear Evolutions', () => {
  it('should lock intermediate linear evolution if only final stage is owned', () => {
    // Bulbasaur (1), Ivysaur (2), Venusaur (3).
    // Owns ONLY Venusaur (3). Asking for Ivysaur (2).
    const ownedSet = new Set([3]);
    const reason = getUnobtainableReason(2, 'red', 1, ownedSet);
    expect(reason).toContain('Pre-evolution missed');
  });

  it('should lock intermediate linear evolution if only final stage is owned (Charmander)', () => {
    // Charmander (4), Charmeleon (5), Charizard (6).
    // Owns ONLY Charizard (6). Asking for Charmeleon (5).
    const ownedSet = new Set([6]);
    const reason = getUnobtainableReason(5, 'red', 1, ownedSet);
    expect(reason).toContain('Pre-evolution missed');
  });

  it('should lock base stage if only intermediate stage is owned', () => {
    const ownedSet = new Set([5]); // Charmeleon
    const reason = getUnobtainableReason(4, 'red', 1, ownedSet);
    expect(reason).toContain('Pre-evolution missed');
  });

  it('should NOT lock intermediate stage if base is owned', () => {
    const ownedSet = new Set([4]); // Charmander
    const reason = getUnobtainableReason(5, 'red', 1, ownedSet);
    expect(reason).toBeNull();
  });
});
