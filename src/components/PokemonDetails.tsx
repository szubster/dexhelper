import React, { useState, useEffect } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { X, MapPin, AlertCircle, Info, ArrowUpCircle, CheckCircle2, XCircle, Target, AlertTriangle, Sparkles, Package, Heart, Activity, Zap, ChevronRight, CircleDot, Monitor, Ghost, Eye, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SaveData } from '../utils/saveParser';
import { pokeapi } from '../utils/pokeapi';
import { PokeballType } from '../App';

function calculateHiddenPower(dvs: { atk: number, def: number, spd: number, spc: number }) {
  const typeMap = [
    'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel',
    'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark'
  ];
  
  const typeIndex = 4 * (dvs.atk % 4) + (dvs.def % 4);
  const hpType = typeMap[typeIndex];
  
  const v = dvs.spc >= 8 ? 1 : 0;
  const w = dvs.spd >= 8 ? 1 : 0;
  const x = dvs.def >= 8 ? 1 : 0;
  const y = dvs.atk >= 8 ? 1 : 0;
  const z = dvs.spc % 4;
  
  const hpPower = Math.floor((5 * (v + 2*w + 4*x + 8*y) + z) / 2) + 31;
  
  return { type: hpType, power: hpPower };
}

const staticEncounters: Record<number, { red?: string[], blue?: string[], yellow?: string[], gold?: string[], silver?: string[], crystal?: string[] }> = {
  1: { red: ['Pallet Town (Starter)'], blue: ['Pallet Town (Starter)'], yellow: ['Cerulean City (Gift)'] },
  4: { red: ['Pallet Town (Starter)'], blue: ['Pallet Town (Starter)'], yellow: ['Route 24 (Gift)'] },
  7: { red: ['Pallet Town (Starter)'], blue: ['Pallet Town (Starter)'], yellow: ['Vermilion City (Gift)'] },
  25: { red: [], blue: [], yellow: ['Pallet Town (Starter)'] },
  29: { red: ['Route 5 (Trade for Nidoran♂)'], blue: ['Route 5 (Trade for Nidoran♂)'] },
  30: { red: ['Route 11 (Trade for Nidorino)'], blue: ['Route 11 (Trade for Nidorino)'] },
  32: { red: ['Route 5 (Trade for Nidoran♀)'], blue: ['Route 5 (Trade for Nidoran♀)'] },
  33: { red: ['Route 11 (Trade for Nidorina)'], blue: ['Route 11 (Trade for Nidorina)'] },
  35: { red: ['Celadon Game Corner'], blue: ['Celadon Game Corner'], yellow: ['Celadon Game Corner'] },
  37: { yellow: ['Celadon Game Corner'] },
  40: { yellow: ['Celadon Game Corner'] },
  63: { red: ['Celadon Game Corner'], blue: ['Celadon Game Corner'], yellow: ['Celadon Game Corner'] },
  66: { yellow: ['Route 5 (Trade for Cubone)'] },
  83: { red: ['Vermilion City (Trade for Spearow)'], blue: ['Vermilion City (Trade for Spearow)'] },
  86: { red: ['Cinnabar Island (Trade for Ponyta)'], blue: ['Cinnabar Island (Trade for Ponyta)'] },
  87: { yellow: ['Cinnabar Island (Trade for Growlithe)'] },
  89: { yellow: ['Cinnabar Island (Trade for Kangaskhan)'] },
  101: { red: ['Cinnabar Island (Trade for Raichu)'], blue: ['Cinnabar Island (Trade for Raichu)'] },
  108: { red: ['Route 18 (Trade for Slowbro)'], blue: ['Route 18 (Trade for Slowbro)'], yellow: ['Route 11 (Trade for Dugtrio)'] },
  112: { yellow: ['Cinnabar Island (Trade for Golduck)'] },
  114: { red: ['Cinnabar Island (Trade for Venonat)'], blue: ['Cinnabar Island (Trade for Venonat)'] },
  122: { red: ['Route 2 (Trade for Abra)'], blue: ['Route 2 (Trade for Abra)'], yellow: ['Route 2 (Trade for Clefairy)'] },
  123: { red: ['Celadon Game Corner'], yellow: ['Celadon Game Corner'] },
  124: { red: ['Cerulean City (Trade for Poliwhirl)'], blue: ['Cerulean City (Trade for Poliwhirl)'] },
  127: { blue: ['Celadon Game Corner'], yellow: ['Celadon Game Corner'] },
  129: { red: ['Route 4 PokeCenter (Buy for 500¥)'], blue: ['Route 4 PokeCenter (Buy for 500¥)'], yellow: ['Route 4 PokeCenter (Buy for 500¥)'] },
  131: { red: ['Silph Co. (Gift)'], blue: ['Silph Co. (Gift)'], yellow: ['Silph Co. (Gift)'], gold: ['Silph Co. (Trade)'], silver: ['Silph Co. (Trade)'], crystal: ['Silph Co. (Trade)'] },
  133: { red: ['Celadon Mansion (Gift)'], blue: ['Celadon Mansion (Gift)'], yellow: ['Celadon Mansion (Gift)'], gold: ['Goldenrod City (Gift)'], silver: ['Goldenrod City (Gift)'], crystal: ['Goldenrod City (Gift)'] },
  137: { red: ['Celadon Game Corner'], blue: ['Celadon Game Corner'], yellow: ['Celadon Game Corner'], gold: ['Celadon Game Corner'], silver: ['Celadon Game Corner'], crystal: ['Celadon Game Corner'] },
  138: { red: ['Mt. Moon (Helix Fossil)'], blue: ['Mt. Moon (Helix Fossil)'], yellow: ['Mt. Moon (Helix Fossil)'] },
  140: { red: ['Mt. Moon (Dome Fossil)'], blue: ['Mt. Moon (Dome Fossil)'], yellow: ['Mt. Moon (Dome Fossil)'] },
  142: { red: ['Pewter City (Old Amber)'], blue: ['Pewter City (Old Amber)'], yellow: ['Pewter City (Old Amber)'] },
  143: { red: ['Route 12 (Interact)', 'Route 16 (Interact)'], blue: ['Route 12 (Interact)', 'Route 16 (Interact)'], yellow: ['Route 12 (Interact)', 'Route 16 (Interact)'], gold: ['Vermilion City (Interact)'], silver: ['Vermilion City (Interact)'], crystal: ['Vermilion City (Interact)'] },
  144: { red: ['Seafoam Islands (Interact)'], blue: ['Seafoam Islands (Interact)'], yellow: ['Seafoam Islands (Interact)'] },
  145: { red: ['Power Plant (Interact)'], blue: ['Power Plant (Interact)'], yellow: ['Power Plant (Interact)'] },
  146: { red: ['Victory Road (Interact)'], blue: ['Victory Road (Interact)'], yellow: ['Victory Road (Interact)'] },
  147: { red: ['Celadon Game Corner'], blue: ['Celadon Game Corner'], yellow: ['Celadon Game Corner'], gold: ['Goldenrod Game Corner'], silver: ['Goldenrod Game Corner'], crystal: ['Goldenrod Game Corner'] },
  150: { red: ['Cerulean Cave (Interact)'], blue: ['Cerulean Cave (Interact)'], yellow: ['Cerulean Cave (Interact)'] },
  151: { red: ['Event / Glitch Only'], blue: ['Event / Glitch Only'], yellow: ['Event / Glitch Only'] },
  152: { gold: ['New Bark Town (Starter)'], silver: ['New Bark Town (Starter)'], crystal: ['New Bark Town (Starter)'] },
  155: { gold: ['New Bark Town (Starter)'], silver: ['New Bark Town (Starter)'], crystal: ['New Bark Town (Starter)'] },
  158: { gold: ['New Bark Town (Starter)'], silver: ['New Bark Town (Starter)'], crystal: ['New Bark Town (Starter)'] },
  175: { gold: ['Egg (Gift)'], silver: ['Egg (Gift)'], crystal: ['Egg (Gift)'] },
  185: { gold: ['Route 36 (Interact)'], silver: ['Route 36 (Interact)'], crystal: ['Route 36 (Interact)'] },
  213: { gold: ['Mt. Mortar (Gift)'], silver: ['Mt. Mortar (Gift)'], crystal: ['Mt. Mortar (Gift)'] },
  236: { gold: ['Mt. Mortar (Gift)'], silver: ['Mt. Mortar (Gift)'], crystal: ['Mt. Mortar (Gift)'] },
  243: { gold: ['Roam Johto'], silver: ['Roam Johto'], crystal: ['Roam Johto'] },
  244: { gold: ['Roam Johto'], silver: ['Roam Johto'], crystal: ['Roam Johto'] },
  245: { gold: ['Roam Johto'], silver: ['Roam Johto'], crystal: ['Roam Johto'] },
  249: { gold: ['Whirl Islands'], silver: ['Whirl Islands'], crystal: ['Whirl Islands'] },
  250: { gold: ['Tin Tower'], silver: ['Tin Tower'], crystal: ['Tin Tower'] },
  251: { gold: ['Event Only'], silver: ['Event Only'], crystal: ['Event Only'] },
};

