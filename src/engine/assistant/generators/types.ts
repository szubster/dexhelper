import type { PokemonInstance, SaveData } from '../../saveParser/index';
import type { RejectedSuggestion, Suggestion } from '../strategies/types';
import type { AssistantApiData } from '../suggestionEngine';

export interface SuggestionContext {
  saveData: SaveData;
  apiData: AssistantApiData;
  missingIds: number[];
  ownedSet: Set<number>;
  ownedCount: number;
  allInstances: PokemonInstance[];
  myOtIds: Set<number>;
  displayVersion: string;
  queryTargets: number[];
  suggestions: Suggestion[];
  rejected: RejectedSuggestion[];
  unobtainableCount: number;
}