interface EncounterDetail {
  chance: number;
  max_level: number;
  min_level: number;
  method: { name: string };
}

interface Encounter {
  location_area: { name: string };
  version_details: {
    version: { name: string };
    encounter_details: EncounterDetail[];
  }[];
}

interface EvoRequirement {
  fromId: number;
  fromName: string;
  method: string;
}

interface PokemonDetailsProps {
  pokemonId: number;
  pokemonName: string;
  gameVersion: string;
  saveData: SaveData | null;
  isLivingDex: boolean;
  pokeball: PokeballType;
  onClose: () => void;
  onNavigate: (id: number, name: string) => void;
}


const gen2Items: Record<number, string> = {
  1: 'Master Ball', 2: 'Ultra Ball', 3: 'BrightPowder', 4: 'Great Ball', 5: 'Poké Ball',
  6: 'Teru-sama', 7: 'Bicycle', 8: 'Moon Stone', 9: 'Antidote', 10: 'Burn Heal',
  11: 'Ice Heal', 12: 'Awakening', 13: 'Parlyz Heal', 14: 'Full Restore', 15: 'Max Potion',
  16: 'Hyper Potion', 17: 'Super Potion', 18: 'Potion', 19: 'Escape Rope', 20: 'Repel',
  21: 'Max Elixer', 22: 'Fire Stone', 23: 'ThunderStone', 24: 'Water Stone', 25: 'Teru-sama',
  26: 'HP Up', 27: 'Protein', 28: 'Iron', 29: 'Carbos', 30: 'Lucky Punch',
  31: 'Calcium', 32: 'Rare Candy', 33: 'X Accuracy', 34: 'Leaf Stone', 35: 'Metal Powder',
  36: 'Nugget', 37: 'Poké Doll', 38: 'Full Heal', 39: 'Revive', 40: 'Max Revive',
  41: 'Guard Spec.', 42: 'Super Repel', 43: 'Max Repel', 44: 'Dire Hit', 45: 'Teru-sama',
  46: 'Fresh Water', 47: 'Soda Pop', 48: 'Lemonade', 49: 'X Attack', 50: 'X Defend',
  51: 'X Speed', 52: 'X Special', 53: 'Coin Case', 54: 'Itemfinder', 55: 'Teru-sama',
  56: 'Exp.Share', 57: 'Old Rod', 58: 'Good Rod', 59: 'Silver Leaf', 60: 'Super Rod',
  61: 'PP Up', 62: 'Ether', 63: 'Max Ether', 64: 'Elixer', 65: 'Red Scale',
  66: 'SecretPotion', 67: 'S.S. Ticket', 68: 'Mystery Egg', 69: 'Clear Bell', 70: 'Silver Wing',
  71: 'Moomoo Milk', 72: 'Quick Claw', 73: 'PsnCureBerry', 74: 'Gold Leaf', 75: 'Soft Sand',
  76: 'Sharp Beak', 77: 'PrzCureBerry', 78: 'Burnt Berry', 79: 'Ice Berry', 80: 'Poison Barb',
  81: 'King\'s Rock', 82: 'Bitter Berry', 83: 'Mint Berry', 84: 'Red Apricorn', 85: 'TinyMushroom',
  86: 'Big Mushroom', 87: 'SilverPowder', 88: 'Blu Apricorn', 89: 'Teru-sama', 90: 'Amulet Coin',
  91: 'Ylw Apricorn', 92: 'Grn Apricorn', 93: 'Cleanse Tag', 94: 'Mystic Water', 95: 'TwistedSpoon',
  96: 'Wht Apricorn', 97: 'Blackbelt', 98: 'Blk Apricorn', 99: 'Pnk Apricorn', 100: 'BlackGlasses',
  101: 'SlowpokeTail', 102: 'Pink Bow', 103: 'Stick', 104: 'Smoke Ball', 105: 'NeverMeltIce',
  106: 'Magnet', 107: 'MiracleBerry', 108: 'Pearl', 109: 'Big Pearl', 110: 'Everstone',
  111: 'Spell Tag', 112: 'RageCandyBar', 113: 'GS Ball', 114: 'Blue Card', 115: 'Miracle Seed',
  116: 'Thick Club', 117: 'Focus Band', 118: 'Teru-sama', 119: 'EnergyPowder', 120: 'Energy Root',
  121: 'Heal Powder', 122: 'Revival Herb', 123: 'Hard Stone', 124: 'Lucky Egg', 125: 'Card Key',
  126: 'Machine Part', 127: 'Egg Ticket', 128: 'Lost Item', 129: 'Stardust', 130: 'Star Piece',
  131: 'Basement Key', 132: 'Pass', 133: 'Teru-sama', 134: 'Teru-sama', 135: 'Teru-sama',
  136: 'Teru-sama', 137: 'Teru-sama', 138: 'Teru-sama', 139: 'Teru-sama', 140: 'Teru-sama',
  141: 'Teru-sama', 142: 'Teru-sama', 143: 'Charcoal', 144: 'Berry Juice', 145: 'Scope Lens',
  146: 'Teru-sama', 147: 'Teru-sama', 148: 'Metal Coat', 149: 'Dragon Fang', 150: 'Teru-sama',
  151: 'Leftovers', 152: 'Teru-sama', 153: 'Teru-sama', 154: 'Teru-sama', 155: 'MysteryBerry',
  156: 'Dragon Scale', 157: 'Berserk Gene', 158: 'Teru-sama', 159: 'Teru-sama', 160: 'Teru-sama',
  161: 'Teru-sama', 162: 'Teru-sama', 163: 'Sacred Ash', 164: 'Heavy Ball', 165: 'Flower Mail',
  166: 'Level Ball', 167: 'Lure Ball', 168: 'Fast Ball', 169: 'Teru-sama', 170: 'Light Ball',
  171: 'Friend Ball', 172: 'Moon Ball', 173: 'Love Ball', 174: 'Normal Box', 175: 'Gorgeous Box',
  176: 'Sun Stone', 177: 'Polkadot Bow', 178: 'Teru-sama', 179: 'Up-Grade', 180: 'Berry',
  181: 'Gold Berry', 182: 'SquirtBottle', 183: 'Teru-sama', 184: 'Park Ball', 185: 'Rainbow Wing',
  186: 'Teru-sama', 187: 'Brick Piece', 188: 'Surf Mail', 189: 'Litebluemail', 190: 'Portraitmail',
  191: 'Lovely Mail', 192: 'Eon Mail', 193: 'Morph Mail', 194: 'Bluesky Mail', 195: 'Music Mail',
  196: 'Mirage Mail', 197: 'Teru-sama', 198: 'Teru-sama', 199: 'Teru-sama', 200: 'Teru-sama',
  201: 'Teru-sama', 202: 'Teru-sama', 203: 'Teru-sama', 204: 'Teru-sama', 205: 'Teru-sama',
  206: 'Teru-sama', 207: 'Teru-sama', 208: 'Teru-sama', 209: 'Teru-sama', 210: 'Teru-sama',
  211: 'Teru-sama', 212: 'Teru-sama', 213: 'Teru-sama', 214: 'Teru-sama', 215: 'Teru-sama',
  216: 'Teru-sama', 217: 'Teru-sama', 218: 'Teru-sama', 219: 'Teru-sama', 220: 'Teru-sama',
  221: 'Teru-sama', 222: 'Teru-sama', 223: 'Teru-sama', 224: 'Teru-sama', 225: 'Teru-sama',
  226: 'Teru-sama', 227: 'Teru-sama', 228: 'Teru-sama', 229: 'Teru-sama', 230: 'Teru-sama',
  231: 'Teru-sama', 232: 'Teru-sama', 233: 'Teru-sama', 234: 'Teru-sama', 235: 'Teru-sama',
  236: 'Teru-sama', 237: 'Teru-sama', 238: 'Teru-sama', 239: 'Teru-sama', 240: 'Teru-sama',
  241: 'Teru-sama', 242: 'Teru-sama', 243: 'Teru-sama', 244: 'Teru-sama', 245: 'Teru-sama',
  246: 'Teru-sama', 247: 'Teru-sama', 248: 'Teru-sama', 249: 'Teru-sama', 250: 'Teru-sama',
  251: 'Teru-sama', 252: 'Teru-sama', 253: 'Teru-sama', 254: 'Teru-sama', 255: 'Teru-sama'
};

const gen2Locations: Record<number, string> = {
  1: 'New Bark Town', 2: 'Route 29', 3: 'Cherrygrove City', 4: 'Route 30', 5: 'Route 31',
  6: 'Violet City', 7: 'Sprout Tower', 8: 'Route 32', 9: 'Union Cave', 10: 'Route 33',
  11: 'Azalea Town', 12: 'Slowpoke Well', 13: 'Ilex Forest', 14: 'Route 34', 15: 'Goldenrod City',
  16: 'Radio Tower', 17: 'Route 35', 18: 'National Park', 19: 'Route 36', 20: 'Route 37',
  21: 'Ecruteak City', 22: 'Tin Tower', 23: 'Burned Tower', 24: 'Route 38', 25: 'Route 39',
  26: 'Olivine City', 27: 'Lighthouse', 28: 'Battle Tower', 29: 'Route 40', 30: 'Whirl Islands',
  31: 'Route 41', 32: 'Cianwood City', 33: 'Route 42', 34: 'Mt. Mortar', 35: 'Route 43',
  36: 'Lake of Rage', 37: 'Route 44', 38: 'Ice Path', 39: 'Blackthorn City', 40: 'Dragon\'s Den',
  41: 'Route 45', 42: 'Dark Cave', 43: 'Route 46', 44: 'Silver Cave', 45: 'Pallet Town',
  46: 'Route 1', 47: 'Viridian City', 48: 'Route 2', 49: 'Pewter City', 50: 'Route 3',
  51: 'Mt. Moon', 52: 'Route 4', 53: 'Cerulean City', 54: 'Route 24', 55: 'Route 25',
  56: 'Route 5', 57: 'Underground', 58: 'Route 6', 59: 'Vermilion City', 60: 'Diglett\'s Cave',
  61: 'Route 7', 62: 'Route 8', 63: 'Route 9', 64: 'Rock Tunnel', 65: 'Route 10',
  66: 'Lavender Town', 67: 'Pokémon Tower', 68: 'Route 11', 69: 'Route 12', 70: 'Route 13',
  71: 'Route 14', 72: 'Route 15', 73: 'Route 16', 74: 'Route 17', 75: 'Route 18',
  76: 'Fuchsia City', 77: 'Safari Zone', 78: 'Route 19', 79: 'Route 20', 80: 'Seafoam Islands',
  81: 'Route 21', 82: 'Cinnabar Island', 83: 'Route 22', 84: 'Route 23', 85: 'Victory Road',
  86: 'Route 26', 87: 'Route 27', 88: 'Tohjo Falls', 89: 'Route 28', 90: 'Fast Ship',
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 40,
    transition: { duration: 0.2 }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", damping: 20, stiffness: 100 }
  }
};

export function PokemonDetails({ pokemonId, pokemonName, gameVersion, saveData, isLivingDex, pokeball: defaultPokeball, onClose, onNavigate }: PokemonDetailsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);


  const queries = useQueries({
    queries: [
      {
        queryKey: ['encounters', pokemonId],
        queryFn: () => pokeapi.getPokemonEncounterAreasByName(pokemonId),
      },
      {
        queryKey: ['pokemon', pokemonId],
        queryFn: () => pokeapi.getPokemonByName(pokemonId),
      },
      {
        queryKey: ['species', pokemonId],
        queryFn: () => pokeapi.getPokemonSpeciesByName(pokemonId),
      }
    ]
  });

  // Calculator state
  const [hpPercent, setHpPercent] = useState<number>(100);
  const [status, setStatus] = useState<'none' | 'sleep_freeze' | 'paralyze_burn_poison'>('none');

  const encountersReady = queries[0].isSuccess;
  const pokemonReady = queries[1].isSuccess;
  const speciesReady = queries[2].isSuccess;

  const encounters = queries[0].data || [];
  const pokemonData = queries[1].data;
  const speciesData = queries[2].data;

  const catchRate = speciesData?.capture_rate ?? null;
  const genderRate = speciesData?.gender_rate ?? -1;

  const { data: evolutionData } = useQuery({
    queryKey: ['evolution', speciesData?.evolution_chain?.url],
    queryFn: () => pokeapi.resource(speciesData!.evolution_chain.url),
    enabled: !!speciesData?.evolution_chain?.url,
  });

  const evoReq = React.useMemo(() => {
    if (!speciesData?.evolves_from_species || !evolutionData) return null;
    
    const fromName = speciesData.evolves_from_species.name;
    const fromId = parseInt(speciesData.evolves_from_species.url.split('/').filter(Boolean).pop() || '0');
    
    // For Gen 1 saves, ignore pre-evolutions from later generations (babies)
    if (saveData?.generation === 1 && fromId > 151) return null;
    
    let methodStr = 'Unknown';

    const findEvoDetails = (chain: any): any => {
      if (chain.species.name === pokemonName.toLowerCase()) {
        return chain.evolution_details[0];
      }
      for (const next of chain.evolves_to) {
        const found = findEvoDetails(next);
        if (found) return found;
      }
      return null;
    };

    const details = findEvoDetails(evolutionData.chain);
    if (details) {
      if (details.trigger?.name === 'level-up') {
        methodStr = details.min_level ? `Level ${details.min_level}` : 'Level up';
      } else if (details.trigger?.name === 'use-item') {
        methodStr = details.item?.name?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Item';
      } else if (details.trigger?.name === 'trade') {
        methodStr = 'Trade';
      }
    }

    return {
      fromId,
      fromName: fromName.charAt(0).toUpperCase() + fromName.slice(1),
      method: methodStr
    };
  }, [speciesData, evolutionData, pokemonName, saveData]);

  const evolvesTo = React.useMemo(() => {
    if (!speciesData || !evolutionData) return null;
    
    const findEvolutions = (chain: any): any[] => {
      if (chain.species.name === pokemonName.toLowerCase()) {
        return chain.evolves_to.map((evo: any) => {
          const id = parseInt(evo.species.url.split('/').filter(Boolean).pop() || '0');
          // For Gen 1 saves, ignore Gen 2 evolutions
          if (saveData?.generation === 1 && id > 151) return null;
          
          let methodStr = 'Unknown';
          const details = evo.evolution_details[0];
          if (details) {
            if (details.trigger?.name === 'level-up') {
              methodStr = details.min_level ? `Level ${details.min_level}` : 'Level up';
            } else if (details.trigger?.name === 'use-item') {
              methodStr = details.item?.name?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Item';
            } else if (details.trigger?.name === 'trade') {
              methodStr = 'Trade';
            }
          }
          return {
            id,
            name: evo.species.name.charAt(0).toUpperCase() + evo.species.name.slice(1),
            method: methodStr
          };
        }).filter(Boolean);
      }
      for (const next of chain.evolves_to) {
        const found = findEvolutions(next);
        if (found.length > 0) return found;
      }
      return [];
    };

    return findEvolutions(evolutionData.chain);
  }, [speciesData, evolutionData, pokemonName, saveData]);

  const breedingInfo = React.useMemo(() => {

    if (!speciesData?.is_baby || !evolutionData) return null;
    
    // For Gen 1 saves, don't show baby breeding info (it's Gen 2 content)
    if (saveData?.generation === 1) return null;
    
    const parents: { id: number, name: string }[] = [];

    const traverse = (node: any) => {
      if (node.species.name !== speciesData.name) {
        const id = parseInt(node.species.url.split('/').filter(Boolean).pop() || '0');
        parents.push({ id, name: node.species.name.charAt(0).toUpperCase() + node.species.name.slice(1) });
      }
      node.evolves_to?.forEach(traverse);
    };
    traverse(evolutionData.chain);
    
    return {
      parentIds: parents.map(p => p.id),
      parentNames: parents.map(p => p.name),
      method: 'Breed evolved form with Ditto or same egg group'
    };
  }, [speciesData, evolutionData]);

  const loading = queries.some(q => q.isLoading) || (!!speciesData?.evolution_chain?.url && !evolutionData);

  const getLocationsForVersion = (version: string) => {
    const locations: { name: string, details: string }[] = [];
    
    const staticData = staticEncounters[pokemonId];
    if (staticData && staticData[version as keyof typeof staticData]) {
      staticData[version as keyof typeof staticData]!.forEach(loc => {
        locations.push({ name: loc, details: 'Static Encounter / Gift / Trade' });
      });
    }

    encounters.forEach(enc => {
      const versionDetail = enc.version_details.find(vd => vd.version.name === version);
      if (versionDetail) {
        let name = enc.location_area.name
          .replace(/-/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase())
          .replace(' Area', '')
          .replace('Kanto ', '')
          .replace('Johto ', '');

        const methodMap = new Map<string, { chance: number, min: number, max: number, conditions: string[] }>();
        versionDetail.encounter_details.forEach((detail: any) => {
          const method = detail.method.name.replace(/-/g, ' ');
          const conditions = detail.condition_values.map((cv: any) => cv.name.replace(/-/g, ' '));
          const key = `${method}${conditions.length > 0 ? ` (${conditions.join(', ')})` : ''}`;
          
          const existing = methodMap.get(key);
          if (existing) {
            existing.chance += detail.chance;
            existing.min = Math.min(existing.min, detail.min_level);
            existing.max = Math.max(existing.max, detail.max_level);
          } else {
            methodMap.set(key, { chance: detail.chance, min: detail.min_level, max: detail.max_level, conditions });
          }
        });

        const detailStrings = Array.from(methodMap.entries()).map(([key, data]) => {
          const lvl = data.min === data.max ? `Lv ${data.min}` : `Lv ${data.min}-${data.max}`;
          return `${data.chance}% chance, ${lvl} (${key})`;
        });

        locations.push({ name, details: detailStrings.join(' | ') });
      }
    });
    
    return locations;
  };

  const redLocations = getLocationsForVersion('red');
  const blueLocations = getLocationsForVersion('blue');
  const yellowLocations = getLocationsForVersion('yellow');
  const goldLocations = getLocationsForVersion('gold');
  const silverLocations = getLocationsForVersion('silver');
  const crystalLocations = getLocationsForVersion('crystal');

  const renderLocations = (locations: {name: string, details: string}[], colorClass: string) => {
    if (locations.length === 0) {
      return (
        <div className="text-[10px] text-zinc-600 uppercase tracking-widest font-black flex items-center gap-2 py-4">
          <AlertCircle size={14} /> Not found in the wild
        </div>
      );
    }
    return (
      <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {locations.map((loc, i) => (
          <div key={i} className="group bg-zinc-950 p-4 rounded-2xl border border-zinc-900 hover:border-zinc-800 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-1.5 rounded-lg bg-zinc-900 ${colorClass}`}>
                <MapPin size={14} />
              </div>
              <span className="text-xs font-black uppercase tracking-tight text-zinc-100">{loc.name}</span>
            </div>
            <div className="text-[10px] text-zinc-500 pl-8 leading-relaxed font-mono font-bold">
              {loc.details}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const displayVersion = gameVersion === 'unknown' ? (saveData?.generation === 2 ? 'gold' : 'red') : gameVersion;

  const currentGenVersions = saveData?.generation === 2 
    ? ['gold', 'silver', 'crystal'] 
    : ['red', 'blue', 'yellow'];

  const allVersionLocations = currentGenVersions.reduce((acc, v) => {
    acc[v] = getLocationsForVersion(v);
    return acc;
  }, {} as Record<string, {name: string, details: string}[]>);

  const isSafariNative = React.useMemo(() => {
    const locations = allVersionLocations[displayVersion] || [];
    return locations.some(loc => loc.name.toLowerCase().includes('safari zone'));
  }, [allVersionLocations, displayVersion]);

  const effectivePokeball = isSafariNative ? 'safari' : defaultPokeball;

  
  let hasPreEvo = false;
  if (evoReq && saveData) {
    const preEvoInStorage = saveData.party.includes(evoReq.fromId) || saveData.pc.includes(evoReq.fromId);
    const preEvoOwned = saveData.owned.has(evoReq.fromId);
    hasPreEvo = isLivingDex ? preEvoInStorage : preEvoOwned;
  }

  const stadiumRewards: Record<number, string> = {
    1: "Gym Leader Castle Reward",
    4: "Gym Leader Castle Reward",
    7: "Gym Leader Castle Reward",
    25: "Surfing Pikachu (Prime Cup Master Ball)",
    54: "Amnesia Psyduck (Hall of Fame)",
    106: "Gym Leader Castle Reward",
    107: "Gym Leader Castle Reward",
    133: "Gym Leader Castle Reward",
    138: "Gym Leader Castle Reward",
    140: "Gym Leader Castle Reward",
    207: "Earthquake Gligar (Round 2 Rival)",
  };

  const stadiumReward = stadiumRewards[pokemonId];

  const getGender = (atkDV: number, rate: number) => {
    if (rate === -1) return 'Genderless';
    if (rate === 0) return 'Male';
    if (rate === 8) return 'Female';
    return atkDV < (rate * 2) ? 'Female' : 'Male';
  };

  const getUnownForm = (dvs: { atk: number, def: number, spd: number, spc: number }) => {
    const formValue = ((dvs.atk & 0x06) << 5) | ((dvs.def & 0x06) << 3) | ((dvs.spd & 0x06) << 1) | ((dvs.spc & 0x06) >> 1);
    const letterIndex = Math.floor(formValue / 10);
    return String.fromCharCode(65 + letterIndex);
  };

  const yourPokemon = saveData ? [
    ...saveData.partyDetails.filter(p => p.speciesId === pokemonId).map(p => ({ ...p, location: 'Party' })),
    ...saveData.pcDetails.filter(p => p.speciesId === pokemonId).map(p => ({ ...p, location: 'PC' }))
  ] : [];

  const isShiny = yourPokemon.some(p => p.isShiny);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-xl p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div 
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 w-full h-[90vh] sm:h-auto sm:max-h-[85vh] sm:max-w-5xl rounded-t-[3rem] sm:rounded-[3rem] border-t sm:border border-zinc-800 shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-8 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6">
            <div className="relative">
              <motion.div variants={contentVariants} className="w-16 h-16 bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-center overflow-hidden">
                <img 
                  src={saveData?.generation === 2 
                    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${isShiny ? 'shiny/' : ''}${pokemonId}.png`
                    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${pokemonId}.png`
                  }
                  alt={pokemonName}
                  className="w-12 h-12 object-contain pixelated drop-shadow-lg"
                  style={{ imageRendering: 'pixelated' }}
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              {isShiny && (
                <motion.div 
                  animate={{ 
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-2 -right-2 text-amber-400"
                >
                  <Sparkles size={16} />
                </motion.div>
              )}
            </div>
            <div>
              <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">#{pokemonId.toString().padStart(3, '0')}</div>
              <h2 className="text-3xl font-display font-black uppercase tracking-tight text-white leading-none">{pokemonName}</h2>
              {stadiumReward && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[9px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Monitor size={10} /> Stadium: {stadiumReward}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors text-zinc-400"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Stats & Catching */}
            <div className="lg:col-span-5 space-y-10">
              {/* Types & Stats */}
              <div className="space-y-6">
                {pokemonData && (
                  <motion.div variants={contentVariants} className="flex gap-2">
                    {pokemonData.types.map((t: any) => (
                      <span key={t.type.name} className="px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        {t.type.name}
                      </span>
                    ))}
                  </motion.div>
                )}

                {pokemonData && (
                  <motion.div variants={contentVariants} className="grid grid-cols-3 gap-4">
                    {pokemonData.stats.map((s: any) => {
                      const statName = s.stat.name === 'special-attack' ? 'SPA' : 
                                      s.stat.name === 'special-defense' ? 'SPD' : 
                                      s.stat.name === 'hp' ? 'HP' :
                                      s.stat.name === 'attack' ? 'ATK' :
                                      s.stat.name === 'defense' ? 'DEF' :
                                      s.stat.name === 'speed' ? 'SPE' : s.stat.name;
                      if (saveData?.generation === 1 && s.stat.name === 'special-defense') return null;
                      if (saveData?.generation === 1 && s.stat.name === 'special-attack') {
                        return (
                          <div key={s.stat.name} className="bg-zinc-950 p-4 rounded-2xl border border-zinc-900 text-center">
                            <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">SPC</div>
                            <div className="text-xl font-display font-black text-white">{s.base_stat}</div>
                          </div>
                        );
                      }
                      return (
                        <div key={s.stat.name} className="bg-zinc-950 p-4 rounded-2xl border border-zinc-900 text-center">
                          <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">{statName}</div>
                          <div className="text-xl font-display font-black text-white">{s.base_stat}</div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </div>

              {/* Catch Rate Calc */}
              {catchRate !== null && (
                <div className="bg-emerald-950/10 border border-emerald-900/30 rounded-3xl p-8 space-y-8">
                  <motion.div variants={contentVariants} className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                      <Target size={14} /> Catch Probability
                    </h3>
                    <div className="text-xs font-mono font-bold text-emerald-500/50">{catchRate}/255</div>
                  </motion.div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                      <span>Target HP</span>
                      <span className="text-emerald-400">{hpPercent}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      value={hpPercent}
                      onChange={(e) => setHpPercent(Number(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-zinc-950 rounded-full appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {['none', 'paralyze_burn_poison', 'sleep_freeze'].map((s) => (
                      <button 
                        key={s}
                        onClick={() => setStatus(s as any)}
                        className={`py-2 text-[9px] font-black uppercase tracking-widest rounded-xl border transition-all ${status === s ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
                      >
                        {s === 'none' ? 'None' : s === 'sleep_freeze' ? 'Sleep' : 'Status'}
                      </button>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-emerald-900/30 flex items-center justify-between">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Success Rate</span>
                    <span className="text-4xl font-display font-black text-emerald-400">
                      {(() => {
                        let ballMult = 1;
                        if (effectivePokeball === 'great') ballMult = 1.5;
                        if (effectivePokeball === 'ultra' || effectivePokeball === 'safari') ballMult = 2;
                        let statusBonus = 0;
                        if (status === 'sleep_freeze') statusBonus = 10;
                        if (status === 'paralyze_burn_poison') statusBonus = 5;
                        const hpFactor = 1 + ((100 - hpPercent) / 100) * 2;
                        const baseChance = (catchRate * ballMult * hpFactor) / 255;
                        return Math.min(100, (baseChance * 100) + statusBonus).toFixed(1);
                      })()}%
                    </span>
                    <div className="text-[9px] font-black text-emerald-500/40 uppercase tracking-widest mt-1">
                      Using {effectivePokeball === 'safari' ? 'Safari Ball' : 
                             effectivePokeball === 'ultra' ? 'Ultra Ball' : 
                             effectivePokeball === 'great' ? 'Great Ball' : 'Poké Ball'}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Details & Locations */}
            <div className="lg:col-span-7 space-y-12">
              {/* Your Pokemon */}
              {yourPokemon.length > 0 && (
                <div className="space-y-6">
                  <motion.h3 variants={contentVariants} className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500" /> Your Units
                  </motion.h3>
                  <motion.div variants={contentVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {yourPokemon.map((p, i) => (
                      <div key={i} className="bg-zinc-950 p-6 rounded-3xl border border-zinc-900 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-xl font-display font-black text-white">LV.{p.level}</div>
                            <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mt-1">{p.storageLocation}</div>
                          </div>
                          {p.isShiny && <Sparkles size={16} className="text-amber-400" />}
                        </div>
                        
                        <div className="space-y-2">
                          {p.otName && <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex justify-between"><span>OT</span> <span className="text-zinc-200">{p.otName}</span></div>}
                          {p.item !== undefined && p.item > 0 && <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex justify-between"><span>Item</span> <span className="text-zinc-200">{gen2Items[p.item]}</span></div>}
                          {p.friendship !== undefined && <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex justify-between"><span>Trust</span> <span className="text-rose-400">{p.friendship}</span></div>}
                          {saveData?.generation === 2 && p.dvs && <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex justify-between"><span>H-Power</span> <span className="text-blue-400">{calculateHiddenPower(p.dvs).type}</span></div>}
                        </div>

                        {p.caughtData && (
                          <div className="pt-4 border-t border-zinc-900 space-y-1.5">
                            <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Capture Log</div>
                            <div className="text-[10px] font-bold text-zinc-400 truncate">{gen2Locations[p.caughtData.location] || 'Unknown Zone'}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                </div>
              )}

              {/* Evolution & Breeding */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {evoReq && (
                  <div className="bg-purple-950/10 border border-purple-900/30 rounded-3xl p-6 space-y-4">
                    <h3 className="text-[10px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-2">
                      <ArrowUpCircle size={14} /> Evolution
                    </h3>
                    <div className="text-xs font-bold text-zinc-300 leading-relaxed">
                      From <button onClick={() => onNavigate(evoReq.fromId, evoReq.fromName)} className="text-white hover:text-purple-400 underline decoration-purple-500/30 underline-offset-4 transition-colors">{evoReq.fromName}</button> via <span className="text-purple-400">{evoReq.method}</span>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${hasPreEvo ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                      {hasPreEvo ? <Check size={12} /> : <X size={12} />} {hasPreEvo ? 'Available' : 'Missing'}
                    </div>
                  </div>
                )}

                {evolvesTo && evolvesTo.length > 0 && (
                  <div className="bg-blue-950/10 border border-blue-900/30 rounded-3xl p-6 space-y-4">
                    <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                      <ChevronRight size={14} /> Evolves Into
                    </h3>
                    <div className="space-y-3">
                      {evolvesTo.map(evo => (
                        <div key={evo.id} className="text-xs font-bold text-zinc-300 leading-relaxed">
                          To <button onClick={() => onNavigate(evo.id, evo.name)} className="text-white hover:text-blue-400 underline decoration-blue-500/30 underline-offset-4 transition-colors">{evo.name}</button> via <span className="text-blue-400">{evo.method}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {breedingInfo && (

                  <div className="bg-pink-950/10 border border-pink-900/30 rounded-3xl p-6 space-y-4">
                    <h3 className="text-[10px] font-black text-pink-400 uppercase tracking-widest flex items-center gap-2">
                      <Heart size={14} /> Breeding
                    </h3>
                    <div className="text-xs font-bold text-zinc-300 leading-relaxed">
                      Parents: {breedingInfo.parentNames.map((name, i) => (
                        <React.Fragment key={name}>
                          <button 
                            onClick={() => onNavigate(breedingInfo.parentIds[i], name)}
                            className="text-white hover:text-pink-400 underline decoration-pink-500/30 underline-offset-4 transition-colors"
                          >
                            {name}
                          </button>
                          {i < breedingInfo.parentNames.length - 1 ? ', ' : ''}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="text-[9px] font-black text-pink-500 uppercase tracking-widest bg-pink-500/5 p-2 rounded-lg border border-pink-500/10">
                      {breedingInfo.method}
                    </div>
                  </div>
                )}

              </div>

              {/* Locations */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={14} /> Field Locations
                  </h3>
                  <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{gameVersion}</div>
                </div>
                
                {loading ? (
                  <div className="h-32 bg-zinc-950 rounded-3xl border border-zinc-900 animate-pulse"></div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {currentGenVersions.map(v => (
                      <div key={v} className="space-y-4">
                        <div className="flex items-center gap-2 px-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            v === 'red' ? 'bg-red-500' : 
                            v === 'blue' ? 'bg-blue-500' : 
                            v === 'yellow' ? 'bg-yellow-400' : 
                            v === 'gold' ? 'bg-yellow-500' : 
                            v === 'silver' ? 'bg-zinc-400' : 
                            v === 'crystal' ? 'bg-cyan-400' : 'bg-zinc-500'
                          }`} />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{v}</span>
                        </div>
                        {renderLocations(allVersionLocations[v], 
                          v === 'red' ? 'text-red-400' : 
                          v === 'blue' ? 'text-blue-400' : 
                          v === 'yellow' ? 'text-yellow-400' : 
                          v === 'gold' ? 'text-yellow-500' : 
                          v === 'silver' ? 'text-zinc-300' : 
                          v === 'crystal' ? 'text-cyan-400' : 'text-zinc-500'
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
